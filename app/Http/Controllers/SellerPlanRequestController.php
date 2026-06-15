<?php

namespace App\Http\Controllers;

use App\Models\SellerPlanRequest;
use App\Models\User;
use App\Notifications\SellerPlanExpiringNotification;
use App\Notifications\SellerPlanRequestReviewedNotification;
use App\Notifications\SellerPlanRequestSubmittedNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerPlanRequestController extends Controller
{
    private const PLAN_PRICES = [
        User::SELLER_PLAN_STARTER => 0,
        User::SELLER_PLAN_PRO => 3500,
        User::SELLER_PLAN_ELITE => 7900,
    ];

    private const PLAN_DURATIONS = [
        User::SELLER_PLAN_STARTER => 0,
        User::SELLER_PLAN_PRO => 30,
        User::SELLER_PLAN_ELITE => 30,
    ];

    public function sellerIndex(Request $request)
    {
        $seller = $request->user();
        $this->expireSellerPlanIfNeeded($seller);
        $this->expireStaleRequests($seller->id);

        $requests = SellerPlanRequest::where('seller_id', $seller->id)
            ->latest()
            ->get()
            ->map(fn (SellerPlanRequest $planRequest) => $this->formatPlanRequest($planRequest))
            ->values();

        return Inertia::render('Vendeur/Plans', [
            'currentPlan' => [
                'key' => $seller->seller_plan,
                'label' => $seller->sellerPlanLabel(),
                'product_limit' => $seller->sellerProductLimit(),
                'has_unlimited_products' => $seller->hasUnlimitedProducts(),
                'has_priority_support' => $seller->hasPrioritySupport(),
                'can_use_custom_whatsapp_cta' => $seller->canUseCustomWhatsappCta(),
                'started_at' => $seller->seller_plan_started_at?->format('Y-m-d'),
                'expires_at' => $seller->seller_plan_expires_at?->format('Y-m-d'),
            ],
            'plans' => $this->planCatalog(),
            'requests' => $requests,
            'hasPendingRequest' => $requests->contains(fn ($item) => in_array($item['payment_status'], [SellerPlanRequest::PAYMENT_PENDING, SellerPlanRequest::PAYMENT_PAID], true)),
        ]);
    }

    public function sellerStore(Request $request)
    {
        $seller = $request->user();

        $validated = $request->validate([
            'requested_plan' => 'required|in:pro,elite',
            'payment_method' => 'required|string|max:100',
            'payment_reference' => 'nullable|string|max:255',
            'payment_proof' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:4096',
            'seller_note' => 'nullable|string|max:1200',
        ]);

        if ($seller->seller_plan === $validated['requested_plan']) {
            return back()->withErrors([
                'requested_plan' => 'Vous utilisez deja ce plan.',
            ]);
        }

        if (SellerPlanRequest::where('seller_id', $seller->id)->where('status', SellerPlanRequest::STATUS_PENDING)->exists()) {
            return back()->withErrors([
                'requested_plan' => 'Une demande est deja en attente de validation.',
            ]);
        }

        $paymentProofPath = $request->hasFile('payment_proof')
            ? $request->file('payment_proof')->store('seller-plan-proofs', 'public')
            : null;

        $planRequest = SellerPlanRequest::create([
            'seller_id' => $seller->id,
            'current_plan' => $seller->seller_plan,
            'requested_plan' => $validated['requested_plan'],
            'plan_price' => $this->planPrice($validated['requested_plan']),
            'currency' => 'DZD',
            'payment_method' => $validated['payment_method'],
            'payment_reference' => $validated['payment_reference'] ?? null,
            'payment_proof' => $paymentProofPath,
            'paid_at' => $paymentProofPath || !empty($validated['payment_reference']) ? now() : null,
            'seller_note' => $validated['seller_note'] ?? null,
            'status' => SellerPlanRequest::STATUS_PENDING,
            'payment_status' => $paymentProofPath || !empty($validated['payment_reference'])
                ? SellerPlanRequest::PAYMENT_PAID
                : SellerPlanRequest::PAYMENT_PENDING,
            'expires_at' => now()->addDays(7),
        ]);

        User::where('role', 'admin')->get()->each(
            fn (User $admin) => $admin->notify(new SellerPlanRequestSubmittedNotification($planRequest->load('seller')))
        );

        return redirect()->route('vendeur.plans')->with('toast', 'Votre demande d upgrade a ete enregistree. Elle attend maintenant la validation du paiement.');
    }

    public function adminIndex()
    {
        $this->expireStaleRequests();
        $this->expireActiveSellerPlans();

        $requests = SellerPlanRequest::with(['seller:id,name,email,phone,wilaya,seller_plan', 'reviewer:id,name'])
            ->latest()
            ->get()
            ->map(fn (SellerPlanRequest $planRequest) => $this->formatPlanRequest($planRequest, true))
            ->values();

        return Inertia::render('Admin/SellerPlanRequests', [
            'requests' => $requests,
            'stats' => [
                'total' => $requests->count(),
                'pending' => $requests->where('status', SellerPlanRequest::STATUS_PENDING)->count(),
                'approved' => $requests->where('status', SellerPlanRequest::STATUS_APPROVED)->count(),
                'rejected' => $requests->where('status', SellerPlanRequest::STATUS_REJECTED)->count(),
                'expired' => $requests->where('status', SellerPlanRequest::STATUS_EXPIRED)->count(),
            ],
        ]);
    }

    public function approve(Request $request, int $id)
    {
        $validated = $request->validate([
            'admin_note' => 'nullable|string|max:1200',
        ]);

        $planRequest = SellerPlanRequest::with('seller')->findOrFail($id);

        if ($planRequest->status !== SellerPlanRequest::STATUS_PENDING || $planRequest->payment_status !== SellerPlanRequest::PAYMENT_PAID) {
            return back()->with('toast', 'Cette demande a deja ete traitee.');
        }

        $seller = $planRequest->seller;
        $durationDays = $this->planDuration($planRequest->requested_plan);

        $seller->update([
            'seller_plan' => $planRequest->requested_plan,
            'seller_plan_started_at' => now(),
            'seller_plan_expires_at' => $durationDays > 0 ? now()->addDays($durationDays) : null,
            'is_verified_seller' => in_array($planRequest->requested_plan, [User::SELLER_PLAN_PRO, User::SELLER_PLAN_ELITE], true)
                ? true
                : $seller->is_verified_seller,
            'whatsapp_cta_text' => $planRequest->requested_plan === User::SELLER_PLAN_ELITE
                ? ($seller->whatsapp_cta_text ?: 'Achat Instantane')
                : null,
        ]);

        $planRequest->update([
            'status' => SellerPlanRequest::STATUS_APPROVED,
            'payment_status' => SellerPlanRequest::PAYMENT_APPROVED,
            'admin_note' => $validated['admin_note'] ?? null,
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id,
            'expires_at' => $durationDays > 0 ? now()->addDays($durationDays) : null,
        ]);

        $seller->notify(new SellerPlanRequestReviewedNotification($planRequest));

        return redirect()->route('admin.seller-plan-requests')->with('toast', 'Le plan vendeur a ete active avec succes.');
    }

    public function reject(Request $request, int $id)
    {
        $validated = $request->validate([
            'admin_note' => 'required|string|max:1200',
        ]);

        $planRequest = SellerPlanRequest::findOrFail($id);

        if ($planRequest->status !== SellerPlanRequest::STATUS_PENDING) {
            return back()->with('toast', 'Cette demande a deja ete traitee.');
        }

        $planRequest->update([
            'status' => SellerPlanRequest::STATUS_REJECTED,
            'admin_note' => $validated['admin_note'],
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id,
        ]);

        $planRequest->seller?->notify(new SellerPlanRequestReviewedNotification($planRequest));

        return redirect()->route('admin.seller-plan-requests')->with('toast', 'La demande a ete refusee.');
    }

    private function planCatalog(): array
    {
        return [
            [
                'key' => User::SELLER_PLAN_STARTER,
                'label' => 'Starter',
                'price' => 'Gratuit',
                'price_value' => 0,
                'currency' => 'DZD',
                'billing' => 'Sans abonnement',
                'accent' => 'from-slate-900 via-slate-700 to-slate-500',
                'features' => [
                    'Maximum 3 produits en vitrine',
                    'Coordonnees standards',
                    'Ideal pour demarrer sans risque',
                ],
            ],
            [
                'key' => User::SELLER_PLAN_PRO,
                'label' => 'Pro',
                'price' => '3 500 DZD / mois',
                'price_value' => 3500,
                'currency' => 'DZD',
                'billing' => 'Facturation mensuelle',
                'accent' => 'from-emerald-700 via-emerald-500 to-lime-400',
                'features' => [
                    'Produits illimites',
                    'Badge Vendeur Verifie',
                    'Statistiques de visites produits',
                    'Mise en avant moderee dans la recherche',
                ],
            ],
            [
                'key' => User::SELLER_PLAN_ELITE,
                'label' => 'Elite',
                'price' => '7 900 DZD / mois',
                'price_value' => 7900,
                'currency' => 'DZD',
                'billing' => 'Facturation mensuelle',
                'accent' => 'from-amber-600 via-orange-500 to-rose-500',
                'features' => [
                    'Tout le plan Pro',
                    'Carousel publicitaire page accueil',
                    'Support prioritaire',
                    'Bouton WhatsApp personnalise Achat Instantane',
                ],
            ],
        ];
    }

    private function formatPlanRequest(SellerPlanRequest $planRequest, bool $includeSeller = false): array
    {
        return [
            'id' => $planRequest->id,
            'current_plan' => $planRequest->current_plan,
            'current_plan_label' => $this->planLabel($planRequest->current_plan),
            'requested_plan' => $planRequest->requested_plan,
            'requested_plan_label' => $this->planLabel($planRequest->requested_plan),
            'plan_price' => $planRequest->plan_price,
            'plan_price_label' => number_format($planRequest->plan_price, 0, ',', ' ') . ' ' . $planRequest->currency,
            'currency' => $planRequest->currency,
            'payment_method' => $planRequest->payment_method,
            'payment_reference' => $planRequest->payment_reference,
            'payment_proof_url' => $planRequest->payment_proof ? asset('storage/' . $planRequest->payment_proof) : null,
            'seller_note' => $planRequest->seller_note,
            'status' => $planRequest->status,
            'status_label' => match ($planRequest->status) {
                SellerPlanRequest::STATUS_APPROVED => 'Approuvee',
                SellerPlanRequest::STATUS_REJECTED => 'Refusee',
                SellerPlanRequest::STATUS_EXPIRED => 'Expiree',
                default => 'En attente',
            },
            'payment_status' => $planRequest->payment_status,
            'payment_status_label' => match ($planRequest->payment_status) {
                SellerPlanRequest::PAYMENT_PAID => 'Paiement recu',
                SellerPlanRequest::PAYMENT_APPROVED => 'Paiement valide',
                SellerPlanRequest::PAYMENT_EXPIRED => 'Paiement expire',
                default => 'En attente de paiement',
            },
            'admin_note' => $planRequest->admin_note,
            'paid_at' => $planRequest->paid_at?->format('Y-m-d H:i'),
            'reviewed_at' => $planRequest->reviewed_at?->format('Y-m-d H:i'),
            'created_at' => $planRequest->created_at?->format('Y-m-d H:i'),
            'expires_at' => $planRequest->expires_at?->format('Y-m-d H:i'),
            'reviewer_name' => $planRequest->reviewer?->name,
            'seller' => $includeSeller ? [
                'id' => $planRequest->seller?->id,
                'name' => $planRequest->seller?->name,
                'email' => $planRequest->seller?->email,
                'phone' => $planRequest->seller?->phone,
                'wilaya' => $planRequest->seller?->wilaya,
                'seller_plan' => $planRequest->seller?->seller_plan,
            ] : null,
        ];
    }

    private function planLabel(string $plan): string
    {
        return match ($plan) {
            User::SELLER_PLAN_PRO => 'Pro',
            User::SELLER_PLAN_ELITE => 'Elite',
            default => 'Starter',
        };
    }

    private function planPrice(string $plan): int
    {
        return self::PLAN_PRICES[$plan] ?? 0;
    }

    private function planDuration(string $plan): int
    {
        return self::PLAN_DURATIONS[$plan] ?? 0;
    }

    private function expireStaleRequests(?int $sellerId = null): void
    {
        $query = SellerPlanRequest::query()
            ->where('status', SellerPlanRequest::STATUS_PENDING)
            ->whereIn('payment_status', [SellerPlanRequest::PAYMENT_PENDING, SellerPlanRequest::PAYMENT_PAID])
            ->whereNotNull('expires_at')
            ->where('expires_at', '<', now());

        if ($sellerId) {
            $query->where('seller_id', $sellerId);
        }

        $query->update([
            'status' => SellerPlanRequest::STATUS_EXPIRED,
            'payment_status' => SellerPlanRequest::PAYMENT_EXPIRED,
        ]);
    }

    private function expireActiveSellerPlans(): void
    {
        $expiringSellers = User::whereIn('seller_plan', [User::SELLER_PLAN_PRO, User::SELLER_PLAN_ELITE])
            ->whereNotNull('seller_plan_expires_at')
            ->whereDate('seller_plan_expires_at', '>=', now())
            ->whereDate('seller_plan_expires_at', '<=', now()->addDays(3))
            ->get();

        foreach ($expiringSellers as $seller) {
            $this->notifyIfPlanExpiring($seller);
        }

        User::whereIn('seller_plan', [User::SELLER_PLAN_PRO, User::SELLER_PLAN_ELITE])
            ->whereNotNull('seller_plan_expires_at')
            ->where('seller_plan_expires_at', '<', now())
            ->update([
                'seller_plan' => User::SELLER_PLAN_STARTER,
                'seller_plan_started_at' => null,
                'seller_plan_expires_at' => null,
                'whatsapp_cta_text' => null,
            ]);
    }

    private function expireSellerPlanIfNeeded(User $seller): void
    {
        if (!$seller->seller_plan_expires_at || $seller->seller_plan_expires_at->isFuture()) {
            return;
        }

        $seller->update([
            'seller_plan' => User::SELLER_PLAN_STARTER,
            'seller_plan_started_at' => null,
            'seller_plan_expires_at' => null,
            'whatsapp_cta_text' => null,
        ]);

        $seller->refresh();
    }

    private function notifyIfPlanExpiring(User $seller): void
    {
        if (!$seller->seller_plan_expires_at) {
            return;
        }

        $daysLeft = max(0, now()->diffInDays($seller->seller_plan_expires_at, false));
        $expiresAt = $seller->seller_plan_expires_at->format('Y-m-d');

        $alreadySent = $seller->notifications()
            ->where('type', SellerPlanExpiringNotification::class)
            ->where('data->expires_at', $expiresAt)
            ->exists();

        if ($alreadySent) {
            return;
        }

        $seller->notify(new SellerPlanExpiringNotification(
            $seller->sellerPlanLabel(),
            $expiresAt,
            $daysLeft
        ));
    }
}
