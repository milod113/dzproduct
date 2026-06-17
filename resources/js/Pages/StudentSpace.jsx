import { Link, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import ProductCard from '@/Components/ProductCard'

function NeedCard({ need, isActive }) {
    const toneClass = {
        emerald: isActive ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-border bg-white text-text-dark',
        sky: isActive ? 'border-sky-300 bg-sky-50 text-sky-800' : 'border-border bg-white text-text-dark',
        amber: isActive ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-border bg-white text-text-dark',
        violet: isActive ? 'border-violet-300 bg-violet-50 text-violet-800' : 'border-border bg-white text-text-dark',
    }[need.tone] || 'border-border bg-white text-text-dark'

    return (
        <a
            href={`#${need.slug}`}
            className={`group rounded-[28px] border p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.1)] ${toneClass}`}
        >
            <p className="text-[11px] uppercase tracking-[0.2em] opacity-70">Besoin</p>
            <h3 className="mt-3 text-lg font-bold">{need.label}</h3>
            <p className="mt-2 text-sm leading-7 opacity-80">{need.description}</p>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold">{need.count} ressources</span>
                <span className="text-sm font-semibold">Voir</span>
            </div>
        </a>
    )
}

function SectionHeader({ eyebrow, title, text }) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold text-text-dark md:text-4xl">{title}</h2>
            {text && <p className="mt-4 max-w-3xl text-sm leading-8 text-text-muted md:text-base">{text}</p>}
        </div>
    )
}

export default function StudentSpace() {
    const { studentSpace, needs = [] } = usePage().props
    const headline = studentSpace?.headline || {}
    const bundles = studentSpace?.bundles || []
    const featured = studentSpace?.featured || []

    return (
        <AppLayout>
            <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_26%),linear-gradient(180deg,#f6fbff_0%,#ffffff_62%,#f4faf7_100%)] pb-12 pt-14">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/55 blur-3xl" />
                    <div className="absolute left-1/2 top-28 h-px w-72 -translate-x-1/2 bg-primary/15" />
                </div>

                <div className="container-max relative">
                    <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
                        <div>
                            <div className="inline-flex rounded-full bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                                {headline.title || 'Espace Etudiant'}
                            </div>
                            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-text-dark sm:text-5xl lg:text-6xl">
                                Une page pensee pour les
                                <span className="block text-primary">etudiants algeriens ambitieux</span>
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                                {headline.description}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    {headline.freeCount ?? 0} ressources gratuites
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                                    {headline.underBudgetCount ?? 0} options petit budget
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
                                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                                    {headline.beginnerCount ?? 0} produits debutant
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link href="/boutique" className="btn-primary px-6 py-3">
                                    Explorer toute la boutique
                                </Link>
                                <Link href="/gratuits" className="btn-outline px-6 py-3">
                                    Voir les gratuits
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                            {bundles.map((bundle, index) => (
                                <div key={bundle.id} className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
                                    <div className="inline-flex rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                                        Bundle {index + 1}
                                    </div>
                                    <h3 className="mt-4 text-lg font-bold text-text-dark">{bundle.name}</h3>
                                    <p className="mt-2 text-sm leading-7 text-text-muted line-clamp-2">{bundle.description}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Prix</span>
                                        <span className="text-sm font-bold text-text-dark">{bundle.is_free ? 'Gratuit' : `${bundle.price.toLocaleString('fr-DZ')} DZD`}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="container-max">
                    <SectionHeader
                        eyebrow="Navigation par besoin"
                        title="Choisissez directement votre objectif"
                        text="Cette page organise les ressources selon ce que l etudiant cherche vraiment: reviser, avancer a l universite, preparer un CV ou apprendre a coder."
                    />

                    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {needs.map((need, index) => (
                            <NeedCard key={need.slug} need={need} isActive={index === 0} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-8">
                <div className="container-max">
                    <SectionHeader
                        eyebrow="Recommandations"
                        title="Selection generale pour bien commencer"
                        text="Une base solide de produits utiles pour les etudiants qui veulent progresser rapidement avec des ressources fiables."
                    />

                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {featured.slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-16 pt-8">
                <div className="container-max">
                    <div className="grid gap-10">
                        {needs.map((need) => (
                            <div key={need.slug} id={need.slug} className="scroll-mt-28 rounded-[34px] border border-border/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
                                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{need.label}</p>
                                        <h2 className="mt-3 text-2xl font-bold text-text-dark md:text-3xl">{need.description}</h2>
                                    </div>
                                    <Link href="/boutique" className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark">
                                        Ouvrir la boutique complete
                                    </Link>
                                </div>

                                {need.products.length === 0 ? (
                                    <div className="mt-8 rounded-[28px] border border-dashed border-border bg-[#fbfcfb] px-6 py-10 text-center">
                                        <p className="text-sm text-text-muted">Aucune ressource n est encore liee a ce besoin.</p>
                                    </div>
                                ) : (
                                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                                        {need.products.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
