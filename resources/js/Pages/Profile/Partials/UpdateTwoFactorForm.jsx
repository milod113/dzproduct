import { useForm } from '@inertiajs/react'

export default function UpdateTwoFactorForm({ twoFactor }) {
    const { patch, processing } = useForm({})

    if (!twoFactor?.eligible) {
        return null
    }

    const submit = (enabled) => {
        patch(route('profile.two-factor.update'), {
            preserveScroll: true,
            data: { enabled },
        })
    }

    return (
        <section className="p-6 md:p-8">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#eff6ff_0%,#dbeafe_100%)] ring-1 ring-border/50">
                    <svg className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M12 3c-1.73 1.65-4.074 2.625-6.75 2.625 0 7.5 3.75 12 6.75 13.875 3-1.875 6.75-6.375 6.75-13.875C16.074 5.625 13.73 4.65 12 3z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Securite</p>
                    <h2 className="text-xl font-bold text-text-dark">Verification en deux etapes</h2>
                    <p className="mt-1 text-sm text-text-muted">Ajoutez une verification par code email a chaque connexion sensible.</p>
                </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-border/70 bg-[#fbfcfb] p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-text-dark">
                            {twoFactor.enabled ? '2FA activee' : '2FA desactivee'}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-text-muted">
                            Quand elle est activee, un code de verification est envoye a votre adresse email apres votre mot de passe.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            disabled={processing || !twoFactor.enabled}
                            onClick={() => submit(false)}
                            className="rounded-2xl border border-border px-5 py-3 text-sm font-semibold text-text-dark transition-colors hover:bg-gray-50 disabled:opacity-50"
                        >
                            Desactiver
                        </button>
                        <button
                            type="button"
                            disabled={processing || twoFactor.enabled}
                            onClick={() => submit(true)}
                            className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(2,132,199,0.22)] transition-all hover:bg-sky-700 disabled:opacity-50"
                        >
                            Activer
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
