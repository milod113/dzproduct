<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RefundRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RefundRequestController extends Controller
{
    public function store(Request $request, int $orderId): RedirectResponse
    {
        $user = $request->user();

        $order = Order::with(['refundRequest', 'downloads'])
            ->where('user_id', $user->id)
            ->findOrFail($orderId);

        if ($order->refundRequest) {
            return back()->withErrors([
                'refund' => 'Une demande de remboursement existe deja pour cette commande.',
            ]);
        }

        if (!in_array($order->status, ['completed', 'paid'], true)) {
            return back()->withErrors([
                'refund' => 'Seules les commandes finalisees peuvent faire l objet d un remboursement.',
            ]);
        }

        $validated = $request->validate([
            'reason' => 'required|string|in:technical_issue,wrong_product,duplicate_order,service_not_delivered,other',
            'details' => 'nullable|string|max:1500',
        ]);

        DB::transaction(function () use ($order, $user, $validated) {
            RefundRequest::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'amount' => $order->total,
                'reason' => $validated['reason'],
                'details' => $validated['details'] ?? null,
                'status' => RefundRequest::STATUS_PENDING,
            ]);

            $order->update([
                'status' => 'refund_pending',
            ]);
        });

        return back()->with('toast', 'Votre demande de remboursement a ete envoyee.');
    }
}
