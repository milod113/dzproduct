import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'

export default function MyDownloads() {
    const { downloads = [] } = usePage().props

    if (downloads.length === 0) {
        return (
            <ClientLayout title="Mes telechargements">
                <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                    <div className="container-max">
                        <h1 className="section-title">Mes téléchargements</h1>
                        <p className="section-subtitle">Accédez à tous vos produits achetés</p>
                    </div>
                </section>
                <section className="pb-16">
                    <div className="container-max">
                        <div className="card p-16 text-center">
                            <svg className="w-20 h-20 text-gray-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <p className="text-lg text-text-muted mb-2">Vous n'avez encore aucun téléchargement</p>
                            <p className="text-sm text-text-muted mb-6">Découvrez notre boutique et commencez à acheter des produits numériques premium.</p>
                            <Link href="/boutique" className="btn-primary">Découvrir la boutique</Link>
                        </div>
                    </div>
                </section>
            </ClientLayout>
        )
    }

    return (
        <ClientLayout title="Mes telechargements">
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max">
                    <h1 className="section-title">Mes téléchargements</h1>
                    <p className="section-subtitle">{downloads.length} produit{downloads.length > 1 ? 's' : ''} acheté{downloads.length > 1 ? 's' : ''}</p>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    <div className="flex flex-col gap-4">
                        {downloads.map((item) => (
                            <div key={item.id} className="card p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl shrink-0 overflow-hidden bg-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.classList.add('bg-gradient-to-br', 'from-primary-light', 'to-primary-soft', 'flex', 'items-center', 'justify-center');
                                            e.target.parentElement.innerHTML = '<div class="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/60 flex items-center justify-center"><svg class="w-4 h-4 md:w-5 md:h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg></div>';
                                        }}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="badge-green text-[10px]">{item.category}</span>
                                    <h3 className="text-sm font-semibold text-text-dark mt-1">{item.name}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                                        <span className="text-xs text-text-muted">Acheté le {item.purchaseDate}</span>
                                        {item.downloaded_at && (
                                            <span className="text-xs text-text-muted">Dernier téléchargement le {item.downloaded_at}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                                    <a href={`/telechargement/${item.id}`} className="btn-primary flex-1 sm:flex-none text-sm px-4 py-3 justify-center">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                        Télécharger
                                    </a>
                                    <button className="btn-outline flex-1 sm:flex-none text-sm px-4 py-3 justify-center">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Facture
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ClientLayout>
    )
}
