import { usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

function MiniStat({ label, value, hint, tone = 'default' }) {
    const toneClass = {
        default: 'bg-white border-border text-text-dark',
        green: 'bg-emerald-50 border-emerald-100 text-emerald-800',
        amber: 'bg-amber-50 border-amber-100 text-amber-800',
        sky: 'bg-sky-50 border-sky-100 text-sky-800',
    }[tone] || 'bg-white border-border text-text-dark'

    return (
        <div className={`rounded-2xl border p-4 ${toneClass}`}>
            <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
            {hint && <p className="mt-1 text-sm opacity-80">{hint}</p>}
        </div>
    )
}

function LineTrendChart({ data = [] }) {
    if (!data.length) {
        return <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-text-muted">Aucune donnee mensuelle disponible.</div>
    }

    const width = 560
    const height = 240
    const padding = 28
    const maxRevenue = Math.max(...data.map((item) => item.revenue), 1)
    const points = data.map((item, index) => {
        const x = padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1)
        const y = height - padding - ((item.revenue / maxRevenue) * (height - padding * 2))
        return { ...item, x, y }
    })
    const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
    const areaPath = `${path} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`

    return (
        <div>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
                <defs>
                    <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(11,122,53,0.28)" />
                        <stop offset="100%" stopColor="rgba(11,122,53,0.02)" />
                    </linearGradient>
                </defs>
                {[0, 1, 2, 3].map((step) => {
                    const y = padding + ((height - padding * 2) / 3) * step
                    return <line key={step} x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(148,163,184,0.22)" strokeDasharray="4 6" />
                })}
                <path d={areaPath} fill="url(#trendFill)" />
                <path d={path} fill="none" stroke="#0b7a35" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {points.map((point) => (
                    <g key={point.month}>
                        <circle cx={point.x} cy={point.y} r="5" fill="#0b7a35" />
                        <circle cx={point.x} cy={point.y} r="10" fill="rgba(11,122,53,0.14)" />
                    </g>
                ))}
            </svg>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {data.map((item) => (
                    <div key={item.month} className="rounded-xl bg-[#f8fbf8] px-3 py-3">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">{item.month}</p>
                        <p className="mt-1 text-sm font-semibold text-text-dark">{item.revenue.toLocaleString('fr-DZ')} DZD</p>
                        <p className="mt-1 text-xs text-text-muted">{item.sales} ventes</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CategoryBars({ data = [] }) {
    const maxRevenue = Math.max(...data.map((item) => item.revenue), 1)

    return (
        <div className="grid gap-4">
            {data.length ? data.map((item) => (
                <div key={item.category}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-text-dark">{item.category}</p>
                            <p className="text-xs text-text-muted">{item.products} produits . {item.sales} ventes</p>
                        </div>
                        <p className="text-sm font-bold text-text-dark">{item.revenue.toLocaleString('fr-DZ')} DZD</p>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-[#edf3ee]">
                        <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#0b7a35_0%,#15a34a_100%)]"
                            style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                        />
                    </div>
                </div>
            )) : (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-text-muted">Aucune categorie avec revenu pour le moment.</div>
            )}
        </div>
    )
}

function CircleGauge({ value, total, label, color }) {
    const radius = 44
    const circumference = 2 * Math.PI * radius
    const percent = total > 0 ? value / total : 0
    const offset = circumference * (1 - percent)

    return (
        <div className="flex flex-col items-center rounded-2xl border border-border bg-[#fbfcfb] p-4">
            <svg viewBox="0 0 120 120" className="h-28 w-28">
                <circle cx="60" cy="60" r={radius} stroke="rgba(148,163,184,0.16)" strokeWidth="12" fill="none" />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke={color}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 60 60)"
                />
                <text x="60" y="56" textAnchor="middle" className="fill-text-dark text-[20px] font-bold">{value}</text>
                <text x="60" y="74" textAnchor="middle" className="fill-slate-500 text-[10px]">{total > 0 ? `${Math.round(percent * 100)}%` : '0%'}</text>
            </svg>
            <p className="mt-2 text-sm font-semibold text-text-dark">{label}</p>
        </div>
    )
}

export default function VendeurDashboard() {
    const { sellerStats, analytics, messageSummary, serviceMissionSummary, auth } = usePage().props
    const seller = auth?.user
    const totalProducts = sellerStats?.totalProducts ?? 0
    const totalSales = sellerStats?.totalSales ?? 0
    const totalRevenue = sellerStats?.totalRevenue ?? 0
    const avgRating = sellerStats?.avgRating ?? 0
    const topProducts = sellerStats?.topProducts ?? []
    const unreadMessages = messageSummary?.unread ?? 0
    const recentMessages = messageSummary?.recent ?? []
    const serviceMissionCount = serviceMissionSummary?.total ?? 0
    const recentServiceMissions = serviceMissionSummary?.recent ?? []
    const monthlyTrend = analytics?.monthlyTrend ?? []
    const categoryRevenue = analytics?.categoryRevenue ?? []
    const catalogMix = analytics?.catalogMix ?? {}
    const insights = analytics?.insights ?? {}
    const headline = analytics?.headline ?? {}

    const stats = [
        { label: 'Produits publies', value: totalProducts, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'text-primary', bg: 'bg-primary-light' },
        { label: 'Ventes totales', value: totalSales, icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3', color: 'text-accent-red', bg: 'bg-red-50' },
        { label: 'Revenus', value: `${totalRevenue.toLocaleString('fr-DZ')} DZD`, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-primary-dark', bg: 'bg-emerald-50' },
        { label: 'Note moyenne', value: `${avgRating}/5`, icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z', color: 'text-amber-600', bg: 'bg-amber-50' },
    ]

    return (
        <SellerLayout title="Tableau de bord vendeur">
            <section className="mb-8 overflow-hidden rounded-[34px] border border-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <div className="bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(135deg,#0f172a_0%,#123524_45%,#0b7a35_100%)] px-6 py-8 text-white md:px-8">
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Vue analyste vendeur</p>
                            <h1 className="mt-3 text-3xl font-bold md:text-4xl">Pilotez votre store avec des donnees utiles</h1>
                            <p className="mt-3 text-sm leading-7 text-white/75">
                                Suivez vos revenus, comparez vos categories, observez les tendances mensuelles et identifiez les produits qui portent vraiment votre croissance.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <MiniStat label="Ce mois-ci" value={`${(headline.thisMonthRevenue ?? 0).toLocaleString('fr-DZ')} DZD`} hint="revenu current" tone="green" />
                            <MiniStat label="Variation" value={`${headline.revenueChangePercent ?? 0}%`} hint="vs mois precedent" tone={(headline.revenueChangePercent ?? 0) >= 0 ? 'sky' : 'amber'} />
                            <MiniStat label="Moyenne" value={`${(headline.averageMonthlyRevenue ?? 0).toLocaleString('fr-DZ')} DZD`} hint="mensuelle" tone="default" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="card p-5 md:p-6 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                            <svg className={`w-6 h-6 ${stat.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                            </svg>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-text-dark">{stat.value}</p>
                            <p className="text-sm text-text-muted">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                <div className="card p-6 md:p-8">
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-text-dark">Evolution des revenus</h2>
                            <p className="mt-1 text-sm text-text-muted">Visualisez les variations mensuelles de votre chiffre d affaires et de vos ventes.</p>
                        </div>
                    </div>
                    <LineTrendChart data={monthlyTrend} />
                </div>

                <div className="card p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text-dark">Mix du catalogue</h2>
                    <p className="mt-1 text-sm text-text-muted">Comprenez la structure de votre offre en un coup d oeil.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <CircleGauge value={catalogMix.digitalProducts ?? 0} total={totalProducts} label="Produits digitaux" color="#0b7a35" />
                        <CircleGauge value={catalogMix.serviceProducts ?? 0} total={totalProducts} label="Services" color="#0284c7" />
                        <CircleGauge value={catalogMix.freeProducts ?? 0} total={totalProducts} label="Produits gratuits" color="#f59e0b" />
                        <CircleGauge value={catalogMix.paidProducts ?? 0} total={totalProducts} label="Produits payants" color="#7c3aed" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="card p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text-dark">Revenus par categorie</h2>
                    <p className="mt-1 text-sm text-text-muted">Reperez les familles de produits qui apportent le plus de revenu.</p>
                    <div className="mt-6">
                        <CategoryBars data={categoryRevenue} />
                    </div>
                </div>

                <div className="card p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text-dark">Lecture strategique</h2>
                    <p className="mt-1 text-sm text-text-muted">Des indicateurs simples pour evaluer la sante et le positionnement de votre boutique.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <MiniStat label="Meilleure categorie" value={insights.bestCategory || 'Aucune'} hint={`${(insights.bestCategoryRevenue ?? 0).toLocaleString('fr-DZ')} DZD`} tone="green" />
                        <MiniStat label="Ventes categorie top" value={insights.bestCategorySales ?? 0} hint="sur la meilleure categorie" tone="sky" />
                        <MiniStat label="Part catalogue gratuit" value={`${insights.topFreeProductsShare ?? 0}%`} hint="du catalogue total" tone="amber" />
                        <MiniStat label="Part catalogue payant" value={`${insights.topPaidProductsShare ?? 0}%`} hint="du catalogue total" tone="default" />
                        <MiniStat label="Messages non lus" value={unreadMessages} hint="contacts a traiter" tone="sky" />
                        <MiniStat label="Missions actives" value={serviceMissionCount} hint="prestations en suivi" tone="default" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 xl:grid-cols-[1fr_1fr]">
                <div className="card p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text-dark mb-6">Produits les plus rentables</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="pb-3 text-left font-semibold text-text-dark">Produit</th>
                                    <th className="pb-3 text-right font-semibold text-text-dark">Ventes</th>
                                    <th className="pb-3 text-right font-semibold text-text-dark">Revenu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.length ? topProducts.map((product, index) => (
                                    <tr key={product.id} className="border-b border-border last:border-0">
                                        <td className="py-3.5">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{index + 1}</span>
                                                <div>
                                                    <p className="font-medium text-text-dark">{product.name}</p>
                                                    <p className="text-xs text-text-muted">{product.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 text-right text-text-muted">{product.sales}</td>
                                        <td className="py-3.5 text-right font-semibold text-text-dark">{(product.revenue ?? 0).toLocaleString('fr-DZ')} DZD</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="py-10 text-center text-text-muted">Aucune vente enregistree pour le moment.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card p-6 md:p-8">
                    <h2 className="text-xl font-bold text-text-dark mb-6">Plan et capacite vendeur</h2>
                    <div className="grid gap-4">
                        <div className="rounded-2xl bg-[#f8fbf8] p-4">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Plan actif</p>
                            <p className="mt-2 text-2xl font-bold text-text-dark">
                                {seller?.seller_plan === 'elite' ? 'Elite' : seller?.seller_plan === 'pro' ? 'Pro' : 'Starter'}
                            </p>
                            <p className="mt-2 text-sm text-text-muted">
                                {seller?.seller_plan === 'starter' && 'Vous pouvez publier jusqu a 3 produits. Passez a Pro pour debloquer plus de volume et de visibilite.'}
                                {seller?.seller_plan === 'pro' && 'Produits illimites, badge vendeur verifie et meilleure priorite dans la boutique.'}
                                {seller?.seller_plan === 'elite' && 'Support prioritaire, exposition avancee et bouton WhatsApp personnalise.'}
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <MiniStat label="Prix moyen" value={`${(sellerStats?.averagePrice ?? 0).toLocaleString('fr-DZ')} DZD`} tone="default" />
                            <MiniStat label="Messages recus" value={unreadMessages} tone="sky" />
                            <MiniStat label="Support prioritaire" value={seller?.seller_plan === 'elite' ? 'Oui' : 'Non'} tone="amber" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 xl:grid-cols-[1fr_1fr]">
                <div className="card p-6 md:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                        <div>
                            <h2 className="text-lg font-bold text-text-dark">Messages recents</h2>
                            <p className="text-sm text-text-muted mt-1">Les demandes arrivent depuis votre profil public vendeur.</p>
                        </div>
                        <a href="/vendeur/messages" className="btn-outline px-5 py-2.5 text-sm">
                            Ouvrir la messagerie
                        </a>
                    </div>

                    {recentMessages.length > 0 ? (
                        <div className="grid gap-4">
                            {recentMessages.map((message) => (
                                <div key={message.id} className="rounded-2xl border border-border bg-[#fbfcfb] p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm font-semibold text-text-dark">{message.subject}</p>
                                        <span className="text-xs text-text-muted">{message.created_at}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-text-muted">Envoye par {message.sender_name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                            <p className="text-sm text-text-muted">Aucun message recent pour le moment.</p>
                        </div>
                    )}
                </div>

                <div className="card p-6 md:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                        <div>
                            <h2 className="text-lg font-bold text-text-dark">Missions service recentes</h2>
                            <p className="text-sm text-text-muted mt-1">Suivez les briefs et les livraisons de vos prestations reservees.</p>
                        </div>
                        <a href="/vendeur/services" className="btn-outline px-5 py-2.5 text-sm">
                            Voir les missions
                        </a>
                    </div>
                    {recentServiceMissions.length > 0 ? (
                        <div className="grid gap-4">
                            {recentServiceMissions.map((mission) => (
                                <a key={mission.id} href={`/vendeur/services/${mission.id}`} className="rounded-2xl border border-border bg-[#fbfcfb] p-4 transition-colors hover:border-primary/30">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-text-dark">{mission.product_name}</p>
                                            <p className="mt-1 text-xs text-text-muted">{mission.mission_number} . {mission.client_name}</p>
                                        </div>
                                        <span className="text-xs font-semibold text-primary">{mission.status}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                            <p className="text-sm text-text-muted">Aucune mission service recente.</p>
                        </div>
                    )}
                </div>
            </div>
        </SellerLayout>
    )
}
