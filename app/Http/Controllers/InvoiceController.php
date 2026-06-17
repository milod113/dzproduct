<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function download(Invoice $invoice)
    {
        $user = auth()->user();

        if ($invoice->user_id !== $user->id && $user->role !== 'admin') {
            abort(403);
        }

        if (!$invoice->pdf_path || !file_exists(storage_path('app/' . $invoice->pdf_path))) {
            return back()->with('toast', 'Facture introuvable.');
        }

        return response()->download(
            storage_path('app/' . $invoice->pdf_path),
            "facture-{$invoice->invoice_number}.pdf"
        );
    }
}
