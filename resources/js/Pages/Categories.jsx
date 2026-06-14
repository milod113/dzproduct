import { Link, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import ProductCard from '@/Components/ProductCard'

function CategoryMetric({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_16px_35px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
            <p className="mt-2 text-xl font-bold text-text-dark">{value}</p>
        </div>
    )
}

function CategoryCard({ category }) {
    return (
        <Link
            href={`/categories/${category.slug}`}
            className="group overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(15,23,42,0.12)]"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(135deg, ${category.color}22 0%, #ffffff 50%, ${category.color}10 100%)`,
                    }}
                />
                <img
                    src={category.image}
                    alt={category.name}
                    className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                    }}
                />
                <div className="relative hidden h-full w-full items-center justify-center">
                    <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
                        style={{ backgroundColor: category.color }}
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                    Categorie
                </div>
                <h2 className="mt-4 text-xl font-bold text-text-dark">{category.name}</h2>
                <p className="mt-3 line-clamp-2 text-sm leading-7 text-text-muted">{category.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-text-muted">Decouvrir la selection</span>
                    <span className="text-sm font-bold text-accent-red">{category.price.toLocaleString('fr-DZ')} DZD</span>
                </div>
            </div>
        </Link>
    )
}

export default function Categories() {
    const { categories = [], products, activeCategory } = usePage().props

    const hasProductsView = Array.isArray(products)
    const productCount = hasProductsView ? products.length : 0
    const averagePrice = hasProductsView && products.length > 0
        ? Math.round(products.reduce((sum, product) => sum + product.price, 0) / products.length)
        : 0
    const topRatedCount = hasProductsView
        ? products.filter((product) => (product.rating ?? 0) >= 4.7).length
        : 0
    const accentColor = activeCategory?.color ?? '#0B7A35'

    return (
        <AppLayout>
            <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbf8_0%,#ffffff_68%,#f5f9f6_100%)] pt-14 pb-10">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 top-12 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: `${accentColor}22` }} />
                    <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
                    <div className="absolute left-1/2 top-24 h-px w-56 -translate-x-1/2 bg-primary/15" />
                </div>

                <div className="container-max relative">
                    {activeCategory ? (
                        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                            <div>
                                <nav className="mb-5 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 text-sm text-text-muted">
                                    <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                                    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    <span className="font-medium text-text-dark">{activeCategory.name}</span>
                                </nav>

                                <div className="inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]" style={{ backgroundColor: `${accentColor}12`, color: accentColor }}>
                                    Selection premium
                                </div>

                                <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-text-dark sm:text-5xl lg:text-6xl">
                                    {activeCategory.name}
                                    <span className="block text-primary">pensée pour le marche algerien</span>
                                </h1>

                                <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                                    {activeCategory.description} Explorez une selection plus qualitative, avec des vendeurs identifies,
                                    des ressources pratiques et des produits digitaux prets a etre telecharges.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm text-text-dark shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
                                        Livraison instantanee
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm text-text-dark shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                                        <span className="h-2 w-2 rounded-full bg-primary" />
                                        Vendeurs verifies
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm text-text-dark shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                                        <span className="h-2 w-2 rounded-full bg-accent-red" />
                                        Produits notes et testes
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
                                <CategoryMetric label="Produits" value={productCount} />
                                <CategoryMetric label="Top notes" value={topRatedCount} />
                                <CategoryMetric label="Prix moyen" value={averagePrice ? `${averagePrice.toLocaleString('fr-DZ')} DZD` : '--'} />
                                <CategoryMetric label="Acces" value="24/7" />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                                Catalogue digital
                            </div>
                            <h1 className="mt-6 text-4xl font-bold text-text-dark sm:text-5xl">Explorez nos categories premium</h1>
                            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                                Une marketplace algerienne organisee pour aider les acheteurs a trouver rapidement les meilleurs
                                ebooks, templates, packs educatifs et ressources professionnelles.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="pb-16 pt-8">
                <div className="container-max">
                    {hasProductsView ? (
                        productCount === 0 ? (
                            <div className="rounded-[32px] border border-dashed border-border bg-white p-12 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                                <h2 className="text-2xl font-bold text-text-dark">Aucun produit dans cette categorie</h2>
                                <p className="mt-3 text-sm text-text-muted">La selection arrive bientot. Vous pouvez continuer a explorer les autres univers du marketplace.</p>
                                <Link href="/categories" className="btn-primary mt-6 inline-flex px-6 py-3">
                                    Voir toutes les categories
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Catalogue de la categorie</p>
                                        <h2 className="mt-2 text-2xl font-bold text-text-dark">Produits disponibles maintenant</h2>
                                    </div>
                                    <p className="text-sm text-text-muted">{productCount} produit{productCount > 1 ? 's' : ''} dans cette selection</p>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </>
                        )
                    ) : (
                        <>
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Univers du marketplace</p>
                                    <h2 className="mt-2 text-2xl font-bold text-text-dark">Choisissez votre categorie</h2>
                                </div>
                                <p className="text-sm text-text-muted">{categories.length} categories disponibles</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {categories.map((category) => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </AppLayout>
    )
}
