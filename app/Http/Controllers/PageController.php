<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\BlogPost;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Download;
use App\Models\ProductImage;
use App\Models\SellerMessage;
use App\Models\ServiceMission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class PageController extends Controller
{
    private ?Collection $wishlistIds = null;

    public function home()
    {
        $products = Product::with(['category', 'seller', 'images'])->get()->map(fn ($p) => $this->formatProduct($p));
        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));
        $posts = BlogPost::where('is_published', true)->orderBy('published_at', 'desc')->get()->map(fn ($b) => $this->formatBlogPost($b));

        return Inertia::render('Home', [
            'products' => $products,
            'categories' => $categories,
            'blogPosts' => $posts,
            'studentSpace' => $this->buildStudentSpaceData($products),
        ]);
    }

    public function shop()
    {
        $products = Product::with(['category', 'seller', 'images'])->where('is_active', true)->get()->map(fn ($p) => $this->formatProduct($p));
        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));

        return Inertia::render('Shop', [
            'products' => $products->sortByDesc(fn ($product) => $this->sellerPlanWeightFromFormatted($product))->values(),
            'categories' => $categories,
            'studentSpace' => $this->buildStudentSpaceData($products),
        ]);
    }

    public function studentSpace()
    {
        $products = Product::with(['category', 'seller', 'images'])
            ->where('is_active', true)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));

        $studentSpace = $this->buildStudentSpaceData($products);

        return Inertia::render('StudentSpace', [
            'studentSpace' => $studentSpace,
            'needs' => $this->buildStudentNeeds($products),
        ]);
    }

    public function freeProducts()
    {
        $products = Product::with(['category', 'seller', 'images'])
            ->where('is_active', true)
            ->where('is_free', true)
            ->where('product_type', 'digital')
            ->get()
            ->map(fn ($p) => $this->formatProduct($p))
            ->sortByDesc('created_at')
            ->values();

        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));

        return Inertia::render('FreeProducts', [
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
        $seller = User::where('role', 'seller')
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
            ->map(fn ($p) => $this->formatProduct($p))
            ->sortByDesc(fn ($product) => $this->sellerPlanWeightFromFormatted($product))
            ->values();
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

        if ($user?->role === 'seller') {
            return redirect()->route('vendeur.dashboard');
        }

        if ($user?->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        $orders = Order::where('user_id', $user->id)->with('items.product')->orderBy('created_at', 'desc')->get();
        $downloads = Download::where('user_id', $user->id)->with('product')->orderBy('downloaded_at', 'desc')->get();
        $serviceMissions = ServiceMission::with('product')
            ->where('client_id', $user->id)
            ->latest()
            ->get()
            ->map(fn ($mission) => [
                'id' => $mission->id,
                'mission_number' => $mission->mission_number,
                'status' => $mission->status,
                'product_name' => $mission->product?->name,
            ])
            ->values();
        return Inertia::render('UserDashboard', [
            'orders' => $orders,
            'downloads' => $downloads,
            'serviceMissions' => $serviceMissions,
        ]);
    }

    public function myDownloads()
    {
        $user = auth()->user();

        if ($user?->role === 'seller') {
            return redirect()->route('vendeur.dashboard');
        }

        if ($user?->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

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
        $unreadMessages = SellerMessage::where('seller_id', $sellerId)->whereNull('read_at')->count();
        $recentMessages = SellerMessage::where('seller_id', $sellerId)
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn ($message) => [
                'id' => $message->id,
                'sender_name' => $message->sender_name,
                'subject' => $message->subject,
                'created_at' => $message->created_at?->diffForHumans(),
            ]);
        $serviceMissions = ServiceMission::with('client', 'product')
            ->where('seller_id', $sellerId)
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn ($mission) => [
                'id' => $mission->id,
                'mission_number' => $mission->mission_number,
                'status' => $mission->status,
                'client_name' => $mission->client?->name,
                'product_name' => $mission->product?->name,
            ])
            ->values();

        return Inertia::render('Vendeur/Dashboard', [
            'products' => $products,
            'sellerStats' => $this->buildSellerStats($products, $orderItems),
            'analytics' => $this->buildSellerAnalytics($products, $orderItems),
            'messageSummary' => [
                'unread' => $unreadMessages,
                'recent' => $recentMessages,
            ],
            'serviceMissionSummary' => [
                'total' => ServiceMission::where('seller_id', $sellerId)->count(),
                'recent' => $serviceMissions,
            ],
        ]);
    }

    public function vendeurProduits()
    {
        $seller = auth()->user();
        $products = Product::with(['category', 'seller', 'images'])
            ->where('seller_id', $seller->id)
            ->get()
            ->map(fn ($p) => $this->formatProduct($p));
        $categories = Category::orderBy('sort_order')->get()->map(fn ($c) => $this->formatCategory($c));
        $productLimit = $seller->sellerProductLimit();

        return Inertia::render('Vendeur/Produits', [
            'products' => $products,
            'categories' => $categories,
            'productAccess' => [
                'count' => $products->count(),
                'limit' => $productLimit,
                'canCreate' => $productLimit === null || $products->count() < $productLimit,
                'planLabel' => $seller->sellerPlanLabel(),
            ],
        ]);
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
        return $this->formatProductForWishlist($p);
    }

    public function formatProductForWishlist($p)
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

        $primaryImage = $p->images?->firstWhere('is_primary', true) ?? $p->images?->first();
        $defaultRemoteImage = $this->productSeedImageUrl($p->slug, 1200, 900);
        $image = $primaryImage
            ? $this->formatMediaPath($primaryImage->image_path)
            : $defaultRemoteImage;

        $wishlistIds = $this->currentWishlistIds();

        return [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'category' => $p->category?->name ?? '',
            'categorySlug' => $p->category?->slug ?? '',
            'price' => (int) $p->price,
            'rating' => (float) $p->rating_avg,
            'sales' => $p->sales_count,
            'created_at' => $p->created_at?->toISOString(),
            'image' => $image,
            'description' => $p->description ?? '',
            'product_type' => $p->product_type ?? 'digital',
            'is_free' => (bool) $p->is_free,
            'old_price' => $p->old_price ? (int) $p->old_price : null,
            'file_type' => $p->file_type,
            'pages' => $p->pages,
            'file_size_label' => $p->file_size_label,
            'item_count' => $p->item_count,
            'skill_level' => $p->skill_level,
            'usage_license' => $p->usage_license,
            'version' => $p->version,
            'last_updated_at' => $p->last_updated_at?->format('d/m/Y'),
            'included_items' => $p->included_items ?? [],
            'compatible_with' => $p->compatible_with ?? [],
            'benefits' => $p->benefits ?? [],
            'preview_points' => $p->preview_points ?? [],
            'faq_items' => $p->faq_items ?? [],
            'usage_instructions' => $p->usage_instructions ?? [],
            'gallery' => $p->images && $p->images->count() > 0
                ? $p->images->sortBy('sort_order')->values()->map(fn ($imageItem) => [
                    'id' => $imageItem->id,
                    'url' => $this->formatMediaPath($imageItem->image_path),
                    'is_primary' => (bool) $imageItem->is_primary,
                ])->all()
                : $this->buildDefaultProductGallery($p->slug),
            'seller' => $this->formatSeller($p->seller),
            'student_badges' => $this->buildStudentBadges([
                'category' => $p->category?->name ?? '',
                'is_free' => (bool) $p->is_free,
                'price' => (int) $p->price,
                'skill_level' => $p->skill_level,
                'sales' => (int) $p->sales_count,
                'rating' => (float) $p->rating_avg,
            ]),
            'is_favorited' => $wishlistIds->contains($p->id),
        ];
    }

    private function currentWishlistIds(): Collection
    {
        if ($this->wishlistIds !== null) {
            return $this->wishlistIds;
        }

        if (!auth()->check()) {
            $this->wishlistIds = collect();
            return $this->wishlistIds;
        }

        $this->wishlistIds = auth()->user()->wishlistItems()->pluck('product_id');

        return $this->wishlistIds;
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
            'phone' => $seller->phone,
            'wilaya' => $seller->wilaya,
            'avatar' => $this->sellerAvatarUrl($seller),
            'seller_plan' => $seller->seller_plan,
            'seller_plan_label' => $seller->sellerPlanLabel(),
            'whatsapp_cta_text' => $seller->canUseCustomWhatsappCta() ? ($seller->whatsapp_cta_text ?: 'Achat Instantane') : null,
            'is_available_for_freelance' => (bool) $seller->is_available_for_freelance,
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

    private function sellerPlanWeightFromFormatted(array $product): int
    {
        return match ($product['seller']['seller_plan'] ?? 'starter') {
            User::SELLER_PLAN_ELITE => 3,
            User::SELLER_PLAN_PRO => 2,
            default => 1,
        };
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

        $slugImageMap = [
            'ebooks' => 'ebooks.svg',
            'packs-educatifs' => 'courses.svg',
            'templates-reseaux-sociaux' => 'templates.svg',
            'cv-lettres-motivation' => 'cv.svg',
            'documents-business' => 'business.svg',
            'mini-cours' => 'courses.svg',
            'photographie-design' => 'educational.svg',
            'developpement-web' => 'templates.svg',
            'finance-investissement' => 'business.svg',
        ];

        $image = null;

        if (!empty($c->thematic_image)) {
            $image = '/images/categories/' . $c->thematic_image;
        } elseif (!empty($c->image)) {
            $image = '/images/categories/' . $c->image;
        } elseif (isset($slugImageMap[$c->slug])) {
            $image = '/images/categories/' . $slugImageMap[$c->slug];
        } else {
            $image = $this->categorySeedImageUrl($c->slug);
        }

        return [
            'id' => $c->id,
            'name' => $c->name,
            'slug' => $c->slug,
            'description' => $c->description ?? '',
            'icon' => $iconMap[$c->name] ?? 'BookOpen',
            'color' => $c->color ?? '#0B7A35',
            'price' => 590,
            'image' => $image,
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
            'image' => $b->image
                ? '/images/blog/' . $b->image
                : $this->blogSeedImageUrl($b->slug),
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

    private function buildSellerAnalytics(Collection $products, Collection $orderItems): array
    {
        $revenueSummary = $this->buildRevenueSummary($orderItems);
        $monthly = collect($revenueSummary['monthly'] ?? []);
        $totalRevenue = (int) $orderItems->sum('price');
        $thisMonthRevenue = (int) ($revenueSummary['thisMonthRevenue'] ?? 0);

        $lastMonthKey = now()->subMonth()->format('Y-m');
        $lastMonthRevenue = (int) $orderItems
            ->filter(fn ($item) => optional($item->order?->created_at)->format('Y-m') === $lastMonthKey)
            ->sum('price');

        $revenueChangePercent = $lastMonthRevenue > 0
            ? round((($thisMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 1)
            : ($thisMonthRevenue > 0 ? 100.0 : 0.0);

        $productsByCategory = $products
            ->groupBy('category')
            ->map(function ($categoryProducts, $categoryName) use ($orderItems) {
                $productIds = $categoryProducts->pluck('id');
                $categoryOrderItems = $orderItems->whereIn('product_id', $productIds);

                return [
                    'category' => $categoryName ?: 'Autres',
                    'products' => $categoryProducts->count(),
                    'sales' => $categoryOrderItems->count(),
                    'revenue' => (int) $categoryOrderItems->sum('price'),
                ];
            })
            ->sortByDesc('revenue')
            ->values();

        $freeProducts = $products->where('is_free', true)->count();
        $paidProducts = $products->where('is_free', false)->count();
        $serviceProducts = $products->where('product_type', 'service')->count();
        $digitalProducts = $products->where('product_type', 'digital')->count();

        $bestCategory = $productsByCategory->first();

        return [
            'headline' => [
                'totalRevenue' => $totalRevenue,
                'thisMonthRevenue' => $thisMonthRevenue,
                'lastMonthRevenue' => $lastMonthRevenue,
                'revenueChangePercent' => $revenueChangePercent,
                'averageMonthlyRevenue' => (int) ($revenueSummary['averageMonthlyRevenue'] ?? 0),
            ],
            'monthlyTrend' => $monthly->map(fn ($item) => [
                'month' => $item['month'],
                'sales' => $item['sales'],
                'revenue' => $item['revenue'],
            ])->values(),
            'categoryRevenue' => $productsByCategory,
            'catalogMix' => [
                'freeProducts' => $freeProducts,
                'paidProducts' => $paidProducts,
                'serviceProducts' => $serviceProducts,
                'digitalProducts' => $digitalProducts,
            ],
            'insights' => [
                'bestCategory' => $bestCategory['category'] ?? 'Aucune',
                'bestCategoryRevenue' => $bestCategory['revenue'] ?? 0,
                'bestCategorySales' => $bestCategory['sales'] ?? 0,
                'topFreeProductsShare' => $products->count() > 0 ? round(($freeProducts / $products->count()) * 100, 1) : 0,
                'topPaidProductsShare' => $products->count() > 0 ? round(($paidProducts / $products->count()) * 100, 1) : 0,
            ],
        ];
    }

    private function productSeedImageUrl(string $slug, int $width = 1200, int $height = 900): string
    {
        return "https://picsum.photos/seed/" . urlencode($slug) . "/{$width}/{$height}";
    }

    private function categorySeedImageUrl(string $slug, int $width = 1200, int $height = 900): string
    {
        return "https://picsum.photos/seed/category-" . urlencode($slug) . "/{$width}/{$height}";
    }

    private function blogSeedImageUrl(string $slug, int $width = 1400, int $height = 900): string
    {
        return "https://picsum.photos/seed/blog-" . urlencode($slug) . "/{$width}/{$height}";
    }

    private function buildDefaultProductGallery(string $slug): array
    {
        return collect(range(1, 3))->map(fn ($index) => [
            'id' => "{$slug}-{$index}",
            'url' => $this->productSeedImageUrl("{$slug}-{$index}", 1200, 900),
            'is_primary' => $index === 1,
        ])->all();
    }

    private function sellerAvatarUrl(User $seller): string
    {
        return 'https://i.pravatar.cc/400?u=' . urlencode($seller->email ?: (string) $seller->id);
    }

    private function formatMediaPath(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return '/storage/' . ltrim($path, '/');
    }

    private function buildStudentSpaceData(Collection $products): array
    {
        $studentProducts = $products
            ->filter(fn ($product) => $this->isStudentFriendlyProduct($product))
            ->values();

        $studentBundles = $studentProducts
            ->filter(fn ($product) => str_contains(mb_strtolower($product['name'] ?? ''), 'pack'))
            ->sortByDesc(function ($product) {
                return (($product['rating'] ?? 0) * 1000) + ($product['sales'] ?? 0);
            })
            ->take(3)
            ->values();

        $underBudgetCount = $studentProducts->filter(fn ($product) => ($product['price'] ?? 0) > 0 && ($product['price'] ?? 0) <= 500)->count();
        $freeCount = $studentProducts->where('is_free', true)->count();

        return [
            'headline' => [
                'title' => 'Espace Etudiant',
                'description' => 'Des ressources utiles pour reviser, apprendre, preparer un CV et progresser avec un budget adapte aux etudiants algeriens.',
                'freeCount' => $freeCount,
                'underBudgetCount' => $underBudgetCount,
                'beginnerCount' => $studentProducts->where('skill_level', 'debutant')->count(),
            ],
            'bundles' => $studentBundles->all(),
            'featured' => $studentProducts
                ->sortByDesc(function ($product) {
                    $score = ($product['rating'] ?? 0) * 100;
                    $score += $product['sales'] ?? 0;
                    $score += ($product['is_free'] ?? false) ? 35 : 0;
                    $score += (($product['price'] ?? 0) > 0 && ($product['price'] ?? 0) <= 500) ? 20 : 0;

                    return $score;
                })
                ->take(8)
                ->values()
                ->all(),
        ];
    }

    private function buildStudentNeeds(Collection $products): array
    {
        $needs = [
            [
                'slug' => 'bac-bem',
                'label' => 'Bac & BEM',
                'description' => 'Annales, resumes et packs de revision pour reussir les examens.',
                'keywords' => ['bac', 'bem', 'concours'],
                'categories' => ['packs éducatifs', 'packs educatifs'],
                'tone' => 'emerald',
            ],
            [
                'slug' => 'universite',
                'label' => 'Universite',
                'description' => 'Cours, supports et ressources pour licence, master et filieres techniques.',
                'keywords' => ['licence', 'master', 'universite'],
                'categories' => ['packs éducatifs', 'packs educatifs', 'mini-cours', 'ebooks'],
                'tone' => 'sky',
            ],
            [
                'slug' => 'cv-stage',
                'label' => 'CV & Stage',
                'description' => 'Modeles de CV, lettres et packs pour preparer stage, entretien et insertion pro.',
                'keywords' => ['cv', 'lettre', 'entretien', 'stage'],
                'categories' => ['cv & lettres de motivation'],
                'tone' => 'amber',
            ],
            [
                'slug' => 'programmation',
                'label' => 'Programmation',
                'description' => 'Packs debutants, cours techniques et ressources pour apprendre a coder.',
                'keywords' => ['programmation', 'code', 'laravel', 'php', 'web'],
                'categories' => ['développement web', 'developpement web', 'mini-cours', 'packs éducatifs', 'packs educatifs'],
                'tone' => 'violet',
            ],
        ];

        return collect($needs)->map(function ($need) use ($products) {
            $matches = $products->filter(function ($product) use ($need) {
                $category = mb_strtolower($product['category'] ?? '');
                $name = mb_strtolower($product['name'] ?? '');

                $matchCategory = in_array($category, $need['categories'], true);
                $matchKeyword = collect($need['keywords'])->contains(fn ($keyword) => str_contains($name, $keyword));

                return $matchCategory || $matchKeyword;
            })->sortByDesc(function ($product) {
                return (($product['rating'] ?? 0) * 1000) + ($product['sales'] ?? 0) + (($product['is_free'] ?? false) ? 40 : 0);
            })->values();

            return [
                'slug' => $need['slug'],
                'label' => $need['label'],
                'description' => $need['description'],
                'tone' => $need['tone'],
                'count' => $matches->count(),
                'products' => $matches->take(4)->values()->all(),
            ];
        })->all();
    }

    private function isStudentFriendlyProduct(array $product): bool
    {
        $category = mb_strtolower($product['category'] ?? '');
        $name = mb_strtolower($product['name'] ?? '');

        $studentCategories = [
            'packs éducatifs',
            'packs educatifs',
            'mini-cours',
            'cv & lettres de motivation',
            'ebooks',
            'développement web',
            'developpement web',
        ];

        return in_array($category, $studentCategories, true)
            || str_contains($name, 'bac')
            || str_contains($name, 'bem')
            || str_contains($name, 'cv')
            || str_contains($name, 'concours')
            || str_contains($name, 'programmation');
    }

    private function buildStudentBadges(array $product): array
    {
        $badges = [];
        $category = mb_strtolower($product['category'] ?? '');
        $name = mb_strtolower($product['name'] ?? '');
        $price = (int) ($product['price'] ?? 0);
        $rating = (float) ($product['rating'] ?? 0);
        $sales = (int) ($product['sales'] ?? 0);

        if (!empty($product['is_free'])) {
            $badges[] = ['label' => 'Gratuit', 'tone' => 'green'];
        }

        if ($price > 0 && $price <= 500) {
            $badges[] = ['label' => 'Petit budget', 'tone' => 'amber'];
        }

        if (($product['skill_level'] ?? null) === 'debutant') {
            $badges[] = ['label' => 'Debutant', 'tone' => 'sky'];
        }

        if (in_array($category, ['packs éducatifs', 'packs educatifs', 'mini-cours'], true)
            || str_contains($name, 'bac')
            || str_contains($name, 'bem')
        ) {
            $badges[] = ['label' => 'Etudiant', 'tone' => 'violet'];
        }

        if ($rating >= 4.8 || $sales >= 2000) {
            $badges[] = ['label' => 'Tres demande', 'tone' => 'rose'];
        }

        return array_slice($badges, 0, 3);
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
