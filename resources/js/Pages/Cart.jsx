import { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

function TrustPill({ label }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/88 px-4 py-2 text-sm text-text-dark shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {label}
        </div>
    )
}

export default function Cart() {
    const { cartItems: initialItems = [], subtotal: initialSubtotal = 0 } = usePage().props
    const [cartItems, setCartItems] = useState(initialItems)
    const [discountCode, setDiscountCode] = useState('')
    const [discountAmount, setDiscountAmount] = useState(0)
    const [couponMessage, setCouponMessage] = useState('')
    const [couponValid, setCouponValid] = useState(false)
    const [couponLoading, setCouponLoading] = useState(false)

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0) || initialSubtotal
    const total = Math.max(subtotal - discountAmount, 0)

    const removeItem = (cartId) => {
        router.post(`/panier/supprimer/${cartId}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setCartItems((prev) => prev.filter((item) => item.cartId !== cartId))
                setDiscountAmount(0)
                setCouponValid(false)
                setCouponMessage('')
            },
        })
    }

    const applyDiscount = async () => {
        if (!discountCode.trim()) {
            setCouponValid(false)
            setCouponMessage('Entrez un code promo')
            return
        }

        setCouponLoading(true)

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
            const response = await fetch('/checkout/coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token || '',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ code: discountCode }),
            })

            const data = await response.json()

            if (data.valid) {
                setCouponValid(true)
                setDiscountAmount(Number(data.discount) || 0)
                setCouponMessage(data.message)
            } else {
                setCouponValid(false)
                setDiscountAmount(0)
                setCouponMessage(data.message || 'Code promo invalide')
            }
        } catch {
            setCouponValid(false)
            setCouponMessage('Impossible de verifier le code promo')
        } finally {
            setCouponLoading(false)
        }
    }

    return (
        <AppLayout>
            <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbf8_0%,#ffffff_62%,#f3f8f5_100%)] pb-10 pt-10">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
                </div>

                <div className="container-max relative">
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Panier premium</p>
                            <h1 className="mt-3 text-4xl font-bold leading-tight text-text-dark md:text-5xl">
                                Finalisez votre selection en toute confiance
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-text-muted md:text-base">
                                Retrouvez vos produits digitaux, appliquez vos codes promo et passez au paiement avec une experience plus nette, plus rapide et plus rassurante.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <TrustPill label={`${cartItems.length} produit${cartItems.length > 1 ? 's' : ''} dans votre panier`} />
                                <TrustPill label="Paiement securise" />
                                <TrustPill label="Livraison instantanee" />
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.1)] backdrop-blur">
                            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Resume rapide</p>
                            <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                                <div className="rounded-2xl bg-[#f8fbf8] p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Produits</p>
                                    <p className="mt-2 text-2xl font-bold text-text-dark">{cartItems.length}</p>
                                </div>
                                <div className="rounded-2xl bg-[#f8fbf8] p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Sous-total</p>
                                    <p className="mt-2 text-2xl font-bold text-text-dark">{subtotal.toLocaleString('fr-DZ')} DZD</p>
                                </div>
                                <div className="rounded-2xl bg-[#112b21] p-4 text-white">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/70">Total</p>
                                    <p className="mt-2 text-2xl font-bold">{total.toLocaleString('fr-DZ')} DZD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    {cartItems.length === 0 ? (
                        <div className="rounded-[34px] border border-border bg-white p-10 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-14">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#eef8f0_0%,#ffffff_52%,#e2f2e6_100%)] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                                <svg className="h-11 w-11 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>
                            <h2 className="mt-6 text-2xl font-bold text-text-dark">Votre panier est vide</h2>
                            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-muted">
                                Explorez la boutique pour ajouter vos ebooks, templates et formations preferees avant de passer au paiement.
                            </p>
                            <Link href="/boutique" className="btn-primary mt-6 inline-flex px-6 py-3 text-sm">
                                Decouvrir la boutique
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                            <div>
                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Selection</p>
                                        <h2 className="mt-2 text-2xl font-bold text-text-dark">Produits dans votre panier</h2>
                                    </div>
                                    <span className="rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
                                        {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="grid gap-4">
                                    {cartItems.map((item) => (
                                        <article key={item.cartId} className="overflow-hidden rounded-[30px] border border-border/80 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all hover:border-primary/20 hover:shadow-[0_24px_65px_rgba(15,23,42,0.12)] md:p-5">
                                            <div className="flex flex-col gap-5 md:flex-row md:items-center">
                                                <div className="h-28 w-full shrink-0 overflow-hidden rounded-[24px] bg-[#f5f7f6] md:h-28 md:w-32">
                                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                                            {item.category}
                                                        </span>
                                                        <span className={`text-xs font-semibold ${item.product_type === 'service' ? 'text-sky-700' : 'text-text-muted'}`}>
                                                            {item.product_type === 'service' ? 'Consulting / Service' : 'Produit digital'}
                                                        </span>
                                                    </div>

                                                    <h3 className="mt-3 text-lg font-bold text-text-dark">{item.name}</h3>
                                                    <p className="mt-2 text-sm leading-7 text-text-muted line-clamp-2">{item.description}</p>

                                                    <div className="mt-4 flex flex-wrap items-center gap-4">
                                                        <Link href={`/boutique/${item.slug}`} className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark">
                                                            Voir le produit
                                                        </Link>
                                                        <button
                                                            onClick={() => removeItem(item.cartId)}
                                                            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent-red"
                                                        >
                                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                            Retirer du panier
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="shrink-0 rounded-[24px] bg-[#112b21] px-5 py-4 text-left text-white shadow-[0_16px_35px_rgba(17,43,33,0.22)] md:min-w-[150px] md:text-right">
                                                    <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/75">Prix</p>
                                                    <p className="mt-2 text-2xl font-bold">{item.price.toLocaleString('fr-DZ')} DZD</p>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <Link href="/boutique" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Continuer mes achats
                                </Link>
                            </div>

                            <div>
                                <div className="sticky top-24 overflow-hidden rounded-[34px] border border-white/70 bg-white/92 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur md:p-8">
                                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.18em] text-primary">Resume commande</p>
                                            <h2 className="mt-2 text-2xl font-bold text-text-dark">Pret pour le paiement</h2>
                                        </div>
                                        <div className="rounded-2xl bg-primary-light/50 px-4 py-3 text-right">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Total</p>
                                            <p className="mt-1 text-xl font-bold text-primary-dark">{total.toLocaleString('fr-DZ')} DZD</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-[26px] bg-[#f8fbf8] p-5">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-text-muted">Sous-total</span>
                                            <span className="font-semibold text-text-dark">{subtotal.toLocaleString('fr-DZ')} DZD</span>
                                        </div>
                                        {discountAmount > 0 && (
                                            <div className="mt-3 flex items-center justify-between text-sm">
                                                <span className="font-medium text-primary">Reduction appliquee</span>
                                                <span className="font-semibold text-primary">-{discountAmount.toLocaleString('fr-DZ')} DZD</span>
                                            </div>
                                        )}
                                        <div className="mt-3 flex items-center justify-between text-sm">
                                            <span className="text-text-muted">Livraison digitale</span>
                                            <span className="font-semibold text-primary">Instantanee</span>
                                        </div>
                                        <div className="mt-4 border-t border-border pt-4 flex items-center justify-between">
                                            <span className="text-base font-bold text-text-dark">Montant final</span>
                                            <span className="text-2xl font-bold text-accent-red">{total.toLocaleString('fr-DZ')} DZD</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-sm font-semibold text-text-dark">Code promo</p>
                                        <div className="mt-3 flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Entrez votre code"
                                                value={discountCode}
                                                onChange={(event) => setDiscountCode(event.target.value)}
                                                className="flex-1 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                            <button
                                                onClick={applyDiscount}
                                                disabled={couponLoading}
                                                className="btn-outline px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {couponLoading ? '...' : 'Appliquer'}
                                            </button>
                                        </div>
                                        {couponMessage && (
                                            <p className={`mt-2 text-xs ${couponValid ? 'text-primary' : 'text-accent-red'}`}>
                                                {couponMessage}
                                            </p>
                                        )}
                                    </div>

                                    <Link
                                        href={`/checkout${discountCode.trim() ? `?coupon=${encodeURIComponent(discountCode.trim())}` : ''}`}
                                        className="btn-primary mt-7 w-full justify-center py-4 text-base shadow-[0_18px_40px_rgba(11,122,53,0.22)]"
                                    >
                                        Proceder au paiement
                                    </Link>

                                    <div className="mt-6 grid gap-3">
                                        <div className="flex items-center gap-3 rounded-2xl bg-[#f8fbf8] p-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-text-dark">Paiement 100% securise</p>
                                                <p className="mt-1 text-xs text-text-muted">Protection marketplace et validation rapide.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-2xl bg-[#f8fbf8] p-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-text-dark">Livraison digitale instantanee</p>
                                                <p className="mt-1 text-xs text-text-muted">Les produits digitaux donnent acces aux fichiers, les services sont traites comme prestations reservees.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    )
}
