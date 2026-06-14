import { usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

export default function VendeurDashboard() {
    const { sellerStats } = usePage().props
    const totalProducts = sellerStats?.totalProducts ?? 0
    const totalSales = sellerStats?.totalSales ?? 0
    const totalRevenue = sellerStats?.totalRevenue ?? 0
    const avgRating = sellerStats?.avgRating ?? 0
    const topProducts = sellerStats?.topProducts ?? []

    const stats = [
        { label: 'Produits publies', value: totalProducts, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'text-primary', bg: 'bg-primary-light' },
        { label: 'Ventes totales', value: totalSales, icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3', color: 'text-accent-red', bg: 'bg-red-50' },
        { label: 'Revenus', value: `${totalRevenue.toLocaleString('fr-DZ')} DZD`, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-primary-dark', bg: 'bg-emerald-50' },
        { label: 'Note moyenne', value: `${avgRating}/5`, icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z', color: 'text-amber-600', bg: 'bg-amber-50' },
    ]

    return (
        <SellerLayout title="Tableau de bord vendeur">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card p-6 md:p-8">
                    <h2 className="text-lg font-bold text-text-dark mb-6">Produits les plus vendus</h2>
                    <div className="flex flex-col gap-4">
                        {topProducts.map((product, index) => (
                            <div key={product.id} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                                <span className="w-6 h-6 rounded-full bg-primary-light text-primary text-xs font-bold flex items-center justify-center shrink-0">{index + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-text-dark truncate">{product.name}</p>
                                    <p className="text-xs text-text-muted">{product.sales} ventes</p>
                                </div>
                                <span className="text-sm font-semibold text-text-dark shrink-0">{(product.revenue ?? 0).toLocaleString('fr-DZ')} DZD</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-6 md:p-8">
                    <h2 className="text-lg font-bold text-text-dark mb-6">Apercu rapide</h2>
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-primary-light/30">
                            <div>
                                <p className="text-sm font-medium text-text-dark">Produits en ligne</p>
                                <p className="text-xs text-text-muted mt-0.5">Accessibles a tous</p>
                            </div>
                            <span className="text-xl font-bold text-primary">{totalProducts}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50">
                            <div>
                                <p className="text-sm font-medium text-text-dark">Prix moyen</p>
                                <p className="text-xs text-text-muted mt-0.5">Toutes categories</p>
                            </div>
                            <span className="text-xl font-bold text-amber-600">{(sellerStats?.averagePrice ?? 0).toLocaleString('fr-DZ')} DZD</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-red-50">
                            <div>
                                <p className="text-sm font-medium text-text-dark">Revenu total</p>
                                <p className="text-xs text-text-muted mt-0.5">Depuis le lancement</p>
                            </div>
                            <span className="text-xl font-bold text-accent-red">{totalRevenue.toLocaleString('fr-DZ')} DZD</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card p-6 md:p-8 mt-6">
                <h2 className="text-lg font-bold text-text-dark mb-4">Actions rapides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href="/vendeur/produits" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-light/20 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Nouveau produit</span>
                    </a>
                    <a href="/vendeur/commandes" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-light/20 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Voir commandes</span>
                    </a>
                    <a href="/vendeur/revenus" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-light/20 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v9.575c0 .621-.504 1.125-1.125 1.125h-.75M3.75 4.5h-.75" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Voir revenus</span>
                    </a>
                </div>
            </div>
        </SellerLayout>
    )
}
