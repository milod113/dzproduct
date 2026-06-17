import { useMemo, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import ProductCard from '@/Components/ProductCard'

function StatCard({ label, value, hint }) {
    return (
        <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_16px_35px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
            <p className="mt-2 text-xl font-bold text-text-dark">{value}</p>
            {hint && <p className="mt-1 text-sm text-text-muted">{hint}</p>}
        </div>
    )
}

function FilterLabel({ children }) {
    return <label className="mb-2 block text-sm font-semibold text-text-dark">{children}</label>
}

export default function Shop() {
    const { products: allProducts, categories, studentSpace } = usePage().props
    const products = allProducts || []
    const studentHeadline = studentSpace?.headline || {}

    const maxCatalogPrice = useMemo(() => {
        if (!products.length) return 0
        return Math.max(...products.map((product) => product.price || 0))
    }, [products])

    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Tout')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [minRating, setMinRating] = useState('0')
    const [verifiedOnly, setVerifiedOnly] = useState(false)
    const [pricingFilter, setPricingFilter] = useState('all')
    const [budgetFilter, setBudgetFilter] = useState('all')
    const [levelFilter, setLevelFilter] = useState('all')
    const [sortBy, setSortBy] = useState('featured')

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const normalizedSearch = search.trim().toLowerCase()
            const matchesSearch =
                !normalizedSearch ||
                product.name.toLowerCase().includes(normalizedSearch) ||
                product.description.toLowerCase().includes(normalizedSearch) ||
                product.category.toLowerCase().includes(normalizedSearch) ||
                product.seller?.name?.toLowerCase().includes(normalizedSearch)

            const matchesCategory = activeCategory === 'Tout' || product.category === activeCategory

            const numericMinPrice = minPrice === '' ? null : Number(minPrice)
            const numericMaxPrice = maxPrice === '' ? null : Number(maxPrice)
            const matchesMinPrice = numericMinPrice === null || product.price >= numericMinPrice
            const matchesMaxPrice = numericMaxPrice === null || product.price <= numericMaxPrice

            const ratingThreshold = Number(minRating || 0)
            const matchesRating = (product.rating ?? 0) >= ratingThreshold

            const matchesVerified = !verifiedOnly || product.seller?.badges?.includes('verified')
            const matchesPricing =
                pricingFilter === 'all' ||
                (pricingFilter === 'free' && product.is_free) ||
                (pricingFilter === 'paid' && !product.is_free)
            const matchesBudget =
                budgetFilter === 'all' ||
                (budgetFilter === 'student' && !product.is_free && (product.price ?? 0) > 0 && (product.price ?? 0) <= 500) ||
                (budgetFilter === 'mid' && (product.price ?? 0) > 500 && (product.price ?? 0) <= 1000) ||
                (budgetFilter === 'premium' && (product.price ?? 0) > 1000)
            const matchesLevel =
                levelFilter === 'all' ||
                (levelFilter === 'debutant' && product.skill_level === 'debutant') ||
                (levelFilter === 'intermediaire' && product.skill_level === 'intermediaire')

            return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesRating && matchesVerified && matchesPricing && matchesBudget && matchesLevel
        })
    }, [products, search, activeCategory, minPrice, maxPrice, minRating, verifiedOnly, pricingFilter, budgetFilter, levelFilter])

    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.created_at || 0) - new Date(a.created_at || 0)
                case 'best_selling':
                    return (b.sales ?? 0) - (a.sales ?? 0)
                case 'rating':
                    return (b.rating ?? 0) - (a.rating ?? 0)
                case 'price_asc':
                    return a.price - b.price
                case 'price_desc':
                    return b.price - a.price
                default:
                    return ((b.rating ?? 0) - (a.rating ?? 0)) || ((b.sales ?? 0) - (a.sales ?? 0))
            }
        })
    }, [filteredProducts, sortBy])

    const averagePrice = sortedProducts.length
        ? Math.round(sortedProducts.reduce((sum, product) => sum + product.price, 0) / sortedProducts.length)
        : 0
    const topRatedCount = sortedProducts.filter((product) => (product.rating ?? 0) >= 4.7).length
    const verifiedSellerCount = sortedProducts.filter((product) => product.seller?.badges?.includes('verified')).length
    const freeCount = sortedProducts.filter((product) => product.is_free).length
    const paidCount = sortedProducts.filter((product) => !product.is_free).length
    const beginnerCount = sortedProducts.filter((product) => product.skill_level === 'debutant').length

    const resetFilters = () => {
        setSearch('')
        setActiveCategory('Tout')
        setMinPrice('')
        setMaxPrice('')
        setMinRating('0')
        setVerifiedOnly(false)
        setPricingFilter('all')
        setBudgetFilter('all')
        setLevelFilter('all')
        setSortBy('featured')
    }

    return (
        <AppLayout>
            <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbf9_0%,#ffffff_64%,#f6faf7_100%)] pb-10 pt-16">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
                    <div className="absolute left-1/2 top-28 h-px w-64 -translate-x-1/2 bg-primary/15" />
                </div>

                <div className="container-max relative">
                    <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                            <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                                Boutique premium
                            </div>
                            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-text-dark sm:text-5xl lg:text-6xl">
                                Explorez les meilleurs
                                <span className="block text-primary">produits digitaux algeriens</span>
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                                Decouvrez une selection plus premium avec vendeurs verifies, livraison instantanee,
                                produits utiles et ressources pretes a l emploi pour apprendre, vendre ou gagner du temps.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm text-text-dark shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                    Paiement securise
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm text-text-dark shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Telechargement instantane
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-sm text-text-dark shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                                    Vendeurs verifies
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/90 px-4 py-2 text-sm text-sky-700 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                                    Espace etudiant
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
                            <StatCard label="Produits" value={products.length} hint="Disponibles maintenant" />
                            <StatCard label="Categories" value={categories.length} hint="Pour tous les besoins" />
                            <StatCard label="Top notes" value={topRatedCount} hint="Note 4.7 et plus" />
                            <StatCard label="Prix moyen" value={averagePrice ? `${averagePrice.toLocaleString('fr-DZ')} DZD` : '--'} hint="Sur les resultats affiches" />
                        </div>
                    </div>

                    <div className="mt-8 rounded-[30px] border border-white/80 bg-[linear-gradient(135deg,rgba(14,165,233,0.08),rgba(255,255,255,0.96),rgba(11,122,53,0.06))] p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-3xl">
                                <p className="text-xs uppercase tracking-[0.22em] text-sky-700">Espace Etudiant</p>
                                <h2 className="mt-2 text-2xl font-bold text-text-dark">Trouvez plus vite les ressources utiles aux etudiants</h2>
                                <p className="mt-2 text-sm leading-7 text-text-muted">
                                    Des supports gratuits, des packs a petit budget et des ressources debutant pour reviser, apprendre et preparer vos projets.
                                </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <StatCard label="Gratuits" value={studentHeadline.freeCount ?? 0} hint="Pour attirer et convertir" />
                                <StatCard label="Petit budget" value={studentHeadline.underBudgetCount ?? 0} hint="500 DZD ou moins" />
                                <StatCard label="Debutants" value={studentHeadline.beginnerCount ?? 0} hint="Prise en main facile" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    <div className="rounded-[32px] border border-white/80 bg-white/95 p-5 shadow-[0_22px_60px_rgba(15,23,42,0.1)] backdrop-blur md:p-6">
                        <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Rechercher un ebook, un pack, un template ou un vendeur"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    className="w-full rounded-2xl border border-border bg-[#f8fbf8] py-4 pl-12 pr-4 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <select
                                    value={sortBy}
                                    onChange={(event) => setSortBy(event.target.value)}
                                    className="rounded-2xl border border-border bg-[#f8fbf8] px-4 py-4 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                >
                                    <option value="featured">Mieux classes</option>
                                    <option value="newest">Plus recents</option>
                                    <option value="best_selling">Plus vendus</option>
                                    <option value="rating">Meilleure note</option>
                                    <option value="price_asc">Prix croissant</option>
                                    <option value="price_desc">Prix decroissant</option>
                                </select>

                                <select
                                    value={minRating}
                                    onChange={(event) => setMinRating(event.target.value)}
                                    className="rounded-2xl border border-border bg-[#f8fbf8] px-4 py-4 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                >
                                    <option value="0">Toutes les notes</option>
                                    <option value="4">4.0 et plus</option>
                                    <option value="4.5">4.5 et plus</option>
                                    <option value="4.7">4.7 et plus</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-4 border-t border-border pt-5 lg:grid-cols-[1fr_auto]">
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                <div>
                                    <FilterLabel>Categorie</FilterLabel>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setActiveCategory('Tout')}
                                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                                                activeCategory === 'Tout'
                                                    ? 'bg-primary text-white shadow-[0_12px_30px_rgba(11,122,53,0.2)]'
                                                    : 'bg-[#f3f6f4] text-text-muted hover:bg-primary-light hover:text-primary'
                                            }`}
                                        >
                                            Tout
                                        </button>
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.name)}
                                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                                                    activeCategory === category.name
                                                        ? 'bg-primary text-white shadow-[0_12px_30px_rgba(11,122,53,0.2)]'
                                                        : 'bg-[#f3f6f4] text-text-muted hover:bg-primary-light hover:text-primary'
                                                }`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <FilterLabel>Prix minimum</FilterLabel>
                                    <input
                                        type="number"
                                        min="0"
                                        value={minPrice}
                                        onChange={(event) => setMinPrice(event.target.value)}
                                        placeholder="0"
                                        className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    />
                                </div>

                                <div>
                                    <FilterLabel>Prix maximum</FilterLabel>
                                    <input
                                        type="number"
                                        min="0"
                                        max={maxCatalogPrice || undefined}
                                        value={maxPrice}
                                        onChange={(event) => setMaxPrice(event.target.value)}
                                        placeholder={maxCatalogPrice ? `${maxCatalogPrice}` : 'Aucune limite'}
                                        className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    />
                                </div>

                                <div className="flex items-end">
                                    <label className="flex w-full items-center gap-3 rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm font-medium text-text-dark">
                                        <input
                                            type="checkbox"
                                            checked={verifiedOnly}
                                            onChange={(event) => setVerifiedOnly(event.target.checked)}
                                            className="accent-primary"
                                        />
                                        Vendeur verifie seulement
                                    </label>
                                </div>

                                <div>
                                    <FilterLabel>Type de prix</FilterLabel>
                                    <select
                                        value={pricingFilter}
                                        onChange={(event) => setPricingFilter(event.target.value)}
                                        className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    >
                                        <option value="all">Tous</option>
                                        <option value="free">Gratuit</option>
                                        <option value="paid">Payant</option>
                                    </select>
                                </div>

                                <div>
                                    <FilterLabel>Budget etudiant</FilterLabel>
                                    <select
                                        value={budgetFilter}
                                        onChange={(event) => setBudgetFilter(event.target.value)}
                                        className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    >
                                        <option value="all">Tous les budgets</option>
                                        <option value="student">Petit budget 500 DZD ou moins</option>
                                        <option value="mid">500 a 1000 DZD</option>
                                        <option value="premium">Plus de 1000 DZD</option>
                                    </select>
                                </div>

                                <div>
                                    <FilterLabel>Niveau</FilterLabel>
                                    <select
                                        value={levelFilter}
                                        onChange={(event) => setLevelFilter(event.target.value)}
                                        className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    >
                                        <option value="all">Tous les niveaux</option>
                                        <option value="debutant">Debutant</option>
                                        <option value="intermediaire">Intermediaire</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={resetFilters}
                                    className="inline-flex w-full items-center justify-center rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-dark transition-all hover:border-primary/20 hover:text-primary lg:w-auto"
                                >
                                    Reinitialiser
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 rounded-[28px] border border-border/70 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Resultats de recherche</p>
                            <h2 className="mt-2 text-2xl font-bold text-text-dark">
                                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} affiche{sortedProducts.length > 1 ? 's' : ''}
                            </h2>
                            <p className="mt-2 text-sm text-text-muted">
                                {activeCategory !== 'Tout' ? `Categorie: ${activeCategory}. ` : ''}
                                {minPrice || maxPrice ? 'Filtre prix actif. ' : ''}
                                {verifiedOnly ? 'Vendeurs verifies uniquement. ' : ''}
                                {pricingFilter === 'free' ? 'Produits gratuits uniquement. ' : pricingFilter === 'paid' ? 'Produits payants uniquement. ' : ''}
                                {budgetFilter === 'student' ? 'Petit budget etudiant uniquement. ' : budgetFilter === 'mid' ? 'Budget moyen actif. ' : budgetFilter === 'premium' ? 'Selection premium active. ' : ''}
                                {levelFilter === 'debutant' ? 'Niveau debutant. ' : levelFilter === 'intermediaire' ? 'Niveau intermediaire. ' : ''}
                                {search ? `Recherche: "${search}".` : 'Selection premium de la marketplace.'}
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="rounded-2xl bg-[#f8fbf8] px-4 py-3">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Top notes</p>
                                <p className="mt-1 text-sm font-semibold text-text-dark">{topRatedCount} resultats</p>
                            </div>
                            <div className="rounded-2xl bg-[#f8fbf8] px-4 py-3">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Vendeurs verifies</p>
                                <p className="mt-1 text-sm font-semibold text-text-dark">{verifiedSellerCount} produits</p>
                            </div>
                            <div className="rounded-2xl bg-[#f8fbf8] px-4 py-3">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Tri actif</p>
                                <p className="mt-1 text-sm font-semibold text-text-dark">
                                    {sortBy === 'newest' ? 'Plus recents' :
                                        sortBy === 'best_selling' ? 'Plus vendus' :
                                        sortBy === 'rating' ? 'Meilleure note' :
                                        sortBy === 'price_asc' ? 'Prix croissant' :
                                        sortBy === 'price_desc' ? 'Prix decroissant' :
                                        'Mieux classes'}
                                </p>
                            </div>
                            <div className={`rounded-2xl px-4 py-3 ${pricingFilter === 'free' ? 'bg-emerald-50' : pricingFilter === 'paid' ? 'bg-slate-100' : 'bg-[#f8fbf8]'}`}>
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                                    {pricingFilter === 'free' ? 'Gratuits' : pricingFilter === 'paid' ? 'Payants' : 'Repartition'}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-text-dark">
                                    {pricingFilter === 'free'
                                        ? `${freeCount} gratuit${freeCount > 1 ? 's' : ''}`
                                        : pricingFilter === 'paid'
                                            ? `${paidCount} payant${paidCount > 1 ? 's' : ''}`
                                            : `${freeCount} gratuit${freeCount > 1 ? 's' : ''} / ${paidCount} payant${paidCount > 1 ? 's' : ''}`}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-[#f8fbf8] px-4 py-3">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Niveau debutant</p>
                                <p className="mt-1 text-sm font-semibold text-text-dark">{beginnerCount} produits</p>
                            </div>
                        </div>
                    </div>

                    {sortedProducts.length === 0 ? (
                        <div className="mt-10 rounded-[34px] border border-dashed border-border bg-white px-6 py-14 text-center shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:px-10">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-primary-light text-primary">
                                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-2xl font-bold text-text-dark">Aucun produit ne correspond a votre recherche</h3>
                            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-muted">
                                Essayez une autre categorie, ajustez votre plage de prix, retirez le filtre vendeur verifie ou revenez a la selection complete.
                            </p>
                            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <button
                                    onClick={resetFilters}
                                    className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(11,122,53,0.22)] transition-all hover:bg-primary-dark"
                                >
                                    Reinitialiser les filtres
                                </button>
                                <Link
                                    href="/categories"
                                    className="inline-flex items-center justify-center rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-dark transition-all hover:border-primary/20 hover:text-primary"
                                >
                                    Explorer les categories
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                            {sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    )
}
