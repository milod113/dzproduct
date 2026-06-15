import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AppLayout>
            <Head title="Connexion" />

            {/* Main Section with sophisticated gradient backgrounds */}
            <section className="relative min-h-screen py-16 md:py-24 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f7fbf8] to-[#eef8f0] z-0" />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 right-10 w-80 h-80 bg-primary/3 rounded-full blur-2xl" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md mx-auto">
                        {/* Header with subtle animation */}
                        <div className="text-center mb-8 md:mb-10 animate-fade-in-up">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-2xl mb-5 mx-auto shadow-sm">
                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-secondary-deep-green tracking-tight">Bienvenue</h1>
                            <p className="text-text-muted mt-2 text-base">Connectez-vous à votre espace personnel</p>
                        </div>

                        {/* Status message with refined styling */}
                        {status && (
                            <div className="mb-6 text-sm font-medium text-primary bg-primary-light/70 backdrop-blur-sm px-4 py-3 rounded-xl border border-primary/10 shadow-sm animate-fade-in">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{status}</span>
                                </div>
                            </div>
                        )}

                        {/* Modern Card with glass-morphism effect */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-primary/5 border border-white/40 p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
                            <form onSubmit={submit} className="flex flex-col gap-5">
                                {/* Email Field */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-text-dark mb-1.5 ml-1">
                                        Adresse email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="votre@email.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                            autoComplete="username"
                                            autoFocus
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-xs text-accent-red mt-1.5 ml-1 flex items-center gap-1">
                                            <span>⚠️</span> {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field with show/hide toggle */}
                                <div className="group">
                                    <label className="block text-sm font-semibold text-text-dark mb-1.5 ml-1">
                                        Mot de passe
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Votre mot de passe"
                                            className="w-full pl-10 pr-12 py-3 rounded-xl border border-border/60 bg-white/70 text-text-dark placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                                            autoComplete="current-password"
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
                                        <p className="text-xs text-accent-red mt-1.5 ml-1 flex items-center gap-1">
                                            <span>⚠️</span> {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="peer sr-only"
                                            />
                                            <div className="w-5 h-5 border-2 border-border rounded-md bg-white transition-all peer-checked:bg-primary peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/30"></div>
                                            <svg className="absolute left-1 top-1 w-3 h-3 text-white scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-text-muted group-hover:text-text-dark transition-colors">Se souvenir de moi</span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors hover:underline underline-offset-2"
                                        >
                                            Mot de passe oublié ?
                                        </Link>
                                    )}
                                </div>

                                {/* Submit Button with loading state */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-2 relative w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Connexion...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Se connecter</span>
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
                                    <span className="px-3 bg-white/80 text-text-muted backdrop-blur-sm">ou</span>
                                </div>
                            </div>

                            {/* Register Link */}
                            <p className="text-sm text-text-muted text-center">
                                Pas encore de compte ?{' '}
                                <Link
                                    href={route('register')}
                                    className="font-semibold text-primary hover:text-primary-dark transition-colors hover:underline underline-offset-2"
                                >
                                    Créer un compte
                                </Link>
                            </p>
                        </div>

                        {/* Decorative bottom element */}
                        <div className="mt-8 text-center">
                            <p className="text-xs text-text-muted/60">
                                Sécurisé par 🔒 • Connexion cryptée
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
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </AppLayout>
    );
}