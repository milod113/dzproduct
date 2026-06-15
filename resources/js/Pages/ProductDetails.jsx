import { Link, router, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import ProductCard from '@/Components/ProductCard'
import SellerBadges from '@/Components/SellerBadges'

const fileFormats = ['PDF', 'DOCX', 'PPTX', 'ZIP', 'MP4', 'CANVA']

const includedItems = [
    { label: 'Guide complet et structure professionnelle', included: true },
    { label: 'Modeles prets a personnaliser', included: true },
    { label: 'Acces aux mises a jour futures', included: true },
    { label: 'Support prioritaire apres achat', included: true },
    { label: 'Certification premium incluse', included: false },
]

const benefitItems = [
    'Contenu adapte au marche algerien',
    'Telechargement instantane 24/7',
    'Compatible mobile et ordinateur',
    'Utilisation simple et rapide',
    'Qualite validee par la marketplace',
    'Gain de temps immediat pour l acheteur',
]

const mockReviews = [
    {
        name: 'Mohamed K.',
        rating: 5,
        date: '15 mars 2025',
        comment: 'Excellent produit. La presentation est claire, la livraison a ete immediate et le contenu est vraiment utile.',
    },
    {
        name: 'Fatima Z.',
        rating: 5,
        date: '2 mars 2025',
        comment: 'Tres satisfaite de mon achat. Le vendeur inspire confiance et le produit est bien adapte au contexte local.',
    },
    {
        name: 'Rachid B.',
        rating: 4,
        date: '20 fevrier 2025',
        comment: 'Bon contenu dans l ensemble, simple a utiliser et pratique pour aller vite.',
    },
]

function StarRating({ rating, size = 'md', tone = 'default' }) {
    const sizeClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4.5 w-4.5'
    const activeClass = tone === 'warm' ? 'text-amber-500' : 'text-accent-red'

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`${sizeClass} ${i < Math.floor(rating) ? activeClass : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )
}

function InfoCard({ title, children }) {
    return (
        <div className="rounded-[28px] border border-border/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-8">
            <h2 className="text-xl font-bold text-text-dark">{title}</h2>
            <div className="mt-5">{children}</div>
        </div>
    )
}

export default function ProductDetails() {
    const { product, related: relatedProducts } = usePage().props
    const related = relatedProducts || []

    const addToCart = () => {
        router.post('/panier/ajouter', { product_id: product.id }, {
            preserveScroll: true,
            preserveState: true,
        })
    }

    if (!product) {
        return (
            <AppLayout>
                <div className="container-max py-20 text-center">
                    <h1 className="text-2xl font-bold text-text-dark">Produit introuvable</h1>
                    <Link href="/boutique" className="btn-primary mt-4 inline-flex">Retour a la boutique</Link>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout>
            <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbf9_0%,#ffffff_62%,#f6faf7_100%)] pb-16 pt-8">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
                    <div className="absolute left-1/2 top-24 h-px w-64 -translate-x-1/2 bg-primary/15" />
                </div>

                <div className="container-max relative">
                    <nav className="mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 text-sm text-text-muted">
                        <Link href="/" className="shrink-0 transition-colors hover:text-primary">Accueil</Link>
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link href="/boutique" className="shrink-0 transition-colors hover:text-primary">Boutique</Link>
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link href={`/categories/${product.categorySlug}`} className="shrink-0 transition-colors hover:text-primary">{product.category}</Link>
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="max-w-[220px] truncate font-medium text-text-dark">{product.name}</span>
                    </nav>

                    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                        <div>
                            <div className="overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[0_26px_70px_rgba(15,23,42,0.12)]">
                                <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#edf7ef_0%,#ffffff_48%,#e6f3e9_100%)]">
                                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            e.target.nextSibling.style.display = 'flex'
                                        }}
                                    />
                                    <div className="hidden h-full w-full items-center justify-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                                                <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                            </div>
                                            <span className="rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-text-dark shadow-sm">{product.name}</span>
                                        </div>
                                    </div>

                                    <div className="absolute left-5 top-5 inline-flex rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-dark shadow-[0_12px_28px_rgba(15,23,42,0.1)] backdrop-blur">
                                        {product.category}
                                    </div>

                                    <div className="absolute bottom-5 right-5 rounded-2xl bg-[#112b21] px-4 py-3 text-white shadow-[0_18px_40px_rgba(17,43,33,0.28)]">
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/70">Prix</p>
                                        <p className="mt-1 text-2xl font-bold">{product.price.toLocaleString('fr-DZ')} DZD</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                                        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                                            <img src={product.image} alt={`${product.name} ${i}`} className="h-full w-full object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:sticky lg:top-24">
                            <div className="rounded-[34px] border border-white/70 bg-white/90 p-6 shadow-[0_26px_70px_rgba(15,23,42,0.12)] backdrop-blur md:p-8">
                                <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                                    Produit premium
                                </div>

                                <h1 className="mt-5 text-3xl font-bold leading-tight text-text-dark md:text-4xl">
                                    {product.name}
                                </h1>

                                <div className="mt-5 flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 rounded-full bg-[#fff7e8] px-3 py-2">
                                        <StarRating rating={product.rating} tone="warm" />
                                        <span className="text-sm font-semibold text-text-dark">{product.rating}/5</span>
                                    </div>
                                    <span className="text-sm text-text-muted">{product.sales} ventes</span>
                                    <span className="text-sm text-primary">Telechargement instantane</span>
                                </div>

                                {product.seller && (
                                    <div className="mt-6 rounded-[26px] border border-border/80 bg-[#fbfcfb] p-5">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Vendu par</p>
                                                <Link href={`/vendeurs/${product.seller.id}`} className="mt-2 block text-lg font-bold text-text-dark transition-colors hover:text-primary">
                                                    {product.seller.name}
                                                </Link>
                                                {product.seller.wilaya && <p className="mt-1 text-sm text-text-muted">{product.seller.wilaya}, Algerie</p>}
                                            </div>
                                            <SellerBadges seller={product.seller} />
                                        </div>
                                        <div className="mt-4">
                                            <Link
                                                href={`/vendeurs/${product.seller.id}?product=${product.id}`}
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                                            >
                                                Contacter ce vendeur
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6h-15" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                <p className="mt-6 text-base leading-8 text-text-muted">
                                    {product.description}
                                </p>

                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                                        <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">Acces</p>
                                        <p className="mt-2 text-sm font-semibold text-text-dark">Disponible immediatement apres paiement</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                                        <p className="text-xs uppercase tracking-[0.18em] text-slate-600">Formats</p>
                                        <p className="mt-2 text-sm font-semibold text-text-dark">{fileFormats.slice(0, 3).join(', ')} +3</p>
                                    </div>
                                </div>

                                <div className="mt-7 grid gap-3">
                                    <button onClick={addToCart} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(11,122,53,0.24)] transition-all hover:bg-primary-dark">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                        Ajouter au panier
                                    </button>
                                    <Link href="/checkout" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-5 py-4 text-base font-semibold text-text-dark transition-all hover:border-primary/25 hover:text-primary">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v9.575c0 .621-.504 1.125-1.125 1.125h-.75M3.75 4.5h-.75" />
                                        </svg>
                                        Acheter maintenant
                                    </Link>
                                </div>

                                <div className="mt-6 rounded-[24px] bg-[#0f2f23] p-5 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Paiement securise et livraison automatique</p>
                                            <p className="mt-1 text-xs text-emerald-100/80">Acces a vie et support marketplace apres achat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="grid gap-6">
                            <InfoCard title="Description detaillee">
                                <div className="space-y-4 text-sm leading-8 text-text-muted">
                                    <p>
                                        Ce produit a ete concu pour offrir un resultat rapide, professionnel et simple a utiliser. Il aide les acheteurs a gagner du temps tout en profitant d un contenu utile, clair et adapte a leurs besoins.
                                    </p>
                                    <p>
                                        Avec une note de {product.rating}/5 et {product.sales} ventes, ce produit fait partie des references qui inspirent confiance sur la marketplace. Vous obtenez un acces immediat apres votre paiement, sans attente.
                                    </p>
                                    <p>
                                        Chaque ressource presentee ici suit une logique premium: execution rapide, design propre, orientation pratique et valeur reelle pour le contexte algerien.
                                    </p>
                                </div>
                            </InfoCard>

                            <InfoCard title="Ce que vous allez obtenir">
                                <div className="grid gap-3">
                                    {includedItems.map((item) => (
                                        <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-[#fbfcfb] p-4">
                                            {item.included ? (
                                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div>
                                                <p className={`text-sm font-medium ${item.included ? 'text-text-dark' : 'text-text-muted line-through'}`}>
                                                    {item.label}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </InfoCard>

                            <InfoCard title="Avis clients">
                                <div className="grid gap-5">
                                    <div className="rounded-[24px] bg-[#fff9ec] p-5">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-3xl font-bold text-text-dark">{product.rating}/5</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <StarRating rating={product.rating} tone="warm" />
                                                    <span className="text-sm text-text-muted">sur la base des avis clients</span>
                                                </div>
                                            </div>
                                            <div className="text-sm text-text-muted">
                                                {product.sales} acheteurs ont deja commande ce produit
                                            </div>
                                        </div>
                                    </div>

                                    {mockReviews.map((review) => (
                                        <div key={`${review.name}-${review.date}`} className="rounded-[24px] border border-border/70 bg-white p-5">
                                            <div className="flex gap-4">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-xs font-bold text-primary">
                                                    {review.name.split(' ').map((part) => part[0]).join('')}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                        <p className="text-sm font-semibold text-text-dark">{review.name}</p>
                                                        <span className="text-xs text-text-muted">{review.date}</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <StarRating rating={review.rating} size="sm" tone="warm" />
                                                        <span className="text-xs font-medium text-text-muted">{review.rating}/5</span>
                                                    </div>
                                                    <p className="mt-3 text-sm leading-7 text-text-muted">{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </InfoCard>
                        </div>

                        <div className="grid gap-6">
                            <InfoCard title="Informations produit">
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between gap-4 text-sm">
                                        <span className="text-text-muted">Categorie</span>
                                        <Link href={`/categories/${product.categorySlug}`} className="font-semibold text-primary hover:underline">
                                            {product.category}
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 text-sm">
                                        <span className="text-text-muted">Ventes</span>
                                        <span className="font-semibold text-text-dark">{product.sales}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 text-sm">
                                        <span className="text-text-muted">Note moyenne</span>
                                        <span className="font-semibold text-text-dark">{product.rating}/5</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 text-sm">
                                        <span className="text-text-muted">Formats</span>
                                        <span className="font-semibold text-text-dark">{fileFormats.slice(0, 2).join(', ')}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 text-sm">
                                        <span className="text-text-muted">Livraison</span>
                                        <span className="font-semibold text-primary">Instantanee</span>
                                    </div>
                                    {product.seller?.badges?.length > 0 && (
                                        <div className="border-t border-border pt-4">
                                            <p className="mb-3 text-sm text-text-muted">Badges de confiance</p>
                                            <SellerBadges seller={product.seller} />
                                        </div>
                                    )}
                                </div>
                            </InfoCard>

                            <InfoCard title="Avantages">
                                <div className="grid gap-3">
                                    {benefitItems.map((benefit) => (
                                        <div key={benefit} className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </div>
                                            <p className="text-sm leading-7 text-text-muted">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </InfoCard>
                        </div>
                    </div>

                    {related.length > 0 && (
                        <div className="mt-16">
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Suggestions premium</p>
                                    <h2 className="mt-2 text-2xl font-bold text-text-dark">Produits similaires</h2>
                                </div>
                                <p className="text-sm text-text-muted">D autres ressources qui peuvent vous interesser</p>
                            </div>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                {related.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    )
}
