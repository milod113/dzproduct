import { Link, usePage } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'
import ProductCard from '@/Components/ProductCard'

function Surface({ children, className = '' }) {
    return (
        <section className={`overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.09)] backdrop-blur ${className}`}>
            {children}
        </section>
    )
}

function StatCard({ label, value, hint, icon, tone = 'emerald' }) {
    const toneClass = {
        emerald: 'from-emerald-50 to-white text-emerald-700 border-emerald-100',
        sky: 'from-sky-50 to-white text-sky-700 border-sky-100',
        amber: 'from-amber-50 to-white text-amber-700 border-amber-100',
        rose: 'from-rose-50 to-white text-rose-700 border-rose-100',
    }[tone]

    return (
        <div className={`rounded-[26px] border bg-gradient-to-br p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)] ${toneClass}`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
                    <p className="mt-3 text-3xl font-bold text-text-dark">{value}</p>
                    {hint && <p className="mt-2 text-sm text-text-muted">{hint}</p>}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                </div>
            </div>
        </div>
    )
}

function HighlightPill({ children, tone = 'default' }) {
    const toneClass = {
        default: 'bg-white/12 text-white border-white/12',
        green: 'bg-emerald-400/12 text-emerald-100 border-emerald-300/20',
        rose: 'bg-rose-400/12 text-rose-100 border-rose-300/20',
        amber: 'bg-amber-300/12 text-amber-50 border-amber-200/20',
    }[tone]

    return (
        <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
            {children}
        </div>
    )
}

export default function Wishlist() {
    const { products = [] } = usePage().props
    const categories = [...new Set(products.map((p) => p.category).filter(Boolean))]
    const totalValue = products.reduce((s, p) => s + (p.is_free ? 0 : p.price), 0)
    const freeCount = products.filter((p) => p.is_free).length

    const stats = [
        {
            label: 'Favoris',
            value: products.length,
            hint: 'produits sauvegardes',
            icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
            tone: 'rose',
        },
        {
            label: 'Categories',
            value: categories.length,
            hint: 'familles representees',
            icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z',
            tone: 'sky',
        },
        {
            label: 'Valeur totale',
            value: totalValue > 0 ? `${totalValue.toLocaleString('fr-DZ')} DZD` : `${freeCount} gratuit${freeCount > 1 ? 's' : ''}`,
            hint: totalValue > 0 ? 'economie potentielle' : 'produits gratuits',
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'amber',
        },
    ]

    return (
        <ClientLayout title="Mes favoris">
            <Surface className="mb-6">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(225,29,72,0.12),_transparent_35%),linear-gradient(135deg,#0f172a_0%,#3b1f2b_48%,#7a0b35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-rose-300/10 blur-3xl" />

                    <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                        <div>
                            <HighlightPill tone="rose">Wishlist</HighlightPill>
                            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Produits sauvegardes</h1>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/78 md:text-base">
                                Gardez vos produits preferes sous la main pour revenir dessus plus tard
                                et ne manquez aucune bonne affaire.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Gratuits</p>
                                <p className="mt-3 text-3xl font-bold">{freeCount}</p>
                                <p className="mt-2 text-sm text-white/70">telechargement immediat</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Payants</p>
                                <p className="mt-3 text-3xl font-bold">{products.length - freeCount}</p>
                                <p className="mt-2 text-sm text-white/70">a ajouter au panier</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Budget</p>
                                <p className="mt-3 text-3xl font-bold">{totalValue.toLocaleString('fr-DZ')} DZD</p>
                                <p className="mt-2 text-sm text-white/70">valeur totale des favoris</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Surface>

            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <Surface>
                    <div className="p-8 md:p-12">
                        <div className="mx-auto max-w-lg text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-rose-50">
                                <svg className="h-10 w-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                            <p className="text-xl font-bold text-text-dark">Aucun favori pour le moment</p>
                            <p className="mt-3 text-sm leading-7 text-text-muted">
                                Explorez la boutique et ajoutez les produits qui vous interessent a votre wishlist
                                pour les retrouver facilement.
                            </p>
                            <div className="mt-8 flex justify-center gap-4">
                                <Link
                                    href="/boutique"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(11,122,53,0.28)]"
                                >
                                    Explorer la boutique
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Surface>
            )}
        </ClientLayout>
    )
}
