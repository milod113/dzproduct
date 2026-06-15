import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const faqs = [
    { q: 'Qu\'est-ce que Boutique Digitale DZ ?', a: 'Boutique Digitale DZ est la première marketplace algérienne de produits numériques premium. Nous proposons des ebooks, templates, packs éducatifs, CV, et bien plus encore, créés par des experts locaux.' },
    { q: 'Comment fonctionne le téléchargement ?', a: 'Après confirmation de votre paiement, vous recevez un accès immédiat à vos fichiers. Vous pouvez les télécharger depuis votre espace client à tout moment.' },
    { q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous acceptons CIB, Edahabia, BaridiMob et virement bancaire. Tous les paiements sont 100% sécurisés.' },
    { q: 'Puis-je être remboursé si le produit ne me convient pas ?', a: 'Oui, nous offrons une garantie satisfait ou remboursé sous 14 jours. Contactez notre support pour toute demande.' },
    { q: 'Les produits sont-ils compatibles avec tous les appareils ?', a: 'Oui, nos produits sont au format PDF, DOCX, ZIP, MP4 et sont compatibles avec tous les appareils (PC, Mac, smartphone, tablette).' },
    { q: 'Puis-je obtenir une facture pour mon achat ?', a: 'Oui, une facture est générée automatiquement pour chaque achat. Vous pouvez la télécharger depuis votre espace client.' },
    { q: 'Comment contacter le support client ?', a: 'Vous pouvez nous contacter via le formulaire de contact, par email à contact@boutiquedigitaledz.dz, ou par téléphone au +213 (0) 555 12 34 56.' },
    { q: 'Les produits sont-ils mis à jour régulièrement ?', a: 'Oui, nous mettons régulièrement à jour nos produits pour garantir leur pertinence. Les mises à jour sont gratuites pour tous les acheteurs.' },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout>
            {/* Hero Section with Decorative Elements */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-light/30 via-white to-secondary-light/20 pt-20 pb-16">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-light/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-light/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-2xl"></div>
                </div>

                <div className="container-max relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary-light/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <span className="text-primary text-sm font-semibold">💬 Assistance</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-4">
                        Foire Aux Questions
                    </h1>
                    <p className="text-text-muted text-lg max-w-2xl mx-auto">
                        Tout ce que vous devez savoir sur Boutique Digitale DZ
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mt-8">
                        <div className="relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Rechercher une question..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
                <div className="container-max">
                    <div className="max-w-3xl mx-auto">
                        {/* Stats Banner */}
                        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 mb-10 text-white text-center">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-3xl font-bold">{faqs.length}</div>
                                    <div className="text-sm opacity-90">Questions fréquentes</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">24/7</div>
                                    <div className="text-sm opacity-90">Support disponible</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">100%</div>
                                    <div className="text-sm opacity-90">Satisfaction client</div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        {filteredFaqs.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {filteredFaqs.map((faq, i) => (
                                    <div
                                        key={i}
                                        className={`group rounded-2xl bg-white border transition-all duration-300 ${
                                            openIndex === i
                                                ? 'border-primary shadow-lg shadow-primary/5'
                                                : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                                        }`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                    openIndex === i
                                                        ? 'bg-primary text-white'
                                                        : 'bg-gray-100 text-text-muted group-hover:bg-primary/20'
                                                }`}>
                                                    <svg
                                                        className={`w-3 h-3 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-base md:text-lg font-semibold text-text-dark">
                                                    {faq.q}
                                                </span>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 text-text-muted shrink-0 ml-4 transition-transform duration-300 ${
                                                    openIndex === i ? 'rotate-180 text-primary' : ''
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
                                                <div className="flex gap-4">
                                                    <div className="w-6 shrink-0"></div>
                                                    <div className="flex-1">
                                                        <div className="w-12 h-1 bg-primary/30 rounded-full mb-3"></div>
                                                        <p className="text-text-muted leading-relaxed">{faq.a}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-4">🔍</div>
                                <p className="text-text-muted">Aucune question ne correspond à votre recherche.</p>
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="mt-4 text-primary font-semibold hover:underline"
                                >
                                    Réinitialiser la recherche
                                </button>
                            </div>
                        )}

                        {/* Still have questions */}
                        <div className="mt-12 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-dark mb-2">Vous avez d'autres questions ?</h3>
                            <p className="text-text-muted mb-6">
                                Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="mailto:contact@boutiquedigitaledz.dz"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    contact@boutiquedigitaledz.dz
                                </a>
                                <a
                                    href="tel:+213555123456"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-text-dark rounded-xl font-semibold hover:border-primary hover:text-primary transition-all duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    +213 (0) 555 12 34 56
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}