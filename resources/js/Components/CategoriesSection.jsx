import { Link } from '@inertiajs/react'

const categoryIcons = {
    BookOpen: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
    ),
    GraduationCap: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
        </svg>
    ),
    Layout: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
    ),
    FileText: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    ),
    Briefcase: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m-9.75 0a48.114 48.114 0 00-4.838.388 2.18 2.18 0 00-1.837 2.175v3.783c0 1.082.768 2.015 1.837 2.175 1.003.133 2.015.246 3.038.324m15.75-6.478c.002.078.002.156.002.234 0 3.434-3.894 6.012-9 6.012s-9-2.578-9-6.012c0-.078.001-.156.002-.234M15.75 6.75H8.25" />
        </svg>
    ),
    Video: (
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9.75a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
    ),
}

export default function CategoriesSection({ categories = [] }) {
    return (
        <section className="section-padding">
            <div className="container-max">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <h2 className="section-title">Nos catégories populaires</h2>
                        <p className="section-subtitle">Des ressources digitales pour tous vos besoins</p>
                    </div>
                    <Link href="/categories" className="btn-outline shrink-0">
                        Voir toutes les catégories
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/categories/${cat.slug}`}
                            className="group card p-5 flex flex-col items-center text-center hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                                {categoryIcons[cat.icon]}
                            </div>
                            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-3">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full items-center justify-center bg-gradient-to-br from-primary-light to-primary-soft hidden">
                                    <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center">
                                        {categoryIcons[cat.icon]}
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-text-dark mb-1">{cat.name}</h3>
                            <p className="text-xs text-text-muted leading-relaxed mb-3 line-clamp-2">{cat.description}</p>
                            <span className="text-sm font-bold text-accent-red">{cat.price.toLocaleString('fr-DZ')} DZD</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
