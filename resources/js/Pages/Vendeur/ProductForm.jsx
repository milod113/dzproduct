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
        is_free: product?.is_free ?? false,
        description: product?.description || '',
        file_type: product?.file_type || 'zip',
        file_path: product?.file_path || '',
        pages: product?.pages || '',
        file_size_label: product?.file_size_label || '',
        item_count: product?.item_count || '',
        skill_level: product?.skill_level || 'debutant',
        usage_license: product?.usage_license || 'Usage personnel',
        version: product?.version || '1.0',
        last_updated_at: product?.last_updated_at || '',
        included_items_text: product?.included_items_text || '',
        compatible_with_text: product?.compatible_with_text || '',
        benefits_text: product?.benefits_text || '',
        preview_points_text: product?.preview_points_text || '',
        faq_items_text: product?.faq_items_text || '',
        usage_instructions_text: product?.usage_instructions_text || '',
        product_file: null,
        product_image: null,
        preview_images: [],
        is_active: product?.is_active ?? true,
    })

    const [saving, setSaving] = useState(false)
    const [imagePreview, setImagePreview] = useState(product?.image_url || null)
    const [galleryPreview, setGalleryPreview] = useState(product?.preview_images || [])

    const update = (field) => (e) => {
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

        if (e.target.type === 'file') {
            value = field === 'preview_images'
                ? Array.from(e.target.files || [])
                : (e.target.files?.[0] || null)
        }

        if (field === 'product_image' && value) {
            setImagePreview(URL.createObjectURL(value))
        }

        if (field === 'preview_images' && Array.isArray(value) && value.length) {
            setGalleryPreview((current) => ([
                ...current,
                ...value.map((file, index) => ({
                    id: `new-${Date.now()}-${index}`,
                    url: URL.createObjectURL(file),
                    is_primary: false,
                })),
            ]))
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
                                <input type="number" min="0" value={form.is_free ? 0 : form.price} onChange={update('price')} required disabled={form.is_free} className="w-full px-4 py-3 rounded-lg border border-border text-sm disabled:bg-gray-100 disabled:text-text-muted" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1.5">Type de produit</label>
                            <select value={form.product_type} onChange={update('product_type')} className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-white">
                                <option value="digital">Produit digital</option>
                                <option value="service">Consulting / Service</option>
                            </select>
                        </div>

                        {form.product_type === 'digital' && (
                            <label className="flex items-center gap-3 cursor-pointer rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                                <input type="checkbox" checked={form.is_free} onChange={update('is_free')} className="w-4 h-4 accent-primary rounded" />
                                <span className="text-sm text-text-dark font-medium">Rendre ce produit gratuit pour telechargement direct</span>
                            </label>
                        )}

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

                        {form.product_type === 'digital' && (
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1.5">Galerie preview du produit</label>
                                <input type="file" accept="image/*" multiple onChange={update('preview_images')} className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-white" />
                                <p className="mt-2 text-xs text-text-muted">Ajoute plusieurs visuels pour montrer des pages, mockups, slides ou extraits du produit.</p>
                                {galleryPreview.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {galleryPreview.map((image) => (
                                            <div key={image.id} className="overflow-hidden rounded-xl border border-border bg-gray-50">
                                                <img src={image.url} alt="Preview produit" className="h-24 w-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1.5">Description</label>
                            <textarea value={form.description} onChange={update('description')} rows={5} className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-y" />
                        </div>

                        {form.product_type === 'digital' && (
                            <div className="rounded-[28px] border border-border bg-[#fbfcfb] p-5 md:p-6">
                                <div className="mb-5">
                                    <h2 className="text-lg font-bold text-text-dark">Details premium du fichier</h2>
                                    <p className="mt-1 text-sm text-text-muted">Ces informations seront affichees sur la page produit pour rassurer l acheteur avant paiement.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Nombre d elements</label>
                                        <input type="number" min="1" value={form.item_count} onChange={update('item_count')} placeholder="Ex: 24" className="w-full px-4 py-3 rounded-lg border border-border text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Taille du pack</label>
                                        <input type="text" value={form.file_size_label} onChange={update('file_size_label')} placeholder="Ex: 48 MB" className="w-full px-4 py-3 rounded-lg border border-border text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Nombre de pages</label>
                                        <input type="number" min="1" value={form.pages} onChange={update('pages')} placeholder="Ex: 85" className="w-full px-4 py-3 rounded-lg border border-border text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Niveau</label>
                                        <select value={form.skill_level} onChange={update('skill_level')} className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-white">
                                            <option value="debutant">Debutant</option>
                                            <option value="intermediaire">Intermediaire</option>
                                            <option value="avance">Avance</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Licence</label>
                                        <input type="text" value={form.usage_license} onChange={update('usage_license')} placeholder="Usage personnel / commercial" className="w-full px-4 py-3 rounded-lg border border-border text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Version</label>
                                        <input type="text" value={form.version} onChange={update('version')} placeholder="Ex: 1.2" className="w-full px-4 py-3 rounded-lg border border-border text-sm" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Derniere mise a jour</label>
                                        <input type="date" value={form.last_updated_at} onChange={update('last_updated_at')} className="w-full px-4 py-3 rounded-lg border border-border text-sm bg-white" />
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Contenu inclus</label>
                                        <textarea value={form.included_items_text} onChange={update('included_items_text')} rows={5} placeholder={'Un element par ligne\nEx: 12 templates Canva\nGuide PDF de prise en main\n3 bonus exclusifs'} className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-y" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Compatibilite</label>
                                        <textarea value={form.compatible_with_text} onChange={update('compatible_with_text')} rows={4} placeholder={'Un element par ligne\nEx: Canva Free\nCanva Pro\nMobile et ordinateur'} className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-y" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Benefices acheteur</label>
                                        <textarea value={form.benefits_text} onChange={update('benefits_text')} rows={4} placeholder={'Un benefice par ligne\nEx: Gain de temps immediat\nAdapte au marche algerien'} className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-y" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Points d apercu premium</label>
                                        <textarea value={form.preview_points_text} onChange={update('preview_points_text')} rows={4} placeholder={'Un point par ligne\nEx: Sommaire clair et professionnel\nDesign facile a personnaliser'} className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-y" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">FAQ produit</label>
                                        <textarea value={form.faq_items_text} onChange={update('faq_items_text')} rows={5} placeholder={'Une question par ligne au format:\nQuestion ? | Reponse\nEx: Canva Pro est il obligatoire ? | Non, le produit fonctionne aussi avec Canva Free.'} className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-y" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1.5">Instructions d utilisation</label>
                                        <textarea value={form.usage_instructions_text} onChange={update('usage_instructions_text')} rows={5} placeholder={'Une etape par ligne\nEx: Telechargez le fichier ZIP\nOuvrez le dossier principal\nPersonnalisez les fichiers selon votre besoin'} className="w-full px-4 py-3 rounded-lg border border-border text-sm resize-y" />
                                    </div>
                                </div>
                            </div>
                        )}

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
