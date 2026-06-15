import { useEffect, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

const wilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Bejaia', 'Biskra', 'Bechar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tebessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Setif', 'Saida', 'Skikda', 'Sidi Bel Abbes', 'Annaba', 'Guelma',
    'Constantine', 'Medea', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran',
    'El Bayadh', 'Illizi', 'Bordj Bou Arreridj', 'Boumerdes', 'El Tarf', 'Tindouf',
    'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Ain Defla',
    'Naama', 'Ain Temouchent', 'Ghardaia', 'Relizane',
]

const paymentMethods = [
    {
        id: 'cib',
        label: 'CIB / Edahabia',
        description: 'Paiement par carte bancaire CIB ou carte Edahabia',
    },
    {
        id: 'baridimob',
        label: 'BaridiMob',
        description: 'Paiement mobile via BaridiMob',
    },
    {
        id: 'bank',
        label: 'Virement bancaire',
        description: 'Transfert bancaire vers notre compte bancaire',
    },
]

export default function Checkout() {
    const { cartItems = [], subtotal = 0, prefill = {} } = usePage().props
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
    const initialCoupon = params.get('coupon') || ''

    const [form, setForm] = useState({
        fullName: prefill.fullName || '',
        email: prefill.email || '',
        phone: prefill.phone || '',
        wilaya: prefill.wilaya || '',
    })
    const [payment, setPayment] = useState('cib')
    const [couponCode, setCouponCode] = useState(initialCoupon)
    const [discount, setDiscount] = useState(0)
    const [couponMessage, setCouponMessage] = useState('')
    const [couponValid, setCouponValid] = useState(false)
    const [couponLoading, setCouponLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const total = Math.max(subtotal - discount, 0)

    const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

    const applyCoupon = async (codeToApply = couponCode) => {
        if (!codeToApply.trim()) {
            setCouponValid(false)
            setCouponMessage('')
            setDiscount(0)
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
                body: JSON.stringify({ code: codeToApply }),
            })

            const data = await response.json()

            if (data.valid) {
                setCouponValid(true)
                setCouponMessage(data.message)
                setDiscount(Number(data.discount) || 0)
            } else {
                setCouponValid(false)
                setCouponMessage(data.message || 'Code promo invalide')
                setDiscount(0)
            }
        } catch {
            setCouponValid(false)
            setCouponMessage('Impossible de verifier le code promo')
            setDiscount(0)
        } finally {
            setCouponLoading(false)
        }
    }

    useEffect(() => {
        if (initialCoupon) {
            applyCoupon(initialCoupon)
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)

        router.post('/checkout', {
            ...form,
            payment_method: payment,
            coupon_code: couponValid ? couponCode : '',
        }, {
            preserveScroll: true,
            onFinish: () => setLoading(false),
        })
    }

    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max">
                    <h1 className="section-title">Paiement</h1>
                    <p className="section-subtitle">Finalisez votre commande en toute securite</p>
                </div>
            </section>

            <section className="pb-16">
                <div className="container-max">
                    {cartItems.length === 0 ? (
                        <div className="card p-12 text-center">
                            <p className="mb-4 text-text-muted">Votre panier est vide</p>
                            <Link href="/boutique" className="btn-primary">Decouvrir la boutique</Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:flex-row">
                            <div className="flex-1">
                                <div className="card p-6 md:p-8">
                                    <h2 className="mb-6 text-lg font-bold text-text-dark">Informations personnelles</h2>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="sm:col-span-2">
                                            <label className="mb-1.5 block text-sm font-medium text-text-dark">Nom complet</label>
                                            <input
                                                type="text"
                                                placeholder="Votre nom et prenom"
                                                value={form.fullName}
                                                onChange={update('fullName')}
                                                required
                                                className="w-full rounded-lg border border-border px-4 py-3 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-text-dark">Email</label>
                                            <input
                                                type="email"
                                                placeholder="votre@email.com"
                                                value={form.email}
                                                onChange={update('email')}
                                                required
                                                className="w-full rounded-lg border border-border px-4 py-3 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-text-dark">Telephone</label>
                                            <input
                                                type="tel"
                                                placeholder="05XX XX XX XX"
                                                value={form.phone}
                                                onChange={update('phone')}
                                                required
                                                className="w-full rounded-lg border border-border px-4 py-3 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="mb-1.5 block text-sm font-medium text-text-dark">Wilaya</label>
                                            <select
                                                value={form.wilaya}
                                                onChange={update('wilaya')}
                                                required
                                                className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            >
                                                <option value="">Selectionnez votre wilaya</option>
                                                {wilayas.map((wilaya) => (
                                                    <option key={wilaya} value={wilaya}>{wilaya}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-6 p-6 md:p-8">
                                    <h2 className="mb-6 text-lg font-bold text-text-dark">Moyen de paiement</h2>
                                    <div className="flex flex-col gap-3">
                                        {paymentMethods.map((method) => (
                                            <label
                                                key={method.id}
                                                className={`cursor-pointer rounded-xl border-2 p-4 transition-colors ${
                                                    payment === method.id ? 'border-primary bg-primary-light/30' : 'border-border hover:border-gray-300'
                                                }`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        value={method.id}
                                                        checked={payment === method.id}
                                                        onChange={() => setPayment(method.id)}
                                                        className="mt-1 accent-primary"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-semibold text-text-dark">{method.label}</p>
                                                        <p className="mt-0.5 text-xs text-text-muted">{method.description}</p>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-primary-light/50 px-4 py-3">
                                    <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                    <span className="text-sm font-medium text-primary">Telechargement instantane apres confirmation du paiement</span>
                                </div>

                                <button type="submit" disabled={loading} className="btn-primary mt-6 w-full justify-center py-3.5 text-base">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    {loading ? 'Traitement en cours...' : `Confirmer le paiement - ${total.toLocaleString('fr-DZ')} DZD`}
                                </button>
                            </div>

                            <div className="w-full lg:w-80 xl:w-96">
                                <div className="card p-6 md:p-8 lg:sticky lg:top-24">
                                    <h2 className="mb-6 text-lg font-bold text-text-dark">Recapitulatif</h2>

                                    <div className="flex flex-col gap-4">
                                        {cartItems.map((item) => (
                                            <div key={item.cartId || item.id} className="flex items-center gap-3">
                                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-text-dark">{item.name}</p>
                                                    <p className="text-xs text-text-muted">{item.category}</p>
                                                </div>
                                                <span className="shrink-0 text-sm font-semibold text-text-dark">{item.price.toLocaleString('fr-DZ')} DZD</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Code promo"
                                                value={couponCode}
                                                onChange={(event) => setCouponCode(event.target.value)}
                                                className="flex-1 rounded-lg border border-border px-3 py-2.5 text-sm text-text-dark placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => applyCoupon()}
                                                disabled={couponLoading}
                                                className="btn-outline px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {couponLoading ? '...' : 'OK'}
                                            </button>
                                        </div>
                                        {couponMessage && (
                                            <p className={`mt-2 text-xs ${couponValid ? 'text-primary' : 'text-accent-red'}`}>
                                                {couponMessage}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-4 border-t border-border pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-text-muted">Sous-total</span>
                                            <span className="text-sm font-medium text-text-dark">{subtotal.toLocaleString('fr-DZ')} DZD</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-sm text-primary">Reduction</span>
                                                <span className="text-sm text-primary">-{discount.toLocaleString('fr-DZ')} DZD</span>
                                            </div>
                                        )}
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-sm text-text-muted">TVA</span>
                                            <span className="text-sm text-text-muted">Incluse</span>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                                            <span className="text-base font-bold text-text-dark">Total</span>
                                            <span className="text-xl font-bold text-accent-red">{total.toLocaleString('fr-DZ')} DZD</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-text-muted">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                        </svg>
                                        Paiement 100% securise
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </AppLayout>
    )
}
