<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('Checkout', [
            ...$this->cartSummary(),
            'prefill' => [
                'fullName' => $user?->name ?? '',
                'email' => $user?->email ?? '',
                'phone' => $user?->phone ?? '',
                'wilaya' => $user?->wilaya ?? '',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $summary = $this->cartSummary();

        if ($summary['cartItems']->isEmpty()) {
            return back()->with('toast', 'Votre panier est vide');
        }

        $validated = $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'wilaya' => 'required|string|max:255',
            'payment_method' => 'required|in:cib,baridimob,bank',
            'coupon_code' => 'nullable|string|max:50',
        ]);

        $products = $summary['products'];
        $subtotal = $summary['subtotal'];
        $discount = 0;

        if (!empty($validated['coupon_code'])) {
            $coupon = $this->validCoupon($validated['coupon_code']);

            if ($coupon) {
                $discount = round($subtotal * ($coupon->discount_percent / 100), 2);
                $coupon->increment('used_count');
            }
        }

        $total = max($subtotal - $discount, 0);
        $user = $request->user();

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'CMD-' . strtoupper(Str::random(8)),
            'status' => 'pending_payment',
            'subtotal' => $subtotal,
            'discount' => $discount,
            'total' => $total,
            'coupon_code' => $validated['coupon_code'] ?? null,
            'notes' => 'En attente de paiement via ' . $validated['payment_method'],
        ]);

        foreach ($products as $product) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'price' => $product->price,
            ]);
        }

        $paymentService = new PaymentService();
        $result = $paymentService->initiate($order, [
            'payment_method' => $validated['payment_method'],
        ]);

        return redirect()->to($result['redirect_url']);
    }

    public function validateCoupon(Request $request)
    {
        $request->validate(['code' => 'required|string|max:50']);
        $summary = $this->cartSummary();

        if ($summary['subtotal'] <= 0) {
            return response()->json([
                'valid' => false,
                'message' => 'Votre panier est vide',
            ]);
        }

        $coupon = $this->validCoupon($request->code);

        if (! $coupon) {
            return response()->json([
                'valid' => false,
                'message' => 'Code promo invalide ou expire',
            ]);
        }

        $discount = round($summary['subtotal'] * ($coupon->discount_percent / 100), 2);

        return response()->json([
            'valid' => true,
            'discount' => $discount,
            'message' => 'Code promo applique ! Reduction de ' . $coupon->discount_percent . '%',
        ]);
    }

    private function cartSummary(): array
    {
        $cart = session()->get('cart', []);
        $productIds = collect($cart)->pluck('product_id')->unique()->values();
        $products = Product::with('category')->whereIn('id', $productIds)->get()->keyBy('id');

        $cartItems = collect($cart)->map(function ($item) use ($products) {
            $product = $products->get($item['product_id']);

            if (! $product) {
                return null;
            }

            return [
                'id' => $product->id,
                'cartId' => $item['cart_id'],
                'name' => $product->name,
                'slug' => $product->slug,
                'category' => $product->category?->name ?? '',
                'price' => (int) $product->price,
                'image' => $this->productImage($product),
                'description' => $product->description ?? '',
                'product_type' => $product->product_type ?? 'digital',
                'is_free' => (bool) $product->is_free,
            ];
        })->filter()->values();

        return [
            'products' => $products,
            'cartItems' => $cartItems,
            'subtotal' => (int) $cartItems->sum('price'),
        ];
    }

    private function validCoupon(string $code): ?Coupon
    {
        $coupon = Coupon::where('code', strtoupper(trim($code)))
            ->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('expires_at')->orWhere('expires_at', '>', now());
            })
            ->first();

        if (! $coupon) {
            return null;
        }

        if ($coupon->usage_limit > 0 && $coupon->used_count >= $coupon->usage_limit) {
            return null;
        }

        return $coupon;
    }

    private function productImage(Product $product): string
    {
        $slugMap = [
            'guide-freelance-algerie' => 'guide-freelance',
            'pack-reussite-bac' => 'pack-bac',
            'templates-canva-pro' => 'canva-templates',
            'cv-moderne-algerie' => 'cv-modern',
            'business-plan-algerie' => 'business-plan',
            'marketing-digital-algerie' => 'marketing-digital',
            'ebook-productivite' => 'productivite',
            'pack-langues-etrangeres' => 'langues',
            'templates-instagram' => 'instagram',
            'lettre-motivation-pro' => 'lettre-motivation',
            'pack-factures-pro' => 'factures',
            'formation-canva-debutant' => 'canva-formation',
            'guide-ecommerce-algerie' => 'ecommerce',
            'pack-preparation-concours' => 'concours',
            'templates-linkedin' => 'linkedin',
            'portfolio-design-pro' => 'portfolio',
            'pack-contrat-travail' => 'contrat',
            'formation-seo-algerie' => 'seo',
            'ebook-bien-etre' => 'bien-etre',
            'pack-code-programmation' => 'code',
            'templates-tiktok' => 'tiktok',
            'pack-entretien-emploi' => 'entretien',
            'pack-comptabilite' => 'comptabilite',
            'formation-montage-video' => 'montage-video',
        ];

        $shortSlug = $slugMap[$product->slug] ?? $product->slug;
        $ext = in_array($product->slug, ['guide-freelance-algerie', 'pack-reussite-bac', 'templates-canva-pro', 'marketing-digital-algerie']) ? 'png' : 'svg';

        return '/images/products/' . $shortSlug . '.' . $ext;
    }
}
