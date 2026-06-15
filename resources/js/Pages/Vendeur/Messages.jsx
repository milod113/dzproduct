import SellerLayout from '@/Layouts/SellerLayout'
import { useForm, usePage } from '@inertiajs/react'
import { useState } from 'react'

function StatCard({ label, value, tone }) {
    const tones = {
        primary: 'bg-primary-light text-primary',
        soft: 'bg-slate-100 text-slate-700',
        warm: 'bg-amber-50 text-amber-700',
        success: 'bg-emerald-50 text-emerald-700',
    }

    return (
        <div className="card p-5">
            <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone] || tones.soft}`}>
                {label}
            </div>
            <p className="mt-4 text-3xl font-bold text-text-dark">{value}</p>
        </div>
    )
}

function ReplyComposer({ message }) {
    const [open, setOpen] = useState(!message.is_answered)
    const form = useForm({
        seller_reply: message.seller_reply || '',
    })

    const submit = (event) => {
        event.preventDefault()
        form.patch(`/vendeur/messages/${message.id}/reply`, {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        })
    }

    return (
        <div className="mt-4 rounded-[22px] border border-border bg-white p-4">
            {message.is_answered && !open ? (
                <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-emerald-700">Reponse envoyee</p>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                        >
                            Modifier la reponse
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-text-muted">{message.seller_replied_at}</p>
                    <div className="mt-3 rounded-2xl bg-[#f7faf7] p-4 text-sm leading-7 text-text-muted">
                        {message.seller_reply}
                    </div>
                </div>
            ) : (
                <form onSubmit={submit} className="grid gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-text-dark">
                            {message.is_answered ? 'Modifier votre reponse' : 'Repondre au client'}
                        </p>
                        {message.is_answered && (
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="text-sm font-medium text-text-muted transition-colors hover:text-text-dark"
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                    <textarea
                        rows={5}
                        value={form.data.seller_reply}
                        onChange={(event) => form.setData('seller_reply', event.target.value)}
                        placeholder="Bonjour, merci pour votre message. Voici ma reponse..."
                        className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                    />
                    {form.errors.seller_reply && <p className="text-xs text-accent-red">{form.errors.seller_reply}</p>}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="btn-primary px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {form.processing ? 'Envoi...' : message.is_answered ? 'Mettre a jour la reponse' : 'Envoyer la reponse'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default function SellerMessages() {
    const { messages = [], messageStats } = usePage().props

    return (
        <SellerLayout title="Messages clients">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total messages" value={messageStats?.total ?? 0} tone="primary" />
                <StatCard label="Aujourd'hui" value={messageStats?.today ?? 0} tone="warm" />
                <StatCard label="Avec telephone" value={messageStats?.withPhone ?? 0} tone="soft" />
                <StatCard label="Repondus" value={messageStats?.answered ?? 0} tone="success" />
            </div>

            <div className="card mt-6 p-6 md:p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-text-dark">Messages admin recus</h2>
                    <p className="mt-2 text-sm text-text-muted">
                        Echangez avec l administrateur a propos de la verification, du profil ou de vos produits.
                    </p>
                </div>

                {messages.length > 0 ? (
                    <div className="grid gap-4">
                        {messages.map((message) => (
                            <article key={message.id} className="rounded-[24px] border border-border bg-[#fbfcfb] p-5 shadow-sm">
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-lg font-semibold text-text-dark">{message.subject}</h3>
                                            {!message.is_read && (
                                                <span className="rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                                                    Nouveau
                                                </span>
                                            )}
                                            {message.is_answered && (
                                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                                    Repondu
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-2 text-sm text-text-muted">
                                            De <span className="font-medium text-text-dark">{message.sender_name}</span> · {message.sender_email}
                                        </p>
                                        {message.sender_phone && (
                                            <p className="mt-1 text-sm text-text-muted">Telephone: {message.sender_phone}</p>
                                        )}
                                        {message.product && (
                                            <p className="mt-1 text-sm text-text-muted">Produit concerne: {message.product.name}</p>
                                        )}
                                    </div>
                                    <p className="text-sm text-text-muted">{message.created_at}</p>
                                </div>

                                <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-7 text-text-muted">
                                    {message.message}
                                </div>

                                <ReplyComposer message={message} />
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[24px] border border-dashed border-border p-10 text-center">
                        <h3 className="text-lg font-semibold text-text-dark">Aucun message pour le moment</h3>
                        <p className="mt-2 text-sm text-text-muted">
                            Aucun message interne de l admin pour le moment.
                        </p>
                    </div>
                )}
            </div>
        </SellerLayout>
    )
}
