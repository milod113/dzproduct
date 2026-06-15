import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function About() {
    return (
        <AppLayout>
            {/* Hero Section with gradient and organic shapes */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-light/30 via-white to-white pt-20 pb-12">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute top-40 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-light/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/10 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        Notre histoire
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary-deep-green tracking-tight mb-4 animate-fade-in-up">
                        À propos de nous
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                        Découvrez notre mission, notre vision et l'équipe qui se cache derrière Boutique Digitale DZ
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Mission Card */}
                        <div className="bg-white rounded-3xl border border-border/40 shadow-xl shadow-primary/5 p-8 md:p-10 transition-all duration-300 hover:shadow-primary/10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9V3m1.5 0v8.25M12 3v8.25" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-text-dark">Notre mission</h2>
                            </div>
                            <div className="space-y-4 text-text-muted leading-relaxed">
                                <p className="text-base">
                                    Boutique Digitale DZ est née d'une ambition simple : <span className="text-primary font-medium">rendre le digital accessible à tous les Algériens</span>. 
                                    Nous croyons au potentiel de notre pays et à la richesse de ses talents.
                                </p>
                                <p className="text-base">
                                    Notre plateforme propose des produits numériques premium créés par et pour les Algériens : 
                                    ebooks, templates, packs éducatifs, CV modernes, documents business et mini-cours.
                                </p>
                                <p className="text-base">
                                    Chaque produit est soigneusement sélectionné et vérifié pour garantir une qualité irréprochable. 
                                    Nous travaillons avec des créateurs locaux talentueux pour enrichir notre catalogue.
                                </p>
                            </div>
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                            {[
                                { value: '25.000+', label: 'Clients satisfaits', icon: '👥', delay: 0 },
                                { value: '120.000+', label: 'Téléchargements', icon: '📥', delay: 150 },
                                { value: '4.9/5', label: 'Note moyenne', icon: '⭐', delay: 300 },
                            ].map((stat, index) => (
                                <div 
                                    key={stat.label} 
                                    className="bg-white rounded-2xl border border-border/40 shadow-md p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in-up"
                                    style={{ animationDelay: `${stat.delay}ms` }}
                                >
                                    <div className="text-4xl mb-3">{stat.icon}</div>
                                    <p className="text-3xl md:text-4xl font-bold text-primary-dark">{stat.value}</p>
                                    <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Engagement Section */}
                        <div className="bg-gradient-to-br from-primary-light/20 to-white rounded-3xl border border-primary/10 shadow-lg p-8 md:p-10 mt-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-text-dark">Notre engagement</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: 'Qualité Premium', desc: 'Des contenus vérifiés par nos experts.', icon: '🏆' },
                                    { title: 'Prix Accessibles', desc: 'Des tarifs adaptés au marché algérien.', icon: '💰' },
                                    { title: 'Téléchargement Instantané', desc: 'Accès immédiat après paiement.', icon: '⚡' },
                                    { title: 'Support Client', desc: 'Une équipe disponible 7j/7.', icon: '💬' },
                                ].map((item, idx) => (
                                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white transition-all duration-200 group">
                                        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                                            <span className="text-lg">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-text-dark">{item.title}</h3>
                                            <p className="text-sm text-text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center mt-12">
                            <div className="relative inline-block group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-dark rounded-full blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                                <Link 
                                    href="/boutique" 
                                    className="relative btn-primary px-8 py-3.5 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105"
                                >
                                    <span>Découvrir la boutique</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Team Note */}
                        <div className="mt-16 text-center border-t border-border/50 pt-10">
                            <p className="text-sm text-text-muted flex items-center justify-center gap-2">
                                <span>💚</span>
                                Fait avec passion en Algérie
                                <span>🇩🇿</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
                }
                .animation-delay-200 {
                    animation-delay: 200ms;
                }
            `}</style>
        </AppLayout>
    );
}