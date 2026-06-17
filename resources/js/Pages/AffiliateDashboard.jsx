import { Link, useForm } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'

function Surface({ children, className = '' }) {
    return (
        <section className={`overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-[0_24px_70px_rgba(15,23,42,0.09)] backdrop-blur ${className}`}>
            {children}
        </section>
    )
}

function StatCard({ label, value, hint, icon, tone = 'emerald' }) {
    const toneClass = {
        emerald: 'from-emerald-50 to-white text-emerald-700 border-emerald-100',
        sky: 'from-sky-50 to-white text-sky-700 border-sky-100',
        amber: 'from-amber-50 to-white text-amber-700 border-amber-100',
        slate: 'from-slate-50 to-white text-slate-700 border-slate-200',
    }[tone]

    return (
        <div className={`rounded-[26px] border bg-gradient-to-br p-5 shadow-[0_14px_35px_rgba(15,23,42,0.05)] ${toneClass}`}>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{label}</p>
                    <p className="mt-3 text-3xl font-bold text-text-dark">{value}</p>
                    {hint && <p className="mt-2 text-sm text-text-muted">{hint}</p>}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                </div>
            </div>
        </div>
    )
}

function HighlightPill({ children, tone = 'default' }) {
    const toneClass = {
        default: 'bg-white/12 text-white border-white/12',
        green: 'bg-emerald-400/12 text-emerald-100 border-emerald-300/20',
        sky: 'bg-sky-400/12 text-sky-100 border-sky-300/20',
        amber: 'bg-amber-300/12 text-amber-50 border-amber-200/20',
    }[tone]

    return (
        <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${toneClass}`}>
            {children}
        </div>
    )
}

const statusConfig = {
    pending: { label: 'En attente', classes: 'bg-amber-100 text-amber-700', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
    approved: { label: 'Approuve', classes: 'bg-blue-100 text-blue-700', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    paid: { label: 'Paye', classes: 'bg-emerald-100 text-emerald-700', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    rejected: { label: 'Refuse', classes: 'bg-rose-100 text-rose-700', icon: 'M6 18L18 6M6 6l12 12' },
}

function paymentLabel(method) {
    const labels = {
        ccp: 'CCP',
        baridimob: 'BaridiMob',
        bank_transfer: 'Virement bancaire',
    }
    return labels[method] || method
}

export default function AffiliateDashboard({
    commissions,
    stats,
    referralUrl,
    referralCode,
    withdrawalRequests = [],
    minimumWithdrawal = 1000,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
        payment_method: 'ccp',
        account_info: '',
        notes: '',
    })

    const copyLink = () => {
        navigator.clipboard.writeText(referralUrl)
    }

    const submitWithdrawal = (e) => {
        e.preventDefault()
        post(route('affiliate.withdrawals.store'), {
            preserveScroll: true,
            onSuccess: () => reset('amount', 'account_info', 'notes'),
        })
    }

    const balance = Number(stats.balance || 0)
    const totalEarned = Number(stats.total_earned || 0)
    const pendingAmount = Number(stats.pending || 0)
    const totalSales = stats.total_sales || 0

    const statsData = [
        {
            label: 'Solde disponible',
            value: `${balance.toLocaleString('fr-DZ')} DZD`,
            hint: 'pret a etre retire',
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'emerald',
        },
        {
            label: 'Total gagne',
            value: `${totalEarned.toLocaleString('fr-DZ')} DZD`,
            hint: 'depuis le debut',
            icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 3h.75M3 6v15m0 0h15M3 21h15M21 6v15m0 0h-1.5M21 6h1.5m-1.5 0V4.5M21 4.5V3m0 0h-1.5M21 3v1.5',
            tone: 'sky',
        },
        {
            label: 'En attente',
            value: `${pendingAmount.toLocaleString('fr-DZ')} DZD`,
            hint: 'commissions a valider',
            icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
            tone: 'amber',
        },
        {
            label: 'Ventes referees',
            value: totalSales,
            hint: 'achats via votre lien',
            icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
            tone: 'slate',
        },
    ]

    return (
        <ClientLayout title="Mon affiliation">
            <Surface className="mb-6">
                <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.15),_transparent_35%),linear-gradient(135deg,#0f172a_0%,#0f3a2b_48%,#0b7a35_100%)] px-6 py-8 text-white md:px-8 md:py-10">
                    <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
                    <div className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />

                    <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                        <div>
                            <HighlightPill tone="amber">Programme d'affiliation</HighlightPill>
                            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">Mon affiliation</h1>
                            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/78 md:text-base">
                                Partagez vos produits preferes et transformez vos commissions en vrai retrait.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Taux de commission</p>
                                <p className="mt-3 text-3xl font-bold">10%</p>
                                <p className="mt-2 text-sm text-white/70">sur chaque vente</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Seuil minimum</p>
                                <p className="mt-3 text-3xl font-bold">{minimumWithdrawal.toLocaleString('fr-DZ')} DZD</p>
                                <p className="mt-2 text-sm text-white/70">pour demander un retrait</p>
                            </div>
                            <div className="rounded-[26px] border border-white/12 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Verification</p>
                                <p className="mt-3 text-3xl font-bold">Admin</p>
                                <p className="mt-2 text-sm text-white/70">avant paiement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Surface>

            <Surface className="mb-6 p-6 md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Votre lien d'affiliation</p>
                        <p className="mt-1.5 break-all font-mono text-sm text-text-dark">{referralUrl}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={copyLink}
                            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(11,122,53,0.28)]"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                            Copier le lien
                        </button>
                        <div className="rounded-[18px] border border-border/70 bg-[#fbfcfb] px-4 py-3 text-center">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-text-muted">Code</p>
                            <p className="font-mono text-sm font-bold text-text-dark">{referralCode}</p>
                        </div>
                    </div>
                </div>
            </Surface>

            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <Surface className="p-6 md:p-8">
                    <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Revenus</p>
                        <h2 className="mt-2 text-2xl font-bold text-text-dark">Historique des commissions</h2>
                        <p className="mt-2 text-sm text-text-muted">Toutes les commissions generees par vos partages.</p>
                    </div>

                    {commissions.length === 0 ? (
                        <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-12 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
                                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                            <p className="text-base font-semibold text-text-dark">Aucune commission pour le moment</p>
                            <p className="mt-2 text-sm text-text-muted">
                                Partagez votre lien d'affiliation pour commencer a gagner.
                            </p>
                            <Link
                                href="/boutique"
                                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5"
                            >
                                Decouvrir les produits
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-4 pb-4 text-left font-semibold text-text-dark">Produit</th>
                                        <th className="px-4 pb-4 text-left font-semibold text-text-dark hidden sm:table-cell">Commande</th>
                                        <th className="px-4 pb-4 text-right font-semibold text-text-dark">Montant</th>
                                        <th className="px-4 pb-4 text-right font-semibold text-text-dark">Commission</th>
                                        <th className="px-4 pb-4 text-center font-semibold text-text-dark">Statut</th>
                                        <th className="px-4 pb-4 text-right font-semibold text-text-dark hidden lg:table-cell">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {commissions.map((c, index) => {
                                        const statusInfo = statusConfig[c.status] || statusConfig.pending
                                        return (
                                            <tr key={c.id} className="border-b border-border/70 last:border-0 transition-colors hover:bg-[#fbfcfb]">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">{index + 1}</span>
                                                        <span className="font-medium text-text-dark">{c.product_name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 font-mono text-xs text-text-muted hidden sm:table-cell">{c.order_number}</td>
                                                <td className="px-4 py-4 text-right font-medium text-text-dark">{Number(c.order_amount).toLocaleString('fr-DZ')} DZD</td>
                                                <td className="px-4 py-4 text-right font-semibold text-emerald-600">{Number(c.commission_amount).toLocaleString('fr-DZ')} DZD</td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${statusInfo.classes}`}>
                                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d={statusInfo.icon} />
                                                        </svg>
                                                        {statusInfo.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right text-xs text-text-muted hidden lg:table-cell">{c.created_at}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Surface>

                <div className="flex flex-col gap-6">
                    <Surface className="p-6 md:p-8">
                        <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Retrait</p>
                            <h2 className="mt-2 text-xl font-bold text-text-dark">Demander un retrait</h2>
                            <p className="mt-1 text-sm text-text-muted">Minimum {Number(minimumWithdrawal).toLocaleString('fr-DZ')} DZD</p>
                        </div>

                        <form onSubmit={submitWithdrawal} className="space-y-5">
                            <div className="rounded-[24px] border border-emerald-100 bg-[linear-gradient(135deg,#f0fdf4_0%,#ffffff_100%)] p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-700">Solde retirable</p>
                                <p className="mt-2 text-3xl font-bold text-emerald-700">{balance.toLocaleString('fr-DZ')} DZD</p>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Montant</label>
                                <input
                                    type="number"
                                    min={minimumWithdrawal}
                                    step="0.01"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-primary/40 focus:bg-white"
                                    placeholder="Ex: 2500"
                                />
                                {errors.amount && <p className="mt-1 text-sm text-rose-600">{errors.amount}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Mode de paiement</label>
                                <select
                                    value={data.payment_method}
                                    onChange={(e) => setData('payment_method', e.target.value)}
                                    className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors focus:border-primary/40 focus:bg-white"
                                >
                                    <option value="ccp">CCP</option>
                                    <option value="baridimob">BaridiMob</option>
                                    <option value="bank_transfer">Virement bancaire</option>
                                </select>
                                {errors.payment_method && <p className="mt-1 text-sm text-rose-600">{errors.payment_method}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Coordonnees de paiement</label>
                                <textarea
                                    rows="4"
                                    value={data.account_info}
                                    onChange={(e) => setData('account_info', e.target.value)}
                                    className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-primary/40 focus:bg-white"
                                    placeholder="Numero CCP, cle, titulaire du compte, ou details du virement"
                                />
                                {errors.account_info && <p className="mt-1 text-sm text-rose-600">{errors.account_info}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Note optionnelle</label>
                                <textarea
                                    rows="3"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full rounded-[20px] border border-border bg-[#fbfcfb] px-5 py-3.5 text-sm text-text-dark outline-none transition-colors placeholder:text-text-muted focus:border-primary/40 focus:bg-white"
                                    placeholder="Ajoutez une precision utile pour l'admin"
                                />
                                {errors.notes && <p className="mt-1 text-sm text-rose-600">{errors.notes}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing || balance < minimumWithdrawal}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(11,122,53,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(11,122,53,0.28)] disabled:opacity-50 disabled:hover:translate-y-0"
                            >
                                {processing ? (
                                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : (
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>
                                )}
                                Envoyer la demande
                            </button>

                            {balance < minimumWithdrawal && (
                                <p className="text-center text-xs text-amber-700">
                                    Votre solde doit atteindre au moins {Number(minimumWithdrawal).toLocaleString('fr-DZ')} DZD pour demander un retrait.
                                </p>
                            )}
                        </form>
                    </Surface>

                    <Surface className="p-6 md:p-8">
                        <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Historique</p>
                            <h2 className="mt-2 text-xl font-bold text-text-dark">Retraits</h2>
                        </div>

                        {withdrawalRequests.length === 0 ? (
                            <div className="rounded-[24px] border border-dashed border-border bg-[#fbfcfb] p-8 text-center">
                                <p className="text-sm font-semibold text-text-dark">Aucune demande de retrait</p>
                                <p className="mt-1 text-xs text-text-muted">Des que vous enverrez une demande, elle apparaitra ici.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {withdrawalRequests.map((request) => {
                                    const statusInfo = statusConfig[request.status] || statusConfig.pending
                                    return (
                                        <div key={request.id} className="rounded-[22px] border border-border/70 bg-[#fbfcfb] p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-text-dark">{Number(request.amount).toLocaleString('fr-DZ')} DZD</p>
                                                    <p className="mt-1 text-xs text-text-muted">{paymentLabel(request.payment_method)} &middot; {request.created_at}</p>
                                                </div>
                                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${statusInfo.classes}`}>
                                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={statusInfo.icon} />
                                                    </svg>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                            <p className="mt-3 whitespace-pre-line text-sm text-text-muted">{request.account_info}</p>
                                            {request.notes && <p className="mt-2 text-xs text-text-muted">Note: {request.notes}</p>}
                                            {request.admin_notes && <p className="mt-2 text-xs text-sky-700">Retour admin: {request.admin_notes}</p>}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </Surface>
                </div>
            </div>

            <Surface className="mt-6 p-6 md:p-8">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Guide</p>
                    <h3 className="mt-2 text-xl font-bold text-text-dark">Comment ca marche ?</h3>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="rounded-[24px] border border-border/70 bg-[#fbfcfb] p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">1</div>
                        <p className="mt-4 text-base font-bold text-text-dark">Partagez votre lien</p>
                        <p className="mt-2 text-sm leading-7 text-text-muted">Copiez votre lien unique et partagez-le sur WhatsApp, Facebook ou Telegram.</p>
                    </div>
                    <div className="rounded-[24px] border border-border/70 bg-[#fbfcfb] p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">2</div>
                        <p className="mt-4 text-base font-bold text-text-dark">Cumulez vos commissions</p>
                        <p className="mt-2 text-sm leading-7 text-text-muted">Une vente validee credite votre espace affiliation et alimente votre solde.</p>
                    </div>
                    <div className="rounded-[24px] border border-border/70 bg-[#fbfcfb] p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-lg font-bold text-primary">3</div>
                        <p className="mt-4 text-base font-bold text-text-dark">Demandez un retrait</p>
                        <p className="mt-2 text-sm leading-7 text-text-muted">L'admin verifie la demande, approuve puis marque le paiement comme effectue.</p>
                    </div>
                </div>
            </Surface>
        </ClientLayout>
    )
}
