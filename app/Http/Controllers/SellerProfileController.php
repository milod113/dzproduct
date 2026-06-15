<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SellerProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Vendeur/Profile', [
            'seller' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'wilaya' => $user->wilaya,
                'bio' => $user->bio,
                'seller_since_label' => $user->seller_since?->translatedFormat('F Y'),
                'badges' => array_values(array_filter([
                    $user->is_verified_seller ? 'Verified Seller' : null,
                    $user->is_top_rated_seller ? 'Top Rated' : null,
                    $user->is_official_partner ? 'Official Partner' : null,
                ])),
                'seller_plan' => $user->seller_plan,
                'seller_plan_label' => $user->sellerPlanLabel(),
                'product_limit' => $user->sellerProductLimit(),
                'has_unlimited_products' => $user->hasUnlimitedProducts(),
                'has_priority_support' => $user->hasPrioritySupport(),
                'can_use_custom_whatsapp_cta' => $user->canUseCustomWhatsappCta(),
                'whatsapp_cta_text' => $user->whatsapp_cta_text,
                'is_available_for_freelance' => (bool) $user->is_available_for_freelance,
                'role' => $user->role,
                'public_url' => route('seller.profile', $user->id),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'wilaya' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:1200'],
            'whatsapp_cta_text' => ['nullable', 'string', 'max:100'],
            'is_available_for_freelance' => ['boolean'],
        ]);

        if ($validated['email'] !== $user->email) {
            $user->email_verified_at = null;
        }

        if (!$user->canUseCustomWhatsappCta()) {
            $validated['whatsapp_cta_text'] = null;
        }

        $validated['is_available_for_freelance'] = $request->boolean('is_available_for_freelance');

        $user->update($validated);

        return back()->with('toast', 'Profil vendeur mis a jour avec succes');
    }
}
