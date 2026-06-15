import AppLayout from '@/Layouts/AppLayout'
import { Link } from '@inertiajs/react'

export default function LegalPageLayout({ eyebrow, title, subtitle, sections }) {
    return (
        <AppLayout>
            <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbf8_0%,#ffffff_66%,#f4f9f5_100%)] pb-10 pt-16">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
                </div>

                <div className="container-max relative">
                    <nav className="mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 text-sm text-text-muted">
                        <Link href="/" className="transition-colors hover:text-primary">Accueil</Link>
                        <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="font-medium text-text-dark">{title}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                            {eyebrow}
                        </div>
                        <h1 className="mt-6 text-4xl font-bold leading-tight text-text-dark sm:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    <div className="mx-auto max-w-4xl rounded-[34px] border border-border/80 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-8">
                        <div className="grid gap-5">
                            {sections.map((section) => (
                                <article key={section.title} className="rounded-[28px] bg-[#f8fbf8] p-5 md:p-6">
                                    <h2 className="text-xl font-bold text-text-dark">{section.title}</h2>
                                    <div className="mt-3 grid gap-3 text-sm leading-7 text-text-muted">
                                        {section.paragraphs.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-8 rounded-[28px] bg-[#112b21] p-6 text-white">
                            <p className="text-xs uppercase tracking-[0.18em] text-emerald-100/75">Besoin d aide</p>
                            <h3 className="mt-2 text-2xl font-bold">Une question sur vos droits ou obligations ?</h3>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/80">
                                Notre equipe peut vous aider a comprendre les conditions de vente, les remboursements, la propriete intellectuelle ou la protection acheteur.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(11,122,53,0.22)] transition-all hover:bg-primary-dark">
                                    Contacter le support
                                </Link>
                                <a href="mailto:contact@boutiquedigitaledz.dz" className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/12">
                                    contact@boutiquedigitaledz.dz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
