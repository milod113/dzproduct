const features = [
    {
        id: 1,
        title: 'Qualité Premium',
        description: 'Des contenus soigneusement créés et vérifiés',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        ),
    },
    {
        id: 2,
        title: 'Prix Accessibles',
        description: 'Des produits de qualité adaptés à tous les budgets',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
        ),
    },
    {
        id: 3,
        title: 'Téléchargement Instantané',
        description: 'Accédez immédiatement à vos fichiers après paiement',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
    },
    {
        id: 4,
        title: 'Mises à Jour Gratuites',
        description: 'Bénéficiez des mises à jour sans frais supplémentaires',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
        ),
    },
    {
        id: 5,
        title: 'Support Client',
        description: 'Une équipe disponible pour vous accompagner',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        ),
    },
]

export default function FeaturesSection() {
    return (
        <section className="section-padding bg-primary-soft">
            <div className="container-max">
                <div className="bg-white rounded-2xl shadow-card border border-border p-6 md:p-8 lg:p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
                        {features.map((feat) => (
                            <div key={feat.id} className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
                                    {feat.icon}
                                </div>
                                <h3 className="text-sm font-semibold text-text-dark mb-1.5">{feat.title}</h3>
                                <p className="text-sm text-text-muted leading-relaxed max-w-[200px] lg:max-w-none">{feat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
