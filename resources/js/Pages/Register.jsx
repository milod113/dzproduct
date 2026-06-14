import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }

    return (
        <AppLayout>
            <Head title="Inscription" />
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="section-title">Inscription</h1>
                            <p className="section-subtitle">Créez votre compte gratuitement</p>
                        </div>

                        <div className="card p-6 md:p-8">
                            <form onSubmit={submit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1.5">Nom complet</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Votre nom"
                                        className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                        autoComplete="name"
                                        autoFocus
                                    />
                                    {errors.name && <p className="text-xs text-accent-red mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="votre@email.com"
                                        className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                        autoComplete="email"
                                    />
                                    {errors.email && <p className="text-xs text-accent-red mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1.5">Mot de passe</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Minimum 8 caractères"
                                        className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                        autoComplete="new-password"
                                    />
                                    {errors.password && <p className="text-xs text-accent-red mt-1">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1.5">Confirmer le mot de passe</label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Répétez le mot de passe"
                                        className="w-full px-4 py-3 rounded-lg border border-border text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <button type="submit" disabled={processing} className="btn-primary w-full justify-center py-3 mt-2">
                                    {processing ? 'Inscription...' : 'Créer mon compte'}
                                </button>
                            </form>
                            <p className="text-sm text-text-muted text-center mt-4">
                                Déjà un compte ? <Link href={route('login')} className="text-primary font-medium hover:underline">Se connecter</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
