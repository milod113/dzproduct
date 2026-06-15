<?php

namespace App\Http\Middleware;

use App\Models\SellerMessage;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $unreadSellerMessages = 0;
        $wishlistCount = 0;
        $notifications = collect();

        if ($user?->role === 'seller') {
            $unreadSellerMessages = SellerMessage::where('seller_id', $user->id)
                ->whereNull('read_at')
                ->count();
        }

        if ($user) {
            $wishlistCount = Wishlist::where('user_id', $user->id)->count();
            $notifications = $user->notifications()
                ->latest()
                ->limit(8)
                ->get()
                ->map(fn ($notification) => [
                    'id' => $notification->id,
                    'title' => $notification->data['title'] ?? 'Notification',
                    'message' => $notification->data['message'] ?? '',
                    'action_url' => $notification->data['action_url'] ?? null,
                    'kind' => $notification->data['kind'] ?? 'generic',
                    'read_at' => $notification->read_at?->toDateTimeString(),
                    'created_at' => $notification->created_at?->format('Y-m-d H:i'),
                ])
                ->values();
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    ...$user->toArray(),
                    'is_admin' => $user->isAdmin(),
                    'is_seller' => $user->isSeller(),
                    'is_client' => $user->isClient(),
                ] : null,
            ],
            'sellerInbox' => [
                'unreadCount' => $unreadSellerMessages,
            ],
            'wishlist' => [
                'count' => $wishlistCount,
            ],
            'cart' => [
                'count' => count($request->session()->get('cart', [])),
            ],
            'notifications' => [
                'items' => $notifications,
                'unreadCount' => $user ? $user->unreadNotifications()->count() : 0,
            ],
        ];
    }
}
