import { Link, router, usePage } from '@inertiajs/react'
import SellerBadges from '@/Components/SellerBadges'
import AffiliateSharePanel from '@/Components/AffiliateSharePanel'

function RatingRow({ rating, sales }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                        key={i}
                        className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? 'text-amber-500' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="ml-1 text-xs font-semibold text-text-dark">{rating?.toFixed?.(1) ?? rating}</span>
            </div>
            <span className="text-xs text-text-muted">{sales} vente{sales > 1 ? 's' : ''}</span>
        </div>
    )
}

function StudentBadge({ badge }) {
    const toneClass = {
        green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        amber: 'border-amber-200 bg-amber-50 text-amber-700',
        sky: 'border-sky-200 bg-sky-50 text-sky-700',
        violet: 'border-violet-200 bg-violet-50 text-violet-700',
        rose: 'border-rose-200 bg-rose-50 text-rose-700',
    }[badge?.tone] || 'border-slate-200 bg-slate-50 text-slate-700'

    return (
        <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${toneClass}`}>
            {badge?.label}
        </span>
    )
}

export default function ProductCard({ product }) {
    const studentBadges = product.student_badges || []
    const { auth } = usePage().props

    const addToCart = () => {
        router.post('/panier/ajouter', { product_id: product.id }, {
            preserveScroll: true,
            preserveState: true,
        })
    }

    const claimFree = () => {
        if (!auth?.user) {
            router.visit('/connexion')
            return
        }

        router.post(`/gratuits/${product.id}/telecharger`)
    }

    const toggleWishlist = () => {
        if (!auth?.user) {
            router.visit('/connexion')
            return
        }

        if (product.is_favorited) {
            router.delete(`/favoris/${product.id}`, {
                preserveScroll: true,
                preserveState: true,
            })
            return
        }

        router.post('/favoris', { product_id: product.id }, {
            preserveScroll: true,
            preserveState: true,
        })
    }

    return (
        <article className="group overflow-hidden rounded-[30px] border border-border/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]">
            <div className="relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/25 to-transparent opacity-70" />
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                    }}
                />
                <div className="hidden h-64 w-full items-center justify-center bg-[linear-gradient(135deg,#eef8f0_0%,#ffffff_50%,#e5f4e8_100%)]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-[0_16px_35px_rgba(15,23,42,0.12)]">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                </div>

                <div className="absolute left-4 top-4 z-20 inline-flex rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-dark shadow-[0_12px_28px_rgba(15,23,42,0.1)] backdrop-blur">
                    {product.category}
                </div>
                <div className={`absolute left-4 top-16 z-20 inline-flex rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-[0_12px_28px_rgba(15,23,42,0.1)] backdrop-blur ${
                    product.is_free
                        ? 'border-emerald-200 bg-emerald-50/95 text-emerald-700'
                        : product.product_type === 'service'
                        ? 'border-sky-200 bg-sky-50/95 text-sky-700'
                        : 'border-emerald-200 bg-emerald-50/95 text-emerald-700'
                }`}>
                    {product.is_free ? 'Gratuit' : product.product_type === 'service' ? 'Consulting / Service' : 'Telechargement'}
                </div>

                <button
                    type="button"
                    onClick={toggleWishlist}
                    className={`absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-2xl border shadow-[0_12px_28px_rgba(15,23,42,0.12)] backdrop-blur transition-all ${
                        product.is_favorited
                            ? 'border-rose-200 bg-rose-50 text-rose-600'
                            : 'border-white/70 bg-white/90 text-text-muted hover:text-rose-500'
                    }`}
                    aria-label={product.is_favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                    <svg className="h-5 w-5" fill={product.is_favorited ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-3">
                    {product.seller ? (
                        <div className="rounded-2xl border border-white/60 bg-white/88 px-3 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.1)] backdrop-blur">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Vendeur</p>
                            <Link href={`/vendeurs/${product.seller.id}`} className="mt-1 block text-sm font-semibold text-text-dark transition-colors hover:text-primary">
                                {product.seller.name}
                            </Link>
                        </div>
                    ) : (
                        <div />
                    )}

                    <div className="rounded-2xl bg-[#112b21] px-4 py-3 text-right text-white shadow-[0_16px_35px_rgba(17,43,33,0.28)]">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/70">Prix</p>
                        <p className="mt-1 text-lg font-bold">{product.is_free ? 'Gratuit' : `${product.price.toLocaleString('fr-DZ')} DZD`}</p>
                    </div>
                </div>
            </div>

            <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold leading-tight text-text-dark line-clamp-2">{product.name}</h3>
                        <p className="mt-3 text-sm leading-7 text-text-muted line-clamp-2">{product.description}</p>
                    </div>
                </div>

                {product.seller && (
                    <SellerBadges seller={product.seller} className="mt-4" compact />
                )}

                {studentBadges.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {studentBadges.map((badge) => (
                            <StudentBadge key={`${product.id}-${badge.label}`} badge={badge} />
                        ))}
                    </div>
                )}

                <div className="mt-5 rounded-2xl bg-[#f8fbf8] p-4">
                    <RatingRow rating={product.rating ?? 0} sales={product.sales ?? 0} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                        href={`/boutique/${product.slug}`}
                        className="inline-flex items-center justify-center rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-text-dark transition-all hover:border-primary/25 hover:text-primary"
                    >
                        Voir le produit
                    </Link>
                    {product.is_free ? (
                        <button
                            onClick={claimFree}
                            className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(11,122,53,0.22)] transition-all hover:bg-primary-dark"
                        >
                            Telecharger
                        </button>
                    ) : (
                        <button
                            onClick={addToCart}
                            className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(11,122,53,0.22)] transition-all hover:bg-primary-dark"
                        >
                            {product.product_type === 'service' ? 'Reserver' : 'Ajouter'}
                        </button>
                    )}
                </div>

                <div className="mt-3">
                    <AffiliateSharePanel product={product} compact />
                </div>
            </div>
        </article>
    )
}
