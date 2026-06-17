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
            'is_free' => $validated['is_free'] ?? false,
            'description' => $validated['description'] ?? null,
            'price' => ($validated['is_free'] ?? false) ? 0 : $validated['price'],
            'pages' => $validated['pages'] ?? null,
            'file_size_label' => $validated['file_size_label'] ?? null,
            'item_count' => $validated['item_count'] ?? null,
            'skill_level' => $validated['skill_level'] ?? null,
            'usage_license' => $validated['usage_license'] ?? null,
            'version' => $validated['version'] ?? null,
            'last_updated_at' => $validated['last_updated_at'] ?? null,
            'included_items' => $this->linesToArray($validated['included_items_text'] ?? null),
            'compatible_with' => $this->linesToArray($validated['compatible_with_text'] ?? null),
            'benefits' => $this->linesToArray($validated['benefits_text'] ?? null),
            'preview_points' => $this->linesToArray($validated['preview_points_text'] ?? null),
            'faq_items' => $this->faqTextToArray($validated['faq_items_text'] ?? null),
            'usage_instructions' => $this->linesToArray($validated['usage_instructions_text'] ?? null),
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
                'is_free' => (bool) $product->is_free,
                'description' => $product->description ?? '',
                'is_active' => $product->is_active,
                'file_type' => $product->file_type ?? 'zip',
                'file_path' => $product->file_path ?? '',
                'pages' => $product->pages,
                'file_size_label' => $product->file_size_label ?? '',
                'item_count' => $product->item_count,
                'skill_level' => $product->skill_level ?? '',
                'usage_license' => $product->usage_license ?? '',
                'version' => $product->version ?? '',
                'last_updated_at' => $product->last_updated_at?->format('Y-m-d'),
                'included_items_text' => $this->arrayToLines($product->included_items),
                'compatible_with_text' => $this->arrayToLines($product->compatible_with),
                'benefits_text' => $this->arrayToLines($product->benefits),
                'preview_points_text' => $this->arrayToLines($product->preview_points),
                'faq_items_text' => $this->faqArrayToText($product->faq_items),
                'usage_instructions_text' => $this->arrayToLines($product->usage_instructions),
                'preview_images' => $product->images
                    ->sortBy('sort_order')
                    ->values()
                    ->map(fn ($image) => [
                        'id' => $image->id,
                        'url' => Storage::disk('public')->url($image->image_path),
                        'is_primary' => (bool) $image->is_primary,
                    ]),
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
            'is_free' => $validated['is_free'] ?? false,
            'description' => $validated['description'] ?? null,
            'price' => ($validated['is_free'] ?? false) ? 0 : $validated['price'],
            'pages' => $validated['pages'] ?? null,
            'file_size_label' => $validated['file_size_label'] ?? null,
            'item_count' => $validated['item_count'] ?? null,
            'skill_level' => $validated['skill_level'] ?? null,
            'usage_license' => $validated['usage_license'] ?? null,
            'version' => $validated['version'] ?? null,
            'last_updated_at' => $validated['last_updated_at'] ?? null,
            'included_items' => $this->linesToArray($validated['included_items_text'] ?? null),
            'compatible_with' => $this->linesToArray($validated['compatible_with_text'] ?? null),
            'benefits' => $this->linesToArray($validated['benefits_text'] ?? null),
            'preview_points' => $this->linesToArray($validated['preview_points_text'] ?? null),
            'faq_items' => $this->faqTextToArray($validated['faq_items_text'] ?? null),
            'usage_instructions' => $this->linesToArray($validated['usage_instructions_text'] ?? null),
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
            'is_free' => 'boolean',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'file_type' => 'nullable|string|max:50',
            'file_path' => 'nullable|string|max:255',
            'pages' => 'nullable|integer|min:1',
            'file_size_label' => 'nullable|string|max:50',
            'item_count' => 'nullable|integer|min:1',
            'skill_level' => 'nullable|string|max:50',
            'usage_license' => 'nullable|string|max:100',
            'version' => 'nullable|string|max:50',
            'last_updated_at' => 'nullable|date',
            'included_items_text' => 'nullable|string',
            'compatible_with_text' => 'nullable|string',
            'benefits_text' => 'nullable|string',
            'preview_points_text' => 'nullable|string',
            'faq_items_text' => 'nullable|string',
            'usage_instructions_text' => 'nullable|string',
            'product_file' => 'nullable|file|max:102400',
            'product_image' => 'nullable|image|max:5120',
            'preview_images.*' => 'nullable|image|max:5120',
        ]);
    }

    private function linesToArray(?string $value): ?array
    {
        if (! $value) {
            return null;
        }

        $items = collect(preg_split('/\r\n|\r|\n/', $value))
            ->map(fn ($item) => trim((string) $item))
            ->filter()
            ->values()
            ->all();

        return $items === [] ? null : $items;
    }

    private function arrayToLines(null|array $value): string
    {
        return collect($value ?? [])
            ->filter(fn ($item) => filled($item))
            ->implode(PHP_EOL);
    }

    private function faqTextToArray(?string $value): ?array
    {
        if (! $value) {
            return null;
        }

        $items = collect(preg_split('/\r\n|\r|\n/', $value))
            ->map(fn ($item) => trim((string) $item))
            ->filter()
            ->map(function ($line) {
                [$question, $answer] = array_pad(explode('|', $line, 2), 2, null);

                $question = trim((string) $question);
                $answer = trim((string) $answer);

                if ($question === '' || $answer === '') {
                    return null;
                }

                return [
                    'question' => $question,
                    'answer' => $answer,
                ];
            })
            ->filter()
            ->values()
            ->all();

        return $items === [] ? null : $items;
    }

    private function faqArrayToText(null|array $value): string
    {
        return collect($value ?? [])
            ->map(function ($item) {
                $question = trim((string) data_get($item, 'question', ''));
                $answer = trim((string) data_get($item, 'answer', ''));

                return $question !== '' && $answer !== '' ? "{$question} | {$answer}" : null;
            })
            ->filter()
            ->implode(PHP_EOL);
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

        if ($request->hasFile('preview_images')) {
            $nextSortOrder = (int) $product->images()->max('sort_order') + 1;

            foreach ($request->file('preview_images') as $previewImage) {
                $imagePath = $previewImage->store("products/images/{$product->seller_id}", 'public');

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imagePath,
                    'is_primary' => false,
                    'sort_order' => $nextSortOrder,
                ]);

                $nextSortOrder++;
            }
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
