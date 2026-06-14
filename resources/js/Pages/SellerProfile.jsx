import { Link, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import ProductCard from '@/Components/ProductCard'
import SellerBadges from '@/Components/SellerBadges'

function StatCard({ label, value, hint }) {
    return (
        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{label}</p>
            <p className="mt-2 text-2xl font-bold text-text-dark">{value}</p>
            {hint && <p className="mt-1 text-sm text-text-muted">{hint}</p>}
        </div>
    )
}

export default function SellerProfile() {
    const { seller, products = [] } = usePage().props

    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/50 via-white to-white py-10">
                <div className="container-max">
                    <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 overflow-x-auto whitespace-nowrap pb-1">
                        <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link href="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="text-text-dark font-medium">{seller.name}</span>
                    </nav>

                    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                        <div className="rounded-[28px] border border-primary/10 bg-white p-6 md:p-8 shadow-soft">
                            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-xl font-bold text-primary">
                                        {seller.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-primary">Createur Algerien</p>
                                        <h1 className="mt-2 text-3xl font-bold text-text-dark">{seller.name}</h1>
                                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-text-muted">
                                            {seller.wilaya && <span>{seller.wilaya}, Algerie</span>}
                                            {seller.seller_since_label && <span>Membre depuis {seller.seller_since_label}</span>}
                                        </div>
                                        <SellerBadges seller={seller} className="mt-4" />
                                    </div>
                                </div>
                                <Link href="/boutique" className="btn-outline px-5 py-3 text-sm justify-center">
                                    Continuer vos achats
                                </Link>
                            </div>

                            <div className="mt-6 rounded-2xl bg-primary-light/40 p-5">
                                <p className="text-sm leading-relaxed text-text-muted">
                                    {seller.bio || `${seller.name} propose des produits digitaux concus pour le marche algerien, avec un accent sur la qualite, la rapidite de livraison et la confiance acheteur.`}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            <StatCard label="Produits actifs" value={seller.stats?.productCount ?? 0} hint="Disponibles actuellement" />
                            <StatCard label="Ventes" value={seller.stats?.totalSales ?? 0} hint="Commandes confirmees" />
                            <StatCard label="Revenus" value={`${(seller.stats?.totalRevenue ?? 0).toLocaleString('fr-DZ')} DZD`} hint="Performance globale" />
                            <StatCard label="Note moyenne" value={`${seller.stats?.avgRating ?? 0}/5`} hint="Basee sur les produits publies" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Catalogue vendeur</p>
                            <h2 className="mt-2 text-2xl font-bold text-text-dark">Produits publies par {seller.name}</h2>
                        </div>
                        <p className="text-sm text-text-muted">{products.length} produit{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}</p>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-border bg-white p-10 text-center">
                            <h3 className="text-lg font-semibold text-text-dark">Aucun produit actif pour le moment</h3>
                            <p className="mt-2 text-sm text-text-muted">Ce vendeur n’a pas encore de catalogue public disponible.</p>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    )
}
