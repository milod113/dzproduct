const testimonials = [
    {
        id: 1,
        name: 'Sarah B.',
        location: 'Étudiante, Oran',
        quote: 'Grâce à cette plateforme, j\'ai trouvé des ressources incroyables pour mes études. Le pack Bac Algérie m\'a vraiment aidée à réussir !',
        rating: 5,
    },
    {
        id: 2,
        name: 'Yacine M.',
        location: 'Entrepreneur, Alger',
        quote: 'Les templates Canva et le guide e-commerce ont transformé ma présence en ligne. Je recommande à tous les entrepreneurs algériens.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Imane K.',
        location: 'Freelance, Constantine',
        quote: 'Une plateforme 100% algérienne avec des produits de qualité. Le téléchargement est instantané et le support est réactif.',
        rating: 5,
    },
]

const avatarColors = ['bg-primary-light', 'bg-amber-50', 'bg-red-50']
const avatarLetters = ['SB', 'YM', 'IK']

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-accent-red' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )
}

export default function TestimonialsSection() {
    return (
        <section className="section-padding">
            <div className="container-max">
                <div className="text-center mb-12">
                    <h2 className="section-title">Ils nous font confiance</h2>
                    <div className="flex items-center justify-center gap-1 mt-3">
                        <svg className="w-4 h-4 text-accent-red" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="w-4 h-4 text-accent-red" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={t.id} className="card p-6 md:p-8 flex flex-col">
                            <div className="flex items-center gap-4 mb-5">
                                <div className={`w-12 h-12 rounded-full ${avatarColors[i]} flex items-center justify-center shrink-0`}>
                                    <span className="text-sm font-bold text-primary">{avatarLetters[i]}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-text-dark">{t.name}</p>
                                    <p className="text-xs text-text-muted">{t.location}</p>
                                </div>
                            </div>

                            <div className="flex-1">
                                <svg className="w-6 h-6 text-primary-light mb-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                                </svg>
                                <p className="text-sm text-text-muted leading-relaxed italic">"{t.quote}"</p>
                            </div>

                            <div className="mt-5 pt-4 border-t border-border">
                                <StarRating rating={t.rating} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
