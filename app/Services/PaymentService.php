<?php

namespace App\Services;

use App\Contracts\PaymentGateway;
use App\Mail\DownloadLinks;
use App\Mail\OrderConfirmation;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PaymentService
{
    protected PaymentGateway $gateway;

    public function __construct()
    {
        $driver = config('payment.default', 'simulated');
        $gatewayClass = $this->resolveGatewayClass($driver);

        $this->gateway = new $gatewayClass(
            config("payment.gateways.{$driver}", [])
        );
    }

    protected function resolveGatewayClass(string $driver): string
    {
        return match ($driver) {
            'monetbil' => \App\Services\Gateways\MonetbilGateway::class,
            'paygate' => \App\Services\Gateways\PayGateGateway::class,
            default => \App\Services\Gateways\SimulatedGateway::class,
        };
    }

    public function initiate(Order $order, array $options = []): array
    {
        $order->update(['status' => 'pending_payment']);

        $result = $this->gateway->initiatePayment($order, $options);

        Payment::create([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'payment_method' => $options['payment_method'] ?? $this->gateway->getKey(),
            'status' => 'pending',
            'transaction_id' => $result['transaction_id'],
            'amount' => $order->total,
        ]);

        return $result;
    }

    public function processCallback(array $requestData): Order
    {
        $result = $this->gateway->verifyPayment($requestData);
        $transactionId = $result['transaction_id'];

        $payment = Payment::where('transaction_id', $transactionId)->first();

        if (!$payment) {
            throw new \RuntimeException("Payment not found for transaction: {$transactionId}");
        }

        $order = $payment->order;

        if ($result['status'] === 'completed') {
            $payment->update(['status' => 'completed']);
            $order->update(['status' => 'completed']);
            $this->finalizeOrder($order);
        } else {
            $payment->update(['status' => 'failed']);
            $order->update(['status' => 'failed']);
        }

        return $order;
    }

    public function processReturn(array $requestData): Order
    {
        $result = $this->gateway->processReturn($requestData);
        $transactionId = $result['transaction_id'];

        $payment = Payment::where('transaction_id', $transactionId)->first();

        if (!$payment) {
            throw new \RuntimeException("Payment not found for transaction: {$transactionId}");
        }

        $order = $payment->order;

        if ($result['status'] === 'completed') {
            $payment->update(['status' => 'completed']);
            $order->update(['status' => 'completed']);
            $this->finalizeOrder($order);
        } else {
            $payment->update(['status' => 'failed']);
            $order->update(['status' => 'failed']);
        }

        return $order;
    }

    public function finalizeOrder(Order $order): void
    {
        foreach ($order->items as $item) {
            $product = $item->product;

            if ($product) {
                $product->increment('sales_count');

                if (($product->product_type ?? 'digital') === 'digital') {
                    \App\Models\Download::firstOrCreate([
                        'user_id' => $order->user_id,
                        'product_id' => $product->id,
                        'order_id' => $order->id,
                    ]);
                }
            }
        }

        $this->generateInvoice($order);
        $this->sendOrderEmails($order);
        $this->processReferralCommission($order);

        session()->forget('cart');
        session()->forget('pending_payment');
    }

    private function generateInvoice(Order $order): void
    {
        $invoiceNumber = 'FAC-' . strtoupper(Str::random(8)) . '-' . $order->id;

        $invoice = Invoice::create([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'invoice_number' => $invoiceNumber,
            'subtotal' => $order->subtotal,
            'discount' => $order->discount,
            'total' => $order->total,
            'currency' => 'DZD',
            'status' => 'paid',
        ]);

        try {
            $pdf = Pdf::loadView('invoices.invoice', ['invoice' => $invoice]);
            $filename = "facture-{$invoice->invoice_number}.pdf";
            $path = "invoices/{$filename}";

            if (!is_dir(storage_path('app/invoices'))) {
                mkdir(storage_path('app/invoices'), 0755, true);
            }

            $pdf->save(storage_path("app/{$path}"));

            $invoice->update(['pdf_path' => $path]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning('Invoice PDF generation failed: ' . $e->getMessage());
        }
    }

    private function sendOrderEmails(Order $order): void
    {
        $user = $order->user;
        if (!$user || !$user->email) {
            return;
        }

        try {
            Mail::to($user->email)->send(new OrderConfirmation($order));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning('Order confirmation email failed: ' . $e->getMessage());
        }

        try {
            Mail::to($user->email)->send(new DownloadLinks($order));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::warning('Download links email failed: ' . $e->getMessage());
        }
    }

    private function processReferralCommission(Order $order): void
    {
        $referredBy = session('referred_by');
        if (!$referredBy || (int) $referredBy === $order->user_id) {
            return;
        }

        $affiliate = \App\Models\User::find($referredBy);
        if (!$affiliate || !$affiliate->referral_code) {
            return;
        }

        $rate = config('referral.commission_rate', 10);
        $products = $order->items()->with('product')->get();

        foreach ($products as $item) {
            $product = $item->product;
            if (!$product) continue;

            $commissionAmount = round($item->price * ($rate / 100), 2);
            if ($commissionAmount <= 0) continue;

            \App\Models\ReferralCommission::create([
                'order_id' => $order->id,
                'affiliate_id' => $affiliate->id,
                'product_id' => $product->id,
                'order_amount' => $item->price,
                'commission_rate' => $rate,
                'commission_amount' => $commissionAmount,
                'status' => 'pending',
            ]);
        }
    }

    public function getGateway(): PaymentGateway
    {
        return $this->gateway;
    }
}
