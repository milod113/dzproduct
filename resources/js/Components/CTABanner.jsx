import { Link } from '@inertiajs/react'

export default function CTABanner() {
    return (
        <section className="section-padding bg-primary-soft">
            <div className="container-max">
                <div className="gradient-cta rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                        <div className="w-full h-full bg-white rounded-full translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
                        <div className="w-full h-full bg-white rounded-full -translate-x-1/2 translate-y-1/2" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-8 md:px-12 lg:px-16 py-12 md:py-16">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
                            <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>

                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                                Prêt à booster votre potentiel ?
                            </h2>
                            <p className="text-sm md:text-base text-white/80 mt-3 max-w-xl">
                                Rejoignez des milliers de clients et accédez dès maintenant à des ressources digitales qui font la différence.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <Link href="/boutique" className="btn-white px-8 py-3.5 text-base font-semibold w-full sm:w-auto text-center">
                                Commencer mes achats
                            </Link>
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                                <span className="text-xs text-white/60">Paiement 100% sécurisé</span>
                            </div>
                        </div>

                        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
                            <span className="text-9xl">🇩🇿</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
