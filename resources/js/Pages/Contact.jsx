import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);
    const [focused, setFocused] = useState(null);

    const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });
    
    const submit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setTimeout(() => {
            setSent(true);
        }, 500);
    };

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
    ];

    const socialLinks = [
        { name: 'Facebook', icon: 'f', bgColor: '#1877F2' },
        { name: 'Instagram', icon: 'ig', bgColor: '#E4405F' },
        { name: 'LinkedIn', icon: 'in', bgColor: '#0A66C2' },
        { name: 'YouTube', icon: 'yt', bgColor: '#FF0000' },
    ];

    return (
        <AppLayout>
            {/* Hero Section with gradient and decorative elements */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-light/30 via-white to-white pt-20 pb-12">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute top-40 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-light/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/10 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        On est là pour vous
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary-deep-green tracking-tight mb-4 animate-fade-in-up">
                        Contactez-nous
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                        Une question ? Une suggestion ? Notre équipe est là pour vous répondre dans les meilleurs délais.
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Contact Form */}
                        <div className="flex-1">
                            <div className="bg-white rounded-3xl border border-border/40 shadow-xl shadow-primary/5 p-6 md:p-8 transition-all duration-300 hover:shadow-primary/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-text-dark">Envoyez-nous un message</h2>
                                </div>
                                
                                {sent ? (
                                    <div className="text-center py-12 animate-fade-in">
                                        <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-5 shadow-lg">
                                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <p className="text-xl font-bold text-text-dark">Message envoyé !</p>
                                        <p className="text-text-muted mt-2">Nous vous répondrons dans les plus brefs délais.</p>
                                        <button 
                                            onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} 
                                            className="btn-primary mt-8 inline-flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Envoyer un autre message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={submit} className="flex flex-col gap-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-text-dark mb-1.5 ml-1">Nom complet</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Votre nom"
                                                        value={form.name}
                                                        onChange={update('name')}
                                                        onFocus={() => setFocused('name')}
                                                        onBlur={() => setFocused(null)}
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                                    />
                                                </div>
                                            </div>
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-text-dark mb-1.5 ml-1">Email</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        placeholder="votre@email.com"
                                                        value={form.email}
                                                        onChange={update('email')}
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-text-dark mb-1.5 ml-1">Sujet</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Objet de votre message"
                                                    value={form.subject}
                                                    onChange={update('subject')}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-text-dark mb-1.5 ml-1">Message</label>
                                            <div className="relative">
                                                <div className="absolute top-3 left-0 pl-3 pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                    </svg>
                                                </div>
                                                <textarea
                                                    rows={5}
                                                    placeholder="Votre message..."
                                                    value={form.message}
                                                    onChange={update('message')}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                                                />
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn-primary w-full sm:w-auto py-3.5 inline-flex items-center justify-center gap-2 group">
                                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.75 12.75 3 15l2.25-6.75L12 3l6.75 5.25L21 15l-.75-2.25L18 12l-6-6-6 6z" />
                                            </svg>
                                            Envoyer le message
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="w-full lg:w-80 xl:w-96">
                            <div className="lg:sticky lg:top-24 space-y-6">
                                {/* Contact Cards */}
                                <div className="bg-white rounded-3xl border border-border/40 shadow-xl shadow-primary/5 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-bold text-text-dark">Nos coordonnées</h2>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        {contactInfo.map((info, idx) => (
                                            <div key={info.label} className="flex items-start gap-4 group">
                                                <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                                                    {info.icon}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-0.5">{info.label}</p>
                                                    {info.href ? (
                                                        <a href={info.href} className="text-sm font-medium text-text-dark hover:text-primary transition-colors block">
                                                            {info.value}
                                                        </a>
                                                    ) : (
                                                        <p className="text-sm font-medium text-text-dark">{info.value}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Business Hours */}
                                <div className="bg-gradient-to-br from-primary-light/20 to-white rounded-3xl border border-primary/10 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-text-dark">Horaires d'ouverture</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between py-1.5 border-b border-border/30">
                                            <span className="text-text-muted">Lundi - Vendredi</span>
                                            <span className="font-medium text-text-dark">9h00 - 18h00</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b border-border/30">
                                            <span className="text-text-muted">Samedi</span>
                                            <span className="font-medium text-text-dark">10h00 - 14h00</span>
                                        </div>
                                        <div className="flex justify-between py-1.5">
                                            <span className="text-text-muted">Dimanche</span>
                                            <span className="font-medium text-primary-dark">Fermé</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="bg-white rounded-3xl border border-border/40 shadow-md p-6 md:p-8">
                                    <h3 className="text-lg font-bold text-text-dark mb-5">Suivez-nous</h3>
                                    <div className="flex gap-3">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.name}
                                                href="#"
                                                className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center text-primary hover:text-white transition-all duration-200 text-xs font-bold hover:scale-110 hover:shadow-lg"
                                                style={{ hover: { backgroundColor: social.bgColor } }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = social.bgColor;
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '';
                                                    e.currentTarget.style.color = '';
                                                }}
                                                aria-label={social.name}
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Response Time Note */}
                                <div className="text-center p-4">
                                    <p className="text-xs text-text-muted flex items-center justify-center gap-1">
                                        <span>⏱️</span>
                                        Réponse sous 24h
                                    </p>
                                </div>
                            </div>
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
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
                    opacity: 0;
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
                .animation-delay-200 {
                    animation-delay: 200ms;
                }
            `}</style>
        </AppLayout>
    );
}