import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

function CardChip() {
    return (
        <svg className="h-10 w-10" viewBox="0 0 40 30" fill="none">
            <rect x="1" y="1" width="38" height="28" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            <rect x="6" y="6" width="10" height="7" rx="1" fill="rgba(255,255,255,0.25)" />
            <rect x="6" y="16" width="10" height="7" rx="1" fill="rgba(255,255,255,0.25)" />
            <rect x="19" y="6" width="10" height="7" rx="1" fill="rgba(255,255,255,0.2)" />
            <rect x="19" y="16" width="10" height="7" rx="1" fill="rgba(255,255,255,0.2)" />
        </svg>
    )
}

function CreditCardPreview({ cardNumber, expiry, cvv, total, orderNumber }) {
    return (
        <div className="relative mx-auto -mb-20 w-full max-w-sm">
            <div className="relative z-10 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B7A35] via-[#0D8A3E] to-[#043D1A] p-6 shadow-[0_20px_60px_rgba(11,122,53,0.35)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(11,122,53,0.45)] hover:-translate-y-1">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute right-8 bottom-12 h-24 w-24 rounded-full bg-white/[0.03] blur-xl" />

                <div className="relative flex items-start justify-between">
                    <CardChip />
                    <div className="flex gap-1.5">
                        <div className="h-7 w-7 rounded-full bg-[rgba(255,180,50,0.9)]" />
                        <div className="h-7 w-7 -ml-3 rounded-full bg-[rgba(255,200,100,0.7)]" />
                    </div>
                </div>

                <div className="relative mt-6">
                    <p className="font-mono text-lg tracking-[0.25em] text-white/90 sm:text-xl">
                        {cardNumber}
                    </p>
                </div>

                <div className="relative mt-4 flex gap-8">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Expires</p>
                        <p className="mt-1 font-mono text-sm text-white/90">{expiry}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">CVV</p>
                        <p className="mt-1 font-mono text-sm text-white/90">{cvv}</p>
                    </div>
                </div>

                <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Montant</p>
                        <p className="mt-0.5 text-lg font-bold text-white">{total.toLocaleString('fr-DZ')} DZD</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Commande</p>
                        <p className="mt-0.5 font-mono text-xs text-white/70">{orderNumber}</p>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-2 left-4 right-4 -z-10 h-8 rounded-b-2xl bg-[#0B7A35]/30 blur-sm" />
            <div className="absolute -bottom-4 left-8 right-8 -z-20 h-6 rounded-b-2xl bg-[#0B7A35]/20 blur-sm" />
        </div>
    )
}

function PaymentMethodBadge({ icon, label, description, colorClass, bgClass }) {
    return (
        <div className="group flex items-center gap-3.5 rounded-xl border border-border/60 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-[0_8px_25px_rgba(11,122,53,0.08)]">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${bgClass} ${colorClass} group-hover:scale-105`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-semibold text-text-dark">{label}</p>
                <p className="text-xs text-text-muted">{description}</p>
            </div>
        </div>
    )
}

export default function PaymentSimulated() {
    const { order, transaction_id } = usePage().props
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleConfirm = (status) => {
        setLoading(true)
        setError(null)

        router.post('/paiement/simule/confirmer', {
            transaction_id,
            status,
        }, {
            preserveScroll: true,
            onError: (errors) => setError(Object.values(errors).join('. ')),
            onFinish: () => setLoading(false),
        })
    }

    const cardNumber = '6037 4512 3456 7890'
    const expiry = '12/28'
    const cvv = '123'

    return (
        <AppLayout>
            <div className="relative min-h-screen bg-[linear-gradient(180deg,#f0f7f2_0%,#ffffff_40%,#f5f9f6_100%)]">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-3xl" />
                    <div className="absolute -right-32 top-40 h-[400px] w-[400px] rounded-full bg-emerald-100/50 blur-3xl" />
                    <div className="absolute left-1/3 top-0 h-px w-32 bg-primary/10" />
                </div>

                <div className="relative pt-10 pb-6 sm:pt-14">
                    <div className="container-max text-center">
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-200/60 bg-amber-50/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 shadow-sm backdrop-blur">
                            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                            Mode simulation — Aucun paiement reel
                        </div>
                        <p className="mt-4 text-sm text-text-muted/80">
                            Paiement 100% securise via notre partenaire bancaire
                        </p>
                    </div>
                </div>

                <div className="relative pb-16">
                    <div className="container-max max-w-lg">
                        <CreditCardPreview
                            cardNumber={cardNumber}
                            expiry={expiry}
                            cvv={cvv}
                            total={order.total}
                            orderNumber={order.order_number}
                        />

                        <div className="mx-auto mt-24 max-w-md">
                            <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur">
                                <div className="border-b border-border/40 bg-gradient-to-r from-primary/[0.02] to-transparent px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-semibold text-text-dark">
                                            Informations de carte
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-md bg-gradient-to-r from-blue-500 to-blue-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                                                CIB
                                            </span>
                                            <span className="rounded-md bg-gradient-to-r from-emerald-500 to-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                                                Edahabia
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium text-text-muted">
                                                Numero de carte
                                            </label>
                                            <div className="group relative">
                                                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-focus-within:opacity-100" />
                                                <input
                                                    type="text"
                                                    value={cardNumber}
                                                    readOnly
                                                    className="font-mono relative w-full rounded-xl border border-border/70 bg-white px-4 py-3.5 text-sm tracking-[0.2em] text-text-dark shadow-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                                                    Date d'expiration
                                                </label>
                                                <input
                                                    type="text"
                                                    value={expiry}
                                                    readOnly
                                                    className="font-mono w-full rounded-xl border border-border/70 bg-white px-4 py-3.5 text-sm text-text-dark shadow-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-text-muted">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    value={cvv}
                                                    readOnly
                                                    className="font-mono w-full rounded-xl border border-border/70 bg-white px-4 py-3.5 text-sm text-text-dark shadow-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-xl bg-gradient-to-r from-primary/[0.04] to-emerald-50/50 px-4 py-3.5">
                                        <div className="flex items-start gap-3">
                                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                            </svg>
                                            <p className="text-xs leading-relaxed text-text-muted">
                                                <strong className="text-text-dark">Test :</strong> Cliquez sur
                                                &laquo;Paiement reussi&raquo; pour simuler un paiement valide,
                                                ou &laquo;Echec&raquo; pour simuler un refus.
                                            </p>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-red-50/80 px-4 py-3.5 text-sm text-accent-red shadow-sm">
                                            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                            </svg>
                                            {error}
                                        </div>
                                    )}

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleConfirm('success')}
                                            disabled={loading}
                                            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-[#0D8A3E] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(11,122,53,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(11,122,53,0.4)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.08)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_ease-in-out_infinite]" />
                                            <span className="relative flex items-center justify-center gap-2">
                                                {loading ? (
                                                    <>
                                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        Traitement...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                        Paiement reussi
                                                    </>
                                                )}
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleConfirm('failed')}
                                            disabled={loading}
                                            className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-100 bg-white px-4 py-3.5 text-sm font-semibold text-accent-red shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50/50 hover:shadow-[0_8px_25px_rgba(220,38,38,0.08)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Echec
                                        </button>
                                    </div>

                                    <a
                                        href="/paiement/annuler"
                                        className="mt-5 flex items-center justify-center gap-2 text-xs text-text-muted/70 transition-colors hover:text-text-muted"
                                    >
                                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                        Annuler et revenir au panier
                                    </a>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-border/40 bg-white/80 p-5 shadow-sm backdrop-blur">
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                                    Methodes de paiement
                                </h3>
                                <div className="flex flex-col gap-2.5">
                                    <PaymentMethodBadge
                                        icon="CIB"
                                        label="Carte CIB"
                                        description="Cartes interbancaires algeriennes"
                                        colorClass="text-blue-700"
                                        bgClass="bg-blue-100"
                                    />
                                    <PaymentMethodBadge
                                        icon="EDA"
                                        label="Edahabia"
                                        description="Carte Edahabia d'Algerie Poste"
                                        colorClass="text-emerald-700"
                                        bgClass="bg-emerald-100"
                                    />
                                    <PaymentMethodBadge
                                        icon="BM"
                                        label="BaridiMob"
                                        description="Paiement mobile Algerie Poste"
                                        colorClass="text-purple-700"
                                        bgClass="bg-purple-100"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-5 text-xs text-text-muted/60">
                                <span className="flex items-center gap-1.5">
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    Chiffre AES-256
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    3D Secure
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    PCI DSS
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
