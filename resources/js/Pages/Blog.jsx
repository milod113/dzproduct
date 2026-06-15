import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const blogCategories = ['Tout', 'Freelance', 'Éducation', 'Marketing', 'Carrière', 'E-commerce', 'Formation'];

export default function Blog() {
    const { blogPosts } = usePage().props;
    const [activeCategory, setActiveCategory] = useState('Tout');
    const featured = (blogPosts || [])[0];
    const filtered = activeCategory === 'Tout' 
        ? (blogPosts || []) 
        : (blogPosts || []).filter((p) => p.category === activeCategory);
    const displayPosts = filtered.filter((p) => p.id !== featured?.id);

    return (
        <AppLayout>
            {/* Hero Section with gradient and decorative elements */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-light/30 via-white to-white pt-20 pb-12">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute top-40 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary-light/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/10 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        Articles récents
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary-deep-green tracking-tight mb-4 animate-fade-in-up">
                        Blog & Actualités
                    </h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
                        Conseils, astuces et ressources pour booster votre quotidien digital en Algérie
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {blogCategories.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                    activeCategory === cat
                                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                                        : 'bg-gray-100/80 text-text-muted hover:bg-primary-light hover:text-primary hover:scale-105'
                                }`}
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Featured Article */}
                    {activeCategory === 'Tout' && featured && (
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="group block mb-12 rounded-3xl overflow-hidden bg-white shadow-xl shadow-primary/5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary-light via-emerald-100 to-primary-light/50 min-h-[280px]">
                                    <img
                                        src={featured.image}
                                        alt={featured.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            if (e.target.nextSibling) {
                                                e.target.nextSibling.style.display = 'flex';
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="hidden w-full h-full bg-gradient-to-br from-primary-light/80 via-primary-light/60 to-primary-light/40 items-center justify-center">
                                        <div className="w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                                        {featured.category}
                                    </span>
                                </div>
                                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                                        <span>{featured.date}</span>
                                        <span>•</span>
                                        <span>Par {featured.author}</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-dark leading-tight group-hover:text-primary transition-colors duration-200">
                                        {featured.title}
                                    </h2>
                                    <p className="text-text-muted mt-3 leading-relaxed line-clamp-3">
                                        {featured.excerpt}
                                    </p>
                                    <div className="mt-5 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
                                        <span>Lire l'article</span>
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Articles Grid */}
                    {displayPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-light/30 mb-4">
                                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <p className="text-text-muted text-lg">Aucun article dans cette catégorie pour le moment.</p>
                            <p className="text-text-muted text-sm mt-1">Revenez bientôt pour découvrir nos nouveaux contenus !</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayPosts.map((post, idx) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group block rounded-2xl overflow-hidden bg-white border border-border/40 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="relative overflow-hidden bg-gradient-to-br from-primary-light/30 via-emerald-100/30 to-primary-light/20 aspect-[16/9]">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                if (e.target.nextSibling) {
                                                    e.target.nextSibling.style.display = 'flex';
                                                }
                                            }}
                                        />
                                        <div className="hidden absolute inset-0 bg-gradient-to-br from-primary-light/70 via-primary-light/50 to-primary-light/30 items-center justify-center">
                                            <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-primary-dark text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.author}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-text-dark group-hover:text-primary transition-colors duration-200 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-text-muted mt-2 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                                            <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                                Lire plus
                                                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                </svg>
                                            </span>
                                            <span className="text-xs text-text-muted">5 min de lecture</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Newsletter Section */}
                    <div className="mt-20 bg-gradient-to-r from-primary-light/30 to-primary-light/10 rounded-3xl p-8 md:p-10 text-center">
                        <div className="max-w-2xl mx-auto">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white mb-4 shadow-md">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-text-dark mb-2">Ne manquez aucun article</h3>
                            <p className="text-text-muted mb-6">Recevez nos meilleurs conseils directement dans votre boîte mail</p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="flex-1 px-4 py-3 rounded-xl border border-border/60 bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                                <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                                    S'abonner
                                </button>
                            </div>
                            <p className="text-xs text-text-muted mt-4">Aucun spam, désinscription à tout moment.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
                    opacity: 0;
                }
                .animation-delay-200 {
                    animation-delay: 200ms;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </AppLayout>
    );
}