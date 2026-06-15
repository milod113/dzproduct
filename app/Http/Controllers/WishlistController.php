<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $products = Product::with(['category', 'seller', 'images'])
            ->whereIn('id', $user->wishlistItems()->pluck('product_id'))
            ->get()
            ->map(fn ($product) => app(PageController::class)->formatProductForWishlist($product));

        return Inertia::render('Wishlist', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        Wishlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $validated['product_id'],
        ]);

        return back()->with('toast', 'Produit ajoute aux favoris.');
    }

    public function destroy(Request $request, int $productId)
    {
        Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->delete();

        return back()->with('toast', 'Produit retire des favoris.');
    }
}
