<?php

namespace App\Http\Controllers;

use App\Models\SellerMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerMessageController extends Controller
{
    public function storeFromAdmin(Request $request, int $sellerId)
    {
        $seller = User::where('role', 'seller')->findOrFail($sellerId);
        $sender = $request->user();

        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:2000',
        ]);

        SellerMessage::create([
            'seller_id' => $seller->id,
            'sender_id' => $sender?->id,
            'product_id' => null,
            'sender_name' => $sender?->name ?? 'Admin',
            'sender_email' => $sender?->email ?? 'admin@boutiquedigitaledz.dz',
            'sender_phone' => $sender?->phone ?? null,
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ]);

        return back()->with('toast', 'Message envoye au vendeur avec succes.');
    }

    public function index()
    {
        $seller = auth()->user();

        $messages = SellerMessage::with(['sender:id,name,email', 'product:id,name,slug'])
            ->where('seller_id', $seller->id)
            ->latest()
            ->get()
            ->map(fn ($message) => [
                'id' => $message->id,
                'sender_name' => $message->sender_name,
                'sender_email' => $message->sender_email,
                'sender_phone' => $message->sender_phone,
                'subject' => $message->subject,
                'message' => $message->message,
                'created_at' => $message->created_at?->format('d/m/Y H:i'),
                'is_read' => (bool) $message->read_at,
                'seller_reply' => $message->seller_reply,
                'seller_replied_at' => $message->seller_replied_at?->format('d/m/Y H:i'),
                'is_answered' => !empty($message->seller_reply),
                'is_from_admin' => $message->sender?->role === 'admin',
                'product' => $message->product ? [
                    'name' => $message->product->name,
                    'slug' => $message->product->slug,
                ] : null,
            ]);

        SellerMessage::where('seller_id', $seller->id)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return Inertia::render('Vendeur/Messages', [
            'messages' => $messages,
            'messageStats' => [
                'total' => $messages->count(),
                'today' => $messages->filter(fn ($message) => str_starts_with($message['created_at'], now()->format('d/m/Y')))->count(),
                'withPhone' => $messages->filter(fn ($message) => !empty($message['sender_phone']))->count(),
                'answered' => $messages->filter(fn ($message) => $message['is_answered'])->count(),
            ],
        ]);
    }

    public function reply(Request $request, int $messageId)
    {
        $seller = auth()->user();

        $validated = $request->validate([
            'seller_reply' => 'required|string|min:5|max:3000',
        ]);

        $message = SellerMessage::where('seller_id', $seller->id)->findOrFail($messageId);

        $message->update([
            'seller_reply' => $validated['seller_reply'],
            'seller_replied_at' => now(),
        ]);

        return back()->with('toast', 'Reponse envoyee avec succes.');
    }
}
