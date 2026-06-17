<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class TwoFactorChallengeController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if (!$user || !$user->requiresTwoFactor()) {
            return redirect()->route('dashboard');
        }

        if ($request->session()->get('auth.2fa_passed') === true) {
            return redirect()->intended($this->destinationFor($user));
        }

        return Inertia::render('Auth/TwoFactorChallenge', [
            'email' => $user->email,
            'status' => session('status'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        $user = $request->user();

        if (!$user || !$user->requiresTwoFactor()) {
            return redirect()->route('dashboard');
        }

        if (!$user->two_factor_code || !$user->two_factor_expires_at || $user->two_factor_expires_at->isPast()) {
            return back()->withErrors([
                'code' => 'Le code a expire. Demandez un nouveau code.',
            ]);
        }

        if (!Hash::check($request->string('code')->toString(), $user->two_factor_code)) {
            return back()->withErrors([
                'code' => 'Le code de verification est invalide.',
            ]);
        }

        $user->forceFill([
            'two_factor_code' => null,
            'two_factor_expires_at' => null,
        ])->save();

        $request->session()->put('auth.2fa_passed', true);

        return redirect()->intended($this->destinationFor($user));
    }

    public function resend(Request $request): RedirectResponse
    {
        $user = $request->user();

        if (!$user || !$user->requiresTwoFactor()) {
            return redirect()->route('dashboard');
        }

        $user->sendTwoFactorCode();

        return back()->with('status', 'Un nouveau code a ete envoye par email.');
    }

    private function destinationFor($user): string
    {
        return match ($user->role) {
            'admin' => route('admin.dashboard', absolute: false),
            'seller' => route('vendeur.dashboard', absolute: false),
            default => route('dashboard', absolute: false),
        };
    }
}
