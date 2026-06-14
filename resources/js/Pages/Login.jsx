import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <AppLayout>
            <Head title="Connexion" />
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="section-title">Connexion</h1>
                            <p className="section-subtitle">Connectez-vous à votre compte</p>
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-primary bg-primary-light px-4 py-3 rounded-lg">
                                {status}
                            </div>
                        )}

                        <div className="card p-6 md:p-8">
                            <form onSubmit={submit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="votre@email.com"
                                        className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                        autoComplete="username"
                                        autoFocus
                                    />
                                    {errors.email && <p className="text-xs text-accent-red mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1.5">Mot de passe</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Votre mot de passe"
                                        className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                        autoComplete="current-password"
                                    />
                                    {errors.password && <p className="text-xs text-accent-red mt-1">{errors.password}</p>}
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-border text-primary focus:ring-primary"
                                    />
                                    <label htmlFor="remember" className="text-sm text-text-muted">Se souvenir de moi</label>
                                </div>
                                <button type="submit" disabled={processing} className="btn-primary w-full justify-center py-3 mt-2">
                                    {processing ? 'Connexion...' : 'Se connecter'}
                                </button>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-sm text-primary font-medium text-center hover:underline">
                                        Mot de passe oublié ?
                                    </Link>
                                )}
                            </form>
                            <p className="text-sm text-text-muted text-center mt-4">
                                Pas encore de compte ? <Link href={route('register')} className="text-primary font-medium hover:underline">S'inscrire</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
