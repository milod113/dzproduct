import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

const blogCategories = ['Tout', 'Freelance', 'Éducation', 'Marketing', 'Carrière', 'E-commerce', 'Formation']

export default function Blog() {
    const { blogPosts } = usePage().props
    const [activeCategory, setActiveCategory] = useState('Tout')
    const featured = (blogPosts || [])[0]
    const filtered = activeCategory === 'Tout' ? (blogPosts || []) : (blogPosts || []).filter((p) => p.category === activeCategory)
    const displayPosts = filtered.filter((p) => p.id !== featured?.id)

    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max text-center">
                    <h1 className="section-title">Blog</h1>
                    <p className="section-subtitle mx-auto">Conseils, astuces et ressources pour booster votre quotidien digital en Algérie</p>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {blogCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    activeCategory === cat
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-text-muted hover:bg-primary-light hover:text-primary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {activeCategory === 'Tout' && (
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="card overflow-hidden flex flex-col md:flex-row mb-10 hover:-translate-y-0.5 transition-transform"
                        >
                            <div className="md:w-1/2 aspect-[2/1] md:aspect-auto bg-gray-100 overflow-hidden">
                                <img
                                    src={featured.image}
                                    alt={featured.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full bg-gradient-to-br from-primary-light via-primary-soft to-primary-light items-center justify-center hidden">
                                    <div className="w-16 h-16 rounded-2xl bg-white/70 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                                <span className="badge-green mb-3 w-fit">{featured.category}</span>
                                <h2 className="text-xl md:text-2xl font-bold text-text-dark leading-tight">{featured.title}</h2>
                                <p className="text-sm text-text-muted mt-2 line-clamp-3">{featured.excerpt}</p>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className="text-xs text-text-muted">{featured.date}</span>
                                    <span className="text-xs text-text-muted">•</span>
                                    <span className="text-xs text-text-muted">{featured.author}</span>
                                </div>
                                <span className="text-sm text-primary font-medium mt-4 inline-flex items-center gap-1 group">
                                    Lire l'article
                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="card overflow-hidden group hover:-translate-y-0.5 transition-transform">
                                <div className="aspect-[16/9] bg-gray-100 overflow-hidden relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-full h-full bg-gradient-to-br from-primary-light/60 via-primary-soft to-primary-light/40 items-center justify-center hidden">
                                        <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="badge-green absolute top-3 left-3">{post.category}</span>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-sm font-semibold text-text-dark group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                    <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                                        <span className="text-xs text-text-muted">{post.date}</span>
                                        <span className="text-xs text-primary font-medium flex items-center gap-1">
                                            Lire plus
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
