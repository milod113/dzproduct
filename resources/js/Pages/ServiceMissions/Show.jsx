import { useForm, usePage } from '@inertiajs/react'
import ClientLayout from '@/Layouts/ClientLayout'
import SellerLayout from '@/Layouts/SellerLayout'

export default function ServiceMissionShow() {
    const { mission, viewerRole } = usePage().props
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
                    <section className="rounded-[30px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                        <p className="text-xs uppercase tracking-[0.18em] text-primary">Mission</p>
                        <h1 className="mt-2 text-2xl font-bold text-text-dark">{mission.product_name}</h1>
                        <p className="mt-2 text-sm text-text-muted">{mission.mission_number}</p>
                        <div className="mt-4 inline-flex rounded-full border border-primary/15 bg-primary-light px-4 py-2 text-sm font-semibold text-primary">
                            {mission.status_label}
                        </div>
                    </section>

                    <section className="rounded-[30px] border border-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                        <h2 className="text-lg font-bold text-text-dark">Brief de mission</h2>
                        {viewerRole === 'client' ? (
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    briefForm.patch(`/mes-services/${mission.id}/brief`)
                                }}
                                className="mt-5 grid gap-4"
                            >
                                <input value={briefForm.data.brief_title} onChange={(e) => briefForm.setData('brief_title', e.target.value)} placeholder="Titre du besoin" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
                                <textarea value={briefForm.data.brief_objective} onChange={(e) => briefForm.setData('brief_objective', e.target.value)} rows={5} placeholder="Objectif du projet" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
                                <textarea value={briefForm.data.brief_requirements} onChange={(e) => briefForm.setData('brief_requirements', e.target.value)} rows={5} placeholder="Exigences et contraintes" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input value={briefForm.data.brief_deadline} onChange={(e) => briefForm.setData('brief_deadline', e.target.value)} placeholder="Delai souhaite" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
                                    <input value={briefForm.data.brief_reference_link} onChange={(e) => briefForm.setData('brief_reference_link', e.target.value)} placeholder="Lien Figma / GitHub / site" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
                                </div>
                                <textarea value={briefForm.data.brief_notes} onChange={(e) => briefForm.setData('brief_notes', e.target.value)} rows={4} placeholder="Notes complementaires" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
                                <button className="btn-primary justify-center py-3 text-sm" disabled={briefForm.processing}>
                                    {briefForm.processing ? 'Envoi...' : 'Envoyer le brief'}
                                </button>
                            </form>
                        ) : (
                            <div className="mt-5 space-y-4 text-sm text-text-muted">
                                <p><span className="font-semibold text-text-dark">Titre:</span> {mission.brief_title || 'Non renseigne'}</p>
                                <p><span className="font-semibold text-text-dark">Objectif:</span> {mission.brief_objective || 'Non renseigne'}</p>
                                <p><span className="font-semibold text-text-dark">Exigences:</span> {mission.brief_requirements || 'Non renseigne'}</p>
                                <p><span className="font-semibold text-text-dark">Delai:</span> {mission.brief_deadline || 'Non renseigne'}</p>
                                <p><span className="font-semibold text-text-dark">Lien:</span> {mission.brief_reference_link || 'Non renseigne'}</p>
                                <p><span className="font-semibold text-text-dark">Notes:</span> {mission.brief_notes || 'Non renseigne'}</p>
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
                                <select value={sellerStatusForm.data.status} onChange={(e) => sellerStatusForm.setData('status', e.target.value)} className="w-full rounded-2xl border border-border px-4 py-3 text-sm">
                                    <option value="in_review">Analyse en cours</option>
                                    <option value="in_progress">En production</option>
                                    <option value="delivered">Livre</option>
                                    <option value="revision_requested">Revision demandee</option>
                                    <option value="completed">Termine</option>
                                    <option value="cancelled">Annule</option>
                                </select>
                                <textarea value={sellerStatusForm.data.seller_delivery_message} onChange={(e) => sellerStatusForm.setData('seller_delivery_message', e.target.value)} rows={4} placeholder="Message de livraison ou note de progression" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
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
                                <select value={clientActionForm.data.action} onChange={(e) => clientActionForm.setData('action', e.target.value)} className="w-full rounded-2xl border border-border px-4 py-3 text-sm">
                                    <option value="complete">Valider la mission</option>
                                    <option value="revision">Demander une revision</option>
                                </select>
                                <textarea value={clientActionForm.data.message} onChange={(e) => clientActionForm.setData('message', e.target.value)} rows={4} placeholder="Ajoutez un commentaire si necessaire" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
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
                        <textarea value={messageForm.data.message} onChange={(e) => messageForm.setData('message', e.target.value)} rows={4} placeholder="Ajouter un message dans le suivi de mission" className="w-full rounded-2xl border border-border px-4 py-3 text-sm" />
                        <button className="btn-outline justify-center py-3 text-sm" disabled={messageForm.processing}>
                            {messageForm.processing ? 'Envoi...' : 'Envoyer le message'}
                        </button>
                    </form>
                </section>
            </div>
        </Layout>
    )
}
