import { useState } from 'react'
import { Link, usePage, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

export default function Products() {
    const { products = [], categories = [] } = usePage().props
    const [search, setSearch] = useState('')
    const [filterCat, setFilterCat] = useState('all')

    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
        const matchCat = filterCat === 'all' || p.category === filterCat
        return matchSearch && matchCat
    })

    const handleDelete = (id, name) => {
        if (confirm(`Supprimer "${name}" ?`)) {
            router.delete(`/admin/produits/${id}`, { preserveScroll: true })
        }
    }

    return (
        <AdminLayout title="Produits">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 max-w-xs">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                    <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="px-3 py-2.5 rounded-lg border border-border text-sm text-text-dark bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <option value="all">Toutes catégories</option>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
                <Link href="/admin/produits/creer" className="btn-primary shrink-0 text-sm px-4 py-2.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nouveau produit
                </Link>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-gray-50">
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark">Produit</th>
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark hidden lg:table-cell">Vendeur</th>
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark hidden md:table-cell">Catégorie</th>
                                <th className="text-right px-4 py-3.5 font-semibold text-text-dark">Prix</th>
                                <th className="text-center px-4 py-3.5 font-semibold text-text-dark hidden sm:table-cell">Ventes</th>
                                <th className="text-center px-4 py-3.5 font-semibold text-text-dark">Actif</th>
                                <th className="text-right px-4 py-3.5 font-semibold text-text-dark">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p) => (
                                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-text-dark">{p.name}</p>
                                                <p className="text-xs text-text-muted">{p.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 hidden lg:table-cell">
                                        <div className="min-w-0">
                                            <p className="text-sm text-text-dark">{p.seller_name}</p>
                                            <p className="text-xs text-text-muted">{p.seller_badges.join(' • ') || 'Aucun badge'}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-text-muted hidden md:table-cell">{p.category}</td>
                                    <td className="px-4 py-3.5 text-right font-medium text-text-dark">{p.price.toLocaleString('fr-DZ')} DZD</td>
                                    <td className="px-4 py-3.5 text-center text-text-muted hidden sm:table-cell">{p.sales}</td>
                                    <td className="px-4 py-3.5 text-center">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${p.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                            {p.is_active ? 'Oui' : 'Non'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/produits/${p.id}/modifier`} className="p-2 rounded-lg hover:bg-primary-light text-text-muted hover:text-primary transition-colors" title="Modifier">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </Link>
                                            <button onClick={() => handleDelete(p.id, p.name)} className="p-2 rounded-lg hover:bg-red-50 text-text-muted hover:text-accent-red transition-colors" title="Supprimer">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-sm text-text-muted mt-4">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>
        </AdminLayout>
    )
}
