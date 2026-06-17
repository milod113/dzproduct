import { usePage, Link } from '@inertiajs/react'
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

function DownloadItem({ item, index }) {
    return (
        <div className="group rounded-[26px] border border-white/70 bg-white/90 p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)] backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(15,23,42,0.09)] md:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#f0fdf4_0%,#dcfce7_100%)] ring-1 ring-border/50">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                            <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-[0_8px_20px_rgba(11,122,53,0.22)]">
                        {index + 1}
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary-light px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{item.category}</span>
                        {!item.downloaded_at && (
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-700">Nouveau</span>
                        )}
                    </div>
                    <h3 className="mt-2 text-base font-bold text-text-dark">{item.name}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            Acheté le {item.purchaseDate}
                        </span>
                        {item.downloaded_at && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                Dernier téléchargement le {item.downloaded_at}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <a
                        href={`/telechargement/${item.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(11,122,53,0.28)]"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Télécharger
                    </a>
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-dark transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:text-primary hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Facture
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function MyDownloads() {
    const { downloads = [] } = usePage().props
    const categories = [...new Set(downloads.map((d) => d.category).filter(Boolean))]
    const lastDownload = downloads.length > 0 ? downloads[0].downloaded_at || downloads[0].purchaseDate : null

    const stats = [
        {
            label: 'Produits achetes',
            value: downloads.length,
            hint: 'telechargements disponibles',
            icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
            tone: 'emerald',
        },
        {
            label: 'Categories',
            value: categories.length,
            hint: 'familles de produits',
            icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z',
            tone: 'sky',
        },
        {
            label: 'Derniere activite',
            value: lastDownload || '-',
            hint: 'dernier achat ou telechargement',
            icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'amber',
        },
    ]

    if (downloads.length === 0) {
        return (
            <ClientLayout title="Mes telechargements">
                <Surface>
                    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_bottom_left,_rgba(11,122,53,0.12),_transparent_40%),linear-gradient(135deg,#0f172a_0%,#0f3a2b_48%,#0b7a35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                        <div className="absolute -right-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />
                        <div className="relative">
                            <HighlightPill tone="green">Bibliotheque</HighlightPill>
                            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Mes telechargements</h1>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/78 md:text-base">
                                Accedez a tous vos produits numeriques achetes en un clic.
                            </p>
                        </div>
                    </div>
                    <div className="p-8 md:p-12">
                        <div className="mx-auto max-w-lg text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-primary-light">
                                <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                            </div>
                            <p className="text-xl font-bold text-text-dark">Vous n'avez encore aucun telechargement</p>
                            <p className="mt-3 text-sm leading-7 text-text-muted">
                                Decouvrez notre boutique et commencez a acheter des produits numeriques premium pour enrichir votre bibliotheque.
                            </p>
                            <div className="mt-8 flex justify-center gap-4">
                                <Link
                                    href="/boutique"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(11,122,53,0.28)]"
                                >
                                    Decouvrir la boutique
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Surface>
            </ClientLayout>
        )
    }

    return (
        <ClientLayout title="Mes telechargements">
            <Surface className="mb-6">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_35%),linear-gradient(135deg,#0f172a_0%,#0f3a2b_48%,#0b7a35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

                    <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                        <div>
                            <HighlightPill tone="green">Ma bibliotheque</HighlightPill>
                            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Mes telechargements</h1>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/78 md:text-base">
                                {downloads.length} produit{downloads.length > 1 ? 's' : ''} achete{downloads.length > 1 ? 's' : ''} — telechargez vos fichiers ou accedez a vos factures.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Disponibles</p>
                                <p className="mt-3 text-3xl font-bold">{downloads.length}</p>
                                <p className="mt-2 text-sm text-white/70">produits dans votre bibliotheque</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">{categories.length > 1 ? 'Categories' : 'Categorie'}</p>
                                <p className="mt-3 text-3xl font-bold">{categories.length}</p>
                                <p className="mt-2 text-sm text-white/70">{categories.slice(0, 2).join(', ')}{categories.length > 2 ? '...' : ''}</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Jamais telecharge</p>
                                <p className="mt-3 text-3xl font-bold">{downloads.filter((d) => !d.downloaded_at).length}</p>
                                <p className="mt-2 text-sm text-white/70">a decouvrir</p>
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

            <div className="flex flex-col gap-5">
                {downloads.map((item, index) => (
                    <DownloadItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </ClientLayout>
    )
}
