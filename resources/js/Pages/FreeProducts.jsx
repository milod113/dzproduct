import { Link, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import ProductCard from '@/Components/ProductCard'

export default function FreeProducts() {
    const { products = [] } = usePage().props

    return (
        <AppLayout>
            <section className="relative overflow-hidden bg-[linear-gradient(180deg,#effcf4_0%,#ffffff_62%,#f6faf7_100%)] pb-16 pt-16">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="container-max relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                            Bibliotheque gratuite
                        </div>
                        <h1 className="mt-6 text-4xl font-bold leading-tight text-text-dark sm:text-5xl">
                            Ressources gratuites a telecharger
                        </h1>
                        <p className="mt-5 text-base leading-8 text-text-muted sm:text-lg">
                            Des ebooks, templates, fichiers et mini-formations partages par les vendeurs et l administration pour apporter de la valeur sans paiement.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/boutique" className="btn-outline px-5 py-3 text-sm">Retour boutique</Link>
                            <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-text-dark shadow-[0_16px_35px_rgba(15,23,42,0.08)]">
                                {products.length} ressource{products.length > 1 ? 's' : ''} gratuite{products.length > 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>

                    {products.length ? (
                        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-12 rounded-[32px] border border-dashed border-border bg-white p-10 text-center shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
                            <h2 className="text-2xl font-bold text-text-dark">Aucune ressource gratuite pour le moment</h2>
                            <p className="mt-3 text-sm leading-7 text-text-muted">
                                Les vendeurs et l administration pourront bientot partager des fichiers gratuits ici.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    )
}
