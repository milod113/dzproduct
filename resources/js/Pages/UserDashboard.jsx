import { Link, usePage } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'

function Surface({ children, className = '' }) {
    return (
        <section className={`overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-[0_22px_60px_rgba(15,23,42,0.08)] backdrop-blur ${className}`}>
            {children}
        </section>
    )
}

function StatCard({ label, value, hint, icon, tone = 'emerald' }) {
    const toneClass = {
        emerald: 'from-emerald-50 to-white border-emerald-100',
        sky: 'from-sky-50 to-white border-sky-100',
        amber: 'from-amber-50 to-white border-amber-100',
        rose: 'from-rose-50 to-white border-rose-100',
    }[tone] || 'from-emerald-50 to-white border-emerald-100'

    return (
        <div className={`rounded-[26px] border bg-gradient-to-br p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)] ${toneClass}`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
                    <p className="mt-3 text-3xl font-bold text-text-dark">{value}</p>
                    {hint && <p className="mt-2 text-sm text-text-muted">{hint}</p>}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                    {icon}
                </div>
            </div>
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

function QuickLink({ href, title, text, icon, tone = 'default' }) {
    const toneClass = {
        default: 'bg-white border-border hover:border-primary/20',
        emerald: 'bg-emerald-50/70 border-emerald-100 hover:border-emerald-200',
        sky: 'bg-sky-50/70 border-sky-100 hover:border-sky-200',
        amber: 'bg-amber-50/70 border-amber-100 hover:border-amber-200',
    }[tone] || 'bg-white border-border hover:border-primary/20'

    return (
        <Link href={href} className={`group rounded-[24px] border p-5 transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${toneClass}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                {icon}
            </div>
            <h3 className="mt-4 text-base font-bold text-text-dark">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-text-muted">{text}</p>
        </Link>
    )
}

function StatusPill({ children, tone = 'default' }) {
    const toneClass = {
        default: 'bg-slate-100 text-slate-700',
        success: 'bg-emerald-100 text-emerald-700',
        pending: 'bg-amber-100 text-amber-700',
        info: 'bg-sky-100 text-sky-700',
    }[tone] || 'bg-slate-100 text-slate-700'

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${toneClass}`}>
            {children}
        </span>
    )
}

export default function UserDashboard() {
    const { orders = [], downloads = [], serviceMissions = [], auth, wishlist } = usePage().props
    const user = auth?.user || { name: 'Utilisateur', email: '' }
    const favoriteCount = wishlist?.count ?? 0
    const totalSpent = orders.reduce((sum, order) => sum + Number.parseInt(order.total, 10), 0) || 0
    const completedOrders = orders.filter((order) => ['completed', 'livree', 'paid'].includes(String(order.status).toLowerCase())).length
    const latestOrder = orders[0]

    const stats = [
        {
            label: 'Commandes',
            value: orders.length,
            hint: `${completedOrders} validees`,
            tone: 'emerald',
            icon: (
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
            ),
        },
        {
            label: 'Telechargements',
            value: downloads.length,
            hint: 'accessibles a vie',
            tone: 'sky',
            icon: (
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            ),
        },
        {
            label: 'Favoris',
            value: favoriteCount,
            hint: 'produits sauvegardes',
            tone: 'rose',
            icon: (
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ),
        },
        {
            label: 'Depense totale',
            value: `${totalSpent.toLocaleString('fr-DZ')} DZD`,
            hint: 'sur votre historique',
            tone: 'amber',
            icon: (
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ]

    return (
        <ClientLayout title="Tableau de bord client">
            <Surface className="mb-8">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_26%),linear-gradient(135deg,#0f172a_0%,#0f3a2b_45%,#0b7a35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -right-10 top-8 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

                    <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
                        <div>
                            <div className="inline-flex rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                                Espace client premium
                            </div>
                            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                                Bonjour, {user.name}
                            </h2>
                            <p className="mt-4 max-w-3xl text-sm leading-8 text-white/78 md:text-base">
                                Retrouvez vos achats, vos telechargements, vos services reserves et vos favoris dans une experience plus claire, plus elegante et plus utile.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <StatusPill tone="success">{downloads.length} contenus disponibles</StatusPill>
                                <StatusPill tone="info">{serviceMissions.length} services suivis</StatusPill>
                                <StatusPill tone="pending">{favoriteCount} favoris sauvegardes</StatusPill>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[24px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Compte</p>
                                <p className="mt-2 text-xl font-bold">{user.email}</p>
                                <p className="mt-2 text-sm text-white/70">profil actif sur la marketplace</p>
                            </div>
                            <div className="rounded-[24px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Derniere commande</p>
                                <p className="mt-2 text-xl font-bold">{latestOrder ? `${Number.parseInt(latestOrder.total, 10).toLocaleString('fr-DZ')} DZD` : 'Aucune'}</p>
                                <p className="mt-2 text-sm text-white/70">{latestOrder ? new Date(latestOrder.created_at).toLocaleDateString('fr-DZ') : 'Passez votre premier achat'}</p>
                            </div>
                            <div className="rounded-[24px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Acces rapide</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Link href="/mes-telechargements" className="rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">Mes fichiers</Link>
                                    <Link href="/boutique" className="rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">Boutique</Link>
                                </div>
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
                    title="Continuez votre experience"
                    text="Les raccourcis les plus utiles pour reprendre rapidement la suite de votre parcours sur la marketplace."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <QuickLink
                        href="/mes-telechargements"
                        title="Mes telechargements"
                        text="Retrouvez vos fichiers achetes et retelechargez-les quand vous voulez."
                        tone="emerald"
                        icon={
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        }
                    />
                    <QuickLink
                        href="/mes-services"
                        title="Mes services"
                        text="Suivez vos briefs, vos missions reservees et vos echanges avec les vendeurs."
                        tone="sky"
                        icon={
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15m-15 5.25h15m-15 5.25h9" />
                            </svg>
                        }
                    />
                    <QuickLink
                        href="/favoris"
                        title="Mes favoris"
                        text="Gardez vos coups de coeur a portee de clic pour acheter plus tard."
                        tone="amber"
                        icon={
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        }
                    />
                    <QuickLink
                        href="/affiliation"
                        title="Mon affiliation"
                        text="Partagez vos liens, suivez vos commissions et demandez vos retraits."
                        tone="sky"
                        icon={
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H20.25M13.5 12H20.25M13.5 18H20.25M3.75 6h3.75v3.75H3.75V6zm0 8.25h3.75V18H3.75v-3.75z" />
                            </svg>
                        }
                    />
                    <QuickLink
                        href="/boutique"
                        title="Explorer la boutique"
                        text="Decouvrez de nouveaux ebooks, packs, templates et services utiles."
                        tone="default"
                        icon={
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>
                        }
                    />
                </div>
            </Surface>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Achats"
                        title="Derniers achats"
                        text="Un resume propre de vos commandes recentes pour retrouver vos produits achetes plus facilement."
                        action={<Link href="/mes-telechargements" className="btn-outline px-5 py-2.5 text-sm">Voir tous les achats</Link>}
                    />

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="pb-3 text-left font-semibold text-text-dark">Produit</th>
                                    <th className="pb-3 text-left font-semibold text-text-dark">Date</th>
                                    <th className="hidden pb-3 text-right font-semibold text-text-dark md:table-cell">Prix</th>
                                    <th className="pb-3 text-right font-semibold text-text-dark">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-text-muted">Aucune commande pour le moment.</td>
                                    </tr>
                                ) : (
                                    orders.map((order) => {
                                        const items = order.items || []
                                        const itemNames = items.map((item) => item.product?.name || item.name).join(', ')
                                        const normalizedStatus = String(order.status || '').toLowerCase()
                                        const tone = normalizedStatus.includes('completed') || normalizedStatus.includes('livr') ? 'success' : 'pending'

                                        return (
                                            <tr key={order.id} className="border-b border-border/70 last:border-0">
                                                <td className="py-4 font-semibold text-text-dark">{itemNames || `Commande #${order.id}`}</td>
                                                <td className="py-4 text-text-muted">{new Date(order.created_at).toLocaleDateString('fr-DZ')}</td>
                                                <td className="hidden py-4 text-right text-text-dark md:table-cell">{Number.parseInt(order.total, 10).toLocaleString('fr-DZ')} DZD</td>
                                                <td className="py-4 text-right">
                                                    <StatusPill tone={tone}>{order.status}</StatusPill>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </Surface>

                <Surface className="p-6 md:p-8">
                    <SectionHeader
                        eyebrow="Profil"
                        title="Mon compte"
                        text="Vos informations principales et vos points d entree personnels."
                    />

                    <div className="rounded-[26px] bg-[linear-gradient(135deg,#f7fbf8_0%,#ffffff_55%,#eef8f0_100%)] p-5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-primary shadow-sm">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <p className="text-lg font-bold text-text-dark">{user.name}</p>
                                <p className="mt-1 text-sm text-text-muted">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4">
                        <div className="rounded-[22px] border border-border/70 bg-[#fbfcfb] p-4">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Statut</p>
                            <p className="mt-2 text-sm font-semibold text-text-dark">Client actif sur la marketplace</p>
                        </div>
                        {user.created_at && (
                            <div className="rounded-[22px] border border-border/70 bg-[#fbfcfb] p-4">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Membre depuis</p>
                                <p className="mt-2 text-sm font-semibold text-text-dark">{new Date(user.created_at).toLocaleDateString('fr-DZ')}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <Link href="/profile" className="btn-outline px-5 py-3 text-sm">Modifier mon profil</Link>
                        <Link href="/favoris" className="btn-outline px-5 py-3 text-sm">Voir mes favoris</Link>
                    </div>
                </Surface>
            </div>

            <Surface className="mt-6 p-6 md:p-8">
                <SectionHeader
                    eyebrow="Services"
                    title="Missions service recentes"
                    text="Suivez facilement les prestations que vous avez reservees et rouvrez la conversation au bon moment."
                    action={<Link href="/mes-services" className="btn-outline px-5 py-2.5 text-sm">Voir toutes les missions</Link>}
                />

                <div className="grid gap-4">
                    {serviceMissions.length ? serviceMissions.map((mission) => (
                        <Link key={mission.id} href={`/mes-services/${mission.id}`} className="rounded-[22px] border border-border/70 bg-[#fbfcfb] p-5 transition-colors hover:border-primary/30">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-text-dark">{mission.product_name}</p>
                                    <p className="mt-1 text-xs text-text-muted">{mission.mission_number}</p>
                                </div>
                                <StatusPill tone="info">Mission active</StatusPill>
                            </div>
                        </Link>
                    )) : (
                        <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-10 text-center text-sm text-text-muted">
                            Aucun service reserve pour le moment.
                        </div>
                    )}
                </div>
            </Surface>
        </ClientLayout>
    )
}
