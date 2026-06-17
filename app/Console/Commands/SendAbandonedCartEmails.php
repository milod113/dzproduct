<?php

namespace App\Console\Commands;

use App\Mail\AbandonedCart;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendAbandonedCartEmails extends Command
{
    protected $signature = 'cart:send-abandoned-emails
        {--hours=2 : Nombre d heures depuis la derniere activite panier}
        {--dry-run : Simuler sans envoyer}';

    protected $description = 'Envoyer des emails de relance aux utilisateurs avec un panier abandonne';

    public function handle()
    {
        $hours = (int) $this->option('hours');
        $dryRun = $this->option('dry-run');
        $cutoff = Carbon::now()->subHours($hours);
        $sent = 0;
        $skipped = 0;

        $users = User::whereNotNull('last_cart_activity_at')
            ->where('last_cart_activity_at', '<', $cutoff)
            ->whereDoesntHave('orders', function ($q) use ($cutoff) {
                $q->where('created_at', '>', $cutoff);
            })
            ->get();

        foreach ($users as $user) {
            $cart = session()->get('cart', []);

            $cartData = $this->buildCartData($user);
            if (empty($cartData['items'])) {
                $user->update(['last_cart_activity_at' => null]);
                $skipped++;
                continue;
            }

            if ($dryRun) {
                $this->line("[DRY-RUN] {$user->email} - {$cartData['item_count']} article(s)");
                $sent++;
                continue;
            }

            try {
                Mail::to($user->email)->send(new AbandonedCart(
                    $cartData,
                    $user->name ?? 'Client',
                    $user->email,
                ));
                $user->update(['last_cart_activity_at' => Carbon::now()]);
                $sent++;
                $this->line("Envoye a {$user->email} ({$cartData['item_count']} article(s))");
            } catch (\Exception $e) {
                $this->error("Erreur pour {$user->email}: {$e->getMessage()}");
            }
        }

        $this->info("Termine. {$sent} email(s) traite(s), {$skipped} ignore(s).");
    }

    private function buildCartData(User $user): array
    {
        $cart = session()->get('cart', []);
        if (empty($cart)) {
            $cart = $this->staleSessionCart($user);
        }

        $productIds = collect($cart)->pluck('product_id')->unique();
        $products = Product::with('category')
            ->whereIn('id', $productIds)
            ->get()
            ->keyBy('id');

        $items = collect($cart)->map(function ($item) use ($products) {
            $product = $products->get($item['product_id']);
            if (!$product) return null;

            return [
                'name' => $product->name,
                'price' => (int) $product->price,
                'category' => $product->category?->name ?? '',
                'image' => url('/images/products/' . ($product->slug) . '.svg'),
                'product_id' => $product->id,
            ];
        })->filter()->values()->toArray();

        return [
            'items' => $items,
            'item_count' => count($items),
            'subtotal' => collect($items)->sum('price'),
            'shop_url' => route('shop'),
        ];
    }

    private function staleSessionCart(User $user): array
    {
        $sessions = \DB::table('sessions')
            ->where('user_id', $user->id)
            ->orderBy('last_activity', 'desc')
            ->limit(5)
            ->get();

        foreach ($sessions as $session) {
            $payload = @unserialize(base64_decode($session->payload));
            if ($payload && isset($payload['cart'])) {
                return $payload['cart'];
            }
        }

        return [];
    }
}
