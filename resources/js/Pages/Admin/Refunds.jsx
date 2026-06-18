import { Head, useForm } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

function StatCard({ label, value, accent = 'text-slate-900' }) {
    return (
        <div className="rounded-3xl border border-white/60 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className={`mt-3 text-2xl font-semibold ${accent}`}>{value}</p>
        </div>
    )
}

function statusClasses(status) {
    return {
        pending: 'border-amber-200 bg-amber-50 text-amber-700',
        approved: 'border-sky-200 bg-sky-50 text-sky-700',
        rejected: 'border-rose-200 bg-rose-50 text-rose-700',
        refunded: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    }[status] || 'border-slate-200 bg-slate-50 text-slate-700'
}

function statusLabel(status) {
    return {
        pending: 'En attente',
        approved: 'Approuve',
        rejected: 'Refuse',
        refunded: 'Rembourse',
    }[status] || status
}

function reasonLabel(reason) {
    return {
        technical_issue: 'Probleme technique',
        wrong_product: 'Mauvais produit',
        duplicate_order: 'Commande dupliquee',
        service_not_delivered: 'Service non livre',
        other: 'Autre',
    }[reason] || reason
}

function ActionButton({ refundId, status, label, tone }) {
    const { patch, processing } = useForm({})

    const styles = {
        blue: 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100',
        green: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
        red: 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
    }

    return (
        <button
            type="button"
            onClick={() => patch(route('admin.refunds.update', refundId), { preserveScroll: true, data: { status } })}
            disabled={processing}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${styles[tone]}`}
        >
            {processing ? '...' : label}
        </button>
    )
}

export default function Refunds({ refunds = [], stats }) {
    return (
        <AdminLayout>
            <Head title="Remboursements" />

            <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.10),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef6ff_42%,#ffffff_100%)]">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <section className="relative overflow-hidden rounded-[32px] border border-white/60 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)] sm:px-8">
                        <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />
                        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl" />
                        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-100">
                                    Service client
                                </span>
                                <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Gestion des remboursements</h1>
                                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                                    Centralisez les demandes clients, les validations admin et les remboursements effectivement traites.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">Demandes</p>
                                    <p className="mt-2 text-2xl font-semibold">{stats.total}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">En attente</p>
                                    <p className="mt-2 text-2xl font-semibold text-amber-300">{stats.pending}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">Montant demande</p>
                                    <p className="mt-2 text-2xl font-semibold text-sky-300">{Number(stats.requestedAmount || 0).toLocaleString('fr-DZ')} DZD</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">Montant rembourse</p>
                                    <p className="mt-2 text-2xl font-semibold text-emerald-300">{Number(stats.refundedAmount || 0).toLocaleString('fr-DZ')} DZD</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard label="En attente" value={stats.pending} accent="text-amber-600" />
                        <StatCard label="Approuves" value={stats.approved} accent="text-sky-600" />
                        <StatCard label="Refuses" value={stats.rejected} accent="text-rose-600" />
                        <StatCard label="Rembourses" value={stats.refunded} accent="text-emerald-600" />
                    </section>

                    <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
                        <div className="border-b border-slate-200/80 px-6 py-5">
                            <h2 className="text-lg font-semibold text-slate-900">Liste des demandes</h2>
                            <p className="mt-1 text-sm text-slate-500">Traitez les demandes de remboursement et gardez un historique clair.</p>
                        </div>

                        {refunds.length === 0 ? (
                            <div className="px-6 py-16 text-center text-sm text-slate-500">Aucune demande de remboursement pour le moment.</div>
                        ) : (
                            <div className="divide-y divide-slate-200/80">
                                {refunds.map((refund) => (
                                    <div key={refund.id} className="px-6 py-6">
                                        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                                            <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Commande</p>
                                                    <p className="mt-2 text-sm font-semibold text-slate-900">{refund.order_number}</p>
                                                    <p className="mt-1 text-xs text-slate-500">{refund.products.join(', ')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Client</p>
                                                    <p className="mt-2 text-sm font-semibold text-slate-900">{refund.customer.name}</p>
                                                    <p className="text-sm text-slate-500">{refund.customer.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Motif</p>
                                                    <p className="mt-2 text-sm font-semibold text-slate-900">{reasonLabel(refund.reason)}</p>
                                                    <p className="mt-1 text-xs text-slate-500">Demandee le {refund.created_at}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Montant</p>
                                                    <p className="mt-2 text-xl font-semibold text-emerald-600">{Number(refund.amount).toLocaleString('fr-DZ')} DZD</p>
                                                    <span className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(refund.status)}`}>
                                                        {statusLabel(refund.status)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="xl:max-w-sm">
                                                {refund.details && (
                                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Details client</p>
                                                        <p className="mt-2 whitespace-pre-line">{refund.details}</p>
                                                    </div>
                                                )}
                                                {refund.admin_notes && (
                                                    <div className="mt-3 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-800">
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-500">Note admin</p>
                                                        <p className="mt-2 whitespace-pre-line">{refund.admin_notes}</p>
                                                    </div>
                                                )}
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {refund.status === 'pending' && (
                                                        <>
                                                            <ActionButton refundId={refund.id} status="approved" label="Approuver" tone="blue" />
                                                            <ActionButton refundId={refund.id} status="rejected" label="Refuser" tone="red" />
                                                        </>
                                                    )}
                                                    {refund.status === 'approved' && (
                                                        <ActionButton refundId={refund.id} status="refunded" label="Marquer rembourse" tone="green" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </AdminLayout>
    )
}
