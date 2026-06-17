<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ServiceMission;
use App\Models\ServiceMissionMessage;
use App\Notifications\ServiceMissionNotification;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentCallbackController extends Controller
{
    /**
     * Show the simulated payment form.
     */
    public function simulatedForm(Request $request)
    {
        $pending = session('pending_payment');

        if (!$pending || $pending['transaction_id'] !== $request->transaction_id) {
            return redirect()->route('cart')->with('toast', 'Session de paiement expiree');
        }

        $order = Order::with('items.product.seller')->findOrFail($pending['order_id']);

        return Inertia::render('PaymentSimulated', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'total' => (int) $order->total,
            ],
            'transaction_id' => $request->transaction_id,
        ]);
    }

    /**
     * Process the simulated payment (user clicks "Confirm").
     */
    public function simulatedConfirm(Request $request)
    {
        $pending = session('pending_payment');

        if (!$pending || $pending['transaction_id'] !== $request->transaction_id) {
            return redirect()->route('cart')->with('toast', 'Session de paiement expiree');
        }

        $paymentService = new PaymentService();

        try {
            $order = $paymentService->processReturn([
                'transaction_id' => $request->transaction_id,
                'status' => $request->input('status', 'success'),
            ]);

            $this->handlePostPaymentServices($order);

            session()->forget('pending_payment');

            if ($order->status === 'completed') {
                return redirect()->route('order.success')
                    ->with('toast', 'Paiement confirme ! Commande completee.');
            }

            return redirect()->route('checkout')
                ->with('toast', 'Paiement echoue. Veuillez reessayer.');
        } catch (\Exception $e) {
            return redirect()->route('checkout')
                ->with('toast', 'Erreur de paiement: ' . $e->getMessage());
        }
    }

    /**
     * Handle API callback from payment gateway.
     */
    public function callback(Request $request)
    {
        $paymentService = new PaymentService();
        $order = $paymentService->processCallback($request->all());
        $this->handlePostPaymentServices($order);

        return response()->json(['status' => 'ok']);
    }

    /**
     * User returns from payment gateway.
     */
    public function returnCallback(Request $request)
    {
        $paymentService = new PaymentService();

        try {
            $order = $paymentService->processReturn($request->all());
            $this->handlePostPaymentServices($order);

            if ($order->status === 'completed') {
                return redirect()->route('order.success')
                    ->with('toast', 'Paiement confirme !');
            }

            return redirect()->route('checkout')
                ->with('toast', 'Le paiement n\'a pas abouti. Veuillez reessayer.');
        } catch (\Exception $e) {
            return redirect()->route('checkout')
                ->with('toast', 'Erreur: ' . $e->getMessage());
        }
    }

    /**
     * User cancelled payment.
     */
    public function cancel(Request $request)
    {
        $pending = session('pending_payment');

        if ($pending && isset($pending['order_id'])) {
            Order::where('id', $pending['order_id'])
                ->where('status', 'pending_payment')
                ->update(['status' => 'cancelled']);
        }

        session()->forget('pending_payment');

        return redirect()->route('checkout')
            ->with('toast', 'Paiement annule.');
    }

    /**
     * Create service missions and notifications after successful payment.
     */
    private function handlePostPaymentServices(Order $order): void
    {
        if ($order->status !== 'completed') {
            return;
        }

        foreach ($order->items as $item) {
            $product = $item->product;

            if (!$product || $product->product_type === 'digital') {
                continue;
            }

            $mission = ServiceMission::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'client_id' => $order->user_id,
                'seller_id' => $product->seller_id,
                'mission_number' => 'MIS-' . strtoupper(\Illuminate\Support\Str::random(8)),
                'status' => ServiceMission::STATUS_RESERVED,
            ]);

            ServiceMissionMessage::create([
                'service_mission_id' => $mission->id,
                'sender_id' => null,
                'message_type' => 'system',
                'message' => 'Mission reservee apres confirmation du paiement. Le client doit maintenant soumettre son brief.',
            ]);

            ServiceMissionMessage::create([
                'service_mission_id' => $mission->id,
                'sender_id' => null,
                'message_type' => 'system',
                'message' => 'Le vendeur a ete notifie et pourra prendre en charge la mission apres reception du brief.',
            ]);

            $order->user?->notify(new ServiceMissionNotification(
                $mission,
                'Service reserve avec succes',
                "Votre mission {$mission->mission_number} est creee. Completez maintenant le brief pour demarrer.",
                route('client.services.show', $mission->id)
            ));

            $product->seller?->notify(new ServiceMissionNotification(
                $mission,
                'Nouveau service reserve',
                "Une nouvelle mission {$mission->mission_number} a ete reservee pour {$product->name}.",
                route('vendeur.services.show', $mission->id)
            ));
        }
    }
}
