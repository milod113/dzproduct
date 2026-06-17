import { Link, usePage } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'

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
        rose: 'from-rose-50 to-white text-rose-700 border-rose-100',
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
        rose: 'bg-rose-300/12 text-rose-50 border-rose-200/20',
    }[tone]

    return (
        <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
            {children}
        </div>
    )
}

const statusConfig = {
    reserved: { label: 'Reserve', classes: 'bg-sky-100 text-sky-700', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z', tone: 'sky' },
    brief_submitted: { label: 'Brief soumis', classes: 'bg-amber-100 text-amber-700', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z', tone: 'amber' },
    in_review: { label: 'En analyse', classes: 'bg-purple-100 text-purple-700', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z', tone: 'slate' },
    in_progress: { label: 'En cours', classes: 'bg-blue-100 text-blue-700', icon: 'M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm12 0l-4.5 4.5m4.5-4.5L12 7.5', tone: 'sky' },
    delivered: { label: 'Livre', classes: 'bg-emerald-100 text-emerald-700', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', tone: 'green' },
    revision_requested: { label: 'Revision demandee', classes: 'bg-rose-100 text-rose-700', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182', tone: 'rose' },
    completed: { label: 'Terminee', classes: 'bg-emerald-100 text-emerald-700', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', tone: 'green' },
    cancelled: { label: 'Annulee', classes: 'bg-gray-100 text-gray-600', icon: 'M6 18L18 6M6 6l12 12', tone: 'slate' },
}

function MissionCard({ mission }) {
    const config = statusConfig[mission.status] || statusConfig.reserved

    return (
        <Link
            href={`/mes-services/${mission.id}`}
            className="group block rounded-[26px] border border-white/70 bg-white/90 p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)] backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(15,23,42,0.09)] md:p-6"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#f0fdf4_0%,#dcfce7_100%)] ring-1 ring-border/50">
                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-4.49 2.41.87-4.59-3.7-3.59 5.11-.74 2.29-4.63 2.29 4.63 5.11.74-3.7 3.59.87 4.59-4.49-2.41z" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-primary-light px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">Mission</span>
                            <span className="text-[11px] text-text-muted">{mission.mission_number}</span>
                        </div>
                        <h3 className="mt-1.5 text-base font-bold text-text-dark">{mission.product_name}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                {mission.seller_name}
                            </span>
                            {mission.created_at && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                    {mission.created_at}
                                </span>
                            )}
                        </div>
                        {mission.brief_title && (
                            <p className="mt-2 line-clamp-1 text-sm text-text-muted">{mission.brief_title}</p>
                        )}
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${config.classes}`}>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
                        </svg>
                        {config.label}
                    </span>
                    <svg className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}

export default function ClientServiceMissionsIndex() {
    const { missions = [] } = usePage().props

    const activeMissions = missions.filter((m) => !['completed', 'cancelled'].includes(m.status))
    const completedMissions = missions.filter((m) => ['completed', 'cancelled'].includes(m.status))

    const stats = [
        {
            label: 'Missions totales',
            value: missions.length,
            hint: 'historique complet',
            icon: 'M11.42 15.17l-4.49 2.41.87-4.59-3.7-3.59 5.11-.74 2.29-4.63 2.29 4.63 5.11.74-3.7 3.59.87 4.59-4.49-2.41z',
            tone: 'emerald',
        },
        {
            label: 'En cours',
            value: activeMissions.length,
            hint: 'missions actives',
            icon: 'M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm12 0l-4.5 4.5m4.5-4.5L12 7.5',
            tone: 'sky',
        },
        {
            label: 'Terminees',
            value: completedMissions.length,
            hint: 'livrees ou annulees',
            icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'amber',
        },
    ]

    return (
        <ClientLayout title="Mes services">
            <Surface className="mb-6">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),_transparent_35%),linear-gradient(135deg,#0f172a_0%,#0f3a2b_48%,#0b7a35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-purple-300/10 blur-3xl" />

                    <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                        <div>
                            <HighlightPill tone="sky">Prestations</HighlightPill>
                            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Mes services reserves</h1>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/78 md:text-base">
                                Suivez vos briefs, revisions et livraisons de prestations. Consultez l etat d avancement
                                de chaque mission et communiquez avec votre prestataire.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Actives</p>
                                <p className="mt-3 text-3xl font-bold">{activeMissions.length}</p>
                                <p className="mt-2 text-sm text-white/70">missions en cours</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Terminees</p>
                                <p className="mt-3 text-3xl font-bold">{completedMissions.length}</p>
                                <p className="mt-2 text-sm text-white/70">livrees ou annulees</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Montant total</p>
                                <p className="mt-3 text-3xl font-bold">{missions.reduce((s, m) => s + (m.price ?? 0), 0).toLocaleString('fr-DZ')} DZD</p>
                                <p className="mt-2 text-sm text-white/70">engagements</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Surface>

            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            {missions.length > 0 ? (
                <>
                    {activeMissions.length > 0 && (
                        <div className="mb-6">
                            <h2 className="mb-4 text-lg font-bold text-text-dark">Missions en cours</h2>
                            <div className="flex flex-col gap-4">
                                {activeMissions.map((mission) => (
                                    <MissionCard key={mission.id} mission={mission} />
                                ))}
                            </div>
                        </div>
                    )}

                    {completedMissions.length > 0 && (
                        <div>
                            <h2 className="mb-4 text-lg font-bold text-text-dark">Historique</h2>
                            <div className="flex flex-col gap-4">
                                {completedMissions.map((mission) => (
                                    <MissionCard key={mission.id} mission={mission} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <Surface>
                    <div className="p-8 md:p-12">
                        <div className="mx-auto max-w-lg text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-primary-light">
                                <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-4.49 2.41.87-4.59-3.7-3.59 5.11-.74 2.29-4.63 2.29 4.63 5.11.74-3.7 3.59.87 4.59-4.49-2.41z" />
                                </svg>
                            </div>
                            <p className="text-xl font-bold text-text-dark">Aucune mission service</p>
                            <p className="mt-3 text-sm leading-7 text-text-muted">
                                Vous n avez pas encore reserve de prestation. Parcourez les services proposes par
                                nos vendeurs et lancez votre premiere mission.
                            </p>
                            <div className="mt-8 flex justify-center gap-4">
                                <Link
                                    href="/boutique"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(11,122,53,0.28)]"
                                >
                                    Parcourir la boutique
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Surface>
            )}
        </ClientLayout>
    )
}
