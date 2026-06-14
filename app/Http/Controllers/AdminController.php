<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function products()
    {
        $products = Product::with(['category', 'seller'])->orderBy('created_at', 'desc')->get()->map(fn ($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'category' => $p->category?->name ?? '',
            'category_id' => $p->category_id,
            'seller_id' => $p->seller_id,
            'seller_name' => $p->seller?->name ?? 'Aucun vendeur',
            'price' => (int) $p->price,
            'sales' => $p->sales_count,
            'rating' => (float) $p->rating_avg,
            'is_active' => $p->is_active,
            'description' => $p->description ?? '',
            'file_path' => $p->file_path,
            'file_type' => $p->file_type,
            'seller_badges' => $this->formatSellerBadges($p->seller),
        ]);
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Admin/Products', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function productCreate()
    {
        $categories = Category::orderBy('name')->get();
        return Inertia::render('Admin/ProductForm', [
            'product' => null,
            'categories' => $categories,
            'sellers' => $this->sellerOptions(),
        ]);
    }

    public function productStore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'seller_id' => 'nullable|exists:users,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'is_verified_seller' => 'boolean',
            'is_top_rated_seller' => 'boolean',
            'is_official_partner' => 'boolean',
        ]);

        $slug = Str::slug($validated['name']);

        Product::create([
            'category_id' => $validated['category_id'],
            'seller_id' => $validated['seller_id'] ?? null,
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $this->syncSellerBadges($validated);

        return redirect()->route('admin.products')->with('toast', 'Produit créé avec succès');
    }

    public function productEdit($id)
    {
        $product = Product::with(['category', 'seller'])->findOrFail($id);
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Admin/ProductForm', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'category_id' => $product->category_id,
                'seller_id' => $product->seller_id,
                'price' => (int) $product->price,
                'description' => $product->description ?? '',
                'is_active' => $product->is_active,
                'file_path' => $product->file_path,
                'file_type' => $product->file_type,
                'is_verified_seller' => (bool) $product->seller?->is_verified_seller,
                'is_top_rated_seller' => (bool) $product->seller?->is_top_rated_seller,
                'is_official_partner' => (bool) $product->seller?->is_official_partner,
            ],
            'categories' => $categories,
            'sellers' => $this->sellerOptions(),
        ]);
    }

    public function productUpdate(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'seller_id' => 'nullable|exists:users,id',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'is_verified_seller' => 'boolean',
            'is_top_rated_seller' => 'boolean',
            'is_official_partner' => 'boolean',
        ]);

        $product->update([
            'category_id' => $validated['category_id'],
            'seller_id' => $validated['seller_id'] ?? null,
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $this->syncSellerBadges($validated);

        return redirect()->route('admin.products')->with('toast', 'Produit mis à jour avec succès');
    }

    public function productDestroy($id)
    {
        Product::findOrFail($id)->delete();
        return redirect()->route('admin.products')->with('toast', 'Produit supprimé avec succès');
    }

    private function formatProduct($p)
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

        $shortSlug = $slugMap[$p->slug] ?? $p->slug;
        $ext = in_array($p->slug, ['guide-freelance-algerie', 'pack-reussite-bac', 'templates-canva-pro', 'marketing-digital-algerie']) ? 'png' : 'svg';

        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'category' => $p->category?->name ?? '',
            'categorySlug' => $p->category?->slug ?? '',
            'price' => (int) $p->price,
            'rating' => (float) $p->rating_avg,
            'sales' => $p->sales_count,
            'image' => '/images/products/' . $shortSlug . '.' . $ext,
            'description' => $p->description ?? '',
        ];
    }

    private function sellerOptions()
    {
        return User::orderBy('name')->get()->map(fn ($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'wilaya' => $user->wilaya,
        ]);
    }

    private function syncSellerBadges(array $validated): void
    {
        if (empty($validated['seller_id'])) {
            return;
        }

        $seller = User::find($validated['seller_id']);

        if (!$seller) {
            return;
        }

        $seller->update([
            'is_verified_seller' => $validated['is_verified_seller'] ?? false,
            'is_top_rated_seller' => $validated['is_top_rated_seller'] ?? false,
            'is_official_partner' => $validated['is_official_partner'] ?? false,
        ]);
    }

    private function formatSellerBadges(?User $seller): array
    {
        if (!$seller) {
            return [];
        }

        return array_values(array_filter([
            $seller->is_verified_seller ? 'Verified Seller' : null,
            $seller->is_top_rated_seller ? 'Top Rated' : null,
            $seller->is_official_partner ? 'Official Partner' : null,
        ]));
    }
}
