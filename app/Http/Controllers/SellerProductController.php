<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SellerProductController extends Controller
{
    public function create()
    {
        $seller = request()->user();

        if ($this->hasReachedPlanLimit($seller)) {
            return redirect()->route('vendeur.produits')->with('toast', 'Votre plan Starter autorise jusqu a 3 produits. Passez a Pro pour publier davantage.');
        }

        return Inertia::render('Vendeur/ProductForm', [
            'product' => null,
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        if ($this->hasReachedPlanLimit($request->user())) {
            return redirect()->route('vendeur.produits')->with('toast', 'Limite Starter atteinte. Passez au plan Pro ou Elite pour ajouter plus de produits.');
        }

        $validated = $this->validateProduct($request);

        $product = Product::create([
            'seller_id' => $request->user()->id,
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => $this->uniqueSlug($validated['name']),
            'product_type' => $validated['product_type'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'is_active' => $validated['is_active'] ?? true,
            'file_type' => $validated['product_type'] === 'service' ? null : ($validated['file_type'] ?? 'zip'),
            'file_path' => $validated['product_type'] === 'service' ? null : ($validated['file_path'] ?? null),
        ]);

        $product->update($this->storeAssets($request, $product, $validated));

        return redirect()->route('vendeur.produits')->with('toast', 'Produit cree avec succes');
    }

    public function edit(Request $request, $id)
    {
        $product = $this->sellerProduct($request, $id);

        return Inertia::render('Vendeur/ProductForm', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'category_id' => $product->category_id,
                'price' => (int) $product->price,
                'product_type' => $product->product_type ?? 'digital',
                'description' => $product->description ?? '',
                'is_active' => $product->is_active,
                'file_type' => $product->file_type ?? 'zip',
                'file_path' => $product->file_path ?? '',
                'image_url' => $this->productImageUrl($product),
            ],
            'categories' => Category::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = $this->sellerProduct($request, $id);
        $validated = $this->validateProduct($request);

        $product->update([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'product_type' => $validated['product_type'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'is_active' => $validated['is_active'] ?? true,
            'file_type' => $validated['product_type'] === 'service' ? null : ($validated['file_type'] ?? 'zip'),
            'file_path' => $validated['product_type'] === 'service' ? null : ($validated['file_path'] ?? null),
        ]);

        $product->update($this->storeAssets($request, $product, $validated));

        return redirect()->route('vendeur.produits')->with('toast', 'Produit mis a jour avec succes');
    }

    public function destroy(Request $request, $id)
    {
        $product = $this->sellerProduct($request, $id);

        if ($product->file_path) {
            Storage::disk('local')->delete($product->file_path);
        }

        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }

        $product->delete();

        return redirect()->route('vendeur.produits')->with('toast', 'Produit supprime avec succes');
    }

    private function sellerProduct(Request $request, $id): Product
    {
        return Product::with('images')->where('seller_id', $request->user()->id)->findOrFail($id);
    }

    private function validateProduct(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric|min:0',
            'product_type' => 'required|in:digital,service',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'file_type' => 'nullable|string|max:50',
            'file_path' => 'nullable|string|max:255',
            'product_file' => 'nullable|file|max:102400',
            'product_image' => 'nullable|image|max:5120',
        ]);
    }

    private function storeAssets(Request $request, Product $product, array $validated): array
    {
        if (($validated['product_type'] ?? 'digital') === 'service') {
            if ($request->hasFile('product_file') && $product->file_path) {
                Storage::disk('local')->delete($product->file_path);
            }

            return [
                'file_type' => null,
                'file_path' => null,
            ];
        }

        $attributes = [
            'file_type' => $validated['file_type'] ?? 'zip',
            'file_path' => $validated['file_path'] ?? $product->file_path,
        ];

        if ($request->hasFile('product_file')) {
            if ($product->file_path) {
                Storage::disk('local')->delete($product->file_path);
            }

            $storedPath = $request->file('product_file')->store("products/files/{$product->seller_id}", 'local');
            $attributes['file_path'] = $storedPath;
            $attributes['file_type'] = $request->file('product_file')->getClientOriginalExtension() ?: ($validated['file_type'] ?? 'zip');
        }

        if ($request->hasFile('product_image')) {
            $primaryImage = $product->images()->where('is_primary', true)->first();

            if ($primaryImage) {
                Storage::disk('public')->delete($primaryImage->image_path);
                $primaryImage->delete();
            }

            $imagePath = $request->file('product_image')->store("products/images/{$product->seller_id}", 'public');

            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $imagePath,
                'is_primary' => true,
                'sort_order' => 0,
            ]);
        }

        return $attributes;
    }

    private function productImageUrl(Product $product): ?string
    {
        $primaryImage = $product->images->firstWhere('is_primary', true) ?? $product->images->first();

        return $primaryImage ? Storage::disk('public')->url($primaryImage->image_path) : null;
    }

    private function uniqueSlug(string $name): string
    {
        $slug = Str::slug($name);
        $original = $slug;
        $counter = 1;

        while (Product::where('slug', $slug)->exists()) {
            $slug = $original . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    private function hasReachedPlanLimit($seller): bool
    {
        $limit = $seller->sellerProductLimit();

        if ($limit === null) {
            return false;
        }

        return Product::where('seller_id', $seller->id)->count() >= $limit;
    }
}
