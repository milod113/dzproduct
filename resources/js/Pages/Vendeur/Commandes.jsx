import { usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

const statusBadge = {
    Livree: 'badge-green',
    'En cours': 'bg-amber-100 text-amber-700',
}

export default function VendeurCommandes() {
    const { orders = [], orderStats } = usePage().props

    return (
        <SellerLayout title="Commandes">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-8">
                <div className="card p-5">
                    <p className="text-2xl font-bold text-text-dark">{orderStats?.total ?? orders.length}</p>
                    <p className="text-sm text-text-muted">Totales</p>
                </div>
                <div className="card p-5">
                    <p className="text-2xl font-bold text-primary">{orderStats?.completed ?? 0}</p>
                    <p className="text-sm text-text-muted">Livrees</p>
                </div>
                <div className="card p-5">
                    <p className="text-2xl font-bold text-amber-600">{orderStats?.pending ?? 0}</p>
                    <p className="text-sm text-text-muted">En cours</p>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-gray-50">
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark">Commande</th>
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark hidden sm:table-cell">Client</th>
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark hidden md:table-cell">Produit</th>
                                <th className="text-left px-4 py-3.5 font-semibold text-text-dark hidden lg:table-cell">Date</th>
                                <th className="text-right px-4 py-3.5 font-semibold text-text-dark">Montant</th>
                                <th className="text-right px-4 py-3.5 font-semibold text-text-dark">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-gray-50/50">
                                    <td className="px-4 py-3.5 font-medium text-text-dark">{order.id}</td>
                                    <td className="px-4 py-3.5 text-text-muted hidden sm:table-cell">{order.client}</td>
                                    <td className="px-4 py-3.5 text-text-muted hidden md:table-cell truncate max-w-[200px]">{order.product}</td>
                                    <td className="px-4 py-3.5 text-text-muted hidden lg:table-cell">{order.date}</td>
                                    <td className="px-4 py-3.5 text-right font-medium text-text-dark">{order.amount.toLocaleString('fr-DZ')} DZD</td>
                                    <td className="px-4 py-3.5 text-right">
                                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusBadge[order.status] || 'bg-gray-100 text-gray-600'}`}>{order.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </SellerLayout>
    )
}
