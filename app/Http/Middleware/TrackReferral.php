<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackReferral
{
    public function handle(Request $request, Closure $next): Response
    {
        $code = $request->input('ref') ?? $request->cookie('referral_code');

        if ($code) {
            $affiliate = User::where('referral_code', $code)->first();

            if ($affiliate && $affiliate->id !== $request->user()?->id) {
                session()->put('referred_by', $affiliate->id);
                session()->put('referral_code', $code);

                if (!$request->hasCookie('referral_code')) {
                    return $next($request)->withCookie(
                        cookie()->forever('referral_code', $code)
                    )->withCookie(
                        cookie()->forever('referred_by', $affiliate->id)
                    );
                }
            }
        }

        return $next($request);
    }
}
