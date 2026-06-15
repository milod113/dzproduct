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
    const whatsappLink = seller.phone ? `https://wa.me/213${seller.phone.replace(/\D/g, '').replace(/^0/, '')}` : null
    const whatsappLabel = seller.whatsapp_cta_text || 'Contacter sur WhatsApp'

    return (
        <AppLayout>
            <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbf9_0%,#ffffff_68%,#f5f9f6_100%)] py-10">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
                </div>
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

                    <div className="relative grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                        <div className="rounded-[32px] border border-primary/10 bg-white p-6 shadow-[0_22px_55px_rgba(15,23,42,0.08)] md:p-8">
                            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#e8f5e9_0%,#ffffff_55%,#dff1e4_100%)] px-5 py-4 text-2xl font-bold text-primary shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                                        {seller.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-primary">Createur Algerien</p>
                                        <h1 className="mt-2 text-3xl font-bold text-text-dark">{seller.name}</h1>
                                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-text-muted">
                                            {seller.wilaya && <span>{seller.wilaya}, Algerie</span>}
                                            {seller.seller_since_label && <span>Membre depuis {seller.seller_since_label}</span>}
                                            {seller.seller_plan_label && <span>Plan {seller.seller_plan_label}</span>}
                                        </div>
                                        <SellerBadges seller={seller} className="mt-4" />
                                    </div>
                                </div>
                                <Link href="/boutique" className="btn-outline px-5 py-3 text-sm justify-center">
                                    Continuer vos achats
                                </Link>
                            </div>

                            <div className="mt-6 rounded-[24px] bg-[linear-gradient(135deg,#eef8f0_0%,#ffffff_55%,#e5f3e8_100%)] p-5">
                                <p className="text-sm leading-relaxed text-text-muted">
                                    {seller.bio || `${seller.name} propose des produits digitaux concus pour le marche algerien, avec un accent sur la qualite, la rapidite de livraison et la confiance acheteur.`}
                                </p>
                                {seller.is_available_for_freelance && (
                                    <div className="mt-5 rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-4">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-emerald-800">Ce createur est disponible pour des projets sur mesure</p>
                                                <p className="mt-1 text-sm text-emerald-700">Vous pouvez le contacter pour une mission freelance, du consulting ou un besoin technique specifique.</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {seller.phone && (
                                                    <a href={`tel:${seller.phone}`} className="rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
                                                        Appeler
                                                    </a>
                                                )}
                                                {whatsappLink && (
                                                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                                                        Demander un projet
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-white/85 p-4 shadow-sm">
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Positionnement</p>
                                        <p className="mt-2 text-sm font-semibold text-text-dark">{seller.is_available_for_freelance ? 'Produits digitaux et services sur mesure' : 'Produits digitaux premium et telechargement instantane'}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/85 p-4 shadow-sm">
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Confiance</p>
                                        <p className="mt-2 text-sm font-semibold text-text-dark">Profil vendeur visible et badges publics</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            <StatCard label="Produits actifs" value={seller.stats?.productCount ?? 0} hint="Disponibles actuellement" />
                            <StatCard label="Ventes" value={seller.stats?.totalSales ?? 0} hint="Commandes confirmees" />
                            <StatCard label="Revenus" value={`${(seller.stats?.totalRevenue ?? 0).toLocaleString('fr-DZ')} DZD`} hint="Performance globale" />
                            <StatCard label="Note moyenne" value={`${seller.stats?.avgRating ?? 0}/5`} hint="Basee sur les produits publies" />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="rounded-[28px] border border-border/80 bg-white p-6 shadow-soft">
                            <p className="text-xs uppercase tracking-[0.18em] text-primary">Astuce de message</p>
                            <h2 className="mt-3 text-2xl font-bold text-text-dark">Facilitez le contact avant achat</h2>
                            <div className="mt-5 grid gap-3">
                                {[
                                    'Posez des questions precises sur le contenu, le format ou la compatibilite.',
                                    'Mentionnez le produit concerne pour aider le vendeur a repondre plus vite.',
                                    'Laissez votre telephone si vous souhaitez un suivi plus rapide.',
                                ].map((tip) => (
                                    <div key={tip} className="flex items-start gap-3 rounded-2xl bg-[#f7faf7] p-4">
                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <p className="text-sm leading-7 text-text-muted">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-primary/10 bg-white p-6 shadow-soft">
                            <p className="text-xs uppercase tracking-[0.18em] text-primary">Contacter le vendeur</p>
                            <h2 className="mt-3 text-2xl font-bold text-text-dark">Telephone et WhatsApp</h2>
                            <p className="mt-2 text-sm leading-7 text-text-muted">
                                Pour les questions avant achat, contactez directement le vendeur via son numero ou sur WhatsApp.
                            </p>
                            <div className="mt-5 grid gap-4">
                                <div className="rounded-2xl border border-border bg-[#f8fbf8] p-4">
                                    <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Numero du vendeur</p>
                                    <p className="mt-2 text-lg font-bold text-text-dark">{seller.phone || 'Numero non renseigne'}</p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    {seller.phone && (
                                        <a href={`tel:${seller.phone}`} className="btn-outline px-5 py-3 text-sm text-center">
                                            Appeler le vendeur
                                        </a>
                                    )}
                                    {whatsappLink && (
                                        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-primary px-5 py-3 text-sm text-center">
                                            {whatsappLabel}
                                        </a>
                                    )}
                                </div>
                            </div>
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
