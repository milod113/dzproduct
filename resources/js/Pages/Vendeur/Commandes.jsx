import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import SellerLayout from '@/Layouts/SellerLayout'

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
        slate: 'from-slate-50 to-white text-slate-700 border-slate-200',
    }[tone] || 'from-emerald-50 to-white text-emerald-700 border-emerald-100'

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
        amber: 'bg-amber-300/12 text-amber-50 border-amber-200/20',
    }[tone] || 'bg-white/12 text-white border-white/12'

    return (
        <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
            {children}
        </div>
    )
}

function SectionHeader({ eyebrow, title, text, action }) {
    return (
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
                {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
                <h2 className="mt-2 text-2xl font-bold text-text-dark">{title}</h2>
                {text && <p className="mt-2 max-w-2xl text-sm leading-7 text-text-muted">{text}</p>}
            </div>
            {action}
        </div>
    )
}

const statusConfig = {
    Livree: { label: 'Livree', classes: 'bg-emerald-100 text-emerald-700', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    'En cours': { label: 'En cours', classes: 'bg-amber-100 text-amber-700', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
}

export default function VendeurCommandes() {
    const { orders = [], orderStats } = usePage().props
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('')

    const filtered = orders.filter((o) => {
        if (filterStatus && o.status !== filterStatus) return false
        if (search) {
            const q = search.toLowerCase()
            return (
                o.id?.toLowerCase().includes(q) ||
                o.client?.toLowerCase().includes(q) ||
                o.product?.toLowerCase().includes(q)
            )
        }
        return true
    })

    const stats = [
        {
            label: 'Commandes totales',
            value: orderStats?.total ?? orders.length,
            hint: 'historique complet des ventes',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
            tone: 'emerald',
        },
        {
            label: 'Livrees',
            value: orderStats?.completed ?? 0,
            hint: 'commandes terminees avec succes',
            icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'sky',
        },
        {
            label: 'En cours',
            value: orderStats?.pending ?? 0,
            hint: 'commandes en attente de traitement',
            icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'amber',
        },
    ]

    return (
        <SellerLayout title="Commandes">
            <Surface className="mb-8">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.16),_transparent_35%),linear-gradient(135deg,#0f172a_0%,#0f3a2b_48%,#0b7a35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />

                    <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                        <div>
                            <HighlightPill tone="amber">Gestion des commandes</HighlightPill>
                            <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                                Suivez et gérez vos ventes en temps reel
                            </h1>
                            <p className="mt-4 max-w-3xl text-sm leading-8 text-white/78 md:text-base">
                                Consultez l historique de vos commandes, suivez le statut de chaque vente et pilotez
                                l execution de vos livraisons depuis un seul tableau de bord.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Chiffre d affaires</p>
                                <p className="mt-3 text-3xl font-bold">
                                    {orders.reduce((sum, o) => sum + (o.amount ?? 0), 0).toLocaleString('fr-DZ')} DZD
                                </p>
                                <p className="mt-2 text-sm text-white/70">cumul de toutes les ventes</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Paniers</p>
                                <p className="mt-3 text-3xl font-bold">{orders.length}</p>
                                <p className="mt-2 text-sm text-white/70">commandes enregistrees</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Taux de realisation</p>
                                <p className="mt-3 text-3xl font-bold">
                                    {orders.length > 0 ? Math.round((orderStats?.completed ?? 0) / orders.length * 100) : 0}%
                                </p>
                                <p className="mt-2 text-sm text-white/70">commandes livrees</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Surface>

            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <Surface className="p-6 md:p-8">
                <SectionHeader
                    eyebrow="Historique"
                    title="Toutes les commandes"
                    text="Retrouvez l ensemble des achats effectues sur vos produits, filtres par client, produit ou statut."
                />

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                        <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher par commande, client ou produit..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-[20px] border border-border bg-[#fbfcfb] py-3 pl-11 pr-4 text-sm text-text-dark placeholder-text-muted outline-none transition-colors focus:border-primary/40 focus:bg-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['', 'Livree', 'En cours'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                                    filterStatus === status
                                        ? 'bg-primary text-white shadow-[0_8px_20px_rgba(11,122,53,0.22)]'
                                        : 'border border-border bg-white text-text-muted hover:border-primary/20 hover:text-primary'
                                }`}
                            >
                                {status || 'Toutes'}
                            </button>
                        ))}
                    </div>
                </div>

                {filtered.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-4 pb-4 text-left font-semibold text-text-dark">Commande</th>
                                    <th className="px-4 pb-4 text-left font-semibold text-text-dark hidden sm:table-cell">Client</th>
                                    <th className="px-4 pb-4 text-left font-semibold text-text-dark hidden md:table-cell">Produit</th>
                                    <th className="px-4 pb-4 text-left font-semibold text-text-dark hidden lg:table-cell">Date</th>
                                    <th className="px-4 pb-4 text-right font-semibold text-text-dark">Montant</th>
                                    <th className="px-4 pb-4 text-right font-semibold text-text-dark">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((order, index) => {
                                    const statusInfo = statusConfig[order.status] || { classes: 'bg-gray-100 text-gray-600', icon: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' }
                                    return (
                                        <tr key={order.id} className="border-b border-border/70 last:border-0 transition-colors hover:bg-[#fbfcfb]">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{index + 1}</span>
                                                    <span className="font-medium text-text-dark">{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-text-muted hidden sm:table-cell">{order.client}</td>
                                            <td className="px-4 py-4 text-text-muted hidden md:table-cell">
                                                <span className="truncate max-w-[200px] block">{order.product}</span>
                                            </td>
                                            <td className="px-4 py-4 text-text-muted hidden lg:table-cell">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                    </svg>
                                                    {order.date}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right font-semibold text-text-dark">{(order.amount ?? 0).toLocaleString('fr-DZ')} DZD</td>
                                            <td className="px-4 py-4 text-right">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold ${statusInfo.classes}`}>
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={statusInfo.icon} />
                                                    </svg>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-14 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
                            <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-base font-semibold text-text-dark">Aucune commande trouvee</p>
                        <p className="mt-2 text-sm text-text-muted">
                            {search || filterStatus
                                ? 'Essayez de modifier vos filtres de recherche.'
                                : 'Vous n avez pas encore recu de commandes.'}
                        </p>
                    </div>
                )}
            </Surface>
        </SellerLayout>
    )
}
