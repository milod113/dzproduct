<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\BlogPost;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Download;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        $products = Product::with(['category', 'seller', 'images'])->get()->map(fn ($p) => $this->formatProduct($p));
        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));
        $posts = BlogPost::where('is_published', true)->orderBy('published_at', 'desc')->get()->map(fn ($b) => $this->formatBlogPost($b));

        return Inertia::render('Home', [
            'products' => $products,
            'categories' => $categories,
            'blogPosts' => $posts,
        ]);
    }

    public function shop()
    {
        $products = Product::with(['category', 'seller', 'images'])->where('is_active', true)->get()->map(fn ($p) => $this->formatProduct($p));
        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));

        return Inertia::render('Shop', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function productDetails($slug)
    {
        $product = Product::with(['category', 'images', 'reviews', 'seller'])->where('slug', $slug)->firstOrFail();
        $related = Product::with(['category', 'seller', 'images'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->limit(4)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));
        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));

        return Inertia::render('ProductDetails', [
            'product' => $this->formatProduct($product),
            'related' => $related,
            'categories' => $categories,
        ]);
    }

    public function sellerProfile($id)
    {
        $seller = User::where('is_admin', false)
            ->with(['products.category', 'products.images', 'products.seller'])
            ->findOrFail($id);

        $products = $seller->products
            ->where('is_active', true)
            ->sortByDesc('created_at')
            ->values()
            ->map(fn ($product) => $this->formatProduct($product));

        $orderItems = $this->sellerOrderItems($seller->id);
        $sellerStats = $this->buildSellerStats($products, $orderItems);

        return Inertia::render('SellerProfile', [
            'seller' => $this->formatSeller($seller, [
                'bio' => true,
                'seller_since' => true,
                'stats' => [
                    'productCount' => $products->count(),
                    'totalSales' => $sellerStats['totalSales'],
                    'totalRevenue' => $sellerStats['totalRevenue'],
                    'avgRating' => $sellerStats['avgRating'],
                ],
            ]),
            'products' => $products,
        ]);
    }

    public function categories()
    {
        $cats = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));
        return Inertia::render('Categories', ['categories' => $cats]);
    }

    public function categoryShow($slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $products = Product::with(['category', 'seller', 'images'])
            ->where('category_id', $category->id)
            ->where('is_active', true)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));
        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));

        return Inertia::render('Categories', [
            'products' => $products,
            'activeCategory' => $category,
            'categories' => $categories,
        ]);
    }

    public function blog()
    {
        $posts = BlogPost::where('is_published', true)->orderBy('published_at', 'desc')->get()->map(fn ($b) => $this->formatBlogPost($b));
        return Inertia::render('Blog', ['blogPosts' => $posts]);
    }

    public function blogDetails($slug)
    {
        $post = BlogPost::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return Inertia::render('BlogDetails', ['post' => $this->formatBlogPost($post)]);
    }

    public function dashboard()
    {
        $user = auth()->user();
        $orders = Order::where('user_id', $user->id)->with('items.product')->orderBy('created_at', 'desc')->get();
        $downloads = Download::where('user_id', $user->id)->with('product')->orderBy('downloaded_at', 'desc')->get();

        return Inertia::render('UserDashboard', [
            'orders' => $orders,
            'downloads' => $downloads,
        ]);
    }

    public function myDownloads()
    {
        $user = auth()->user();
        $downloads = Download::where('user_id', $user->id)
            ->with('product.category')
            ->orderBy('downloaded_at', 'desc')
            ->get()
            ->map(function ($d) {
                $item = $this->formatProduct($d->product);
                $item['purchaseDate'] = $d->created_at->format('d/m/Y');
                $item['downloaded_at'] = $d->downloaded_at?->format('d/m/Y');
                return $item;
            });

        return Inertia::render('MyDownloads', ['downloads' => $downloads]);
    }

    public function vendeurDashboard()
    {
        $sellerId = auth()->id();
        $products = Product::with(['category', 'seller', 'images'])
            ->where('seller_id', $sellerId)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));
        $orderItems = $this->sellerOrderItems($sellerId);

        return Inertia::render('Vendeur/Dashboard', [
            'products' => $products,
            'sellerStats' => $this->buildSellerStats($products, $orderItems),
        ]);
    }

    public function vendeurProduits()
    {
        $products = Product::with(['category', 'seller', 'images'])
            ->where('seller_id', auth()->id())
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));
        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));
        return Inertia::render('Vendeur/Produits', ['products' => $products, 'categories' => $categories]);
    }

    public function vendeurRevenus()
    {
        $sellerId = auth()->id();
        $products = Product::with(['category', 'seller', 'images'])
            ->where('seller_id', $sellerId)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));
        $orderItems = $this->sellerOrderItems($sellerId);

        return Inertia::render('Vendeur/Revenus', [
            'products' => $products,
            'revenueSummary' => $this->buildRevenueSummary($orderItems),
        ]);
    }

    public function vendeurCommandes()
    {
        $orderItems = $this->sellerOrderItems(auth()->id());
        $orders = $orderItems->map(function ($item) {
            return [
                'id' => $item->order?->order_number ?? 'CMD-' . $item->order_id,
                'client' => $item->order?->user?->name ?? 'Client',
                'product' => $item->product?->name ?? 'Produit',
                'date' => $item->order?->created_at?->format('d/m/Y') ?? '',
                'amount' => (int) $item->price,
                'status' => $this->formatOrderStatus($item->order?->status),
            ];
        })->values();

        return Inertia::render('Vendeur/Commandes', [
            'orders' => $orders,
            'orderStats' => [
                'total' => $orders->count(),
                'completed' => $orders->where('status', 'Livree')->count(),
                'pending' => $orders->where('status', 'En cours')->count(),
            ],
        ]);
    }

    private function formatProduct($p)
    {
        $slugMap = [
            'guide-freelance-algerie' => 'guide-freelance',
            'pack-reussite-bac' => 'pack-bac',
            'templates-canva-pro' => 'canva-templates',
            'cv-moderne-algerie' => 'cv-modern',
            'business-plan-algerie' => 'business-plan',
            'marketing-digital-algerie' => 'marketing-digital',
            'ebook-productivite' => 'productivite',
            'pack-langues-etrangeres' => 'langues',
            'templates-instagram' => 'instagram',
            'lettre-motivation-pro' => 'lettre-motivation',
            'pack-factures-pro' => 'factures',
            'formation-canva-debutant' => 'canva-formation',
            'guide-ecommerce-algerie' => 'ecommerce',
            'pack-preparation-concours' => 'concours',
            'templates-linkedin' => 'linkedin',
            'portfolio-design-pro' => 'portfolio',
            'pack-contrat-travail' => 'contrat',
            'formation-seo-algerie' => 'seo',
            'ebook-bien-etre' => 'bien-etre',
            'pack-code-programmation' => 'code',
            'templates-tiktok' => 'tiktok',
            'pack-entretien-emploi' => 'entretien',
            'pack-comptabilite' => 'comptabilite',
            'formation-montage-video' => 'montage-video',
        ];

        $shortSlug = $slugMap[$p->slug] ?? $p->slug;
        $ext = in_array($p->slug, ['guide-freelance-algerie', 'pack-reussite-bac', 'templates-canva-pro', 'marketing-digital-algerie']) ? 'png' : 'svg';
        $primaryImage = $p->images?->firstWhere('is_primary', true) ?? $p->images?->first();
        $image = $primaryImage ? '/storage/' . ltrim($primaryImage->image_path, '/') : '/images/products/' . $shortSlug . '.' . $ext;

        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'category' => $p->category?->name ?? '',
            'categorySlug' => $p->category?->slug ?? '',
            'price' => (int) $p->price,
            'rating' => (float) $p->rating_avg,
            'sales' => $p->sales_count,
            'image' => $image,
            'description' => $p->description ?? '',
            'seller' => $this->formatSeller($p->seller),
        ];
    }

    private function formatSeller(?User $seller, array $options = []): ?array
    {
        if (!$seller) {
            return null;
        }

        $badges = [];

        if ($seller->is_verified_seller) {
            $badges[] = 'verified';
        }

        if ($seller->is_top_rated_seller) {
            $badges[] = 'topRated';
        }

        if ($seller->is_official_partner) {
            $badges[] = 'official';
        }

        $formattedSeller = [
            'id' => $seller->id,
            'name' => $seller->name,
            'wilaya' => $seller->wilaya,
            'badges' => $badges,
        ];

        if (!empty($options['bio'])) {
            $formattedSeller['bio'] = $seller->bio;
        }

        if (!empty($options['seller_since'])) {
            $formattedSeller['seller_since'] = $seller->seller_since?->format('Y-m-d');
            $formattedSeller['seller_since_label'] = $seller->seller_since?->translatedFormat('F Y');
        }

        if (!empty($options['stats'])) {
            $formattedSeller['stats'] = $options['stats'];
        }

        return $formattedSeller;
    }

    private function formatCategory($c)
    {
        $iconMap = [
            'Ebooks' => 'BookOpen',
            'Packs Éducatifs' => 'GraduationCap',
            'Templates Réseaux Sociaux' => 'Layout',
            'CV & Lettres de Motivation' => 'FileText',
            'Documents Business' => 'Briefcase',
            'Mini-Cours' => 'Video',
        ];

        return [
            'id' => $c->id,
            'name' => $c->name,
            'slug' => $c->slug,
            'description' => $c->description ?? '',
            'icon' => $iconMap[$c->name] ?? 'BookOpen',
            'color' => $c->color ?? '#0B7A35',
            'price' => 590,
            'image' => $c->image ? '/images/categories/' . $c->image : '/images/categories/' . $c->slug . '.svg',
        ];
    }

    private function formatBlogPost($b)
    {
        $slugMap = [
            'lancer-activite-freelance-algerie-2025' => 'freelance',
            'meilleurs-outils-productivite-etudiants-algeriens' => 'productivite',
            'marketing-digital-algerie-guide-complet-2025' => 'marketing',
            'creer-cv-attire-recruteurs-algerie' => 'cv',
            'tendances-ecommerce-algerie-2025' => 'ecommerce',
            'formation-en-ligne-choisir-bonne-plateforme' => 'formation',
        ];

        return [
            'id' => $b->id,
            'title' => $b->title,
            'slug' => $b->slug,
            'excerpt' => $b->excerpt ?? '',
            'category' => $b->category ?? '',
            'image' => $b->image ? '/images/blog/' . $b->image : '/images/blog/' . ($slugMap[$b->slug] ?? 'freelance') . '.svg',
            'date' => $b->published_at?->format('d/m/Y') ?? '',
            'author' => 'Boutique Digitale DZ',
        ];
    }

    private function sellerOrderItems(int $sellerId): Collection
    {
        return OrderItem::with(['order.user', 'product'])
            ->whereHas('product', fn ($query) => $query->where('seller_id', $sellerId))
            ->get();
    }

    private function buildSellerStats(Collection $products, Collection $orderItems): array
    {
        $totalProducts = $products->count();

        return [
            'totalProducts' => $totalProducts,
            'totalSales' => $orderItems->count(),
            'totalRevenue' => (int) $orderItems->sum('price'),
            'avgRating' => $totalProducts > 0 ? round($products->avg('rating') ?? 0, 1) : 0,
            'averagePrice' => $totalProducts > 0 ? (int) round($products->avg('price') ?? 0) : 0,
            'topProducts' => $products
                ->map(function ($product) use ($orderItems) {
                    $sales = $orderItems->where('product_id', $product['id'])->count();

                    return [
                        ...$product,
                        'sales' => $sales,
                        'revenue' => (int) $orderItems->where('product_id', $product['id'])->sum('price'),
                    ];
                })
                ->sortByDesc('sales')
                ->take(5)
                ->values(),
        ];
    }

    private function buildRevenueSummary(Collection $orderItems): array
    {
        $grouped = $orderItems
            ->groupBy(fn ($item) => optional($item->order?->created_at)->format('Y-m') ?? 'unknown')
            ->sortKeys();

        $monthly = $grouped->map(function ($items, $monthKey) {
            $date = $monthKey !== 'unknown' ? now()->createFromFormat('Y-m', $monthKey) : null;

            return [
                'month' => $date ? $date->translatedFormat('M') : 'N/A',
                'sales' => $items->count(),
                'revenue' => (int) $items->sum('price'),
            ];
        })->values();

        $thisMonthKey = now()->format('Y-m');

        return [
            'totalRevenue' => (int) $orderItems->sum('price'),
            'thisMonthRevenue' => isset($grouped[$thisMonthKey]) ? (int) $grouped[$thisMonthKey]->sum('price') : 0,
            'averageMonthlyRevenue' => $monthly->count() > 0 ? (int) round($monthly->avg('revenue')) : 0,
            'monthly' => $monthly,
        ];
    }

    private function formatOrderStatus(?string $status): string
    {
        return match ($status) {
            'completed' => 'Livree',
            'pending', 'processing' => 'En cours',
            default => 'En cours',
        };
    }
}
