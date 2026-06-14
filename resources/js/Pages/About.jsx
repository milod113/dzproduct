import { Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

export default function About() {
    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max text-center">
                    <h1 className="section-title">À propos</h1>
                    <p className="section-subtitle mx-auto">Découvrez notre mission et notre vision</p>
                </div>
            </section>
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-3xl mx-auto">
                        <div className="card p-8 md:p-10">
                            <h2 className="text-2xl font-bold text-text-dark mb-6">Notre mission</h2>
                            <div className="text-sm text-text-muted leading-relaxed space-y-4">
                                <p>Boutique Digitale DZ est née d'une ambition simple : rendre le digital accessible à tous les Algériens. Nous croyons au potentiel de notre pays et à la richesse de ses talents.</p>
                                <p>Notre plateforme propose des produits numériques premium créés par et pour les Algériens : ebooks, templates, packs éducatifs, CV modernes, documents business et mini-cours.</p>
                                <p>Chaque produit est soigneusement sélectionné et vérifié pour garantir une qualité irréprochable. Nous travaillons avec des créateurs locaux talentueux pour enrichir notre catalogue.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                            {[
                                { value: '25.000+', label: 'Clients satisfaits' },
                                { value: '120.000+', label: 'Téléchargements' },
                                { value: '4.9/5', label: 'Note moyenne' },
                            ].map((stat) => (
                                <div key={stat.label} className="card p-6 text-center">
                                    <p className="text-3xl font-bold text-primary-dark">{stat.value}</p>
                                    <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="card p-8 md:p-10 mt-6">
                            <h2 className="text-2xl font-bold text-text-dark mb-6">Notre engagement</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: 'Qualité Premium', desc: 'Des contenus vérifiés par nos experts.' },
                                    { title: 'Prix Accessibles', desc: 'Des tarifs adaptés au marché algérien.' },
                                    { title: 'Téléchargement Instantané', desc: 'Accès immédiat après paiement.' },
                                    { title: 'Support Client', desc: 'Une équipe disponible 7j/7.' },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-text-dark">{item.title}</h3>
                                            <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/boutique" className="btn-primary px-8 py-3.5">
                                Découvrir la boutique
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
