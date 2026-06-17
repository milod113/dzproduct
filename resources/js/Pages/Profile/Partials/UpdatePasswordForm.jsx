import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className="p-6 md:p-8">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#eff6ff_0%,#dbeafe_100%)] ring-1 ring-border/50">
                    <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Securite</p>
                    <h2 className="text-xl font-bold text-text-dark">Mot de passe</h2>
                    <p className="mt-1 text-sm text-text-muted">Utilisez un mot de passe long et aleatoire pour rester protege.</p>
                </div>
            </div>

            <form onSubmit={updatePassword} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="current_password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Mot de passe actuel</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        autoComplete="current-password"
                        className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-primary/40 focus:bg-white"
                        placeholder="Votre mot de passe actuel"
                    />
                    {errors.current_password && <p className="mt-2 text-sm text-rose-600">{errors.current_password}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Nouveau mot de passe</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-primary/40 focus:bg-white"
                        placeholder="Nouveau mot de passe"
                    />
                    {errors.password && <p className="mt-2 text-sm text-rose-600">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Confirmer le mot de passe</label>
                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-primary/40 focus:bg-white"
                        placeholder="Confirmer le nouveau mot de passe"
                    />
                    {errors.password_confirmation && <p className="mt-2 text-sm text-rose-600">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(11,122,53,0.28)] disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {processing ? (
                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        ) : (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        )}
                        Enregistrer
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Enregistre.
                        </span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
