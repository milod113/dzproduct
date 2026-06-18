import { useState } from 'react'
import { useForm, usePage, router } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

function Surface({ children, className = '' }) {
    return (
        <section className={`overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.09)] backdrop-blur ${className}`}>
            {children}
        </section>
    )
}

function StatCard({ label, value, icon, hint, tone = 'default' }) {
    const toneClass = {
        default: 'from-slate-50 to-white text-slate-700 border-slate-200',
        success: 'from-emerald-50 to-white text-emerald-700 border-emerald-100',
        info: 'from-sky-50 to-white text-sky-700 border-sky-100',
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
        sky: 'bg-sky-400/12 text-sky-100 border-sky-300/20',
    }[tone]
    return (
        <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
            {children}
        </div>
    )
}

const defaultColor = '#0b7a35'

export default function AdminCategories() {
    const { categories = [] } = usePage().props
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    const form = useForm({
        name: '', slug: '', description: '', icon: '', image: '',
        thematic_image: '', color: defaultColor, sort_order: 0,
    })

    const openCreate = () => {
        form.reset()
        form.setData('color', defaultColor)
        setEditingId(null)
        setShowForm(true)
    }

    const openEdit = (cat) => {
        form.setData({
            name: cat.name, slug: cat.slug, description: cat.description || '',
            icon: cat.icon || '', image: cat.image || '',
            thematic_image: cat.thematic_image || '',
            color: cat.color || defaultColor, sort_order: cat.sort_order ?? 0,
        })
        setEditingId(cat.id)
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
        setEditingId(null)
        form.reset()
    }

    const submit = (e) => {
        e.preventDefault()
        if (editingId) {
            form.put(`/admin/categories/${editingId}`, {
                preserveScroll: true,
                onSuccess: () => closeForm(),
            })
        } else {
            form.post('/admin/categories', {
                preserveScroll: true,
                onSuccess: () => closeForm(),
            })
        }
    }

    const confirmDelete = (id) => setDeletingId(id)
    const executeDelete = () => {
        if (deletingId) {
            router.delete(`/admin/categories/${deletingId}`, {
                preserveScroll: true,
                onSuccess: () => setDeletingId(null),
                onError: () => setDeletingId(null),
            })
        }
    }

    const totalProducts = categories.reduce((s, c) => s + c.products_count, 0)

    const statCards = [
        { label: 'Categories', value: categories.length, icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z', hint: 'au catalogue', tone: 'default' },
        { label: 'Produits', value: totalProducts, icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z', hint: 'repartis dans les categories', tone: 'success' },
        { label: 'Moyenne', value: categories.length > 0 ? (totalProducts / categories.length).toFixed(1) : 0, icon: 'M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75H17.25m-1.5-7.5A2.25 2.25 0 0013.5 3h-8.25A2.25 2.25 0 003 5.25v7.5A2.25 2.25 0 005.25 15H9m0 0l-1.5 1.5M9 15l1.5-1.5m4.5 0h4.5A2.25 2.25 0 0121 18.75V21', hint: 'produits par categorie', tone: 'info' },
    ]

    return (
        <AdminLayout title="Categories">
            <Surface className="mb-6">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_35%),linear-gradient(135deg,#0f172a_0%,#1e1b4b_48%,#3730a3_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-indigo-300/10 blur-3xl" />
                    <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                        <div>
                            <HighlightPill tone="sky">Administration</HighlightPill>
                            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Categories</h1>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/78 md:text-base">
                                Organisez votre catalogue en creant et en gerant les categories de produits.
                            </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Ordonnees</p>
                                <p className="mt-3 text-3xl font-bold">{categories.length}</p>
                                <p className="mt-2 text-sm text-white/70">categories enregistrees</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Produits relies</p>
                                <p className="mt-3 text-3xl font-bold">{totalProducts}</p>
                                <p className="mt-2 text-sm text-white/70">dans le catalogue</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Libres</p>
                                <p className="mt-3 text-3xl font-bold">{categories.filter((c) => c.products_count === 0).length}</p>
                                <p className="mt-2 text-sm text-white/70">sans produit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Surface>

            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {statCards.map((s) => <StatCard key={s.label} {...s} />)}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <Surface className="p-6 md:p-8">
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Catalogue</p>
                            <h2 className="mt-2 text-xl font-bold text-text-dark">Liste des categories</h2>
                            <p className="mt-2 text-sm text-text-muted">{categories.length} categorie{categories.length > 1 ? 's' : ''} au total.</p>
                        </div>
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nouvelle categorie
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-4 pb-4 text-left font-semibold text-text-dark">Categorie</th>
                                    <th className="px-4 pb-4 text-left font-semibold text-text-dark hidden sm:table-cell">Slug</th>
                                    <th className="px-4 pb-4 text-center font-semibold text-text-dark">Produits</th>
                                    <th className="px-4 pb-4 text-center font-semibold text-text-dark hidden md:table-cell">Ordre</th>
                                    <th className="px-4 pb-4 text-right font-semibold text-text-dark">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 ? categories.map((cat, index) => (
                                    <tr key={cat.id} className="border-b border-border/70 last:border-0 transition-colors hover:bg-[#fbfcfb]">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: cat.color || defaultColor }}>
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-semibold text-text-dark">{cat.name}</p>
                                                    {cat.description && <p className="mt-0.5 text-xs text-text-muted line-clamp-1 max-w-[200px]">{cat.description}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-mono text-xs text-text-muted hidden sm:table-cell">{cat.slug}</td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">{cat.products_count}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center text-text-muted hidden md:table-cell">{cat.sort_order}</td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEdit(cat)} className="rounded-2xl bg-primary-light px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white">Modifier</button>
                                                <button onClick={() => confirmDelete(cat.id)} className="rounded-2xl border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 hover:border-rose-300">Supprimer</button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="py-10 text-center text-sm text-text-muted">Aucune categorie pour le moment.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Surface>

                {showForm && (
                    <Surface className="p-6 md:p-8 h-fit">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{editingId ? 'Edition' : 'Creation'}</p>
                                <h2 className="mt-2 text-xl font-bold text-text-dark">{editingId ? 'Modifier la categorie' : 'Nouvelle categorie'}</h2>
                            </div>
                            <button onClick={closeForm} className="flex h-9 w-9 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-gray-100">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Nom</label>
                                <input type="text" value={form.data.name} onChange={(e) => {
                                    form.setData('name', e.target.value)
                                    if (!editingId) form.setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
                                }} className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white" placeholder="Ex: Ebooks" />
                                {form.errors.name && <p className="mt-1 text-sm text-rose-600">{form.errors.name}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Slug</label>
                                <input type="text" value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white" placeholder="ebooks" />
                                {form.errors.slug && <p className="mt-1 text-sm text-rose-600">{form.errors.slug}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Description</label>
                                <textarea rows={3} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white" placeholder="Description de la categorie..." />
                                {form.errors.description && <p className="mt-1 text-sm text-rose-600">{form.errors.description}</p>}
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Couleur</label>
                                    <div className="flex items-center gap-3">
                                        <input type="color" value={form.data.color} onChange={(e) => form.setData('color', e.target.value)} className="h-10 w-10 cursor-pointer rounded-xl border border-border" />
                                        <input type="text" value={form.data.color} onChange={(e) => form.setData('color', e.target.value)} className="flex-1 rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white" />
                                    </div>
                                    {form.errors.color && <p className="mt-1 text-sm text-rose-600">{form.errors.color}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Ordre d'affichage</label>
                                    <input type="number" min="0" value={form.data.sort_order} onChange={(e) => form.setData('sort_order', parseInt(e.target.value) || 0)} className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white" />
                                    {form.errors.sort_order && <p className="mt-1 text-sm text-rose-600">{form.errors.sort_order}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Icone (emoji ou classe)</label>
                                <input type="text" value={form.data.icon} onChange={(e) => form.setData('icon', e.target.value)} className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white" placeholder="Ex: 📚" />
                                {form.errors.icon && <p className="mt-1 text-sm text-rose-600">{form.errors.icon}</p>}
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Image</label>
                                    <input type="text" value={form.data.image} onChange={(e) => form.setData('image', e.target.value)} className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white" placeholder="images/categories/ebooks.svg" />
                                    {form.errors.image && <p className="mt-1 text-sm text-rose-600">{form.errors.image}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Image thematique</label>
                                    <input type="text" value={form.data.thematic_image} onChange={(e) => form.setData('thematic_image', e.target.value)} className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white" placeholder="images/thematiques/ebooks.jpg" />
                                    {form.errors.thematic_image && <p className="mt-1 text-sm text-rose-600">{form.errors.thematic_image}</p>}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={form.processing} className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5 disabled:opacity-50">
                                    {form.processing ? (
                                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    ) : <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                                    {editingId ? 'Mettre a jour' : 'Creer la categorie'}
                                </button>
                                <button type="button" onClick={closeForm} className="rounded-2xl border border-border px-6 py-3.5 text-sm font-semibold text-text-dark transition-all hover:bg-gray-50">Annuler</button>
                            </div>
                        </form>
                    </Surface>
                )}
            </div>

            {deletingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setDeletingId(null)} />
                    <div className="relative mx-4 w-full max-w-sm rounded-[30px] border border-white/70 bg-white/95 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.18)] backdrop-blur-xl text-center">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] bg-rose-50">
                            <svg className="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-text-dark">Supprimer la categorie</h3>
                        <p className="mt-3 text-sm leading-7 text-text-muted">Cette action est irreversible. Voulez-vous vraiment supprimer cette categorie ?</p>
                        <div className="mt-6 flex items-center justify-center gap-3">
                            <button onClick={() => setDeletingId(null)} className="rounded-2xl border border-border px-6 py-3 text-sm font-semibold text-text-dark transition-all hover:bg-gray-50">Annuler</button>
                            <button onClick={executeDelete} className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(225,29,72,0.22)] transition-all hover:-translate-y-0.5">Supprimer</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
