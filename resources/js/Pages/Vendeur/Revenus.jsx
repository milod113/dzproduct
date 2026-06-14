import { usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

export default function VendeurRevenus() {
    const { products = [], revenueSummary } = usePage().props
    const monthlyData = revenueSummary?.monthly ?? []
    const totalRevenue = revenueSummary?.totalRevenue ?? 0
    const totalThisMonth = revenueSummary?.thisMonthRevenue ?? 0
    const avgMonthly = revenueSummary?.averageMonthlyRevenue ?? 0

    return (
        <SellerLayout title="Revenus">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-8">
                <div className="card p-5 md:p-6">
                    <p className="text-xs text-text-muted mb-1">Revenu total</p>
                    <p className="text-2xl font-bold text-text-dark">{totalRevenue.toLocaleString('fr-DZ')} DZD</p>
                </div>
                <div className="card p-5 md:p-6">
                    <p className="text-xs text-text-muted mb-1">Ce mois-ci</p>
                    <p className="text-2xl font-bold text-primary">{totalThisMonth.toLocaleString('fr-DZ')} DZD</p>
                </div>
                <div className="card p-5 md:p-6">
                    <p className="text-xs text-text-muted mb-1">Moyenne mensuelle</p>
                    <p className="text-2xl font-bold text-amber-600">{avgMonthly.toLocaleString('fr-DZ')} DZD</p>
                </div>
            </div>

            <div className="card p-6 md:p-8 mb-6">
                <h2 className="text-lg font-bold text-text-dark mb-6">Revenus mensuels</h2>
                <div className="flex items-end gap-3 md:gap-4" style={{ height: '200px' }}>
                    {monthlyData.map((month) => {
                        const maxRevenue = Math.max(...monthlyData.map((item) => item.revenue), 0)
                        const heightPercent = maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0

                        return (
                            <div key={month.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                                <span className="text-[10px] font-medium text-text-dark">{month.revenue.toLocaleString('fr-DZ')}</span>
                                <div
                                    className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-colors cursor-pointer"
                                    style={{ height: `${heightPercent}%`, minHeight: '20px' }}
                                    title={`${month.month}: ${month.revenue.toLocaleString('fr-DZ')} DZD (${month.sales} ventes)`}
                                />
                                <span className="text-[10px] text-text-muted">{month.month}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="card p-6 md:p-8">
                <h2 className="text-lg font-bold text-text-dark mb-4">Detail des ventes par produit</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left pb-3 font-semibold text-text-dark">Produit</th>
                                <th className="text-right pb-3 font-semibold text-text-dark">Ventes</th>
                                <th className="text-right pb-3 font-semibold text-text-dark hidden sm:table-cell">Prix unitaire</th>
                                <th className="text-right pb-3 font-semibold text-text-dark">Revenu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-border last:border-0">
                                    <td className="py-3 text-text-dark font-medium">{product.name}</td>
                                    <td className="py-3 text-right text-text-muted">{product.sales}</td>
                                    <td className="py-3 text-right text-text-muted hidden sm:table-cell">{product.price.toLocaleString('fr-DZ')} DZD</td>
                                    <td className="py-3 text-right font-medium text-text-dark">{(product.price * product.sales).toLocaleString('fr-DZ')} DZD</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </SellerLayout>
    )
}
