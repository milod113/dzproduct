import { useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import AdminLayout from '@/Layouts/AdminLayout'

function StatCard({ label, value, tone }) {
    const toneClass = {
        dark: 'bg-slate-900 text-white border-slate-900',
        warning: 'bg-amber-50 text-amber-700 border-amber-200',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        danger: 'bg-rose-50 text-rose-700 border-rose-200',
    }[tone]

    return (
        <div className={`rounded-2xl border p-5 shadow-sm ${toneClass}`}>
            <p className="text-xs uppercase tracking-[0.18em] opacity-80">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
    )
}

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

export default function SellerPlanRequests() {
    const { requests = [], stats } = usePage().props
    const [selectedRequest, setSelectedRequest] = useState(requests[0] || null)
    const approveForm = useForm({ admin_note: '' })
    const rejectForm = useForm({ admin_note: '' })

    const approve = (event) => {
        event.preventDefault()

        if (!selectedRequest) {
            return
        }

        approveForm.patch(`/admin/demandes-plans-vendeurs/${selectedRequest.id}/approve`)
    }

    const reject = (event) => {
        event.preventDefault()

        if (!selectedRequest) {
            return
        }

        rejectForm.patch(`/admin/demandes-plans-vendeurs/${selectedRequest.id}/reject`)
    }

    return (
        <AdminLayout title="Demandes de plans vendeurs">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Demandes" value={stats?.total ?? 0} tone="dark" />
                <StatCard label="En attente" value={stats?.pending ?? 0} tone="warning" />
                <StatCard label="Approuvees" value={stats?.approved ?? 0} tone="success" />
                <StatCard label="Refusees" value={stats?.rejected ?? 0} tone="danger" />
                <StatCard label="Expirees" value={stats?.expired ?? 0} tone="dark" />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
                <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-text-dark">Demandes recues</h2>
                        <p className="mt-1 text-sm text-text-muted">Selectionnez une demande pour l examiner et l activer si le paiement est valide.</p>
                    </div>

                    <div className="space-y-4">
                        {requests.length ? requests.map((request) => (
                            <button
                                key={request.id}
                                type="button"
                                onClick={() => setSelectedRequest(request)}
                                className={`w-full rounded-2xl border p-4 text-left transition-colors ${selectedRequest?.id === request.id ? 'border-primary bg-primary-light/40' : 'border-border bg-[#fbfcfb] hover:border-primary/30'}`}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-semibold text-text-dark">{request.seller?.name}</p>
                                        <p className="mt-1 text-xs text-text-muted">{request.seller?.email}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses(request.status)}`}>
                                            {request.status_label}
                                        </span>
                                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${paymentStatusClasses(request.payment_status)}`}>
                                            {request.payment_status_label}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-3 grid gap-2 text-sm text-text-muted sm:grid-cols-2">
                                    <p>{request.current_plan_label} vers {request.requested_plan_label}</p>
                                    <p>{request.plan_price_label}</p>
                                    <p>{request.seller?.wilaya || 'Wilaya non renseignee'}</p>
                                    <p>{request.created_at}</p>
                                </div>
                            </button>
                        )) : (
                            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-text-muted">
                                Aucune demande de plan pour le moment.
                            </div>
                        )}
                    </div>
                </section>

                <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    {selectedRequest ? (
                        <>
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-text-dark">{selectedRequest.seller?.name}</h2>
                                <p className="mt-1 text-sm text-text-muted">Analyse de la demande d upgrade vendeur.</p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-[#f8fbf8] p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Plan</p>
                                    <p className="mt-2 text-sm font-semibold text-text-dark">{selectedRequest.current_plan_label} vers {selectedRequest.requested_plan_label}</p>
                                </div>
                                <div className="rounded-2xl bg-[#f8fbf8] p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Paiement</p>
                                    <p className="mt-2 text-sm font-semibold text-text-dark">{selectedRequest.payment_method}</p>
                                    <p className="mt-1 text-xs text-text-muted">{selectedRequest.payment_status_label}</p>
                                </div>
                                <div className="rounded-2xl bg-[#f8fbf8] p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Montant</p>
                                    <p className="mt-2 text-sm font-semibold text-text-dark">{selectedRequest.plan_price_label}</p>
                                </div>
                                <div className="rounded-2xl bg-[#f8fbf8] p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Telephone</p>
                                    <p className="mt-2 text-sm font-semibold text-text-dark">{selectedRequest.seller?.phone || 'Non renseigne'}</p>
                                </div>
                                <div className="rounded-2xl bg-[#f8fbf8] p-4 sm:col-span-2">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Reference</p>
                                    <p className="mt-2 text-sm font-semibold text-text-dark">{selectedRequest.payment_reference || 'Non fournie'}</p>
                                </div>
                            </div>

                            {selectedRequest.seller_note && (
                                <div className="mt-5 rounded-2xl border border-border bg-[#fbfcfb] p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Note vendeur</p>
                                    <p className="mt-2 text-sm leading-7 text-text-muted">{selectedRequest.seller_note}</p>
                                </div>
                            )}

                            {selectedRequest.payment_proof_url && (
                                <a
                                    href={selectedRequest.payment_proof_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-5 inline-flex items-center rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-semibold text-primary"
                                >
                                    Ouvrir la preuve de paiement
                                </a>
                            )}

                            <div className="mt-5 rounded-2xl border border-border bg-[#fbfcfb] p-4 text-sm text-text-muted">
                                <p>Demande creee le {selectedRequest.created_at}</p>
                                {selectedRequest.paid_at && <p className="mt-1">Paiement signale le {selectedRequest.paid_at}</p>}
                                {selectedRequest.expires_at && <p className="mt-1">Expiration previsionnelle le {selectedRequest.expires_at}</p>}
                            </div>

                            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                                <form onSubmit={approve} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                                    <p className="text-sm font-bold text-emerald-800">Valider le paiement et activer le plan</p>
                                    <textarea
                                        rows={4}
                                        value={approveForm.data.admin_note}
                                        onChange={(event) => approveForm.setData('admin_note', event.target.value)}
                                        placeholder="Note interne optionnelle"
                                        disabled={selectedRequest.status !== 'pending' || selectedRequest.payment_status !== 'paid'}
                                        className="mt-3 w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-text-dark focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/15 disabled:bg-gray-100"
                                    />
                                    <button
                                        type="submit"
                                        disabled={approveForm.processing || selectedRequest.status !== 'pending' || selectedRequest.payment_status !== 'paid'}
                                        className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {approveForm.processing ? 'Activation...' : 'Approuver'}
                                    </button>
                                    {selectedRequest.payment_status !== 'paid' && (
                                        <p className="mt-2 text-xs text-emerald-800/80">
                                            L approbation est disponible une fois le paiement recu ou la reference ajoutee.
                                        </p>
                                    )}
                                </form>

                                <form onSubmit={reject} className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                                    <p className="text-sm font-bold text-rose-800">Refuser la demande</p>
                                    <textarea
                                        rows={4}
                                        value={rejectForm.data.admin_note}
                                        onChange={(event) => rejectForm.setData('admin_note', event.target.value)}
                                        placeholder="Expliquez pourquoi la demande est refusee"
                                        disabled={selectedRequest.status !== 'pending'}
                                        className="mt-3 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm text-text-dark focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/15 disabled:bg-gray-100"
                                    />
                                    {rejectForm.errors.admin_note && <p className="mt-1.5 text-xs text-accent-red">{rejectForm.errors.admin_note}</p>}
                                    <button
                                        type="submit"
                                        disabled={rejectForm.processing || selectedRequest.status !== 'pending'}
                                        className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {rejectForm.processing ? 'Traitement...' : 'Refuser'}
                                    </button>
                                </form>
                            </div>

                            {selectedRequest.status !== 'pending' && (
                                <div className="mt-5 rounded-2xl border border-border bg-[#fbfcfb] p-4">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Traitement</p>
                                    <p className="mt-2 text-sm font-semibold text-text-dark">{selectedRequest.status_label}</p>
                                    {selectedRequest.reviewer_name && <p className="mt-2 text-sm text-text-muted">Par {selectedRequest.reviewer_name}</p>}
                                    {selectedRequest.reviewed_at && <p className="mt-1 text-sm text-text-muted">Le {selectedRequest.reviewed_at}</p>}
                                    {selectedRequest.admin_note && <p className="mt-2 text-sm leading-7 text-text-muted">{selectedRequest.admin_note}</p>}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-text-muted">
                            Selectionnez une demande pour afficher ses details.
                        </div>
                    )}
                </section>
            </div>
        </AdminLayout>
    )
}
