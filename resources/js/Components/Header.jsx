import { Link, router, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

const categoryLinks = [
    { href: '/categories/ebooks', label: 'Ebooks' },
    { href: '/categories/packs-educatifs', label: 'Packs educatifs' },
    { href: '/categories/templates-reseaux-sociaux', label: 'Templates' },
    { href: '/categories/documents-business', label: 'Business' },
    { href: '/categories/mini-cours', label: 'Mini-cours' },
]

const resourceLinks = [
    { href: '/faq', label: 'FAQ' },
    { href: '/remboursement', label: 'Politique de remboursement' },
    { href: '/protection-acheteur', label: 'Protection acheteur' },
    { href: '/conditions-vendeur', label: 'Conditions vendeur' },
    { href: '/copyright', label: 'Copyright' },
    { href: '/confidentialite', label: 'Confidentialite' },
]

function NavLink({ href, children }) {
    const { url } = usePage()
    const isActive = url === href

    return (
        <Link
            href={href}
            className={`relative px-1 py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-text-muted hover:text-text-dark'
            }`}
        >
            {children}
            <span className={`absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-primary transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        </Link>
    )
}

function Dropdown({ label, items }) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                className="inline-flex items-center gap-2 px-1 py-2 text-sm font-semibold text-text-muted transition-colors hover:text-text-dark"
            >
                {label}
                <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {open && (
                <div className="absolute left-0 top-full z-50 min-w-[260px] pt-3">
                    <div className="rounded-[26px] border border-white/80 bg-white/95 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                        <div className="grid gap-1">
                            {items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-2xl px-4 py-3 text-sm font-medium text-text-dark transition-colors hover:bg-primary-light hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function ActionButton({ href, children, ariaLabel, badge }) {
    return (
        <Link
            href={href}
            aria-label={ariaLabel}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/85 text-text-muted shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur transition-all hover:-translate-y-0.5 hover:text-primary"
        >
            {children}
            {badge > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-accent-red px-1 text-[10px] font-bold text-white shadow-sm">
                    {badge > 9 ? '9+' : badge}
                </span>
            )}
        </Link>
    )
}

function AccountMenu({ user, handleLogout }) {
    const [open, setOpen] = useState(false)

    const items = [
        { href: user.role === 'admin' ? '/admin' : '/tableau-de-bord', label: 'Mon compte' },
        ...(user.role === 'client' ? [{ href: '/mes-telechargements', label: 'Mes telechargements' }, { href: '/favoris', label: 'Mes favoris' }] : []),
        ...(user.is_seller ? [{ href: '/vendeur', label: 'Espace vendeur' }] : []),
        { href: '/profile', label: 'Profil' },
        { href: '/affiliation', label: 'Mon affiliation' },
    ]

    return (
        <div
            className="relative hidden sm:block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-3 py-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur transition-all hover:-translate-y-0.5"
            >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-sm font-bold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden text-left lg:block">
                    <span className="block text-xs uppercase tracking-[0.18em] text-text-muted">Compte</span>
                    <span className="block max-w-[120px] truncate text-sm font-semibold text-text-dark">{user.name}</span>
                </span>
                <svg className={`hidden h-4 w-4 text-text-muted transition-transform lg:block ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 min-w-[240px] pt-3">
                    <div className="rounded-[26px] border border-white/80 bg-white/95 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.14)] backdrop-blur-xl">
                        <div className="mb-2 rounded-2xl bg-[#f8fbf8] px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{user.role}</p>
                            <p className="mt-1 text-sm font-semibold text-text-dark">{user.email}</p>
                        </div>
                        <div className="grid gap-1">
                            {items.map((item) => (
                                <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-sm font-medium text-text-dark transition-colors hover:bg-primary-light hover:text-primary">
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-text-dark transition-colors hover:bg-primary-light hover:text-primary"
                            >
                                Deconnexion
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { auth, cart, wishlist } = usePage().props
    const user = auth?.user
    const cartCount = cart?.count ?? 0
    const wishlistCount = wishlist?.count ?? 0

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 12)
        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!mobileOpen) {
            return undefined
        }

        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = previous
        }
    }, [mobileOpen])

    const handleLogout = () => {
        router.post(route('logout'))
    }

    const closeMobile = () => setMobileOpen(false)

    return (
        <header className="sticky top-0 z-50">
            <div className="container-max pt-3">
                <div
                    className={`rounded-[28px] border transition-all duration-300 ${
                        isScrolled
                            ? 'border-white/80 bg-white/82 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl'
                            : 'border-transparent bg-white/70 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md'
                    }`}
                >
                    <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="group flex shrink-0 items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f2f23] text-white shadow-[0_14px_35px_rgba(17,43,33,0.22)] transition-transform group-hover:-translate-y-0.5">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Marketplace DZ</p>
                                    <p className="text-lg font-bold text-text-dark">Boutique Digitale</p>
                                </div>
                            </Link>

                            <nav className="hidden xl:flex items-center gap-7">
                                <NavLink href="/">Accueil</NavLink>
                                <NavLink href="/boutique">Boutique</NavLink>
                                <NavLink href="/espace-etudiant">Espace Etudiant</NavLink>
                                <Dropdown label="Categories" items={categoryLinks} />
                                <NavLink href="/blog">Blog</NavLink>
                                <NavLink href="/a-propos">A propos</NavLink>
                                <Dropdown label="Ressources" items={resourceLinks} />
                            </nav>
                        </div>

                        <div className="hidden lg:flex min-w-[280px] max-w-[340px] flex-1 items-center">
                            <Link
                                href="/boutique"
                                className="flex w-full items-center gap-3 rounded-2xl border border-white/80 bg-[#f8fbf8] px-4 py-3 text-sm text-text-muted transition-all hover:border-primary/20 hover:text-text-dark"
                            >
                                <svg className="h-4.5 w-4.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>Rechercher un ebook, pack ou template</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <ActionButton href="/boutique" ariaLabel="Recherche">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </ActionButton>

                            <ActionButton href="/favoris" ariaLabel="Favoris" badge={wishlistCount}>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </ActionButton>

                            <ActionButton href="/panier" ariaLabel="Panier" badge={cartCount}>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                </svg>
                            </ActionButton>

                            {user ? (
                                <AccountMenu user={user} handleLogout={handleLogout} />
                            ) : (
                                <div className="hidden sm:flex items-center gap-3">
                                    <Link href="/connexion" className="inline-flex items-center justify-center rounded-2xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-dark transition-all hover:border-primary/20 hover:text-primary">
                                        Connexion
                                    </Link>
                                    <Link href="/inscription" className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(11,122,53,0.22)] transition-all hover:bg-primary-dark">
                                        Devenir vendeur
                                    </Link>
                                </div>
                            )}

                            <button
                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/85 text-text-muted shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur transition-all hover:text-primary lg:hidden"
                                onClick={() => setMobileOpen((value) => !value)}
                                aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            >
                                {mobileOpen ? (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-[rgba(15,23,42,0.38)] backdrop-blur-sm lg:hidden" onClick={closeMobile}>
                    <div
                        className="absolute inset-x-4 top-24 rounded-[30px] border border-white/70 bg-white/95 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="rounded-2xl bg-[#f8fbf8] p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Navigation rapide</p>
                            <Link href="/boutique" onClick={closeMobile} className="mt-3 flex items-center gap-3 rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-text-muted">
                                <svg className="h-4.5 w-4.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Rechercher dans la boutique
                            </Link>
                        </div>

                        <div className="mt-5">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Explorer</p>
                            <div className="grid gap-2">
                                {[['/', 'Accueil'], ['/boutique', 'Boutique'], ['/espace-etudiant', 'Espace Etudiant'], ['/blog', 'Blog'], ['/a-propos', 'A propos'], ['/contact', 'Contact'], ['/favoris', 'Favoris']].map(([href, label]) => (
                                    <Link key={href} href={href} onClick={closeMobile} className="rounded-2xl px-4 py-3 text-sm font-semibold text-text-dark transition-colors hover:bg-primary-light hover:text-primary">
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Categories</p>
                            <div className="grid gap-2">
                                {categoryLinks.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={closeMobile} className="rounded-2xl px-4 py-3 text-sm font-semibold text-text-dark transition-colors hover:bg-primary-light hover:text-primary">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Ressources</p>
                            <div className="grid gap-2">
                                {resourceLinks.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={closeMobile} className="rounded-2xl px-4 py-3 text-sm font-semibold text-text-dark transition-colors hover:bg-primary-light hover:text-primary">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 border-t border-border pt-5">
                            {user ? (
                                <div className="grid gap-3">
                                    {user.is_seller && (
                                        <Link href="/vendeur" onClick={closeMobile} className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-text-dark transition-colors hover:border-primary/20 hover:text-primary">
                                            Espace vendeur
                                        </Link>
                                    )}
                                    <Link
                                        href={user.role === 'admin' ? '/admin' : '/tableau-de-bord'}
                                        onClick={closeMobile}
                                        className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_35px_rgba(11,122,53,0.22)]"
                                    >
                                        Mon compte
                                    </Link>
                                    <Link href="/affiliation" onClick={closeMobile} className="rounded-2xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-text-dark">
                                        Mon affiliation
                                    </Link>
                                    <Link href="/profile" onClick={closeMobile} className="rounded-2xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-text-dark">
                                        Profil
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout()
                                            closeMobile()
                                        }}
                                        className="rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-text-dark"
                                    >
                                        Deconnexion
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-3">
                                    <Link href="/connexion" onClick={closeMobile} className="rounded-2xl border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-text-dark">
                                        Connexion
                                    </Link>
                                    <Link href="/inscription" onClick={closeMobile} className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_35px_rgba(11,122,53,0.22)]">
                                        Devenir vendeur
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
