<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\Product;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function download($productId)
    {
        $user = auth()->user();
        $download = Download::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->firstOrFail();

        $product = Product::findOrFail($productId);

        $download->increment('download_count');
        $download->update(['downloaded_at' => now()]);

        $filePath = storage_path('app/' . $product->file_path);
        $fileName = $product->slug . '.' . pathinfo($product->file_path, PATHINFO_EXTENSION);

        if (!file_exists($filePath)) {
            return back()->with('toast', 'Fichier introuvable. Veuillez nous contacter.');
        }

        return response()->download($filePath, $fileName);
    }
}
