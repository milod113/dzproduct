import { Head, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

export default function TwoFactorChallenge({ email, status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
    })

    const resendForm = useForm({})

    const submit = (e) => {
        e.preventDefault()
        post(route('two-factor.store'), {
            onFinish: () => reset('code'),
        })
    }

    const resend = () => {
        resendForm.post(route('two-factor.resend'))
    }

    return (
        <AppLayout>
            <Head title="Verification 2FA" />
            <section className="relative min-h-screen overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f7fbf8] to-[#eef8f0]" />
                <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-sky-400/5 blur-3xl" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-md">
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light shadow-sm">
                                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0119.5 12.75v6A2.25 2.25 0 0117.25 21h-10.5A2.25 2.25 0 014.5 18.75v-6A2.25 2.25 0 016.75 10.5z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-secondary-deep-green">Verification en deux etapes</h1>
                            <p className="mt-3 text-sm leading-7 text-text-muted">
                                Un code de securite a ete envoye a <span className="font-semibold text-text-dark">{email}</span>.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                {status}
                            </div>
                        )}

                        <div className="rounded-2xl border border-white/40 bg-white/90 p-6 shadow-xl shadow-primary/5 backdrop-blur-sm md:p-8">
                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-text-dark">Code de verification</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="Entrez les 6 chiffres"
                                        className="w-full rounded-xl border border-border/60 bg-white/70 px-4 py-3 text-center text-2xl font-bold tracking-[0.35em] text-text-dark outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
                                        autoFocus
                                    />
                                    {errors.code && <p className="mt-2 text-xs text-rose-600">{errors.code}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark disabled:opacity-60"
                                >
                                    {processing ? 'Verification...' : 'Verifier et continuer'}
                                </button>
                            </form>

                            <div className="mt-6 border-t border-border/60 pt-5 text-center">
                                <p className="text-sm text-text-muted">Vous n avez pas recu le code ?</p>
                                <button
                                    type="button"
                                    onClick={resend}
                                    disabled={resendForm.processing}
                                    className="mt-3 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                                >
                                    {resendForm.processing ? 'Renvoi...' : 'Renvoyer un nouveau code'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
