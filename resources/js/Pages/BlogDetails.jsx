import { Link, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

export default function BlogDetails() {
    const { post } = usePage().props

    if (!post) {
        return (
            <AppLayout>
                <div className="container-max py-20 text-center">
                    <h1 className="text-2xl font-bold text-text-dark">Article introuvable</h1>
                    <Link href="/blog" className="btn-primary mt-4 inline-flex">Retour au blog</Link>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-8 pb-0">
                <div className="container-max">
                    <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
                        <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        <span className="text-text-dark font-medium truncate max-w-[300px]">{post.title}</span>
                    </nav>
                </div>
            </section>
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-3xl mx-auto">
                        <span className="badge-green">{post.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-text-dark mt-4 leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-3 mt-4 text-sm text-text-muted">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.author}</span>
                        </div>
                        <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden bg-gray-100 mt-8">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-primary-light via-primary-soft to-primary-light items-center justify-center hidden">
                                <div className="w-20 h-20 rounded-2xl bg-white/70 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="prose prose-sm max-w-none mt-8 text-text-muted leading-relaxed space-y-4">
                            <p>{post.excerpt}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
