import { useState } from 'react'
import AppLayout from '@/Layouts/AppLayout'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [sent, setSent] = useState(false)
    const update = (f) => (e) => setForm({ ...form, [f]: e.target.value })
    const submit = (e) => { e.preventDefault(); setSent(true) }

    const contactInfo = [
        {
            label: 'Email',
            value: 'contact@boutiquedigitaledz.dz',
            href: 'mailto:contact@boutiquedigitaledz.dz',
            icon: (
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ),
        },
        {
            label: 'Téléphone',
            value: '+213 (0) 555 12 34 56',
            href: 'tel:+213555123456',
            icon: (
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
            ),
        },
        {
            label: 'Localisation',
            value: 'Alger, Algérie 🇩🇿',
            icon: (
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            ),
        },
    ]

    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max text-center">
                    <h1 className="section-title">Contactez-nous</h1>
                    <p className="section-subtitle mx-auto">Une question ? Une suggestion ? Notre équipe est là pour vous répondre.</p>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <div className="card p-6 md:p-8">
                                <h2 className="text-lg font-bold text-text-dark mb-6">Envoyez-nous un message</h2>
                                {sent ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <p className="text-lg font-semibold text-text-dark">Message envoyé !</p>
                                        <p className="text-sm text-text-muted mt-1">Nous vous répondrons dans les plus brefs délais.</p>
                                        <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }} className="btn-primary mt-6">
                                            Envoyer un autre message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="flex flex-col gap-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-text-dark mb-1.5">Nom complet</label>
                                                <input type="text" placeholder="Votre nom" value={form.name} onChange={update('name')} required className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-text-dark mb-1.5">Email</label>
                                                <input type="email" placeholder="votre@email.com" value={form.email} onChange={update('email')} required className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-dark mb-1.5">Sujet</label>
                                            <input type="text" placeholder="Objet de votre message" value={form.subject} onChange={update('subject')} required className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-dark mb-1.5">Message</label>
                                            <textarea rows={5} placeholder="Votre message..." value={form.message} onChange={update('message')} required className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" />
                                        </div>
                                        <button type="submit" className="btn-primary w-full sm:w-auto py-3">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.75 12.75 3 15l2.25-6.75L12 3l6.75 5.25L21 15l-.75-2.25L18 12l-6-6-6 6z" />
                                            </svg>
                                            Envoyer le message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        <div className="w-full lg:w-80 xl:w-96">
                            <div className="card p-6 md:p-8 lg:sticky lg:top-24">
                                <h2 className="text-lg font-bold text-text-dark mb-6">Nos coordonnées</h2>
                                <div className="flex flex-col gap-6">
                                    {contactInfo.map((info) => (
                                        <div key={info.label} className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs text-text-muted mb-0.5">{info.label}</p>
                                                {info.href ? (
                                                    <a href={info.href} className="text-sm font-medium text-text-dark hover:text-primary transition-colors">{info.value}</a>
                                                ) : (
                                                    <p className="text-sm font-medium text-text-dark">{info.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-border mt-6 pt-6">
                                    <h3 className="text-sm font-semibold text-text-dark mb-4">Suivez-nous</h3>
                                    <div className="flex gap-3">
                                        {[
                                            { name: 'Facebook', icon: 'f' },
                                            { name: 'Instagram', icon: 'ig' },
                                            { name: 'LinkedIn', icon: 'in' },
                                            { name: 'YouTube', icon: 'yt' },
                                        ].map((social) => (
                                            <a key={social.name} href="#" className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors text-xs font-bold" aria-label={social.name}>
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
