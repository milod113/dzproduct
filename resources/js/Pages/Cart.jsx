import { useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

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
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max">
                    <h1 className="section-title">Mon panier</h1>
                    <p className="section-subtitle">{cartItems.length} produit{cartItems.length > 1 ? 's' : ''} dans votre panier</p>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    {cartItems.length === 0 ? (
                        <div className="card p-12 text-center">
                            <svg className="mx-auto mb-4 h-20 w-20 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <p className="mb-4 text-text-muted">Votre panier est vide</p>
                            <Link href="/boutique" className="btn-primary">Decouvrir la boutique</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8 lg:flex-row">
                            <div className="flex-1">
                                <div className="flex flex-col gap-4">
                                    {cartItems.map((item) => (
                                        <div key={item.cartId} className="card flex items-center gap-4 p-4 md:gap-6 md:p-6">
                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 md:h-24 md:w-24">
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <span className="badge-green text-xs">{item.category}</span>
                                                <h3 className="mt-1 truncate text-sm font-semibold text-text-dark">{item.name}</h3>
                                                <p className="mt-0.5 text-xs text-text-muted">{item.description}</p>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p className="text-sm font-bold text-accent-red">{item.price.toLocaleString('fr-DZ')} DZD</p>
                                                <button
                                                    onClick={() => removeItem(item.cartId)}
                                                    className="ml-auto mt-2 flex items-center gap-1 py-1.5 text-xs text-text-muted transition-colors hover:text-accent-red"
                                                >
                                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/boutique" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                    Continuer mes achats
                                </Link>
                            </div>

                            <div className="w-full lg:w-80 xl:w-96">
                                <div className="card p-6 md:p-8 lg:sticky lg:top-24">
                                    <h2 className="mb-6 text-lg font-bold text-text-dark">Resume de la commande</h2>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-text-muted">Sous-total</span>
                                            <span className="font-medium text-text-dark">{subtotal.toLocaleString('fr-DZ')} DZD</span>
                                        </div>
                                        {discountAmount > 0 && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium text-primary">Reduction</span>
                                                <span className="font-medium text-primary">-{discountAmount.toLocaleString('fr-DZ')} DZD</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between border-t border-border pt-3">
                                            <span className="text-base font-bold text-text-dark">Total</span>
                                            <span className="text-xl font-bold text-accent-red">{total.toLocaleString('fr-DZ')} DZD</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Code promo"
                                                value={discountCode}
                                                onChange={(event) => setDiscountCode(event.target.value)}
                                                className="flex-1 rounded-lg border border-border px-3 py-3 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                            <button
                                                onClick={applyDiscount}
                                                disabled={couponLoading}
                                                className="btn-outline px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
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
                                        className="btn-primary mt-6 w-full justify-center py-3.5 text-base"
                                    >
                                        Proceder au paiement
                                    </Link>

                                    <div className="mt-4 flex items-center justify-center gap-2">
                                        <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                        </svg>
                                        <span className="text-xs text-text-muted">Paiement 100% securise</span>
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
