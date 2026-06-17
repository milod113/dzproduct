<?php

namespace App\Services\Gateways;

use App\Contracts\PaymentGateway;
use App\Models\Order;
use Illuminate\Support\Str;

class SimulatedGateway implements PaymentGateway
{
    public function __construct(
        protected array $config = []
    ) {}

    public function initiatePayment(Order $order, array $options = []): array
    {
        $transactionId = 'SIM-' . strtoupper(Str::random(16));

        session()->put('pending_payment', [
            'order_id' => $order->id,
            'transaction_id' => $transactionId,
            'amount' => $order->total,
            'gateway' => 'simulated',
        ]);

        $returnUrl = route('payment.return', [
            'transaction_id' => $transactionId,
            'order_id' => $order->id,
        ]);

        return [
            'redirect_url' => route('payment.simulated.form', [
                'transaction_id' => $transactionId,
                'order_id' => $order->id,
            ]),
            'transaction_id' => $transactionId,
            'html_form' => null,
        ];
    }

    public function verifyPayment(array $requestData): array
    {
        $transactionId = $requestData['transaction_id'] ?? null;
        $status = $requestData['status'] ?? 'completed';

        return [
            'status' => $status === 'success' ? 'completed' : 'failed',
            'transaction_id' => $transactionId,
            'gateway_data' => $requestData,
        ];
    }

    public function processReturn(array $requestData): array
    {
        return $this->verifyPayment($requestData);
    }

    public function getName(): string
    {
        return 'Paiement simule';
    }

    public function getKey(): string
    {
        return 'simulated';
    }

    public function isTestMode(): bool
    {
        return true;
    }
}
