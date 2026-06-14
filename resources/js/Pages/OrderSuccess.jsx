import { Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

export default function OrderSuccess() {
    return (
        <AppLayout>
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-text-dark">Commande réussie !</h1>
                        <p className="text-text-muted mt-3">Merci pour votre achat. Votre téléchargement est prêt.</p>
                        <p className="text-sm text-text-muted mt-2">Vous pouvez accéder à vos produits depuis votre espace téléchargements.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                            <Link href="/mes-telechargements" className="btn-primary px-8 py-3.5">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                Mes téléchargements
                            </Link>
                            <Link href="/boutique" className="btn-secondary px-8 py-3.5">
                                Continuer mes achats
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
