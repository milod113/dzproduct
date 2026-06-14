import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'

function TrustPill({ icon, text }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-primary">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
            </div>
            <span className="text-xs font-semibold text-text-dark sm:text-sm">{text}</span>
        </div>
    )
}

function MetricCard({ value, label }) {
    return (
        <div className="rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="text-2xl font-bold text-text-dark">{value}</div>
            <div className="mt-1 text-sm text-text-muted">{label}</div>
        </div>
    )
}

function ProductSpotlight({ title, price, badge, tint, accent }) {
    return (
        <div className={`rounded-[28px] border ${tint} p-5 shadow-[0_22px_60px_rgba(15,23,42,0.12)]`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${accent}`}>
                        {badge}
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-text-dark">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        Livraison instantanee, acces a vie et contenus adaptes au marche algerien.
                    </p>
                </div>
                <div className="rounded-2xl bg-white/80 px-3 py-2 text-right shadow-sm">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">A partir de</p>
                    <p className="mt-1 text-lg font-bold text-accent-red">{price}</p>
                </div>
            </div>
        </div>
    )
}

export default function HeroSection() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(11,122,53,0.16),_transparent_34%),linear-gradient(180deg,_#f7fbf8_0%,_#ffffff_58%,_#f5f9f6_100%)]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-light blur-3xl" />
                <div className="absolute left-[10%] top-[24%] h-px w-40 rotate-[-18deg] bg-primary/20" />
                <div className="absolute right-[14%] top-[32%] h-px w-56 rotate-[16deg] bg-primary/15" />
            </div>

            <div className="container-max relative">
                <div className="grid min-h-[calc(100vh-5rem)] items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
                    <div className="relative z-10">
                        <div className={`transition-all duration-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/85 px-4 py-2 shadow-[0_16px_32px_rgba(15,23,42,0.08)] backdrop-blur">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                                    Marketplace digitale algerienne premium
                                </span>
                            </div>

                            <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight text-text-dark sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
                                Vendez, achetez et telechargez des
                                <span className="block text-primary">produits digitaux de confiance</span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                                Une vitrine moderne pour les createurs algeriens. Formations, ebooks, templates,
                                packs business et ressources prêtes a l'emploi, avec livraison instantanee et vendeurs verifies.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link href="/boutique" className="btn-primary px-8 py-4 text-base shadow-[0_18px_40px_rgba(11,122,53,0.24)]">
                                    Explorer la boutique
                                </Link>
                                <Link href="/categories" className="btn-outline border-white bg-white/85 px-8 py-4 text-base shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur">
                                    Voir les categories
                                </Link>
                            </div>
                        </div>

                        <div className={`mt-8 flex flex-wrap gap-3 transition-all delay-150 duration-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <TrustPill
                                icon="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                text="Paiement securise"
                            />
                            <TrustPill
                                icon="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                text="Telechargement instantane"
                            />
                            <TrustPill
                                icon="M17.25 6.75L9.75 14.25l-3-3"
                                text="Vendeurs verifies"
                            />
                        </div>

                        <div className={`mt-10 grid gap-4 sm:grid-cols-3 transition-all delay-300 duration-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <MetricCard value="500+" label="Produits prets a vendre" />
                            <MetricCard value="50+" label="Createurs et vendeurs actifs" />
                            <MetricCard value="24/7" label="Acces et livraison automatique" />
                        </div>
                    </div>

                    <div className={`relative transition-all delay-200 duration-1000 ${loaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-[0.98]'}`}>
                        <div className="relative mx-auto max-w-2xl">
                            <div className="absolute -left-6 top-10 hidden rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_18px_35px_rgba(15,23,42,0.1)] backdrop-blur lg:block">
                                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Top categorie</p>
                                <p className="mt-1 text-sm font-bold text-text-dark">Business et Formation</p>
                            </div>

                            <div className="absolute -right-4 bottom-10 hidden rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_18px_35px_rgba(15,23,42,0.1)] backdrop-blur lg:block">
                                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Conversion</p>
                                <p className="mt-1 text-sm font-bold text-primary">Badges de confiance visibles</p>
                            </div>

                            <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(241,248,243,0.95))] p-5 shadow-[0_28px_80px_rgba(15,23,42,0.14)] backdrop-blur sm:p-6">
                                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

                                <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                                    <div className="rounded-[28px] bg-[#0f2f23] p-6 text-white shadow-[0_18px_40px_rgba(11,122,53,0.24)]">
                                        <p className="text-xs uppercase tracking-[0.24em] text-emerald-100/80">Selection de la semaine</p>
                                        <h2 className="mt-4 text-2xl font-bold leading-tight">
                                            Vendez votre expertise digitale dans toute l'Algerie
                                        </h2>
                                        <p className="mt-4 text-sm leading-7 text-emerald-50/80">
                                            Mettez en avant vos templates, ebooks et packs avec un profil vendeur professionnel et des badges de confiance visibles.
                                        </p>

                                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                            <div className="rounded-2xl bg-white/10 p-4">
                                                <p className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">Support</p>
                                                <p className="mt-2 text-sm font-semibold">WhatsApp et pre-vente</p>
                                            </div>
                                            <div className="rounded-2xl bg-white/10 p-4">
                                                <p className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">Livraison</p>
                                                <p className="mt-2 text-sm font-semibold">Fichiers et acces immediats</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <ProductSpotlight
                                            title="Pack Formation Business"
                                            price="1 290 DZD"
                                            badge="Top rated"
                                            tint="border-emerald-100 bg-[linear-gradient(180deg,#ffffff_0%,#f3fbf5_100%)]"
                                            accent="bg-emerald-50 text-emerald-700"
                                        />
                                        <ProductSpotlight
                                            title="Templates Social Media Pro"
                                            price="490 DZD"
                                            badge="Verified seller"
                                            tint="border-amber-100 bg-[linear-gradient(180deg,#fffdf7_0%,#fff7e8_100%)]"
                                            accent="bg-amber-50 text-amber-700"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
