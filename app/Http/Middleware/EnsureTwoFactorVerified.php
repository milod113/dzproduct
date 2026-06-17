<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTwoFactorVerified
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->requiresTwoFactor()) {
            return $next($request);
        }

        if ($request->session()->get('auth.2fa_passed') === true) {
            return $next($request);
        }

        return redirect()->route('two-factor.challenge');
    }
}
