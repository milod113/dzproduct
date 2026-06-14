import { Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

export default function NotFound() {
    return (
        <AppLayout>
            <section className="section-padding">
                <div className="container-max text-center">
                    <h1 className="text-8xl font-bold text-primary-light">404</h1>
                    <h2 className="text-2xl font-bold text-text-dark mt-4">Page introuvable</h2>
                    <p className="text-text-muted mt-2">La page que vous recherchez n'existe pas ou a été déplacée.</p>
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <Link href="/" className="btn-primary px-8 py-3.5">
                            Retour à l'accueil
                        </Link>
                        <Link href="/boutique" className="btn-secondary px-8 py-3.5">
                            Découvrir la boutique
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
