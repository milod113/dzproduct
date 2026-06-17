import { Link } from '@inertiajs/react'
import ProductCard from '@/Components/ProductCard'

function Pill({ children, tone = 'default' }) {
    const toneClass = {
        default: 'border-white/70 bg-white/85 text-text-dark',
        green: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        amber: 'border-amber-200 bg-amber-50 text-amber-700',
        sky: 'border-sky-200 bg-sky-50 text-sky-700',
    }[tone] || 'border-white/70 bg-white/85 text-text-dark'

    return (
        <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_12px_28px_rgba(15,23,42,0.08)] ${toneClass}`}>
            {children}
        </div>
    )
}

export default function StudentSpaceSection({ studentSpace }) {
    const bundles = studentSpace?.bundles || []
    const featured = studentSpace?.featured || []
    const headline = studentSpace?.headline || {}

    if (!bundles.length && !featured.length) {
        return null
    }

    return (
        <section className="relative overflow-hidden py-18">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_24%),linear-gradient(180deg,#f8fbff_0%,#ffffff_58%,#f4f9f7_100%)]" />
            <div className="absolute -left-20 top-14 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-100/55 blur-3xl" />

            <div className="container-max relative">
                <div className="rounded-[36px] border border-white/80 bg-white/85 p-6 shadow-[0_26px_70px_rgba(15,23,42,0.1)] backdrop-blur md:p-8">
                    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
                        <div>
                            <div className="inline-flex rounded-full bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                                {headline.title || 'Espace Etudiant'}
                            </div>
                            <h2 className="mt-5 text-3xl font-bold leading-tight text-text-dark md:text-4xl">
                                Ressources premium pour reviser, apprendre et avancer plus vite
                            </h2>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-text-muted md:text-base">
                                {headline.description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Pill tone="green">{headline.freeCount ?? 0} gratuits</Pill>
                                <Pill tone="amber">{headline.underBudgetCount ?? 0} petit budget</Pill>
                                <Pill tone="sky">{headline.beginnerCount ?? 0} debutant</Pill>
                            </div>

                            <div className="mt-8 grid gap-4">
                                {bundles.map((bundle, index) => (
                                    <div key={bundle.id} className="rounded-[28px] border border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <div className="inline-flex rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                                                    Bundle etudiant {index + 1}
                                                </div>
                                                <h3 className="mt-3 text-lg font-bold text-text-dark">{bundle.name}</h3>
                                                <p className="mt-2 text-sm leading-7 text-text-muted line-clamp-2">{bundle.description}</p>
                                            </div>
                                            <div className="shrink-0 rounded-2xl bg-[#112b21] px-4 py-3 text-right text-white shadow-[0_16px_35px_rgba(17,43,33,0.22)]">
                                                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/70">Prix</p>
                                                <p className="mt-1 text-lg font-bold">{bundle.is_free ? 'Gratuit' : `${bundle.price.toLocaleString('fr-DZ')} DZD`}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link href="/boutique" className="btn-primary px-6 py-3">
                                    Explorer l espace etudiant
                                </Link>
                                <Link href="/gratuits" className="btn-outline px-6 py-3">
                                    Voir les produits gratuits
                                </Link>
                            </div>
                        </div>

                        <div>
                            <div className="mb-5 flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-primary">Selection utile</p>
                                    <h3 className="mt-2 text-2xl font-bold text-text-dark">Produits conseilles aux etudiants</h3>
                                </div>
                                <Link href="/boutique" className="hidden text-sm font-semibold text-primary transition-colors hover:text-primary-dark sm:inline-flex">
                                    Voir toute la selection
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {featured.slice(0, 4).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
