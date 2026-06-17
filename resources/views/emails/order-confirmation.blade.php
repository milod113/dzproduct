<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Figtree', 'Segoe UI', sans-serif; background: #f4f7f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
        .card { background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .logo { text-align: center; margin-bottom: 24px; }
        .logo h1 { color: #0B7A35; font-size: 24px; margin: 0; }
        .badge { display: inline-block; background: #E8F5E9; color: #0B7A35; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; }
        h2 { color: #1F2937; font-size: 20px; margin: 24px 0 8px; }
        p { color: #6B7280; line-height: 1.6; font-size: 15px; }
        .order-info { background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0; }
        .order-info table { width: 100%; }
        .order-info td { padding: 6px 0; font-size: 14px; }
        .order-info td:last-child { text-align: right; font-weight: 600; color: #1F2937; }
        .order-info .total td { border-top: 2px solid #e5e7eb; padding-top: 12px; font-size: 18px; color: #0B7A35; }
        .btn { display: inline-block; background: #0B7A35; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; margin-top: 16px; }
        .footer { text-align: center; margin-top: 32px; color: #9CA3AF; font-size: 13px; }
        .product-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
        .product-item:last-child { border-bottom: none; }
        .product-name { font-weight: 600; color: #1F2937; }
        .product-price { color: #0B7A35; font-weight: 600; margin-left: auto; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="logo">
                <h1>Boutique Digitale DZ</h1>
            </div>
            <div style="text-align: center;">
                <span class="badge">Commande confirmee</span>
            </div>
            <h2 style="text-align: center;">Merci pour votre achat !</h2>
            <p style="text-align: center;">Votre commande <strong>{{ $order->order_number }}</strong> a ete confirmee et payee avec succes.</p>

            <div class="order-info">
                <table>
                    <tr><td>Numero de commande</td><td>{{ $order->order_number }}</td></tr>
                    <tr><td>Date</td><td>{{ $order->created_at->format('d/m/Y H:i') }}</td></tr>
                    <tr><td>Statut</td><td><span style="color:#0B7A35;font-weight:600;">Paye</span></td></tr>
                </table>
            </div>

            <h2>Produits commandes</h2>
            @foreach($order->items as $item)
                <div class="product-item">
                    <span class="product-name">{{ $item->product?->name ?? 'Produit' }}</span>
                    <span class="product-price">{{ number_format((int)$item->price, 0, ',', ' ') }} DZD</span>
                </div>
            @endforeach

            <div class="order-info">
                <table>
                    <tr><td>Sous-total</td><td>{{ number_format((int)$order->subtotal, 0, ',', ' ') }} DZD</td></tr>
                    @if($order->discount > 0)
                        <tr><td>Reduction</td><td>-{{ number_format((int)$order->discount, 0, ',', ' ') }} DZD</td></tr>
                    @endif
                    <tr class="total"><td><strong>Total paye</strong></td><td><strong>{{ number_format((int)$order->total, 0, ',', ' ') }} DZD</strong></td></tr>
                </table>
            </div>

            <div style="text-align: center;">
                <a href="{{ route('downloads') }}" class="btn">Acceder a mes telechargements</a>
            </div>
        </div>
        <div class="footer">
            <p>Boutique Digitale DZ — Marketplace algerienne de produits digitaux</p>
            <p><a href="{{ config('app.url') }}" style="color:#0B7A35;">{{ config('app.url') }}</a></p>
        </div>
    </div>
</body>
</html>
