import { Link, usePage } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'
import ProductCard from '@/Components/ProductCard'

export default function Wishlist() {
    const { products = [] } = usePage().props

    return (
        <ClientLayout title="Mes favoris">
            <div className="card p-6 md:p-8">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Wishlist</p>
                        <h2 className="mt-2 text-2xl font-bold text-text-dark">Produits sauvegardes</h2>
                        <p className="mt-2 text-sm text-text-muted">
                            Gardez vos produits preferes sous la main pour revenir dessus plus tard.
                        </p>
                    </div>
                    <p className="text-sm text-text-muted">{products.length} favori{products.length > 1 ? 's' : ''}</p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[28px] border border-dashed border-border bg-[#fbfcfb] p-10 text-center">
                        <h3 className="text-lg font-semibold text-text-dark">Aucun favori pour le moment</h3>
                        <p className="mt-2 text-sm text-text-muted">
                            Explorez la boutique et ajoutez les produits qui vous interessent a votre wishlist.
                        </p>
                        <Link href="/boutique" className="btn-primary mt-5 inline-flex px-5 py-3 text-sm">
                            Explorer la boutique
                        </Link>
                    </div>
                )}
            </div>
        </ClientLayout>
    )
}
