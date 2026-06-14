<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SellerMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || (!$user->is_admin && !$user->products()->exists())) {
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}
