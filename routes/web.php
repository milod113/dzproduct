<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'home'])->name('home');

Route::get('/boutique', [PageController::class, 'shop'])->name('shop');
Route::get('/boutique/{slug}', [PageController::class, 'productDetails'])->name('product.details');
Route::get('/vendeurs/{id}', [PageController::class, 'sellerProfile'])->name('seller.profile');
Route::get('/categories', [PageController::class, 'categories'])->name('categories');
Route::get('/categories/{slug}', [PageController::class, 'categoryShow'])->name('category.show');
Route::get('/blog', [PageController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [PageController::class, 'blogDetails'])->name('blog.details');

Route::get('/panier', [CartController::class, 'index'])->name('cart');
Route::post('/panier/ajouter', [CartController::class, 'add'])->name('cart.add');
Route::post('/panier/supprimer/{cartId}', [CartController::class, 'remove'])->name('cart.remove');

Route::get('/a-propos', fn () => Inertia::render('About'))->name('about');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');
Route::get('/faq', fn () => Inertia::render('FAQ'))->name('faq');
Route::get('/conditions', fn () => Inertia::render('Terms'))->name('terms');
Route::get('/confidentialite', fn () => Inertia::render('PrivacyPolicy'))->name('privacy');

Route::middleware(['auth'])->group(function () {
    Route::get('/tableau-de-bord', [PageController::class, 'dashboard'])->name('dashboard');
    Route::get('/mes-telechargements', [PageController::class, 'myDownloads'])->name('downloads');
    Route::get('/commande-succes', fn () => Inertia::render('OrderSuccess'))->name('order.success');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::post('/checkout/coupon', [CheckoutController::class, 'validateCoupon'])->name('checkout.coupon');

    Route::get('/telechargement/{productId}', [DownloadController::class, 'download'])->name('download.file');
});

Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', fn () => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');

    Route::get('/produits', [AdminController::class, 'products'])->name('admin.products');
    Route::get('/produits/creer', [AdminController::class, 'productCreate'])->name('admin.products.create');
    Route::post('/produits', [AdminController::class, 'productStore'])->name('admin.products.store');
    Route::get('/produits/{id}/modifier', [AdminController::class, 'productEdit'])->name('admin.products.edit');
    Route::put('/produits/{id}', [AdminController::class, 'productUpdate'])->name('admin.products.update');
    Route::delete('/produits/{id}', [AdminController::class, 'productDestroy'])->name('admin.products.destroy');

    Route::get('/categories', fn () => Inertia::render('Admin/Categories'))->name('admin.categories');
    Route::get('/commandes', fn () => Inertia::render('Admin/Orders'))->name('admin.orders');
    Route::get('/clients', fn () => Inertia::render('Admin/Customers'))->name('admin.customers');
    Route::get('/avis', fn () => Inertia::render('Admin/Reviews'))->name('admin.reviews');
    Route::get('/coupons', fn () => Inertia::render('Admin/Coupons'))->name('admin.coupons');
    Route::get('/articles', fn () => Inertia::render('Admin/BlogPosts'))->name('admin.blog');
    Route::get('/parametres', fn () => Inertia::render('Admin/Settings'))->name('admin.settings');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'seller'])->prefix('vendeur')->group(function () {
    Route::get('/', [PageController::class, 'vendeurDashboard'])->name('vendeur.dashboard');
    Route::get('/produits', [PageController::class, 'vendeurProduits'])->name('vendeur.produits');
    Route::get('/produits/creer', [SellerProductController::class, 'create'])->name('vendeur.produits.create');
    Route::post('/produits', [SellerProductController::class, 'store'])->name('vendeur.produits.store');
    Route::get('/produits/{id}/modifier', [SellerProductController::class, 'edit'])->name('vendeur.produits.edit');
    Route::put('/produits/{id}', [SellerProductController::class, 'update'])->name('vendeur.produits.update');
    Route::delete('/produits/{id}', [SellerProductController::class, 'destroy'])->name('vendeur.produits.destroy');
    Route::get('/commandes', [PageController::class, 'vendeurCommandes'])->name('vendeur.commandes');
    Route::get('/revenus', [PageController::class, 'vendeurRevenus'])->name('vendeur.revenus');
});

Route::get('/connexion', fn () => Inertia::render('Login'))->name('connexion');
Route::get('/inscription', fn () => Inertia::render('Register'))->name('inscription');

Route::fallback(fn () => Inertia::render('NotFound'));

require __DIR__.'/auth.php';
