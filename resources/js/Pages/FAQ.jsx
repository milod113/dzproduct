import { useState } from 'react'
import AppLayout from '@/Layouts/AppLayout'

const faqs = [
    { q: 'Qu\'est-ce que Boutique Digitale DZ ?', a: 'Boutique Digitale DZ est la première marketplace algérienne de produits numériques premium. Nous proposons des ebooks, templates, packs éducatifs, CV, et bien plus encore, créés par des experts locaux.' },
    { q: 'Comment fonctionne le téléchargement ?', a: 'Après confirmation de votre paiement, vous recevez un accès immédiat à vos fichiers. Vous pouvez les télécharger depuis votre espace client à tout moment.' },
    { q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous acceptons CIB, Edahabia, BaridiMob et virement bancaire. Tous les paiements sont 100% sécurisés.' },
    { q: 'Puis-je être remboursé si le produit ne me convient pas ?', a: 'Oui, nous offrons une garantie satisfait ou remboursé sous 14 jours. Contactez notre support pour toute demande.' },
    { q: 'Les produits sont-ils compatibles avec tous les appareils ?', a: 'Oui, nos produits sont au format PDF, DOCX, ZIP, MP4 et sont compatibles avec tous les appareils (PC, Mac, smartphone, tablette).' },
    { q: 'Puis-je obtenir une facture pour mon achat ?', a: 'Oui, une facture est générée automatiquement pour chaque achat. Vous pouvez la télécharger depuis votre espace client.' },
    { q: 'Comment contacter le support client ?', a: 'Vous pouvez nous contacter via le formulaire de contact, par email à contact@boutiquedigitaledz.dz, ou par téléphone au +213 (0) 555 12 34 56.' },
    { q: 'Les produits sont-ils mis à jour régulièrement ?', a: 'Oui, nous mettons régulièrement à jour nos produits pour garantir leur pertinence. Les mises à jour sont gratuites pour tous les acheteurs.' },
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max text-center">
                    <h1 className="section-title">FAQ</h1>
                    <p className="section-subtitle mx-auto">Questions fréquentes sur Boutique Digitale DZ</p>
                </div>
            </section>
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-3xl mx-auto flex flex-col gap-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="card overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                                >
                                    <span className="text-sm font-semibold text-text-dark pr-4">{faq.q}</span>
                                    <svg
                                        className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                                {openIndex === i && (
                                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                                        <p className="text-sm text-text-muted leading-relaxed">{faq.a}</p>
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
