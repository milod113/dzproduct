import { useForm, usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

function statusClasses(status) {
    if (status === 'approved') {
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'
    }

    if (status === 'rejected') {
        return 'border-rose-200 bg-rose-50 text-rose-700'
    }

    return 'border-amber-200 bg-amber-50 text-amber-700'
}

function paymentStatusClasses(status) {
    if (status === 'approved') {
        return 'border-emerald-200 bg-emerald-50 text-emerald-700'
    }

    if (status === 'expired') {
        return 'border-slate-200 bg-slate-100 text-slate-700'
    }

    if (status === 'paid') {
        return 'border-sky-200 bg-sky-50 text-sky-700'
    }

    return 'border-amber-200 bg-amber-50 text-amber-700'
}

export default function SellerPlans() {
    const { currentPlan, plans = [], requests = [], hasPendingRequest = false } = usePage().props
    const form = useForm({
        requested_plan: currentPlan?.key === 'starter' ? 'pro' : 'elite',
        payment_method: 'BaridiMob',
        payment_reference: '',
        payment_proof: null,
        seller_note: '',
    })

    const submit = (event) => {
        event.preventDefault()
        form.post('/vendeur/plans')
    }

    return (
        <SellerLayout title="Plans vendeur">
            <section className="overflow-hidden rounded-[32px] border border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(11,122,53,0.22),_transparent_34%),linear-gradient(135deg,#08140d_0%,#10311e_40%,#eef7ef_100%)] p-7 text-white shadow-[0_28px_80px_rgba(8,20,13,0.28)] md:p-10">
                <div className="max-w-3xl">
                    <p className="text-xs uppercase tracking-[0.32em] text-white/70">Upgrade vendeur</p>
                    <h1 className="mt-4 text-3xl font-bold md:text-5xl">Passez de {currentPlan?.label || 'Starter'} a un plan qui vend mieux.</h1>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78 md:text-base">
                        Demandez votre upgrade, ajoutez votre reference de paiement et laissez l administration valider votre nouveau niveau.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                            Plan actuel: {currentPlan?.label || 'Starter'}
                        </span>
                        <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                            {currentPlan?.has_unlimited_products ? 'Produits illimites' : `Limite ${currentPlan?.product_limit || 3} produits`}
                        </span>
                        {currentPlan?.expires_at && (
                            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                                Expire le {currentPlan.expires_at}
                            </span>
                        )}
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-6">
                    <div className="grid gap-5 lg:grid-cols-3">
                        {plans.map((plan) => {
                            const isCurrent = plan.key === currentPlan?.key

                            return (
                                <article
                                    key={plan.key}
                                    className={`overflow-hidden rounded-[28px] border bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] ${isCurrent ? 'border-primary/40 ring-2 ring-primary/10' : 'border-border'}`}
                                >
                                    <div className={`bg-gradient-to-br ${plan.accent} p-5 text-white`}>
                                        <p className="text-xs uppercase tracking-[0.28em] text-white/70">{plan.price}</p>
                                        <h2 className="mt-3 text-2xl font-bold">{plan.label}</h2>
                                        <p className="mt-2 text-xs text-white/75">{plan.billing}</p>
                                        {isCurrent && (
                                            <span className="mt-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold">
                                                Plan actif
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-3 p-5">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-start gap-3 text-sm text-text-muted">
                                                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            )
                        })}
                    </div>

                    <div className="rounded-[28px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-8">
                        <div className="mb-6">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Demande d upgrade</p>
                            <h2 className="mt-2 text-2xl font-bold text-text-dark">Envoyer une demande de plan payant</h2>
                            <p className="mt-2 text-sm text-text-muted">
                                Une seule demande ouverte a la fois pour garder la gestion simple et rapide.
                            </p>
                        </div>

                        <form onSubmit={submit} className="grid gap-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-text-dark">Plan souhaite</label>
                                    <select
                                        value={form.data.requested_plan}
                                        onChange={(event) => form.setData('requested_plan', event.target.value)}
                                        disabled={hasPendingRequest}
                                        className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:bg-gray-100"
                                    >
                                        <option value="pro">Pro</option>
                                        <option value="elite">Elite</option>
                                    </select>
                                    {form.errors.requested_plan && <p className="mt-1.5 text-xs text-accent-red">{form.errors.requested_plan}</p>}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-text-dark">Methode de paiement</label>
                                    <select
                                        value={form.data.payment_method}
                                        onChange={(event) => form.setData('payment_method', event.target.value)}
                                        disabled={hasPendingRequest}
                                        className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:bg-gray-100"
                                    >
                                        <option value="BaridiMob">BaridiMob</option>
                                        <option value="CIB">CIB</option>
                                        <option value="Edahabia">Edahabia</option>
                                        <option value="Virement CCP">Virement CCP</option>
                                    </select>
                                    {form.errors.payment_method && <p className="mt-1.5 text-xs text-accent-red">{form.errors.payment_method}</p>}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-primary/10 bg-primary-light/40 p-4">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Montant a regler</p>
                                <p className="mt-2 text-lg font-bold text-text-dark">
                                    {(plans.find((plan) => plan.key === form.data.requested_plan)?.price) || 'Selectionnez un plan'}
                                </p>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-text-dark">Reference de paiement</label>
                                <input
                                    type="text"
                                    value={form.data.payment_reference}
                                    onChange={(event) => form.setData('payment_reference', event.target.value)}
                                    disabled={hasPendingRequest}
                                    placeholder="Ex: BRD-245819 ou capture transaction"
                                    className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:bg-gray-100"
                                />
                                {form.errors.payment_reference && <p className="mt-1.5 text-xs text-accent-red">{form.errors.payment_reference}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-text-dark">Preuve de paiement</label>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    disabled={hasPendingRequest}
                                    onChange={(event) => form.setData('payment_proof', event.target.files?.[0] || null)}
                                    className="w-full rounded-2xl border border-dashed border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white disabled:bg-gray-100"
                                />
                                {form.errors.payment_proof && <p className="mt-1.5 text-xs text-accent-red">{form.errors.payment_proof}</p>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-text-dark">Note pour l admin</label>
                                <textarea
                                    rows={4}
                                    value={form.data.seller_note}
                                    onChange={(event) => form.setData('seller_note', event.target.value)}
                                    disabled={hasPendingRequest}
                                    placeholder="Ex: paiement effectue ce matin, merci de verifier rapidement."
                                    className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:bg-gray-100"
                                />
                                {form.errors.seller_note && <p className="mt-1.5 text-xs text-accent-red">{form.errors.seller_note}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={form.processing || hasPendingRequest}
                                className="btn-primary justify-center py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {form.processing ? 'Envoi en cours...' : hasPendingRequest ? 'Une demande est deja en attente' : 'Envoyer la demande'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-[28px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Activation</p>
                        <h3 className="mt-2 text-xl font-bold text-text-dark">Comment cela fonctionne</h3>
                        <div className="mt-5 space-y-4">
                            {[
                                'Vous choisissez le plan Pro ou Elite.',
                                'Vous envoyez la reference et la preuve de paiement.',
                                'L administration verifie puis approuve ou refuse la demande.',
                                'En cas d approbation, votre plan change automatiquement.',
                            ].map((step, index) => (
                                <div key={step} className="flex gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">{index + 1}</div>
                                    <p className="pt-1 text-sm leading-6 text-text-muted">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Historique</p>
                                <h3 className="mt-2 text-xl font-bold text-text-dark">Vos demandes</h3>
                            </div>
                            <span className="rounded-full border border-primary/15 bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                                {requests.length} demande{requests.length > 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="mt-5 space-y-4">
                            {requests.length ? requests.map((request) => (
                                <article key={request.id} className="rounded-2xl border border-border bg-[#fbfcfb] p-4">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <p className="text-sm font-semibold text-text-dark">
                                            {request.current_plan_label} vers {request.requested_plan_label}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(request.status)}`}>
                                                {request.status_label}
                                            </span>
                                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${paymentStatusClasses(request.payment_status)}`}>
                                                {request.payment_status_label}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3 grid gap-3 text-sm text-text-muted">
                                        <p>Envoyee le {request.created_at}</p>
                                        <p>Montant: {request.plan_price_label}</p>
                                        <p>Methode: {request.payment_method}</p>
                                        {request.paid_at && <p>Paiement signale le {request.paid_at}</p>}
                                        {request.payment_reference && <p>Reference: {request.payment_reference}</p>}
                                        {request.expires_at && request.status !== 'approved' && <p>Expire le: {request.expires_at}</p>}
                                        {request.admin_note && <p>Note admin: {request.admin_note}</p>}
                                    </div>
                                </article>
                            )) : (
                                <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-text-muted">
                                    Aucune demande envoyee pour le moment.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </SellerLayout>
    )
}
