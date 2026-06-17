import { useState } from 'react'
import { Link, usePage, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

export default function ProductForm() {
    const { product, categories = [], sellers = [] } = usePage().props
    const isEditing = !!product

    const [form, setForm] = useState({
        name: product?.name || '',
        category_id: product?.category_id || '',
        seller_id: product?.seller_id || '',
        price: product?.price || '',
        is_free: product?.is_free ?? false,
        description: product?.description || '',
        is_active: product?.is_active ?? true,
        is_verified_seller: product?.is_verified_seller ?? false,
        is_top_rated_seller: product?.is_top_rated_seller ?? false,
        is_official_partner: product?.is_official_partner ?? false,
    })
    const [saving, setSaving] = useState(false)

    const update = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setForm({ ...form, [field]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaving(true)

        if (isEditing) {
            router.put(`/admin/produits/${product.id}`, form, {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            })
        } else {
            router.post('/admin/produits', form, {
                preserveScroll: true,
                onFinish: () => setSaving(false),
            })
        }
    }

    return (
        <AdminLayout title={isEditing ? 'Modifier le produit' : 'Nouveau produit'}>
            <div className="max-w-2xl">
                <Link href="/admin/produits" className="inline-flex items-center gap-2 text-sm text-primary font-medium mb-6 hover:underline">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Retour aux produits
                </Link>

                <form onSubmit={handleSubmit} className="card p-6 md:p-8">
                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1.5">Nom du produit</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={update('name')}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1.5">Catégorie</label>
                                <select
                                    value={form.category_id}
                                    onChange={update('category_id')}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
                                >
                                    <option value="">Sélectionner</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1.5">Vendeur</label>
                                <select
                                    value={form.seller_id}
                                    onChange={update('seller_id')}
                                    className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
                                >
                                    <option value="">SÃ©lectionner un vendeur</option>
                                    {sellers.map((seller) => (
                                        <option key={seller.id} value={seller.id}>
                                            {seller.name}{seller.wilaya ? ` - ${seller.wilaya}` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-text-dark mb-1.5">Prix (DZD)</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.is_free ? 0 : form.price}
                                    onChange={update('price')}
                                    required
                                    disabled={form.is_free}
                                    className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors disabled:bg-gray-100 disabled:text-text-muted"
                                />
                            </div>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <input
                                type="checkbox"
                                checked={form.is_free}
                                onChange={update('is_free')}
                                className="w-4 h-4 accent-primary rounded"
                            />
                            <span className="text-sm text-text-dark font-medium">Produit gratuit telechargeable sans paiement</span>
                        </label>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1.5">Description</label>
                            <textarea
                                value={form.description}
                                onChange={update('description')}
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
                            />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.is_active}
                                onChange={update('is_active')}
                                className="w-4 h-4 accent-primary rounded"
                            />
                            <span className="text-sm text-text-dark font-medium">Produit actif (visible dans la boutique)</span>
                        </label>
                        <div className="rounded-xl border border-border p-4">
                            <h3 className="text-sm font-semibold text-text-dark">Badges vendeur</h3>
                            <p className="text-xs text-text-muted mt-1">Ces badges seront affiches pour le vendeur selectionne.</p>
                            <div className="mt-4 flex flex-col gap-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={form.is_verified_seller} onChange={update('is_verified_seller')} className="w-4 h-4 accent-primary rounded" />
                                    <span className="text-sm text-text-dark font-medium">Verified Seller</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={form.is_top_rated_seller} onChange={update('is_top_rated_seller')} className="w-4 h-4 accent-primary rounded" />
                                    <span className="text-sm text-text-dark font-medium">Top Rated</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={form.is_official_partner} onChange={update('is_official_partner')} className="w-4 h-4 accent-primary rounded" />
                                    <span className="text-sm text-text-dark font-medium">Official Partner</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                        <button type="submit" disabled={saving} className="btn-primary px-6 py-3 text-sm">
                            {saving ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : 'Créer le produit'}
                        </button>
                        <Link href="/admin/produits" className="btn-outline px-6 py-3 text-sm">
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
