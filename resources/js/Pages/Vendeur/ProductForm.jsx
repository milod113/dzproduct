import { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

export default function SellerProductForm() {
    const { product, categories = [] } = usePage().props
    const isEditing = !!product

    const [form, setForm] = useState({
        name: product?.name || '',
        category_id: product?.category_id || '',
        price: product?.price || '',
        product_type: product?.product_type || 'digital',
        description: product?.description || '',
        file_type: product?.file_type || 'zip',
        file_path: product?.file_path || '',
        product_file: null,
        product_image: null,
        is_active: product?.is_active ?? true,
    })

    const [saving, setSaving] = useState(false)
    const [imagePreview, setImagePreview] = useState(product?.image_url || null)

    const update = (field) => (e) => {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        if (e.target.type === 'file') {
            value = e.target.files?.[0] || null
        }

        if (field === 'product_image' && value) {
            setImagePreview(URL.createObjectURL(value))
        }

        setForm((current) => ({ ...current, [field]: value }))
    }

    const submit = (e) => {
        e.preventDefault()
        setSaving(true)

        const options = {
            preserveScroll: true,
            forceFormData: true,
            onFinish: () => setSaving(false),
        }

        if (isEditing) {
            router.post(`/vendeur/produits/${product.id}`, { ...form, _method: 'put' }, options)
            return
        }

        router.post('/vendeur/produits', form, options)
    }

    return (
        <SellerLayout title={isEditing ? 'Modifier le produit' : 'Ajouter un produit'}>
            <div className="max-w-3xl">
                <Link href="/vendeur/produits" className="inline-flex items-center gap-2 text-sm text-primary font-medium mb-6 hover:underline">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Retour a mes produits
                </Link>

                <form onSubmit={submit} className="card p-6 md:p-8">
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1.5">Nom du produit</label>
                            <input type="text" value={form.name} onChange={update('name')} required className="w-full px-4 py-3 rounded-lg border border-border text-sm" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1.5">Categorie</label>
                                <select value={form.category_id} onChange={update('category_id')} required className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-white">
                                    <option value="">Selectionner</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1.5">Prix (DZD)</label>
                                <input type="number" min="0" value={form.price} onChange={update('price')} required className="w-full px-4 py-3 rounded-lg border border-border text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1.5">Type de produit</label>
                            <select value={form.product_type} onChange={update('product_type')} className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-white">
                                <option value="digital">Produit digital</option>
                                <option value="service">Consulting / Service</option>
                            </select>
                        </div>

                        {form.product_type === 'digital' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1.5">Type de fichier</label>
                                    <input type="text" value={form.file_type} onChange={update('file_type')} placeholder="zip, pdf, mp4..." className="w-full px-4 py-3 rounded-lg border border-border text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1.5">Fichier digital</label>
                                    <input type="file" onChange={update('product_file')} className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-white" />
                                    {form.file_path && <p className="mt-2 text-xs text-text-muted">Fichier actuel: {form.file_path}</p>}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
                                Ce produit sera propose comme service ou consulting. Aucun fichier telechargeable n est requis.
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1.5">Image du produit</label>
                            <input type="file" accept="image/*" onChange={update('product_image')} className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-white" />
                            {imagePreview ? (
                                <div className="mt-4 w-40 overflow-hidden rounded-xl border border-border bg-gray-50">
                                    <img src={imagePreview} alt="Apercu du produit" className="h-32 w-full object-cover" />
                                </div>
                            ) : (
                                <p className="mt-2 text-xs text-text-muted">Aucune image importee pour ce produit.</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1.5">Description</label>
                            <textarea value={form.description} onChange={update('description')} rows={5} className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-y" />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={form.is_active} onChange={update('is_active')} className="w-4 h-4 accent-primary rounded" />
                            <span className="text-sm text-text-dark font-medium">Produit actif dans la boutique</span>
                        </label>
                    </div>

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                        <button type="submit" disabled={saving} className="btn-primary px-6 py-3 text-sm">
                            {saving ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : 'Creer le produit'}
                        </button>
                        <Link href="/vendeur/produits" className="btn-outline px-6 py-3 text-sm">
                            Annuler
                        </Link>
                    </div>
                </form>
            </div>
        </SellerLayout>
    )
}
