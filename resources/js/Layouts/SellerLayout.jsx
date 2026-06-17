import { Link, router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import NotificationDropdown from '@/Components/NotificationDropdown'
import ScrollNavigator from '@/Components/ScrollNavigator'

const navItems = [
    { href: '/vendeur', label: 'Tableau de bord', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/vendeur/profil', label: 'Mon profil', icon: 'M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
    { href: '/vendeur/produits', label: 'Mes produits', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { href: '/vendeur/plans', label: 'Mes plans', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/vendeur/messages', label: 'Messages', icon: 'M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75zm1.86.513l7.227 4.816a1.125 1.125 0 001.246 0l7.227-4.816' },
    { href: '/vendeur/services', label: 'Missions', icon: 'M4.5 6.75h15m-15 5.25h15m-15 5.25h9' },
    { href: '/vendeur/commandes', label: 'Commandes', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { href: '/vendeur/revenus', label: 'Revenus', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/affiliation', label: 'Mon affiliation', icon: 'M13.5 6H20.25M13.5 12H20.25M13.5 18H20.25M3.75 6h3.75v3.75H3.75V6zm0 8.25h3.75V18H3.75v-3.75z' },
]

export default function SellerLayout({ children, title }) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const { props } = usePage()
    const unreadMessages = props?.sellerInbox?.unreadCount ?? 0
    const handleLogout = () => {
        router.post(route('logout'))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ScrollNavigator />
            <div className="flex">
                <aside className={`fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-white border-r border-border transform transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <div className="p-5 border-b border-border">
                        <Link href="/vendeur" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                </svg>
                            </div>
                            <span className="font-bold text-text-dark">Espace Vendeur</span>
                        </Link>
                    </div>
                    <nav className="p-3 flex flex-col gap-1">
                        {navItems.map((item) => {
                            const isActive = window.location.pathname === item.href || (item.href !== '/vendeur' && window.location.pathname.startsWith(item.href))
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-light text-primary' : 'text-text-muted hover:bg-gray-100 hover:text-text-dark'}`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                    <span className="flex-1">{item.label}</span>
                                    {item.href === '/vendeur/messages' && unreadMessages > 0 && (
                                        <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-primary px-2 py-1 text-[11px] font-bold leading-none text-white shadow-[0_8px_20px_rgba(11,122,53,0.22)]">
                                            {unreadMessages > 99 ? '99+' : unreadMessages}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-white">
                        <div className="flex flex-col gap-2">
                            <Link href="/tableau-de-bord" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-text-muted transition-colors hover:bg-gray-100 hover:text-primary">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l3-3m0 0l3-3m-3 3H3" />
                                </svg>
                                Retour au tableau de bord
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-text-muted transition-colors hover:bg-rose-50 hover:text-rose-600"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                Deconnexion
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 min-w-0">
                    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-border">
                        <div className="flex items-center gap-4 px-4 md:px-6 h-14">
                            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-text-muted hover:bg-gray-100">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    {mobileOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    )}
                                </svg>
                            </button>
                            <h1 className="text-lg font-bold text-text-dark truncate">{title || 'Espace Vendeur'}</h1>
                            <div className="ml-auto flex items-center gap-3">
                                <NotificationDropdown />
                            {unreadMessages > 0 && (
                                <Link
                                    href="/vendeur/messages"
                                    className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                                >
                                    <span>{unreadMessages > 99 ? '99+' : unreadMessages}</span>
                                    <span className="hidden sm:inline">nouveau{unreadMessages > 1 ? 'x' : ''} message{unreadMessages > 1 ? 's' : ''}</span>
                                </Link>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
