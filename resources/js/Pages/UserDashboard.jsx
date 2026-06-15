import { usePage, Link } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'

export default function UserDashboard() {
    const { orders = [], downloads = [], serviceMissions = [], auth } = usePage().props
    const user = auth?.user || { name: 'Utilisateur', email: '' }

    const stats = [
        {
            label: 'Commandes',
            value: orders.length,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            ),
        },
        {
            label: 'Telechargements',
            value: downloads.length,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            ),
        },
        {
            label: 'Favoris',
            value: 0,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ),
        },
        {
            label: 'Services',
            value: serviceMissions.length,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15m-15 5.25h15m-15 5.25h9" />
                </svg>
            ),
        },
    ]

    return (
        <ClientLayout title="Tableau de bord client">
            <div className="card p-6 md:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-primary">{user.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-text-dark">Bonjour, {user.name}</h2>
                    <p className="text-sm text-text-muted mt-1">{user.email}</p>
                </div>
                <Link href="/mes-telechargements" className="btn-primary shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Mes telechargements
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="card p-5 md:p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-primary-dark">{stat.value}</p>
                            <p className="text-sm text-text-muted">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="card p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-text-dark">Derniers achats</h2>
                            <Link href="/mes-telechargements" className="text-sm text-primary font-medium hover:underline">Voir tout</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left pb-3 font-semibold text-text-dark">Produit</th>
                                        <th className="text-left pb-3 font-semibold text-text-dark">Date</th>
                                        <th className="text-right pb-3 font-semibold text-text-dark hidden md:table-cell">Prix</th>
                                        <th className="text-right pb-3 font-semibold text-text-dark">Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-text-muted">Aucune commande pour le moment</td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => {
                                            const items = order.items || []
                                            const itemNames = items.map((i) => i.product?.name || i.name).join(', ')
                                            return (
                                                <tr key={order.id} className="border-b border-border last:border-0">
                                                    <td className="py-3.5 text-text-dark font-medium">{itemNames || `Commande #${order.id}`}</td>
                                                    <td className="py-3.5 text-text-muted">{new Date(order.created_at).toLocaleDateString('fr-DZ')}</td>
                                                    <td className="py-3.5 text-right text-text-dark hidden md:table-cell">{parseInt(order.total).toLocaleString('fr-DZ')} DZD</td>
                                                    <td className="py-3.5 text-right">
                                                        <span className="badge-green text-[10px]">{order.status}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="card p-6 md:p-8">
                        <h2 className="text-lg font-bold text-text-dark mb-6">Mon compte</h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-xs text-text-muted mb-1">Nom</p>
                                <p className="text-sm font-medium text-text-dark">{user.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted mb-1">Email</p>
                                <p className="text-sm font-medium text-text-dark">{user.email}</p>
                            </div>
                            {user.created_at && (
                                <div>
                                    <p className="text-xs text-text-muted mb-1">Membre depuis</p>
                                    <p className="text-sm font-medium text-text-dark">{new Date(user.created_at).toLocaleDateString('fr-DZ')}</p>
                                </div>
                            )}
                        </div>
                        <div className="border-t border-border mt-6 pt-6 flex flex-col gap-2">
                            <Link href="/mes-services" className="text-sm text-primary font-medium hover:underline flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15m-15 5.25h15m-15 5.25h9" />
                                </svg>
                                Mes services
                            </Link>
                            <Link href="/mes-telechargements" className="text-sm text-primary font-medium hover:underline flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                Mes telechargements
                            </Link>
                            <Link href="/boutique" className="text-sm text-primary font-medium hover:underline flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                </svg>
                                Decouvrir la boutique
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card p-6 md:p-8 mt-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-text-dark">Missions service recentes</h2>
                    <Link href="/mes-services" className="text-sm text-primary font-medium hover:underline">Voir tout</Link>
                </div>
                <div className="grid gap-4">
                    {serviceMissions.length ? serviceMissions.map((mission) => (
                        <Link key={mission.id} href={`/mes-services/${mission.id}`} className="rounded-2xl border border-border bg-[#fbfcfb] p-4 transition-colors hover:border-primary/30">
                            <p className="text-sm font-semibold text-text-dark">{mission.product_name}</p>
                            <p className="mt-1 text-xs text-text-muted">{mission.mission_number}</p>
                        </Link>
                    )) : (
                        <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-text-muted">
                            Aucun service reserve pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </ClientLayout>
    )
}
