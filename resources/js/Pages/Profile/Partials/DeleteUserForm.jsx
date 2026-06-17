import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className="p-6 md:p-8">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#fef2f2_0%,#fee2e2_100%)] ring-1 ring-rose-200/50">
                    <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">Danger</p>
                    <h2 className="text-xl font-bold text-text-dark">Supprimer le compte</h2>
                    <p className="mt-1 text-sm text-text-muted">
                        Une fois votre compte supprime, toutes ses donnees seront effacees definitivement.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <button
                    type="button"
                    onClick={confirmUserDeletion}
                    className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-white px-6 py-3 text-sm font-semibold text-rose-600 transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:shadow-[0_12px_28px_rgba(225,29,72,0.1)]"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Supprimer mon compte
                </button>
            </div>

            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative mx-4 w-full max-w-md rounded-[30px] border border-white/70 bg-white/95 p-8 shadow-[0_40px_100px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[20px] bg-rose-50">
                            <svg className="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>

                        <h3 className="text-center text-lg font-bold text-text-dark">Supprimer le compte</h3>
                        <p className="mt-3 text-center text-sm leading-7 text-text-muted">
                            Cette action est irreversible. Une fois votre compte supprime, toutes vos donnees
                            (produits, commandes, telechargements) seront definitivement effacees.
                        </p>

                        <form onSubmit={deleteUser} className="mt-6">
                            <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                                Entrez votre mot de passe pour confirmer
                            </label>
                            <input
                                id="password"
                                type="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoFocus
                                placeholder="Votre mot de passe"
                                className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-rose-400 focus:bg-white"
                            />
                            {errors.password && <p className="mt-2 text-sm text-rose-600">{errors.password}</p>}

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-2xl border border-border px-6 py-3 text-sm font-semibold text-text-dark transition-all hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(225,29,72,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(225,29,72,0.28)] disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    {processing ? (
                                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    )}
                                    Supprimer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
