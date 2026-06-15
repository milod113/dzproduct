<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function markAllRead(Request $request)
    {
        $request->user()?->unreadNotifications->markAsRead();

        return back()->with('toast', 'Notifications marquees comme lues.');
    }

    public function markRead(Request $request, string $id)
    {
        $notification = $request->user()?->notifications()->where('id', $id)->firstOrFail();

        if (!$notification->read_at) {
            $notification->markAsRead();
        }

        return back();
    }
}
