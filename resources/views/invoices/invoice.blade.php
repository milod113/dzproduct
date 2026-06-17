<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @page { margin: 32px; }
        body { font-family: 'Figtree', 'DejaVu Sans', sans-serif; color: #1F2937; font-size: 12px; line-height: 1.5; }
        .header { text-align: center; margin-bottom: 28px; border-bottom: 3px solid #0B7A35; padding-bottom: 20px; }
        .header h1 { color: #0B7A35; font-size: 28px; margin: 0 0 4px; }
        .header p { color: #6B7280; margin: 0; font-size: 13px; }
        .invoice-title { text-align: center; margin: 20px 0; }
        .invoice-title h2 { font-size: 22px; margin: 0; color: #1F2937; }
        .invoice-title .number { color: #0B7A35; font-weight: 700; font-size: 16px; }
        .info-grid { display: flex; justify-content: space-between; margin: 20px 0; }
        .info-box { width: 48%; }
        .info-box h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B7280; margin: 0 0 8px; }
        .info-box p { margin: 2px 0; font-size: 13px; }
        table.items { width: 100%; border-collapse: collapse; margin: 20px 0; }
        table.items thead th { background: #0B7A35; color: white; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; padding: 10px 12px; text-align: left; }
        table.items thead th:last-child { text-align: right; }
        table.items tbody td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        table.items tbody td:last-child { text-align: right; font-weight: 600; }
        table.items tbody tr:nth-child(even) { background: #f9fafb; }
        .totals { margin-left: auto; width: 300px; }
        .totals table { width: 100%; }
        .totals td { padding: 6px 0; font-size: 13px; }
        .totals td:last-child { text-align: right; }
        .totals .total td { border-top: 2px solid #0B7A35; padding-top: 10px; font-size: 16px; font-weight: 700; color: #0B7A35; }
        .footer-notes { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6B7280; text-align: center; }
        .badge-paid { display: inline-block; background: #E8F5E9; color: #0B7A35; padding: 4px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Boutique Digitale DZ</h1>
        <p>Marketplace algerienne de produits digitaux</p>
        <p style="font-size:11px; margin-top:4px;">N° RC: XXXXX | NIF: XXXXX | Article 18 TF</p>
    </div>

    <div class="invoice-title">
        <h2>FACTURE</h2>
        <div class="number">{{ $invoice->invoice_number }}</div>
        <div style="margin-top:4px;"><span class="badge-paid">PAYEE</span></div>
    </div>

    <div class="info-grid">
        <div class="info-box">
            <h3>Facture a</h3>
            <p><strong>{{ $invoice->order->user?->name ?? 'Client' }}</strong></p>
            <p>{{ $invoice->order->user?->email ?? '' }}</p>
            <p>{{ $invoice->order->user?->phone ?? '' }}</p>
            <p>{{ $invoice->order->user?->wilaya ?? '' }}</p>
        </div>
        <div class="info-box" style="text-align:right;">
            <h3>Details</h3>
            <p><strong>Date:</strong> {{ $invoice->created_at->format('d/m/Y') }}</p>
            <p><strong>Commande:</strong> {{ $invoice->order->order_number }}</p>
            <p><strong>Paiement:</strong> {{ ucfirst($invoice->order->payment?->payment_method ?? 'N/A') }}</p>
        </div>
    </div>

    <table class="items">
        <thead>
            <tr>
                <th style="width:60%;">Designation</th>
                <th style="width:20%;">Type</th>
                <th style="width:20%;">Prix</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->order->items as $item)
                <tr>
                    <td>{{ $item->product?->name ?? 'Produit' }}</td>
                    <td>{{ $item->product?->product_type ?? 'digital' }}</td>
                    <td>{{ number_format((int)$item->price, 0, ',', ' ') }} DZD</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="totals">
        <table>
            <tr><td>Sous-total</td><td>{{ number_format((int)$invoice->subtotal, 0, ',', ' ') }} DZD</td></tr>
            @if($invoice->discount > 0)
                <tr><td>Remise</td><td>-{{ number_format((int)$invoice->discount, 0, ',', ' ') }} DZD</td></tr>
            @endif
            <tr><td>TVA</td><td>Incluse</td></tr>
            <tr class="total"><td>Total TTC</td><td>{{ number_format((int)$invoice->total, 0, ',', ' ') }} DZD</td></tr>
        </table>
    </div>

    <div class="footer-notes">
        <p>Boutique Digitale DZ — Algerie</p>
        <p>Merci de votre confiance. Pour toute question, contactez-nous depuis notre site.</p>
        <p style="font-size:10px;margin-top:4px;">Document genere automatiquement le {{ now()->format('d/m/Y H:i') }}</p>
    </div>
</body>
</html>
