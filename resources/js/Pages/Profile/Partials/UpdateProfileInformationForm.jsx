import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className="p-6 md:p-8">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#f0fdf4_0%,#dcfce7_100%)] ring-1 ring-border/50">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Identite</p>
                    <h2 className="text-xl font-bold text-text-dark">Informations personnelles</h2>
                    <p className="mt-1 text-sm text-text-muted">Mettez a jour votre nom et votre adresse email.</p>
                </div>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Nom complet</label>
                    <input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-primary/40 focus:bg-white"
                        placeholder="Votre nom"
                    />
                    {errors.name && <p className="mt-2 text-sm text-rose-600">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Adresse email</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-primary/40 focus:bg-white"
                        placeholder="email@exemple.com"
                    />
                    {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email}</p>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-[20px] border border-amber-200 bg-amber-50 px-5 py-4">
                        <p className="text-sm text-amber-800">
                            Votre adresse email n'est pas verifiee.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-1 font-semibold text-amber-700 underline hover:text-amber-900"
                            >
                                Renvoyer le lien de verification.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-emerald-600">
                                Un nouveau lien de verification a ete envoye a votre adresse email.
                            </p>
                        )}
                    </div>
                )}

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
