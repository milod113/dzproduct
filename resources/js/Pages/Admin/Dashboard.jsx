import AdminLayout from '@/Layouts/AdminLayout'

const widgets = [
    { label: 'Ventes totales', value: '2,459,000 DZD', change: '+12%', icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )},
    { label: 'Commandes', value: '342', change: '+8%', icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
    )},
    { label: 'Clients', value: '1,247', change: '+15%', icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
    )},
    { label: 'Téléchargements', value: '18,432', change: '+22%', icon: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
    )},
]

const recentOrders = [
    { id: '#CMD-001', client: 'Ahmed K.', product: 'Guide du Freelance', total: '590 DZD', status: 'Livré' },
    { id: '#CMD-002', client: 'Fatima Z.', product: 'Pack Réussite Bac', total: '790 DZD', status: 'Livré' },
    { id: '#CMD-003', client: 'Yacine M.', product: 'Templates Canva', total: '490 DZD', status: 'En cours' },
    { id: '#CMD-004', client: 'Imane K.', product: 'CV Moderne', total: '390 DZD', status: 'Livré' },
    { id: '#CMD-005', client: 'Rachid B.', product: 'Marketing Digital', total: '1,290 DZD', status: 'En attente' },
]

const bestSellers = [
    { name: 'Pack Réussite Bac', sales: 3200, revenue: '2,528,000 DZD' },
    { name: 'Templates TikTok', sales: 3200, revenue: '928,000 DZD' },
    { name: 'Templates Instagram', sales: 2300, revenue: '897,000 DZD' },
    { name: 'CV Moderne', sales: 2100, revenue: '819,000 DZD' },
    { name: 'Formation Canva', sales: 2100, revenue: '2,079,000 DZD' },
]

export default function AdminDashboard() {
    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {widgets.map((w) => (
                    <div key={w.label} className="bg-white rounded-xl border border-border p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">{w.icon}</div>
                            <span className="badge-green text-[10px]">{w.change}</span>
                        </div>
                        <p className="text-lg font-bold text-text-dark">{w.value}</p>
                        <p className="text-xs text-text-muted">{w.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-sm font-bold text-text-dark mb-4">Dernières commandes</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left pb-2 font-semibold text-text-dark">Commande</th>
                                    <th className="text-left pb-2 font-semibold text-text-dark">Client</th>
                                    <th className="text-left pb-2 font-semibold text-text-dark hidden md:table-cell">Produit</th>
                                    <th className="text-right pb-2 font-semibold text-text-dark">Total</th>
                                    <th className="text-right pb-2 font-semibold text-text-dark">Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((o) => (
                                    <tr key={o.id} className="border-b border-border last:border-0">
                                        <td className="py-3 text-text-dark font-medium">{o.id}</td>
                                        <td className="py-3 text-text-muted">{o.client}</td>
                                        <td className="py-3 text-text-muted hidden md:table-cell">{o.product}</td>
                                        <td className="py-3 text-right text-text-dark">{o.total}</td>
                                        <td className="py-3 text-right">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                                o.status === 'Livré' ? 'bg-green-50 text-primary' :
                                                o.status === 'En cours' ? 'bg-amber-50 text-accent-gold' :
                                                'bg-gray-50 text-text-muted'
                                            }`}>{o.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                    <h2 className="text-sm font-bold text-text-dark mb-4">Meilleures ventes</h2>
                    <div className="flex flex-col gap-3">
                        {bestSellers.map((p, i) => (
                            <div key={p.name} className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-text-muted shrink-0">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-text-dark truncate">{p.name}</p>
                                    <p className="text-xs text-text-muted">{p.sales} ventes</p>
                                </div>
                                <span className="text-sm font-semibold text-text-dark shrink-0">{p.revenue}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
