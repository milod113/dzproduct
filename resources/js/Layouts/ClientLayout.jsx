import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import ScrollNavigator from '@/Components/ScrollNavigator'

const clientLinks = [
    { href: '/tableau-de-bord', label: 'Tableau de bord', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/mes-services', label: 'Mes services', icon: 'M4.5 6.75h15m-15 5.25h15m-15 5.25h9' },
    { href: '/mes-telechargements', label: 'Mes telechargements', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
    { href: '/favoris', label: 'Mes favoris', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
    { href: '/affiliation', label: 'Mon affiliation', icon: 'M13.5 6H20.25M13.5 12H20.25M13.5 18H20.25M3.75 6h3.75v3.75H3.75V6zm0 8.25h3.75V18H3.75v-3.75z' },
    { href: '/boutique', label: 'Boutique', icon: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z' },
    { href: '/profile', label: 'Profil', icon: 'M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
]

export default function ClientLayout({ children, title }) {
    const { url, props } = usePage()
    const [mobileOpen, setMobileOpen] = useState(false)
    const user = props.auth?.user

    return (
        <div className="min-h-screen bg-[#f5f9f6]">
            <ScrollNavigator />

            <div className="sticky top-0 z-30 border-b border-white/70 bg-white/85 backdrop-blur-xl">
                <div className="container-max flex items-center justify-between gap-4 px-4 py-3 md:px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-primary-light hover:text-primary lg:hidden"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                )}
                            </svg>
                        </button>
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Espace client</p>
                            <h1 className="text-lg font-bold text-text-dark">{title || 'Mon compte'}</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden rounded-[18px] border border-border/70 bg-primary-light/30 px-4 py-2.5 sm:block">
                            <p className="text-xs font-semibold text-text-dark">{user?.name || 'Client'}</p>
                            <p className="text-[10px] text-text-muted">{user?.email || ''}</p>
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-sm font-bold text-primary shadow-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || 'C'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="container-max px-4 py-6 md:px-6 md:py-8">
                <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
                    <aside className={`fixed inset-x-0 top-0 z-40 h-full w-72 bg-white/98 backdrop-blur-2xl transition-transform duration-200 lg:sticky lg:top-24 lg:inset-auto lg:h-fit lg:w-auto lg:translate-x-0 lg:rounded-[26px] lg:border lg:border-white/70 lg:bg-white/90 lg:shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
                            <span className="text-sm font-bold text-text-dark">Navigation</span>
                            <button onClick={() => setMobileOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-gray-100">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex flex-col gap-1 p-3">
                            {clientLinks.map((link) => {
                                const isActive = url === link.href
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                                            isActive
                                                ? 'bg-primary text-white shadow-[0_8px_20px_rgba(11,122,53,0.22)]'
                                                : 'text-text-muted hover:bg-primary-light hover:text-primary'
                                        }`}
                                    >
                                        <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                                        </svg>
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </aside>

                    {mobileOpen && (
                        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
                    )}

                    <main className="min-w-0">{children}</main>
                </div>
            </div>
        </div>
    )
}
