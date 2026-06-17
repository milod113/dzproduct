<?php

use App\Http\Controllers\AffiliateController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\PaymentCallbackController;
use App\Http\Controllers\FreeProductController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerMessageController;
use App\Http\Controllers\SellerPlanRequestController;
use App\Http\Controllers\SellerProfileController;
use App\Http\Controllers\SellerProductController;
use App\Http\Controllers\ServiceMissionController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'home'])->name('home');

Route::get('/boutique', [PageController::class, 'shop'])->name('shop');
Route::get('/espace-etudiant', [PageController::class, 'studentSpace'])->name('student.space');
Route::get('/gratuits', [PageController::class, 'freeProducts'])->name('free.products');
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
Route::get('/remboursement', fn () => Inertia::render('RefundPolicy'))->name('refund.policy');
Route::get('/conditions-vendeur', fn () => Inertia::render('SellerTerms'))->name('seller.terms');
Route::get('/copyright', fn () => Inertia::render('CopyrightPolicy'))->name('copyright.policy');
Route::get('/protection-acheteur', fn () => Inertia::render('BuyerProtection'))->name('buyer.protection');

Route::middleware(['auth'])->group(function () {
    Route::get('/tableau-de-bord', [PageController::class, 'dashboard'])->name('dashboard');
    Route::get('/mes-telechargements', [PageController::class, 'myDownloads'])->name('downloads');
    Route::get('/commande-succes', fn () => Inertia::render('OrderSuccess'))->name('order.success');
    Route::get('/favoris', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/favoris', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/favoris/{productId}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::post('/checkout/coupon', [CheckoutController::class, 'validateCoupon'])->name('checkout.coupon');

    Route::get('/paiement/simule/{transaction_id}/{order_id}', [PaymentCallbackController::class, 'simulatedForm'])->name('payment.simulated.form');
    Route::post('/paiement/simule/confirmer', [PaymentCallbackController::class, 'simulatedConfirm'])->name('payment.simulated.confirm');
    Route::get('/paiement/retour', [PaymentCallbackController::class, 'returnCallback'])->name('payment.return');
    Route::get('/paiement/annuler', [PaymentCallbackController::class, 'cancel'])->name('payment.cancel');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead'])->name('notifications.read-all');
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markRead'])->name('notifications.read');
    Route::get('/mes-services', [ServiceMissionController::class, 'clientIndex'])->name('client.services.index');
    Route::get('/mes-services/{id}', [ServiceMissionController::class, 'clientShow'])->name('client.services.show');
    Route::patch('/mes-services/{id}/brief', [ServiceMissionController::class, 'submitBrief'])->name('client.services.brief');
    Route::post('/mes-services/{id}/messages', [ServiceMissionController::class, 'addMessage'])->name('client.services.messages.store');
    Route::patch('/mes-services/{id}/action', [ServiceMissionController::class, 'clientAction'])->name('client.services.action');

    Route::get('/telechargement/{productId}', [DownloadController::class, 'download'])->name('download.file');
    Route::get('/factures/{invoice}/telecharger', [InvoiceController::class, 'download'])->name('invoice.download');
    Route::get('/affiliation', [AffiliateController::class, 'dashboard'])->name('affiliate.dashboard');
    Route::post('/affiliation/generer-code', [AffiliateController::class, 'generateCode'])->name('affiliate.generate');
    Route::post('/affiliation/retraits', [AffiliateController::class, 'requestWithdrawal'])->name('affiliate.withdrawals.store');
    Route::post('/gratuits/{productId}/telecharger', [FreeProductController::class, 'claim'])->name('free.products.claim');
});

Route::prefix('admin')->middleware(['auth', 'admin', 'twofactor'])->group(function () {
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
    Route::get('/vendeurs', [AdminController::class, 'sellers'])->name('admin.sellers');
    Route::patch('/vendeurs/{id}', [AdminController::class, 'sellerUpdate'])->name('admin.sellers.update');
    Route::get('/affiliation/retraits', [AdminController::class, 'affiliateWithdrawals'])->name('admin.affiliate-withdrawals');
    Route::patch('/affiliation/retraits/{id}', [AdminController::class, 'affiliateWithdrawalUpdate'])->name('admin.affiliate-withdrawals.update');
    Route::post('/vendeurs/{sellerId}/messages', [SellerMessageController::class, 'storeFromAdmin'])->name('admin.sellers.messages.store');
    Route::get('/demandes-plans-vendeurs', [SellerPlanRequestController::class, 'adminIndex'])->name('admin.seller-plan-requests');
    Route::patch('/demandes-plans-vendeurs/{id}/approve', [SellerPlanRequestController::class, 'approve'])->name('admin.seller-plan-requests.approve');
    Route::patch('/demandes-plans-vendeurs/{id}/reject', [SellerPlanRequestController::class, 'reject'])->name('admin.seller-plan-requests.reject');
    Route::get('/avis', fn () => Inertia::render('Admin/Reviews'))->name('admin.reviews');
    Route::get('/coupons', fn () => Inertia::render('Admin/Coupons'))->name('admin.coupons');
    Route::get('/articles', fn () => Inertia::render('Admin/BlogPosts'))->name('admin.blog');
    Route::get('/parametres', fn () => Inertia::render('Admin/Settings'))->name('admin.settings');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/two-factor', [ProfileController::class, 'updateTwoFactor'])->name('profile.two-factor.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'seller', 'twofactor'])->prefix('vendeur')->group(function () {
    Route::get('/', [PageController::class, 'vendeurDashboard'])->name('vendeur.dashboard');
    Route::get('/profil', [SellerProfileController::class, 'edit'])->name('vendeur.profile.edit');
    Route::patch('/profil', [SellerProfileController::class, 'update'])->name('vendeur.profile.update');
    Route::get('/produits', [PageController::class, 'vendeurProduits'])->name('vendeur.produits');
    Route::get('/produits/creer', [SellerProductController::class, 'create'])->name('vendeur.produits.create');
    Route::post('/produits', [SellerProductController::class, 'store'])->name('vendeur.produits.store');
    Route::get('/produits/{id}/modifier', [SellerProductController::class, 'edit'])->name('vendeur.produits.edit');
    Route::put('/produits/{id}', [SellerProductController::class, 'update'])->name('vendeur.produits.update');
    Route::delete('/produits/{id}', [SellerProductController::class, 'destroy'])->name('vendeur.produits.destroy');
    Route::get('/messages', [SellerMessageController::class, 'index'])->name('vendeur.messages');
    Route::patch('/messages/{messageId}/reply', [SellerMessageController::class, 'reply'])->name('vendeur.messages.reply');
    Route::get('/plans', [SellerPlanRequestController::class, 'sellerIndex'])->name('vendeur.plans');
    Route::post('/plans', [SellerPlanRequestController::class, 'sellerStore'])->name('vendeur.plans.store');
    Route::get('/services', [ServiceMissionController::class, 'sellerIndex'])->name('vendeur.services.index');
    Route::get('/services/{id}', [ServiceMissionController::class, 'sellerShow'])->name('vendeur.services.show');
    Route::post('/services/{id}/messages', [ServiceMissionController::class, 'addMessage'])->name('vendeur.services.messages.store');
    Route::patch('/services/{id}/status', [ServiceMissionController::class, 'sellerUpdateStatus'])->name('vendeur.services.status');
    Route::get('/commandes', [PageController::class, 'vendeurCommandes'])->name('vendeur.commandes');
    Route::get('/revenus', [PageController::class, 'vendeurRevenus'])->name('vendeur.revenus');
});

Route::post('/api/payment/callback', [PaymentCallbackController::class, 'callback'])->name('payment.callback');

Route::get('/connexion', fn () => Inertia::render('Login'))->name('connexion');
Route::get('/inscription', fn () => Inertia::render('Register'))->name('inscription');

Route::fallback(fn () => Inertia::render('NotFound'));

require __DIR__.'/auth.php';
