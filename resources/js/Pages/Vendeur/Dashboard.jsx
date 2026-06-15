import { usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

export default function VendeurDashboard() {
    const { sellerStats, messageSummary, serviceMissionSummary, auth } = usePage().props
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

            <div className="card p-6 md:p-8 mb-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Plan vendeur</p>
                        <h2 className="mt-2 text-2xl font-bold text-text-dark">
                            {seller?.seller_plan === 'elite' ? 'Elite' : seller?.seller_plan === 'pro' ? 'Pro' : 'Starter'}
                        </h2>
                        <p className="mt-2 text-sm text-text-muted">
                            {seller?.seller_plan === 'starter' && 'Vous pouvez publier jusqu a 3 produits. Passez a Pro pour debloquer les produits illimites.'}
                            {seller?.seller_plan === 'pro' && 'Produits illimites, badge vendeur verifie et meilleure visibilite dans la boutique.'}
                            {seller?.seller_plan === 'elite' && 'Plan complet avec support prioritaire, promotion avancee et bouton WhatsApp personnalise.'}
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#f8fbf8] px-4 py-3">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Limite produits</p>
                            <p className="mt-1 text-sm font-semibold text-text-dark">{seller?.seller_plan === 'starter' ? '3 max' : 'Illimite'}</p>
                        </div>
                        <div className="rounded-2xl bg-[#f8fbf8] px-4 py-3">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Badge verifie</p>
                            <p className="mt-1 text-sm font-semibold text-text-dark">{['pro', 'elite'].includes(seller?.seller_plan) ? 'Inclus' : 'Non inclus'}</p>
                        </div>
                        <div className="rounded-2xl bg-[#f8fbf8] px-4 py-3">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Support prioritaire</p>
                            <p className="mt-1 text-sm font-semibold text-text-dark">{seller?.seller_plan === 'elite' ? 'Oui' : 'Non'}</p>
                        </div>
                    </div>
                </div>
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
                        <div className="flex items-center justify-between p-4 rounded-xl bg-sky-50">
                            <div>
                                <p className="text-sm font-medium text-text-dark">Messages recus</p>
                                <p className="text-xs text-text-muted mt-0.5">Contacts acheteurs en attente</p>
                            </div>
                            <span className="text-xl font-bold text-sky-700">{unreadMessages}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-violet-50">
                            <div>
                                <p className="text-sm font-medium text-text-dark">Missions service</p>
                                <p className="text-xs text-text-muted mt-0.5">Prestations reservees en suivi</p>
                            </div>
                            <span className="text-xl font-bold text-violet-700">{serviceMissionCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card p-6 md:p-8 mt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-text-dark">Messages recents</h2>
                        <p className="text-sm text-text-muted mt-1">Les demandes arrivent depuis votre profil public vendeur.</p>
                    </div>
                    <a href="/vendeur/messages" className="btn-outline px-5 py-2.5 text-sm">
                        Ouvrir la messagerie
                    </a>
                </div>

                {recentMessages.length > 0 ? (
                    <div className="grid gap-4">
                        {recentMessages.map((message) => (
                            <div key={message.id} className="rounded-2xl border border-border bg-[#fbfcfb] p-4">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-sm font-semibold text-text-dark">{message.subject}</p>
                                    <span className="text-xs text-text-muted">{message.created_at}</span>
                                </div>
                                <p className="mt-2 text-sm text-text-muted">Envoye par {message.sender_name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                        <p className="text-sm text-text-muted">Aucun message recent pour le moment.</p>
                    </div>
                )}
            </div>

            <div className="card p-6 md:p-8 mt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-text-dark">Missions service recentes</h2>
                        <p className="text-sm text-text-muted mt-1">Suivez les briefs et les livraisons de vos prestations reservees.</p>
                    </div>
                    <a href="/vendeur/services" className="btn-outline px-5 py-2.5 text-sm">
                        Voir les missions
                    </a>
                </div>
                {recentServiceMissions.length > 0 ? (
                    <div className="grid gap-4">
                        {recentServiceMissions.map((mission) => (
                            <a key={mission.id} href={`/vendeur/services/${mission.id}`} className="rounded-2xl border border-border bg-[#fbfcfb] p-4 transition-colors hover:border-primary/30">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-text-dark">{mission.product_name}</p>
                                        <p className="mt-1 text-xs text-text-muted">{mission.mission_number} . {mission.client_name}</p>
                                    </div>
                                    <span className="text-xs font-semibold text-primary">{mission.status}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                        <p className="text-sm text-text-muted">Aucune mission service recente.</p>
                    </div>
                )}
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
                    <a href="/vendeur/messages" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-light/20 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75zm1.86.513l7.227 4.816a1.125 1.125 0 001.246 0l7.227-4.816" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Voir messages</span>
                    </a>
                    <a href="/vendeur/services" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary-light/20 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15m-15 5.25h15m-15 5.25h9" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Voir missions</span>
                    </a>
                </div>
            </div>
        </SellerLayout>
    )
}
