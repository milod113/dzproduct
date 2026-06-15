import { Link, usePage } from '@inertiajs/react'
import ScrollNavigator from '@/Components/ScrollNavigator'

const clientLinks = [
    { href: '/tableau-de-bord', label: 'Tableau de bord' },
    { href: '/mes-telechargements', label: 'Mes telechargements' },
    { href: '/favoris', label: 'Mes favoris' },
    { href: '/boutique', label: 'Boutique' },
    { href: '/profile', label: 'Profil' },
]

export default function ClientLayout({ children, title }) {
    const { url, props } = usePage()
    const user = props.auth?.user

    return (
        <div className="min-h-screen bg-gray-50">
            <ScrollNavigator />
            <div className="border-b border-border bg-white">
                <div className="container-max flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm text-text-muted">Espace client</p>
                        <h1 className="text-2xl font-bold text-text-dark">{title || 'Mon compte'}</h1>
                    </div>
                    <div className="rounded-2xl border border-border bg-primary-light/40 px-4 py-3">
                        <p className="text-sm font-semibold text-text-dark">{user?.name || 'Client'}</p>
                        <p className="text-xs text-text-muted">{user?.email || ''}</p>
                    </div>
                </div>
            </div>

            <div className="container-max py-8">
                <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                    <aside className="h-fit rounded-2xl border border-border bg-white p-3">
                        <nav className="flex flex-col gap-1">
                            {clientLinks.map((link) => {
                                const isActive = url === link.href

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                            isActive ? 'bg-primary text-white' : 'text-text-muted hover:bg-primary-light hover:text-primary'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </nav>
                    </aside>

                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}
