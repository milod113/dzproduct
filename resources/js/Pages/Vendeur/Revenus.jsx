import { usePage } from '@inertiajs/react'
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
        amber: 'bg-amber-300/12 text-amber-50 border-amber-200/20',
    }[tone]

    return (
        <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
            {children}
        </div>
    )
}

function SectionHeader({ eyebrow, title, text, action, center }) {
    return (
        <div className={`mb-6 flex flex-col gap-4 ${center ? 'items-center text-center' : ''} lg:flex-row lg:items-end lg:justify-between`}>
            <div>
                {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
                <h2 className={`mt-2 font-bold text-text-dark ${center ? 'text-xl' : 'text-2xl'}`}>{title}</h2>
                {text && <p className={`mt-2 max-w-2xl text-sm leading-7 text-text-muted ${center ? 'mx-auto' : ''}`}>{text}</p>}
            </div>
            {action}
        </div>
    )
}

function Currency(value) {
    return `${(value ?? 0).toLocaleString('fr-DZ')} DZD`
}

function BarChart({ data = [] }) {
    if (!data.length) {
        return <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-10 text-center text-sm text-text-muted">Aucune donnee mensuelle disponible.</div>
    }

    const maxRevenue = Math.max(...data.map((item) => item.revenue), 1)

    return (
        <div className="rounded-[28px] border border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf8_100%)] p-4 md:p-6">
            <div className="flex items-end gap-3 md:gap-4" style={{ height: '210px' }}>
                {data.map((month) => {
                    const heightPercent = (month.revenue / maxRevenue) * 100

                    return (
                        <div key={month.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                                <span className="text-[10px] font-semibold text-text-dark bg-white rounded-full px-2 py-1 shadow-sm border border-border/50">
                                    {Currency(month.revenue)}
                                </span>
                            </div>
                            <div
                                className="w-full rounded-lg bg-[linear-gradient(180deg,#22c55e_0%,#0b7a35_100%)] transition-all duration-300 group-hover:brightness-110 cursor-pointer relative overflow-hidden"
                                style={{ height: `${Math.max(heightPercent, 3)}%` }}
                                title={`${month.month}: ${Currency(month.revenue)} (${month.sales} ventes)`}
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-[10px] font-medium text-text-muted">{month.month}</span>
                        </div>
                    )
                })}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                {data.map((item) => (
                    <div key={item.month} className="rounded-[22px] bg-[#f8fbf8] px-4 py-4">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">{item.month}</p>
                        <p className="mt-2 text-sm font-semibold text-text-dark">{Currency(item.revenue)}</p>
                        <p className="mt-1 text-xs text-text-muted">{item.sales} ventes</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function VendeurRevenus() {
    const { products = [], revenueSummary } = usePage().props
    const monthlyData = revenueSummary?.monthly ?? []
    const totalRevenue = revenueSummary?.totalRevenue ?? 0
    const totalThisMonth = revenueSummary?.thisMonthRevenue ?? 0
    const avgMonthly = revenueSummary?.averageMonthlyRevenue ?? 0

    const stats = [
        {
            label: 'Revenu total',
            value: Currency(totalRevenue),
            hint: 'cumul depuis le debut',
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'emerald',
        },
        {
            label: 'Ce mois-ci',
            value: Currency(totalThisMonth),
            hint: 'performance periode courante',
            icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
            tone: 'sky',
        },
        {
            label: 'Moyenne mensuelle',
            value: Currency(avgMonthly),
            hint: 'revenu mensuel moyen',
            icon: 'M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75H17.25m-1.5-7.5A2.25 2.25 0 0013.5 3h-8.25A2.25 2.25 0 003 5.25v7.5A2.25 2.25 0 005.25 15H9m0 0l-1.5 1.5M9 15l1.5-1.5m4.5 0h4.5A2.25 2.25 0 0121 18.75V21',
            tone: 'amber',
        },
    ]

    return (
        <SellerLayout title="Revenus">
            <Surface className="mb-8">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.20),_transparent_40%),linear-gradient(135deg,#0f172a_0%,#0f3a2b_48%,#0b7a35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

                    <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                        <div>
                            <HighlightPill tone="green">Analyse financiere</HighlightPill>
                            <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                                Visualisez et pilotez vos revenus
                            </h1>
                            <p className="mt-4 max-w-3xl text-sm leading-8 text-white/78 md:text-base">
                                Suivez l evolution de votre chiffre d affaires mois par mois, identifiez vos
                                produits les plus rentables et prenez des decisions eclairees pour votre activite.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Ventes totales</p>
                                <p className="mt-3 text-3xl font-bold">{products.reduce((s, p) => s + (p.sales ?? 0), 0)}</p>
                                <p className="mt-2 text-sm text-white/70">produits vendus</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Produits actifs</p>
                                <p className="mt-3 text-3xl font-bold">{products.length}</p>
                                <p className="mt-2 text-sm text-white/70">dans votre catalogue</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Prix moyen</p>
                                <p className="mt-3 text-3xl font-bold">
                                    {Currency(products.length > 0 ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length) : 0)}
                                </p>
                                <p className="mt-2 text-sm text-white/70">toutes ventes confondues</p>
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

            <Surface className="mb-6 p-6 md:p-8">
                <SectionHeader
                    eyebrow="Performance"
                    title="Revenus mensuels"
                    text="Evolution de votre chiffre d affaires mois par mois avec le detail des ventes."
                />
                <BarChart data={monthlyData} />
            </Surface>

            <Surface className="p-6 md:p-8">
                <SectionHeader
                    eyebrow="Portfolio"
                    title="Detail des ventes par produit"
                    text="Consultez les performances individuelles de chaque produit de votre catalogue."
                />

                {products.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-4 pb-4 text-left font-semibold text-text-dark">Produit</th>
                                    <th className="px-4 pb-4 text-right font-semibold text-text-dark">Ventes</th>
                                    <th className="px-4 pb-4 text-right font-semibold text-text-dark hidden sm:table-cell">Prix unitaire</th>
                                    <th className="px-4 pb-4 text-right font-semibold text-text-dark">Revenu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id} className="border-b border-border/70 last:border-0 transition-colors hover:bg-[#fbfcfb]">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{index + 1}</span>
                                                <span className="font-medium text-text-dark">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 font-medium text-text-dark">
                                                <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                </svg>
                                                {product.sales}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right text-text-muted hidden sm:table-cell">{Currency(product.price)}</td>
                                        <td className="px-4 py-4 text-right font-semibold text-text-dark">{Currency(product.price * product.sales)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-14 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
                            <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-base font-semibold text-text-dark">Aucune vente enregistree</p>
                        <p className="mt-2 text-sm text-text-muted">Les revenus apparaitront une fois vos premiers produits vendus.</p>
                    </div>
                )}
            </Surface>
        </SellerLayout>
    )
}
