import { useEffect, useMemo, useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

function StatCard({ label, value, tone = 'default' }) {
    const toneClass = {
        default: 'bg-white border-border text-text-dark',
        success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        warning: 'bg-amber-50 border-amber-200 text-amber-700',
        info: 'bg-sky-50 border-sky-200 text-sky-700',
        danger: 'bg-rose-50 border-rose-200 text-rose-700',
    }[tone]

    return (
        <div className={`rounded-2xl border p-5 shadow-sm ${toneClass}`}>
            <p className="text-xs uppercase tracking-[0.18em] opacity-80">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
    )
}

function planPill(plan) {
    if (plan === 'elite') {
        return 'border-amber-200 bg-amber-50 text-amber-700'
    }

    if (plan === 'pro') {
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'
    }

    return 'border-slate-200 bg-slate-100 text-slate-700'
}

export default function AdminSellers() {
    const { sellers = [], sellerStats, topPerformers = [] } = usePage().props
    const [selectedSellerId, setSelectedSellerId] = useState(sellers[0]?.id ?? null)
    const [planFilter, setPlanFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')

    const filteredSellers = useMemo(() => {
        return sellers.filter((seller) => {
            const matchesPlan = planFilter === 'all' ? true : seller.seller_plan === planFilter

            const matchesStatus = (() => {
                if (statusFilter === 'expired') {
                    return seller.is_plan_expired
                }

                if (statusFilter === 'pending') {
                    return seller.has_pending_validation
                }

                if (statusFilter === 'top') {
                    return topPerformers.some((performer) => performer.id === seller.id)
                }

                return true
            })()

            return matchesPlan && matchesStatus
        })
    }, [planFilter, sellers, statusFilter, topPerformers])

    const selectedSeller = useMemo(() => {
        return filteredSellers.find((seller) => seller.id === selectedSellerId)
            || sellers.find((seller) => seller.id === selectedSellerId)
            || filteredSellers[0]
            || sellers[0]
            || null
    }, [filteredSellers, selectedSellerId, sellers])

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        wilaya: '',
        bio: '',
        seller_plan: 'starter',
        whatsapp_cta_text: '',
        is_verified_seller: false,
        is_top_rated_seller: false,
        is_official_partner: false,
    })

    const messageForm = useForm({
        subject: '',
        message: '',
    })

    useEffect(() => {
        if (!selectedSeller) {
            return
        }

        setSelectedSellerId(selectedSeller.id)
        form.setData({
            name: selectedSeller.name || '',
            email: selectedSeller.email || '',
            phone: selectedSeller.phone || '',
            wilaya: selectedSeller.wilaya || '',
            bio: selectedSeller.bio || '',
            seller_plan: selectedSeller.seller_plan || 'starter',
            whatsapp_cta_text: selectedSeller.whatsapp_cta_text || '',
            is_verified_seller: selectedSeller.badges?.is_verified_seller ?? false,
            is_top_rated_seller: selectedSeller.badges?.is_top_rated_seller ?? false,
            is_official_partner: selectedSeller.badges?.is_official_partner ?? false,
        })
        messageForm.reset()
    }, [selectedSeller])

    const submit = (event) => {
        event.preventDefault()

        if (!selectedSeller) {
            return
        }

        form.patch(`/admin/vendeurs/${selectedSeller.id}`)
    }

    const sendMessage = (event) => {
        event.preventDefault()

        if (!selectedSeller) {
            return
        }

        messageForm.post(`/admin/vendeurs/${selectedSeller.id}/messages`, {
            preserveScroll: true,
            onSuccess: () => messageForm.reset(),
        })
    }

    return (
        <AdminLayout title="Gestion avancee des vendeurs">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-6">
                <StatCard label="Vendeurs" value={sellerStats?.total ?? 0} />
                <StatCard label="Starter" value={sellerStats?.starter ?? 0} tone="default" />
                <StatCard label="Pro" value={sellerStats?.pro ?? 0} tone="success" />
                <StatCard label="Elite" value={sellerStats?.elite ?? 0} tone="info" />
                <StatCard label="Expires" value={sellerStats?.expired ?? 0} tone="danger" />
                <StatCard label="Validation" value={sellerStats?.pendingValidation ?? 0} tone="warning" />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
                <div className="space-y-6">
                    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-text-dark">Filtres vendeurs</h2>
                                <p className="mt-1 text-sm text-text-muted">Filtrez rapidement par plan, expiration ou validation.</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-text-dark">Plan</label>
                                    <select
                                        value={planFilter}
                                        onChange={(event) => setPlanFilter(event.target.value)}
                                        className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    >
                                        <option value="all">Tous les plans</option>
                                        <option value="starter">Starter</option>
                                        <option value="pro">Pro</option>
                                        <option value="elite">Elite</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-text-dark">Segment</label>
                                    <select
                                        value={statusFilter}
                                        onChange={(event) => setStatusFilter(event.target.value)}
                                        className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    >
                                        <option value="all">Tous</option>
                                        <option value="expired">Vendeurs expires</option>
                                        <option value="pending">En attente de validation</option>
                                        <option value="top">Plus performants</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-text-dark">Liste des vendeurs</h2>
                                <p className="mt-1 text-sm text-text-muted">{filteredSellers.length} vendeur{filteredSellers.length > 1 ? 's' : ''} affiches.</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border text-left">
                                        <th className="pb-3 font-semibold text-text-dark">Vendeur</th>
                                        <th className="pb-3 font-semibold text-text-dark hidden md:table-cell">Plan</th>
                                        <th className="pb-3 font-semibold text-text-dark hidden lg:table-cell">Statut</th>
                                        <th className="pb-3 font-semibold text-text-dark">Ventes</th>
                                        <th className="pb-3 font-semibold text-text-dark">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSellers.length ? filteredSellers.map((seller) => (
                                        <tr key={seller.id} className="border-b border-border last:border-0">
                                            <td className="py-4">
                                                <p className="font-semibold text-text-dark">{seller.name}</p>
                                                <p className="text-xs text-text-muted">{seller.email}</p>
                                            </td>
                                            <td className="py-4 hidden md:table-cell">
                                                <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${planPill(seller.seller_plan)}`}>
                                                    {seller.seller_plan_label}
                                                </span>
                                            </td>
                                            <td className="py-4 hidden lg:table-cell">
                                                {seller.is_plan_expired ? (
                                                    <span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
                                                        Expire
                                                    </span>
                                                ) : seller.has_pending_validation ? (
                                                    <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                                        Validation
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                        Actif
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 text-text-dark">{seller.total_sales}</td>
                                            <td className="py-4">
                                                <button
                                                    onClick={() => setSelectedSellerId(seller.id)}
                                                    className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${selectedSeller?.id === seller.id ? 'bg-primary text-white' : 'bg-primary-light text-primary hover:bg-primary hover:text-white'}`}
                                                >
                                                    Gerer
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-sm text-text-muted">
                                                Aucun vendeur ne correspond a ce filtre.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                        <div className="mb-5">
                            <h2 className="text-lg font-bold text-text-dark">Vendeurs les plus performants</h2>
                            <p className="mt-1 text-sm text-text-muted">Classement interne base sur ventes, note moyenne et revenu estime.</p>
                        </div>

                        <div className="grid gap-3">
                            {topPerformers.map((seller, index) => (
                                <button
                                    key={seller.id}
                                    type="button"
                                    onClick={() => setSelectedSellerId(seller.id)}
                                    className="flex items-center gap-4 rounded-2xl border border-border bg-[#fbfcfb] px-4 py-4 text-left transition-colors hover:border-primary/30"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-sm font-bold text-primary">
                                        {index + 1}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-text-dark">{seller.name}</p>
                                        <p className="mt-1 text-xs text-text-muted">
                                            {seller.total_sales} ventes . {seller.estimated_revenue.toLocaleString('fr-DZ')} DZD estimes
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-text-dark">{seller.performance_score}</p>
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">score</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    {selectedSeller ? (
                        <>
                            <div className="mb-5">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-lg font-bold text-text-dark">{selectedSeller.name}</h2>
                                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${planPill(selectedSeller.seller_plan)}`}>
                                        {selectedSeller.seller_plan_label}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-text-muted">Modifier le profil vendeur et gerer son statut marketplace.</p>
                            </div>

                            <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                <div className="rounded-xl bg-primary-light/40 p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Produits</p>
                                    <p className="mt-2 text-lg font-bold text-text-dark">{selectedSeller.products_count}</p>
                                </div>
                                <div className="rounded-xl bg-primary-light/40 p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Ventes</p>
                                    <p className="mt-2 text-lg font-bold text-text-dark">{selectedSeller.total_sales}</p>
                                </div>
                                <div className="rounded-xl bg-primary-light/40 p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Revenu estime</p>
                                    <p className="mt-2 text-lg font-bold text-text-dark">{selectedSeller.estimated_revenue.toLocaleString('fr-DZ')} DZD</p>
                                </div>
                                <div className="rounded-xl bg-primary-light/40 p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Note</p>
                                    <p className="mt-2 text-lg font-bold text-text-dark">{selectedSeller.average_rating}/5</p>
                                </div>
                                <div className="rounded-xl bg-primary-light/40 p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Expiration plan</p>
                                    <p className="mt-2 text-sm font-bold text-text-dark">{selectedSeller.seller_plan_expires_at || 'Aucune'}</p>
                                </div>
                                <div className="rounded-xl bg-primary-light/40 p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Validation</p>
                                    <p className="mt-2 text-sm font-bold text-text-dark">{selectedSeller.pending_validation_label || 'Aucune attente'}</p>
                                </div>
                            </div>

                            {(selectedSeller.is_plan_expired || selectedSeller.has_pending_validation) && (
                                <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                                    {selectedSeller.is_plan_expired && <p>Le plan vendeur a expire et doit etre renouvele ou reajuste.</p>}
                                    {selectedSeller.has_pending_validation && <p className={selectedSeller.is_plan_expired ? 'mt-2' : ''}>{selectedSeller.pending_validation_label}</p>}
                                </div>
                            )}

                            <form onSubmit={submit} className="grid gap-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-text-dark">Nom</label>
                                    <input
                                        type="text"
                                        value={form.data.name}
                                        onChange={(event) => form.setData('name', event.target.value)}
                                        className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-text-dark">Email</label>
                                    <input
                                        type="email"
                                        value={form.data.email}
                                        onChange={(event) => form.setData('email', event.target.value)}
                                        className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-text-dark">Telephone</label>
                                        <input
                                            type="text"
                                            value={form.data.phone}
                                            onChange={(event) => form.setData('phone', event.target.value)}
                                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-text-dark">Wilaya</label>
                                        <input
                                            type="text"
                                            value={form.data.wilaya}
                                            onChange={(event) => form.setData('wilaya', event.target.value)}
                                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-text-dark">Bio</label>
                                    <textarea
                                        rows={5}
                                        value={form.data.bio}
                                        onChange={(event) => form.setData('bio', event.target.value)}
                                        className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-text-dark">Plan vendeur</label>
                                        <select
                                            value={form.data.seller_plan}
                                            onChange={(event) => form.setData('seller_plan', event.target.value)}
                                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                        >
                                            <option value="starter">Starter</option>
                                            <option value="pro">Pro</option>
                                            <option value="elite">Elite</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-text-dark">WhatsApp CTA Elite</label>
                                        <input
                                            type="text"
                                            value={form.data.whatsapp_cta_text}
                                            onChange={(event) => form.setData('whatsapp_cta_text', event.target.value)}
                                            disabled={form.data.seller_plan !== 'elite'}
                                            placeholder="Achat Instantane"
                                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:bg-gray-100 disabled:text-text-muted"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <label className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm text-text-dark">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_verified_seller}
                                            onChange={(event) => form.setData('is_verified_seller', event.target.checked)}
                                            className="accent-primary"
                                        />
                                        Verified Seller
                                    </label>
                                    <label className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm text-text-dark">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_top_rated_seller}
                                            onChange={(event) => form.setData('is_top_rated_seller', event.target.checked)}
                                            className="accent-primary"
                                        />
                                        Top Rated
                                    </label>
                                    <label className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm text-text-dark">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_official_partner}
                                            onChange={(event) => form.setData('is_official_partner', event.target.checked)}
                                            className="accent-primary"
                                        />
                                        Official Partner
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="btn-primary mt-2 justify-center py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {form.processing ? 'Enregistrement...' : 'Mettre a jour le vendeur'}
                                </button>
                            </form>

                            <div className="mt-8 border-t border-border pt-6">
                                <div className="mb-4">
                                    <h3 className="text-base font-bold text-text-dark">Message admin</h3>
                                    <p className="mt-1 text-sm text-text-muted">Envoyez un message interne au vendeur depuis le dashboard admin.</p>
                                </div>

                                <form onSubmit={sendMessage} className="grid gap-4">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-text-dark">Sujet</label>
                                        <input
                                            type="text"
                                            value={messageForm.data.subject}
                                            onChange={(event) => messageForm.setData('subject', event.target.value)}
                                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                            placeholder="Ex: Verification de profil"
                                        />
                                        {messageForm.errors.subject && <p className="mt-1 text-xs text-red-500">{messageForm.errors.subject}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-text-dark">Message</label>
                                        <textarea
                                            rows={5}
                                            value={messageForm.data.message}
                                            onChange={(event) => messageForm.setData('message', event.target.value)}
                                            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                            placeholder="Bonjour, merci de mettre a jour vos informations vendeur..."
                                        />
                                        {messageForm.errors.message && <p className="mt-1 text-xs text-red-500">{messageForm.errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={messageForm.processing}
                                        className="btn-outline justify-center py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {messageForm.processing ? 'Envoi...' : 'Envoyer au vendeur'}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-xl border border-dashed border-border p-10 text-center">
                            <p className="text-sm text-text-muted">Aucun vendeur disponible.</p>
                        </div>
                    )}
                </section>
            </div>
        </AdminLayout>
    )
}
