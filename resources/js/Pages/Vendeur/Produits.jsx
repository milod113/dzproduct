import { Link, router, usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'
import { useState } from 'react'

export default function VendeurProduits() {
    const { products: allProducts, categories = [], productAccess } = usePage().props
    const products = allProducts || []
    const [search, setSearch] = useState('')
    const [filterCat, setFilterCat] = useState('all')
    const canCreate = productAccess?.canCreate ?? true
    const productCount = productAccess?.count ?? products.length
    const productLimit = productAccess?.limit ?? null
    const planLabel = productAccess?.planLabel ?? 'Starter'

    const filtered = products.filter((product) => {
        const matchSearch = product.name.toLowerCase().includes(search.toLowerCase())
        const matchCat = filterCat === 'all' || product.category === filterCat
        return matchSearch && matchCat
    })

    const totalSales = filtered.reduce((sum, product) => sum + (product.sales || 0), 0)
    const averagePrice = filtered.length ? Math.round(filtered.reduce((sum, product) => sum + (product.price || 0), 0) / filtered.length) : 0
    const topRatedCount = filtered.filter((product) => (product.rating || 0) >= 4.7).length

    const handleDelete = (product) => {
        if (!confirm(`Supprimer "${product.name}" ?`)) {
            return
        }

        router.delete(`/vendeur/produits/${product.id}`, { preserveScroll: true })
    }

    return (
        <SellerLayout title="Mes produits">
            <section className="mb-6 overflow-hidden rounded-[32px] border border-border bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <div className="bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(135deg,#0f172a_0%,#123524_45%,#0b7a35_100%)] px-6 py-7 text-white md:px-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Catalogue vendeur</p>
                            <h1 className="mt-3 text-3xl font-bold md:text-4xl">Gerez vos produits avec une vue plus premium</h1>
                            <p className="mt-3 text-sm leading-7 text-white/75">
                                Retrouvez vos fichiers, vos categories, vos ventes et votre capacite de publication dans un espace plus clair et plus valorisant.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Produits visibles</p>
                                <p className="mt-2 text-2xl font-bold text-white">{filtered.length}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Ventes totales</p>
                                <p className="mt-2 text-2xl font-bold text-white">{totalSales}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Prix moyen</p>
                                <p className="mt-2 text-2xl font-bold text-white">{averagePrice ? `${averagePrice.toLocaleString('fr-DZ')} DZD` : '--'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 md:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Plan {planLabel}</p>
                            <p className="mt-2 text-sm text-text-muted">
                                {productLimit === null
                                    ? `Vous avez ${productCount} produit${productCount > 1 ? 's' : ''} publie${productCount > 1 ? 's' : ''}. Votre plan permet des ajouts illimites.`
                                    : `Vous avez utilise ${productCount} / ${productLimit} emplacement${productLimit > 1 ? 's' : ''} produit pour votre plan actuel.`}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {canCreate ? (
                                <Link href="/vendeur/produits/creer" className="btn-primary shrink-0 text-sm px-5 py-3">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Ajouter un produit
                                </Link>
                            ) : (
                                <>
                                    <button type="button" disabled className="shrink-0 rounded-2xl bg-gray-200 px-5 py-3 text-sm font-semibold text-gray-500 cursor-not-allowed">
                                        Limite du plan atteinte
                                    </button>
                                    <Link href="/vendeur/plans" className="btn-outline shrink-0 text-sm px-5 py-3">
                                        Passer au plan Pro
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {!canCreate && (
                        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-medium text-amber-700">
                            Votre plan Starter est plein. Passez au plan Pro pour debloquer les produits illimites et une meilleure visibilite dans la marketplace.
                        </div>
                    )}
                </div>
            </section>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Top notes</p>
                    <p className="mt-2 text-2xl font-bold text-text-dark">{topRatedCount}</p>
                    <p className="mt-1 text-sm text-text-muted">Produits notes 4.7 et plus</p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Recherche active</p>
                    <p className="mt-2 text-2xl font-bold text-text-dark">{search ? 'Oui' : 'Non'}</p>
                    <p className="mt-1 text-sm text-text-muted">{search || 'Aucun mot-cle applique'}</p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Categorie filtree</p>
                    <p className="mt-2 text-2xl font-bold text-text-dark">{filterCat === 'all' ? 'Toutes' : filterCat}</p>
                    <p className="mt-1 text-sm text-text-muted">Vue catalogue actuelle</p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Statut</p>
                    <p className="mt-2 text-2xl font-bold text-text-dark">{canCreate ? 'Ouvert' : 'Bloque'}</p>
                    <p className="mt-1 text-sm text-text-muted">{canCreate ? 'Nouveau produit autorise' : 'Upgrade requis pour continuer'}</p>
                </div>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 flex flex-col gap-3 sm:flex-row sm:w-auto">
                    <div className="relative flex-1 max-w-xs">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-3 rounded-2xl border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                    <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="px-4 py-3 rounded-2xl border border-border text-sm text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <option value="all">Toutes categories</option>
                        {categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
                    </select>
                </div>
                <p className="text-sm text-text-muted shrink-0">{filtered.length} produit{filtered.length > 1 ? 's' : ''} visible{filtered.length > 1 ? 's' : ''}</p>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[linear-gradient(180deg,#fbfcfb_0%,#f4f7f5_100%)]">
                            <tr className="border-b border-border">
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark">Produit</th>
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark hidden md:table-cell">Categorie</th>
                                <th className="text-right px-4 py-3.5 font-semibold text-text-dark">Prix</th>
                                <th className="text-center px-4 py-3.5 font-semibold text-text-dark hidden sm:table-cell">Ventes</th>
                                <th className="text-center px-4 py-3.5 font-semibold text-text-dark hidden lg:table-cell">Note</th>
                                <th className="text-right px-4 py-3.5 font-semibold text-text-dark">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((product) => (
                                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-text-dark truncate max-w-[220px]">{product.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-text-muted hidden md:table-cell">{product.category}</td>
                                    <td className="px-4 py-3.5 text-right font-medium text-text-dark">{product.is_free ? 'Gratuit' : `${product.price.toLocaleString('fr-DZ')} DZD`}</td>
                                    <td className="px-4 py-3.5 text-center text-text-muted hidden sm:table-cell">{product.sales}</td>
                                    <td className="px-4 py-3.5 text-center hidden lg:table-cell">
                                        <span className="text-amber-600 font-medium">{product.rating}/5</span>
                                    </td>
                                    <td className="px-4 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/vendeur/produits/${product.id}/modifier`} className="p-2 rounded-lg hover:bg-primary-light text-text-muted hover:text-primary transition-colors" title="Modifier">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </Link>
                                            <button onClick={() => handleDelete(product)} className="p-2 rounded-lg hover:bg-red-50 text-text-muted hover:text-accent-red transition-colors" title="Supprimer">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center">
                                        <div className="mx-auto max-w-md">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-light text-primary">
                                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <p className="mt-4 text-lg font-bold text-text-dark">Aucun produit trouve</p>
                                            <p className="mt-2 text-sm leading-7 text-text-muted">
                                                Change la recherche ou la categorie pour retrouver tes produits publies.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </SellerLayout>
    )
}
