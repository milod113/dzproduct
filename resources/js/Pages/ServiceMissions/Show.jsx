import { useForm, usePage } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'
import SellerLayout from '@/Layouts/SellerLayout'

const steps = [
    { key: 'reserved', label: 'Reservee' },
    { key: 'brief_submitted', label: 'Brief envoye' },
    { key: 'in_review', label: 'Analyse' },
    { key: 'in_progress', label: 'Production' },
    { key: 'delivered', label: 'Livraison' },
    { key: 'completed', label: 'Terminee' },
]

function getStepIndex(status) {
    const visibleStatus = status === 'revision_requested' ? 'in_progress' : status
    return Math.max(steps.findIndex((step) => step.key === visibleStatus), 0)
}

function briefField(label, value, accent = 'text-text-dark') {
    return (
        <div className="rounded-2xl border border-border bg-[#fbfcfb] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">{label}</p>
            <p className={`mt-2 text-sm leading-7 ${accent}`}>{value || 'Non renseigne'}</p>
        </div>
    )
}

export default function ServiceMissionShow() {
    const { mission, viewerRole } = usePage().props
    const currentStep = getStepIndex(mission?.status)
    const isClient = viewerRole === 'client'
    const isBriefSubmitted = mission?.status !== 'reserved'
    const briefForm = useForm({
        brief_title: mission?.brief_title || '',
        brief_objective: mission?.brief_objective || '',
        brief_requirements: mission?.brief_requirements || '',
        brief_deadline: mission?.brief_deadline || '',
        brief_reference_link: mission?.brief_reference_link || '',
        brief_notes: mission?.brief_notes || '',
    })
    const messageForm = useForm({ message: '' })
    const sellerStatusForm = useForm({
        status: mission?.status || 'reserved',
        seller_delivery_message: mission?.seller_delivery_message || '',
    })
    const clientActionForm = useForm({
        action: 'complete',
        message: '',
    })

    const Layout = viewerRole === 'seller' ? SellerLayout : ClientLayout

    return (
        <Layout title={`Mission ${mission.mission_number}`}>
            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-6">
                    <section className="overflow-hidden rounded-[32px] border border-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                        <div className="border-b border-white/60 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_35%),linear-gradient(135deg,#0f172a_0%,#123524_45%,#0b7a35_100%)] p-6 text-white md:p-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.22em] text-white/70">Mission service</p>
                                    <h1 className="mt-3 text-2xl font-bold md:text-3xl">{mission.product_name}</h1>
                                    <p className="mt-2 text-sm text-white/75">{mission.mission_number}</p>
                                </div>
                                <div className="inline-flex h-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                    {mission.status_label}
                                </div>
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">{isClient ? 'Vendeur' : 'Client'}</p>
                                    <p className="mt-2 text-sm font-semibold text-white">{isClient ? mission.seller_name : mission.client_name}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Budget</p>
                                    <p className="mt-2 text-sm font-semibold text-white">{mission.price?.toLocaleString('fr-DZ')} DZD</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/65">Creation</p>
                                    <p className="mt-2 text-sm font-semibold text-white">{mission.created_at || 'Non renseigne'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="flex flex-wrap gap-3">
                                {steps.map((step, index) => {
                                    const isActive = index <= currentStep

                                    return (
                                        <div key={step.key} className="flex items-center gap-3">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-colors ${isActive ? 'border-primary bg-primary text-white' : 'border-border bg-white text-text-muted'}`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-semibold ${isActive ? 'text-text-dark' : 'text-text-muted'}`}>{step.label}</p>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`hidden h-px w-8 sm:block ${index < currentStep ? 'bg-primary' : 'bg-border'}`} />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[30px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-text-dark">Brief de mission</h2>
                                <p className="mt-2 text-sm text-text-muted">
                                    {isClient
                                        ? 'Expliquez clairement le besoin pour aider le vendeur a cadrer la mission.'
                                        : 'Le brief client vous sert de base de production et de reference pendant la mission.'}
                                </p>
                            </div>
                            {isClient && (
                                <div className={`rounded-2xl px-4 py-3 text-xs font-semibold ${isBriefSubmitted ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                    {isBriefSubmitted ? 'Brief deja envoye, vous pouvez encore le mettre a jour.' : 'Brief en attente de remplissage'}
                                </div>
                            )}
                        </div>

                        {isClient ? (
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    briefForm.patch(`/mes-services/${mission.id}/brief`)
                                }}
                                className="mt-6 grid gap-4"
                            >
                                <div className="grid gap-2">
                                    <label className="text-sm font-semibold text-text-dark">Titre du besoin</label>
                                    <input value={briefForm.data.brief_title} onChange={(e) => briefForm.setData('brief_title', e.target.value)} placeholder="Ex: Refonte landing page SaaS" className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                                    {briefForm.errors.brief_title && <p className="text-xs text-accent-red">{briefForm.errors.brief_title}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-semibold text-text-dark">Objectif du projet</label>
                                    <textarea value={briefForm.data.brief_objective} onChange={(e) => briefForm.setData('brief_objective', e.target.value)} rows={5} placeholder="Decrivez le resultat final attendu et la valeur du service." className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                                    {briefForm.errors.brief_objective && <p className="text-xs text-accent-red">{briefForm.errors.brief_objective}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-semibold text-text-dark">Exigences et contraintes</label>
                                    <textarea value={briefForm.data.brief_requirements} onChange={(e) => briefForm.setData('brief_requirements', e.target.value)} rows={5} placeholder="Fonctionnalites, style souhaite, technologies, limites, livrables..." className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <label className="text-sm font-semibold text-text-dark">Delai souhaite</label>
                                        <input value={briefForm.data.brief_deadline} onChange={(e) => briefForm.setData('brief_deadline', e.target.value)} placeholder="Ex: 7 jours" className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm font-semibold text-text-dark">Lien de reference</label>
                                        <input value={briefForm.data.brief_reference_link} onChange={(e) => briefForm.setData('brief_reference_link', e.target.value)} placeholder="Lien Figma / GitHub / site" className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-semibold text-text-dark">Notes complementaires</label>
                                    <textarea value={briefForm.data.brief_notes} onChange={(e) => briefForm.setData('brief_notes', e.target.value)} rows={4} placeholder="Ajoutez ici tout contexte utile pour bien lancer la mission." className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                                </div>
                                <button className="btn-primary justify-center py-3 text-sm" disabled={briefForm.processing}>
                                    {briefForm.processing ? 'Envoi...' : isBriefSubmitted ? 'Mettre a jour le brief' : 'Envoyer le brief'}
                                </button>
                            </form>
                        ) : (
                            <div className="mt-6 grid gap-4">
                                {briefField('Titre', mission.brief_title)}
                                {briefField('Objectif', mission.brief_objective)}
                                {briefField('Exigences', mission.brief_requirements)}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {briefField('Delai', mission.brief_deadline)}
                                    {briefField('Lien', mission.brief_reference_link, mission.brief_reference_link ? 'text-primary' : 'text-text-dark')}
                                </div>
                                {briefField('Notes', mission.brief_notes)}
                            </div>
                        )}
                    </section>

                    {viewerRole === 'seller' ? (
                        <section className="rounded-[30px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                            <h2 className="text-lg font-bold text-text-dark">Pilotage mission</h2>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    sellerStatusForm.patch(`/vendeur/services/${mission.id}/status`)
                                }}
                                className="mt-5 grid gap-4"
                            >
                                <select value={sellerStatusForm.data.status} onChange={(e) => sellerStatusForm.setData('status', e.target.value)} className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary">
                                    <option value="in_review">Analyse en cours</option>
                                    <option value="in_progress">En production</option>
                                    <option value="delivered">Livre</option>
                                    <option value="revision_requested">Revision demandee</option>
                                    <option value="completed">Termine</option>
                                    <option value="cancelled">Annule</option>
                                </select>
                                <textarea value={sellerStatusForm.data.seller_delivery_message} onChange={(e) => sellerStatusForm.setData('seller_delivery_message', e.target.value)} rows={4} placeholder="Message de livraison ou note de progression" className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                                <button className="btn-primary justify-center py-3 text-sm" disabled={sellerStatusForm.processing}>
                                    {sellerStatusForm.processing ? 'Mise a jour...' : 'Mettre a jour le statut'}
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="rounded-[30px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                            <h2 className="text-lg font-bold text-text-dark">Validation client</h2>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    clientActionForm.patch(`/mes-services/${mission.id}/action`)
                                }}
                                className="mt-5 grid gap-4"
                            >
                                <select value={clientActionForm.data.action} onChange={(e) => clientActionForm.setData('action', e.target.value)} className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary">
                                    <option value="complete">Valider la mission</option>
                                    <option value="revision">Demander une revision</option>
                                </select>
                                <textarea value={clientActionForm.data.message} onChange={(e) => clientActionForm.setData('message', e.target.value)} rows={4} placeholder="Ajoutez un commentaire si necessaire" className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                                <button className="btn-primary justify-center py-3 text-sm" disabled={clientActionForm.processing}>
                                    {clientActionForm.processing ? 'Envoi...' : 'Confirmer'}
                                </button>
                            </form>
                        </section>
                    )}
                </div>

                <section className="rounded-[30px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                    <h2 className="text-lg font-bold text-text-dark">Echanges et suivi</h2>
                    <div className="mt-5 space-y-4">
                        {mission.messages.map((message) => (
                            <div key={message.id} className={`rounded-2xl p-4 ${message.message_type === 'system' ? 'border border-sky-100 bg-sky-50' : message.is_mine ? 'bg-primary text-white' : 'border border-border bg-[#fbfcfb]'}`}>
                                <div className="flex items-center justify-between gap-3">
                                    <p className={`text-sm font-semibold ${message.message_type === 'system' ? 'text-sky-700' : message.is_mine ? 'text-white' : 'text-text-dark'}`}>{message.sender_name}</p>
                                    <span className={`text-[11px] ${message.message_type === 'system' ? 'text-sky-600' : message.is_mine ? 'text-white/80' : 'text-text-muted'}`}>{message.created_at}</span>
                                </div>
                                <p className={`mt-2 text-sm leading-7 ${message.message_type === 'system' ? 'text-sky-700' : message.is_mine ? 'text-white' : 'text-text-muted'}`}>{message.message}</p>
                            </div>
                        ))}
                    </div>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            const base = viewerRole === 'seller' ? '/vendeur/services' : '/mes-services'
                            messageForm.post(`${base}/${mission.id}/messages`, { preserveScroll: true, onSuccess: () => messageForm.reset() })
                        }}
                        className="mt-6 grid gap-4"
                    >
                        <textarea value={messageForm.data.message} onChange={(e) => messageForm.setData('message', e.target.value)} rows={4} placeholder="Ajouter un message dans le suivi de mission" className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition-colors focus:border-primary" />
                        <button className="btn-outline justify-center py-3 text-sm" disabled={messageForm.processing}>
                            {messageForm.processing ? 'Envoi...' : 'Envoyer le message'}
                        </button>
                    </form>
                </section>
            </div>
        </Layout>
    )
}
