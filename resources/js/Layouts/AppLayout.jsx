import { useEffect, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Header from '@/Components/Header'
import ScrollNavigator from '@/Components/ScrollNavigator'

export default function AppLayout({ children }) {
    const [toast, setToast] = useState(null)
    const flashToast = usePage().props?.toast

    useEffect(() => {
        if (flashToast) {
            setToast(flashToast)
            const t = setTimeout(() => setToast(null), 4000)
            return () => clearTimeout(t)
        }
    }, [flashToast])

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {toast && (
                <div className="fixed top-20 right-4 z-50 rounded-xl bg-primary-dark px-5 py-3 text-sm font-medium text-white shadow-lg animate-fade-in">
                    {toast}
                </div>
            )}
            <ScrollNavigator />
            <Header />

            <main className="flex-1">
                {children}
            </main>

            <footer className="relative overflow-hidden border-t border-white/10 bg-[#0d241b] text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute left-1/2 top-24 h-px w-72 -translate-x-1/2 bg-white/10" />
                </div>

                <div className="container-max relative py-16">
                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="rounded-[32px] border border-white/10 bg-white/5 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl md:p-8">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-[0_16px_35px_rgba(0,0,0,0.18)]">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200/80">Marketplace DZ</p>
                                    <p className="text-xl font-bold text-white">Boutique Digitale</p>
                                </div>
                            </Link>

                            <h3 className="mt-6 max-w-xl text-3xl font-bold leading-tight text-white">
                                La marketplace algerienne pour vendre et acheter des produits digitaux premium.
                            </h3>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-emerald-50/75">
                                Une experience moderne pour les createurs et les acheteurs: ebooks, formations, templates et ressources professionnelles
                                avec livraison instantanee, vendeurs verifies et design premium.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-emerald-50/85">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    Paiement securise
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-emerald-50/85">
                                    <span className="h-2 w-2 rounded-full bg-primary-light" />
                                    Telechargement instantane
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-emerald-50/85">
                                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                                    Createurs algeriens verifies
                                </div>
                            </div>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <Link href="/boutique" className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(11,122,53,0.24)] transition-all hover:bg-primary-dark">
                                    Explorer la boutique
                                </Link>
                                <Link href="/inscription" className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10">
                                    Devenir vendeur
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200/75">Navigation</h4>
                                <div className="mt-5 flex flex-col gap-3">
                                    <Link href="/boutique" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Boutique</Link>
                                    <Link href="/categories" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Categories</Link>
                                    <Link href="/blog" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Blog</Link>
                                    <Link href="/a-propos" className="text-sm text-emerald-50/78 transition-colors hover:text-white">A propos</Link>
                                    <Link href="/contact" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Contact</Link>
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200/75">Aide</h4>
                                <div className="mt-5 flex flex-col gap-3">
                                    <Link href="/faq" className="text-sm text-emerald-50/78 transition-colors hover:text-white">FAQ</Link>
                                    <Link href="/conditions" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Conditions generales</Link>
                                    <Link href="/confidentialite" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Politique de confidentialite</Link>
                                    <Link href="/remboursement" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Politique de remboursement</Link>
                                    <Link href="/protection-acheteur" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Protection acheteur</Link>
                                    <Link href="/conditions-vendeur" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Conditions vendeur</Link>
                                    <Link href="/copyright" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Copyright & propriete intellectuelle</Link>
                                    <Link href="/tableau-de-bord" className="text-sm text-emerald-50/78 transition-colors hover:text-white">Mon compte</Link>
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:col-span-2">
                                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200/75">Contact & confiance</h4>
                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                    <div>
                                        <a href="mailto:contact@boutiquedigitaledz.dz" className="text-sm text-emerald-50/85 transition-colors hover:text-white">
                                            contact@boutiquedigitaledz.dz
                                        </a>
                                        <p className="mt-2 text-sm text-emerald-50/70">Algerie, marketplace digitale orientee createurs et acheteurs locaux.</p>
                                    </div>
                                    <div className="grid gap-3">
                                        <div className="flex items-center gap-3 text-sm text-emerald-50/80">
                                            <svg className="h-4 w-4 shrink-0 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                            </svg>
                                            100% securise
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-emerald-50/80">
                                            <svg className="h-4 w-4 shrink-0 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                            Livraison instantanee
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-emerald-50/80">
                                            <svg className="h-4 w-4 shrink-0 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Acces a vie
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10">
                    <div className="container-max flex flex-col gap-4 py-6 text-sm text-emerald-50/70 sm:flex-row sm:items-center sm:justify-between">
                        <p>&copy; {new Date().getFullYear()} Boutique Digitale DZ. Tous droits reserves.</p>
                        <div className="flex flex-wrap items-center gap-4">
                            <span>Fait en Algerie</span>
                            <span className="hidden h-1 w-1 rounded-full bg-emerald-200/60 sm:block" />
                            <span>Soutenez le digital local</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
