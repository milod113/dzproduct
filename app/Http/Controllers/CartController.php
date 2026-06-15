<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        $productIds = collect($cart)->pluck('product_id');
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        $items = collect($cart)->map(function ($item) use ($products) {
            $p = $products->get($item['product_id']);
            if (!$p) return null;
            $slugMap = $this->slugMap();
            $shortSlug = $slugMap[$p->slug] ?? $p->slug;
            $ext = in_array($p->slug, ['guide-freelance-algerie', 'pack-reussite-bac', 'templates-canva-pro', 'marketing-digital-algerie']) ? 'png' : 'svg';
            return [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'category' => $p->category?->name ?? '',
                'price' => (int) $p->price,
                'image' => '/images/products/' . $shortSlug . '.' . $ext,
                'description' => $p->description ?? '',
                'product_type' => $p->product_type ?? 'digital',
                'cartId' => $item['cart_id'],
            ];
        })->filter()->values();

        $subtotal = $items->sum('price');

        return Inertia::render('Cart', [
            'cartItems' => $items,
            'subtotal' => $subtotal,
        ]);
    }

    public function add(Request $request)
    {
        $request->validate(['product_id' => 'required|exists:products,id']);
        $cart = session()->get('cart', []);

        $exists = collect($cart)->firstWhere('product_id', $request->product_id);
        if ($exists) {
            return back()->with('toast', 'Ce produit est déjà dans votre panier');
        }

        $cart[] = [
            'cart_id' => uniqid(),
            'product_id' => (int) $request->product_id,
        ];

        session()->put('cart', $cart);
        return back()->with('toast', 'Produit ajouté au panier');
    }

    public function remove($cartId)
    {
        $cart = session()->get('cart', []);
        $cart = array_values(array_filter($cart, fn ($item) => $item['cart_id'] !== $cartId));
        session()->put('cart', $cart);
        return back()->with('toast', 'Produit retiré du panier');
    }

    private function slugMap()
    {
        return [
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
    }
}
