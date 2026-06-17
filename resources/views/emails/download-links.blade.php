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
        .download-list { margin: 20px 0; }
        .download-item { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #f9fafb; border-radius: 12px; margin-bottom: 12px; }
        .download-info { flex: 1; }
        .download-name { font-weight: 600; color: #1F2937; font-size: 15px; }
        .download-meta { color: #9CA3AF; font-size: 13px; margin-top: 2px; }
        .btn { display: inline-block; background: #0B7A35; color: #ffffff !important; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; white-space: nowrap; }
        .btn-small { padding: 8px 16px; font-size: 13px; }
        .footer { text-align: center; margin-top: 32px; color: #9CA3AF; font-size: 13px; }
        .badge { display: inline-block; background: #E8F5E9; color: #0B7A35; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="logo">
                <h1>Boutique Digitale DZ</h1>
            </div>
            <h2 style="text-align: center;">Vos telechargements sont prets</h2>
            <p style="text-align: center;">Cliquez sur chaque produit pour telecharger votre fichier instantanement.</p>

            <div class="download-list">
                @php $downloads = $order->downloads; @endphp
                @forelse($downloads as $download)
                    <div class="download-item">
                        <div class="download-info">
                            <div class="download-name">{{ $download->product?->name ?? 'Produit' }}</div>
                            <div class="download-meta">
                                @if($download->downloaded_at)
                                    Telecharge le {{ $download->downloaded_at->format('d/m/Y') }}
                                @else
                                    <span class="badge">Pret</span>
                                @endif
                            </div>
                        </div>
                        <a href="{{ route('download.file', $download->product_id) }}" class="btn btn-small">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Telecharger
                        </a>
                    </div>
                @empty
                    <p>Aucun fichier disponible pour cette commande.</p>
                @endforelse
            </div>

            <div style="text-align: center; margin-top: 24px;">
                <a href="{{ route('downloads') }}" style="color:#0B7A35;font-weight:600;text-decoration:none;">
                    Voir tous mes telechargements →
                </a>
            </div>
        </div>
        <div class="footer">
            <p>Boutique Digitale DZ</p>
            <p style="font-size:12px;">Ce lien de telechargement est personnel et confidentiel.</p>
        </div>
    </div>
</body>
</html>
