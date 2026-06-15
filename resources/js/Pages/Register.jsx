import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

const roleOptions = [
    {
        id: 'client',
        label: 'Compte client',
        description: 'Acheter, télécharger et gérer vos commandes facilement.',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        id: 'seller',
        label: 'Compte vendeur',
        description: 'Publier vos produits digitaux et vendre sur la marketplace.',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
    },
];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: 'client',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (event) => {
        event.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout>
            <Head title="Inscription" />

            <section className="relative min-h-screen py-20 md:py-28 overflow-hidden">
                {/* Premium gradient backgrounds with organic shapes */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f7fbf8] to-[#eef8f0]" />
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl" />
                    </div>
                    {/* Decorative leaf-like shapes */}
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-light/50 to-transparent rounded-full blur-2xl" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary-light/30 to-transparent rounded-full blur-2xl" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        {/* Header with premium badge */}
                        <div className="mb-10 text-center animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary-light/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/10 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                Inscription premium
                            </div>
                            <h1 className="mt-6 text-4xl font-bold text-secondary-deep-green tracking-tight sm:text-5xl">
                                Créez votre compte
                            </h1>
                            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted">
                                Rejoignez la marketplace comme acheteur ou comme vendeur, avec une expérience claire et adaptée à votre besoin.
                            </p>
                        </div>

                        {/* Modern Card with glass morphism */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-white/40 shadow-2xl shadow-primary/5 p-6 md:p-8 transition-all duration-300 hover:shadow-primary/10">
                            <form onSubmit={submit} className="flex flex-col gap-6">
                                {/* Role Selection with beautiful cards */}
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-text-dark ml-1">
                                        Je veux créer un
                                    </label>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {roleOptions.map((option) => {
                                            const active = data.role === option.id;
                                            return (
                                                <label
                                                    key={option.id}
                                                    className={`group cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 ${
                                                        active
                                                            ? 'border-primary bg-primary-light/40 shadow-lg shadow-primary/10'
                                                            : 'border-border/60 bg-white/50 hover:border-primary/30 hover:shadow-md'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        value={option.id}
                                                        checked={active}
                                                        onChange={(event) => setData('role', event.target.value)}
                                                        className="sr-only"
                                                    />
                                                    <div className="flex items-start gap-3">
                                                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                                            active ? 'bg-primary text-white' : 'bg-primary-light/50 text-primary group-hover:bg-primary/10'
                                                        }`}>
                                                            {option.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-text-dark">{option.label}</p>
                                                            <p className="mt-1 text-xs leading-5 text-text-muted">{option.description}</p>
                                                        </div>
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                            active ? 'border-primary bg-primary' : 'border-border bg-white'
                                                        }`}>
                                                            {active && (
                                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {errors.role && (
                                        <p className="mt-2 text-xs text-accent-red ml-1 flex items-center gap-1">
                                            <span>⚠️</span> {errors.role}
                                        </p>
                                    )}
                                </div>

                                {/* Name Field */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-text-dark ml-1">
                                        Nom complet
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(event) => setData('name', event.target.value)}
                                            placeholder="Jean Dupont"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                            autoComplete="name"
                                            autoFocus
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-accent-red ml-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-text-dark ml-1">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(event) => setData('email', event.target.value)}
                                            placeholder="jean@exemple.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                            autoComplete="email"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-accent-red ml-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password Fields Grid */}
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-text-dark ml-1">
                                            Mot de passe
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={data.password}
                                                onChange={(event) => setData('password', event.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-12 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-primary transition-colors"
                                            >
                                                {showPassword ? (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-xs text-accent-red ml-1">{errors.password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-semibold text-text-dark ml-1">
                                            Confirmer le mot de passe
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={data.password_confirmation}
                                                onChange={(event) => setData('password_confirmation', event.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-12 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-primary transition-colors"
                                            >
                                                {showConfirmPassword ? (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button with loading state */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-4 relative w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Inscription en cours...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Créer mon compte</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border/50"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-3 bg-white/80 text-text-muted backdrop-blur-sm">
                                        déjà membre ?
                                    </span>
                                </div>
                            </div>

                            {/* Login Link */}
                            <p className="text-center text-sm text-text-muted">
                                Déjà un compte ?{' '}
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-primary hover:text-primary-dark transition-colors hover:underline underline-offset-2"
                                >
                                    Se connecter
                                </Link>
                            </p>
                        </div>

                        {/* Security note */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-text-muted/60 flex items-center justify-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Vos données sont sécurisées
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
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </AppLayout>
    );
}