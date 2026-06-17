import { Link, usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

function Currency(value) {
    return `${(value ?? 0).toLocaleString('fr-DZ')} DZD`
}

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

function LineTrendChart({ data = [] }) {
    if (!data.length) {
        return <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-10 text-center text-sm text-text-muted">Aucune donnee mensuelle disponible.</div>
    }

    const width = 700
    const height = 290
    const padding = 34
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
            <div className="rounded-[28px] border border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf8_100%)] p-4 md:p-5">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
                    <defs>
                        <linearGradient id="sellerTrendFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(11,122,53,0.30)" />
                            <stop offset="100%" stopColor="rgba(11,122,53,0.02)" />
                        </linearGradient>
                    </defs>
                    {[0, 1, 2, 3].map((step) => {
                        const y = padding + ((height - padding * 2) / 3) * step
                        return <line key={step} x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(148,163,184,0.18)" strokeDasharray="5 8" />
                    })}
                    <path d={areaPath} fill="url(#sellerTrendFill)" />
                    <path d={path} fill="none" stroke="#0b7a35" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    {points.map((point) => (
                        <g key={point.month}>
                            <circle cx={point.x} cy={point.y} r="5" fill="#0b7a35" />
                            <circle cx={point.x} cy={point.y} r="12" fill="rgba(11,122,53,0.10)" />
                        </g>
                    ))}
                </svg>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
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

function CategoryBars({ data = [] }) {
    const maxRevenue = Math.max(...data.map((item) => item.revenue), 1)

    if (!data.length) {
        return <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-10 text-center text-sm text-text-muted">Aucune categorie rentable disponible pour le moment.</div>
    }

    return (
        <div className="grid gap-5">
            {data.map((item) => (
                <div key={item.category} className="rounded-[22px] border border-border/70 bg-[#fbfcfb] p-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-text-dark">{item.category}</p>
                            <p className="mt-1 text-xs text-text-muted">{item.products} produits . {item.sales} ventes</p>
                        </div>
                        <p className="text-sm font-bold text-text-dark">{Currency(item.revenue)}</p>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-[#e9f1ea]">
                        <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#0b7a35_0%,#22c55e_100%)]"
                            style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

function CircleGauge({ value, total, label, caption, color }) {
    const radius = 44
    const circumference = 2 * Math.PI * radius
    const percent = total > 0 ? value / total : 0
    const offset = circumference * (1 - percent)

    return (
        <div className="rounded-[24px] border border-border/70 bg-[#fbfcfb] p-4 text-center">
            <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28">
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
            {caption && <p className="mt-1 text-xs text-text-muted">{caption}</p>}
        </div>
    )
}

function QuickAction({ href, title, text, icon, tone = 'default' }) {
    const toneClass = {
        default: 'bg-white border-border hover:border-primary/20',
        emerald: 'bg-emerald-50/70 border-emerald-100 hover:border-emerald-200',
        sky: 'bg-sky-50/70 border-sky-100 hover:border-sky-200',
        amber: 'bg-amber-50/70 border-amber-100 hover:border-amber-200',
    }[tone] || 'bg-white border-border hover:border-primary/20'

    return (
        <Link href={href} className={`group rounded-[24px] border p-5 transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${toneClass}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
            </div>
            <h3 className="mt-4 text-base font-bold text-text-dark">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-text-muted">{text}</p>
        </Link>
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

    const planName = seller?.seller_plan === 'elite' ? 'Elite' : seller?.seller_plan === 'pro' ? 'Pro' : 'Starter'
    const revenueChange = headline.revenueChangePercent ?? 0

    const stats = [
        {
            label: 'Produits publies',
            value: totalProducts,
            hint: 'catalogue actif du vendeur',
            icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
            tone: 'emerald',
        },
        {
            label: 'Ventes totales',
            value: totalSales,
            hint: 'commandes attribuees',
            icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
            tone: 'sky',
        },
        {
            label: 'Revenus',
            value: Currency(totalRevenue),
            hint: 'performance commerciale globale',
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'amber',
        },
        {
            label: 'Note moyenne',
            value: `${avgRating}/5`,
            hint: 'qualite percue de vos produits',
            icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
            tone: 'slate',
        },
    ]

    return (
        <SellerLayout title="Tableau de bord vendeur">
            <Surface className="mb-8">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(135deg,#0f172a_0%,#0f3a2b_48%,#0b7a35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

                    <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                        <div>
                            <HighlightPill tone="green">Vue analyste vendeur</HighlightPill>
                            <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                                Transformez vos chiffres en decisions plus intelligentes
                            </h1>
                            <p className="mt-4 max-w-3xl text-sm leading-8 text-white/78 md:text-base">
                                Suivez vos revenus, reperez vos categories les plus performantes, pilotez votre mix catalogue et surveillez vos opportunites de vente depuis une seule surface premium.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <HighlightPill tone="sky">{serviceMissionCount} missions actives</HighlightPill>
                                <HighlightPill tone="amber">{unreadMessages} messages non lus</HighlightPill>
                                <HighlightPill>{planName} en cours</HighlightPill>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Ce mois-ci</p>
                                <p className="mt-3 text-3xl font-bold">{Currency(headline.thisMonthRevenue ?? 0)}</p>
                                <p className="mt-2 text-sm text-white/70">revenu encaisse sur la periode courante</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Variation</p>
                                <p className="mt-3 text-3xl font-bold">{revenueChange}%</p>
                                <p className="mt-2 text-sm text-white/70">vs mois precedent</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Moyenne</p>
                                <p className="mt-3 text-3xl font-bold">{Currency(headline.averageMonthlyRevenue ?? 0)}</p>
                                <p className="mt-2 text-sm text-white/70">revenu mensuel moyen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Surface>

            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <Surface className="mb-8 p-6 md:p-8">
                <SectionHeader
                    eyebrow="Actions rapides"
                    title="Passez a l action plus vite"
                    text="Les operations les plus utiles pour faire avancer votre boutique sans chercher dans les menus."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
                    <QuickAction
                        href="/vendeur/produits/creer"
                        title="Ajouter un produit"
                        text="Publiez une nouvelle ressource digitale ou un nouveau service dans votre catalogue."
                        icon="M12 4.5v15m7.5-7.5h-15"
                        tone="emerald"
                    />
                    <QuickAction
                        href="/vendeur/messages"
                        title="Repondre aux messages"
                        text="Traitez vos demandes commerciales et ne laissez pas refroidir une opportunite."
                        icon="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75zm1.86.513l7.227 4.816a1.125 1.125 0 001.246 0l7.227-4.816"
                        tone="sky"
                    />
                    <QuickAction
                        href="/vendeur/services"
                        title="Suivre les missions"
                        text="Gardez un oeil sur les briefs, les statuts et les livraisons de vos prestations."
                        icon="M4.5 6.75h15m-15 5.25h15m-15 5.25h9"
                        tone="amber"
                    />
                    <QuickAction
                        href="/vendeur/plans"
                        title="Optimiser mon plan"
                        text="Debloquez plus de visibilite, plus de volume et des options commerciales avancees."
                        icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        tone="default"
                    />
                    <QuickAction
                        href="/affiliation"
                        title="Mon affiliation"
                        text="Partagez vos produits favoris, suivez vos commissions et demandez vos retraits."
                        icon="M13.5 6H20.25M13.5 12H20.25M13.5 18H20.25M3.75 6h3.75v3.75H3.75V6zm0 8.25h3.75V18H3.75v-3.75z"
                        tone="sky"
                    />
                </div>
            </Surface>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.6fr]">
                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Performance"
                        title="Evolution des revenus"
                        text="Visualisez les variations mensuelles de votre chiffre d affaires et reperez les meilleurs moments de traction."
                    />
                    <LineTrendChart data={monthlyTrend} />
                </Surface>

                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Mix catalogue"
                        title="Structure de votre offre"
                        text="Comprenez en un coup d oeil la composition de votre catalogue."
                    />
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <CircleGauge value={catalogMix.digitalProducts ?? 0} total={totalProducts} label="Produits digitaux" caption="telechargements classiques" color="#0b7a35" />
                        <CircleGauge value={catalogMix.serviceProducts ?? 0} total={totalProducts} label="Services" caption="missions et consulting" color="#0284c7" />
                        <CircleGauge value={catalogMix.freeProducts ?? 0} total={totalProducts} label="Produits gratuits" caption="acquisition et confiance" color="#f59e0b" />
                        <CircleGauge value={catalogMix.paidProducts ?? 0} total={totalProducts} label="Produits payants" caption="revenu direct" color="#7c3aed" />
                    </div>
                </Surface>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[0.92fr_1.08fr]">
                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Categories"
                        title="Revenus par categorie"
                        text="Reperez les familles de produits qui soutiennent le plus votre croissance."
                    />
                    <CategoryBars data={categoryRevenue} />
                </Surface>

                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Lecture strategique"
                        title="Ce que vos donnees racontent"
                        text="Des indicateurs simples, actionnables et pensés pour piloter une boutique digitale."
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <StatCard label="Meilleure categorie" value={insights.bestCategory || 'Aucune'} hint={Currency(insights.bestCategoryRevenue ?? 0)} icon="M5 13l4 4L19 7" tone="emerald" />
                        <StatCard label="Ventes categorie top" value={insights.bestCategorySales ?? 0} hint="sur la categorie la plus rentable" icon="M3 3v18h18" tone="sky" />
                        <StatCard label="Part du gratuit" value={`${insights.topFreeProductsShare ?? 0}%`} hint="du catalogue total" icon="M12 8v8m4-4H8" tone="amber" />
                        <StatCard label="Part du payant" value={`${insights.topPaidProductsShare ?? 0}%`} hint="du catalogue total" icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" tone="slate" />
                        <StatCard label="Messages non lus" value={unreadMessages} hint="leads a relancer" icon="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75z" tone="sky" />
                        <StatCard label="Missions actives" value={serviceMissionCount} hint="prestations a suivre" icon="M4.5 6.75h15m-15 5.25h15m-15 5.25h9" tone="emerald" />
                    </div>
                </Surface>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Rentabilite"
                        title="Produits les plus performants"
                        text="Vos meilleures references pour comprendre ce qui convertit le mieux."
                    />

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
                                    <tr key={product.id} className="border-b border-border/70 last:border-0">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{index + 1}</span>
                                                <div>
                                                    <p className="font-semibold text-text-dark">{product.name}</p>
                                                    <p className="mt-1 text-xs text-text-muted">{product.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right text-text-muted">{product.sales}</td>
                                        <td className="py-4 text-right font-semibold text-text-dark">{Currency(product.revenue ?? 0)}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="py-10 text-center text-text-muted">Aucune vente enregistree pour le moment.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Surface>

                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Plan vendeur"
                        title="Capacite et niveau de service"
                        text="Votre plan actuel determine votre volume, votre visibilite et certaines options commerciales."
                        action={<Link href="/vendeur/plans" className="btn-outline px-5 py-2.5 text-sm">Voir les plans</Link>}
                    />

                    <div className="grid gap-4">
                        <div className="rounded-[24px] bg-[linear-gradient(135deg,#f7fbf8_0%,#ffffff_55%,#eef8f0_100%)] p-5">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Plan actif</p>
                            <p className="mt-2 text-3xl font-bold text-text-dark">{planName}</p>
                            <p className="mt-3 text-sm leading-7 text-text-muted">
                                {seller?.seller_plan === 'starter' && 'Vous pouvez publier jusqu a 3 produits. Passez a Pro pour debloquer plus de volume, plus de confiance et une meilleure presence boutique.'}
                                {seller?.seller_plan === 'pro' && 'Produits illimites, badge vendeur verifie et meilleure priorite dans la boutique pour accelerer votre croissance.'}
                                {seller?.seller_plan === 'elite' && 'Support prioritaire, exposition avancee, presence plus forte sur le marketplace et options commerciales premium.'}
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <StatCard label="Prix moyen" value={Currency(sellerStats?.averagePrice ?? 0)} hint="positionnement tarifaire" icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2" tone="slate" />
                            <StatCard label="Messages recus" value={unreadMessages} hint="a traiter rapidement" icon="M2.25 6.75A2.25 2.25 0 014.5 4.5h15" tone="sky" />
                            <StatCard label="Support prioritaire" value={seller?.seller_plan === 'elite' ? 'Oui' : 'Non'} hint="service plan actuel" icon="M11.25 3.75L4.5 20.25h15L11.25 3.75z" tone="amber" />
                        </div>
                    </div>
                </Surface>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Inbox"
                        title="Messages recents"
                        text="Les contacts arrivent depuis votre profil public vendeur et vos interactions marketplace."
                        action={<Link href="/vendeur/messages" className="btn-outline px-5 py-2.5 text-sm">Ouvrir la messagerie</Link>}
                    />

                    {recentMessages.length > 0 ? (
                        <div className="grid gap-4">
                            {recentMessages.map((message) => (
                                <div key={message.id} className="rounded-[22px] border border-border/70 bg-[#fbfcfb] p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm font-semibold text-text-dark">{message.subject}</p>
                                        <span className="text-xs text-text-muted">{message.created_at}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-text-muted">Envoye par {message.sender_name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-10 text-center">
                            <p className="text-sm text-text-muted">Aucun message recent pour le moment.</p>
                        </div>
                    )}
                </Surface>

                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Services"
                        title="Missions recentes"
                        text="Suivez les briefs clients et gardez une vision claire de vos prestations reservees."
                        action={<Link href="/vendeur/services" className="btn-outline px-5 py-2.5 text-sm">Voir les missions</Link>}
                    />

                    {recentServiceMissions.length > 0 ? (
                        <div className="grid gap-4">
                            {recentServiceMissions.map((mission) => (
                                <Link key={mission.id} href={`/vendeur/services/${mission.id}`} className="rounded-[22px] border border-border/70 bg-[#fbfcfb] p-4 transition-colors hover:border-primary/30">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-text-dark">{mission.product_name}</p>
                                            <p className="mt-1 text-xs text-text-muted">{mission.mission_number} . {mission.client_name}</p>
                                        </div>
                                        <span className="inline-flex rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                                            {mission.status}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-10 text-center">
                            <p className="text-sm text-text-muted">Aucune mission service recente.</p>
                        </div>
                    )}
                </Surface>
            </div>
        </SellerLayout>
    )
}
