<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\Product;
use Illuminate\Http\Request;

class FreeProductController extends Controller
{
    public function claim(Request $request, int $productId)
    {
        $product = Product::findOrFail($productId);

        if (! $product->is_free || ($product->product_type ?? 'digital') !== 'digital') {
            return back()->with('toast', 'Ce produit ne peut pas etre telecharge gratuitement.');
        }

        $download = Download::firstOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $product->id,
            ],
            [
                'order_id' => null,
                'downloaded_at' => now(),
                'download_count' => 0,
            ]
        );

        $download->increment('download_count');
        $download->update(['downloaded_at' => now()]);

        $filePath = storage_path('app/' . $product->file_path);
        $fileName = $product->slug . '.' . pathinfo((string) $product->file_path, PATHINFO_EXTENSION);

        if (! file_exists($filePath)) {
            return back()->with('toast', 'Fichier gratuit introuvable. Veuillez contacter le support.');
        }

        return response()->download($filePath, $fileName);
    }
}
