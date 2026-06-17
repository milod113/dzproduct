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
        h2 { color: #1F2937; font-size: 20px; margin: 24px 0 8px; }
        p { color: #6B7280; line-height: 1.6; font-size: 15px; }
        .cart-item { display: flex; align-items: center; gap: 12px; padding: 16px; background: #f9fafb; border-radius: 12px; margin-bottom: 10px; }
        .cart-item-img { width: 56px; height: 56px; border-radius: 10px; background: #e5e7eb; overflow: hidden; flex-shrink: 0; }
        .cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
        .cart-item-info { flex: 1; }
        .cart-item-name { font-weight: 600; color: #1F2937; font-size: 14px; }
        .cart-item-price { color: #0B7A35; font-weight: 600; font-size: 14px; }
        .btn { display: inline-block; background: #0B7A35; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px; }
        .btn-secondary { display: inline-block; background: transparent; color: #0B7A35 !important; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px; border: 2px solid #0B7A35; margin-left: 8px; }
        .footer { text-align: center; margin-top: 32px; color: #9CA3AF; font-size: 13px; }
        .coupon-badge { background: #FEF3C7; color: #92400E; padding: 8px 16px; border-radius: 8px; font-size: 13px; text-align: center; margin: 16px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="logo">
                <h1>Boutique Digitale DZ</h1>
            </div>
            <h2 style="text-align: center;">Vous avez oublie votre panier ?</h2>
            <p style="text-align: center;">
                Bonjour <strong>{{ $userName }}</strong>, vous avez des articles en attente dans votre panier.
                Finalisez votre commande pour beneficier de ces ressources premium.
            </p>

            <div style="margin: 20px 0;">
                @foreach($cartData['items'] as $item)
                    <div class="cart-item">
                        <div class="cart-item-img">
                            @if($item['image'])
                                <img src="{{ $item['image'] }}" alt="{{ $item['name'] }}">
                            @endif
                        </div>
                        <div class="cart-item-info">
                            <div class="cart-item-name">{{ $item['name'] }}</div>
                            <div style="color:#9CA3AF;font-size:12px;">{{ $item['category'] ?? '' }}</div>
                        </div>
                        <div class="cart-item-price">{{ number_format((int)$item['price'], 0, ',', ' ') }} DZD</div>
                    </div>
                @endforeach
            </div>

            <div class="coupon-badge">
                🎉 Utilisez le code <strong>BIENVENUE10</strong> pour 10% de reduction sur votre premiere commande
            </div>

            <div style="text-align: center; margin: 24px 0;">
                <a href="{{ route('checkout') }}" class="btn">Finaliser ma commande</a>
                <a href="{{ $cartData['shop_url'] ?? route('shop') }}" class="btn-secondary">Continuer mes achats</a>
            </div>
        </div>
        <div class="footer">
            <p>Boutique Digitale DZ — Des ressources digitales pour tous</p>
            <p style="font-size:12px;">Si vous avez deja finalise votre commande, ignorez cet email.</p>
        </div>
    </div>
</body>
</html>
