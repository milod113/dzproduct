<?php

namespace App\Http\Controllers;

use App\Models\ReferralCommission;
use App\Models\User;
use App\Models\WithdrawalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    private const MINIMUM_WITHDRAWAL = 1000;

    public function dashboard()
    {
        $user = auth()->user();

        if (!$user->referral_code) {
            $user->forceFill([
                'referral_code' => User::generateReferralCode(),
            ])->save();
            $user->refresh();
        }

        $commissions = ReferralCommission::with('order', 'product')
            ->where('affiliate_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        $withdrawalRequests = WithdrawalRequest::where('user_id', $user->id)
            ->latest()
            ->get();

        $stats = [
            'pending' => $commissions->where('status', 'pending')->sum('commission_amount'),
            'approved' => $commissions->where('status', 'approved')->sum('commission_amount'),
            'paid' => $commissions->where('status', 'paid')->sum('commission_amount'),
            'total_earned' => $commissions->whereIn('status', ['approved', 'paid'])->sum('commission_amount'),
            'total_sales' => $commissions->count(),
            'balance' => (float) $user->referral_balance,
        ];

        $referralUrl = url('/?ref=' . $user->referral_code);

        return Inertia::render('AffiliateDashboard', [
            'commissions' => $commissions->map(fn ($c) => [
                'id' => $c->id,
                'product_name' => $c->product?->name ?? 'Produit',
                'order_number' => $c->order?->order_number ?? 'N/A',
                'order_amount' => (int) $c->order_amount,
                'commission_rate' => $c->commission_rate,
                'commission_amount' => (int) $c->commission_amount,
                'status' => $c->status,
                'created_at' => $c->created_at->format('d/m/Y'),
                'paid_at' => $c->paid_at?->format('d/m/Y'),
            ]),
            'stats' => $stats,
            'referralUrl' => $referralUrl,
            'referralCode' => $user->referral_code,
            'minimumWithdrawal' => self::MINIMUM_WITHDRAWAL,
            'withdrawalRequests' => $withdrawalRequests->map(fn ($request) => [
                'id' => $request->id,
                'amount' => (float) $request->amount,
                'payment_method' => $request->payment_method,
                'account_info' => $request->account_info,
                'notes' => $request->notes,
                'status' => $request->status,
                'admin_notes' => $request->admin_notes,
                'created_at' => $request->created_at->format('d/m/Y'),
                'processed_at' => $request->processed_at?->format('d/m/Y'),
            ]),
        ]);
    }

    public function generateCode()
    {
        $user = auth()->user();

        if (!$user->referral_code) {
            $user->update(['referral_code' => $this->generateUniqueCode()]);
        }

        return back()->with('toast', 'Votre lien d\'affiliation est pret');
    }

    public function requestWithdrawal(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'amount' => 'required|numeric|min:' . self::MINIMUM_WITHDRAWAL,
            'payment_method' => 'required|in:ccp,baridimob,bank_transfer',
            'account_info' => 'required|string|max:1000',
            'notes' => 'nullable|string|max:1000',
        ]);

        $amount = (float) $validated['amount'];
        $availableBalance = (float) $user->referral_balance;

        if ($amount > $availableBalance) {
            return back()->withErrors([
                'amount' => 'Le montant demande depasse votre solde disponible.',
            ]);
        }

        WithdrawalRequest::create([
            'user_id' => $user->id,
            'amount' => $amount,
            'payment_method' => $validated['payment_method'],
            'account_info' => $validated['account_info'],
            'notes' => $validated['notes'] ?? null,
            'status' => WithdrawalRequest::STATUS_PENDING,
        ]);

        $user->forceFill([
            'referral_balance' => max(0, $availableBalance - $amount),
        ])->save();

        return back()->with('toast', 'Votre demande de retrait a ete envoyee a l\'admin.');
    }

    public static function generateUniqueCode(): string
    {
        do {
            $code = 'REF-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
        } while (User::where('referral_code', $code)->exists());

        return $code;
    }
}
