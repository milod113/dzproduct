import { Link, useForm, usePage } from '@inertiajs/react'
import SellerLayout from '@/Layouts/SellerLayout'

const wilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Bejaia', 'Biskra', 'Bechar',
    'Blida', 'Bouira', 'Tamanrasset', 'Tebessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
    'Djelfa', 'Jijel', 'Setif', 'Saida', 'Skikda', 'Sidi Bel Abbes', 'Annaba', 'Guelma',
    'Constantine', 'Medea', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla', 'Oran',
    'El Bayadh', 'Illizi', 'Bordj Bou Arreridj', 'Boumerdes', 'El Tarf', 'Tindouf',
    'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Ain Defla',
    'Naama', 'Ain Temouchent', 'Ghardaia', 'Relizane',
]

function Field({ label, error, children }) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-text-dark">{label}</label>
            {children}
            {error && <p className="mt-1.5 text-xs text-accent-red">{error}</p>}
        </div>
    )
}

export default function SellerProfileEdit() {
    const { seller } = usePage().props
    const form = useForm({
        name: seller?.name || '',
        email: seller?.email || '',
        phone: seller?.phone || '',
        wilaya: seller?.wilaya || '',
        bio: seller?.bio || '',
        whatsapp_cta_text: seller?.whatsapp_cta_text || '',
        is_available_for_freelance: seller?.is_available_for_freelance || false,
    })

    const submit = (event) => {
        event.preventDefault()
        form.patch('/vendeur/profil')
    }

    return (
        <SellerLayout title="Mon profil vendeur">
            <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
                <section className="rounded-[30px] border border-primary/10 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-xl font-bold text-primary">
                                {(form.data.name || 'S').split(' ').map((part) => part[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.22em] text-primary">Espace vendeur</p>
                                <h2 className="mt-2 text-2xl font-bold text-text-dark">{form.data.name || 'Nom vendeur'}</h2>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {seller?.badges?.length ? seller.badges.map((badge) => (
                                        <span key={badge} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                            {badge}
                                        </span>
                                    )) : (
                                        <span className="rounded-full border border-border bg-gray-50 px-3 py-1 text-xs font-semibold text-text-muted">
                                            Nouveau vendeur
                                        </span>
                                    )}
                                    <span className="rounded-full border border-primary/20 bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                                        Plan {seller?.seller_plan_label || 'Starter'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link href={seller?.public_url || '/boutique'} className="btn-outline px-5 py-3 text-sm">
                            Voir le profil public
                        </Link>
                    </div>

                    <div className="mt-6 rounded-[24px] bg-[linear-gradient(135deg,#eef8f0_0%,#ffffff_50%,#e7f4ea_100%)] p-5">
                        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Apercu vendeur</p>
                        <p className="mt-3 text-sm leading-7 text-text-muted">
                            {form.data.bio || 'Ajoutez une bio claire et rassurante pour inspirer confiance aux acheteurs et mieux presenter votre expertise.'}
                        </p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Wilaya</p>
                                <p className="mt-2 text-sm font-semibold text-text-dark">{form.data.wilaya || 'Non renseignee'}</p>
                            </div>
                            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Depuis</p>
                                <p className="mt-2 text-sm font-semibold text-text-dark">{seller?.seller_since_label || 'Membre recent'}</p>
                            </div>
                            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Email</p>
                                <p className="mt-2 text-sm font-semibold text-text-dark break-all">{form.data.email || 'Non renseigne'}</p>
                            </div>
                            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Telephone</p>
                                <p className="mt-2 text-sm font-semibold text-text-dark">{form.data.phone || 'Non renseigne'}</p>
                            </div>
                            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Plan vendeur</p>
                                <p className="mt-2 text-sm font-semibold text-text-dark">{seller?.seller_plan_label || 'Starter'}</p>
                            </div>
                            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Limite produits</p>
                                <p className="mt-2 text-sm font-semibold text-text-dark">{seller?.has_unlimited_products ? 'Illimite' : `${seller?.product_limit || 3} produits max`}</p>
                            </div>
                            <div className="rounded-2xl bg-white/80 p-4 shadow-sm sm:col-span-2">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Freelance</p>
                                <p className="mt-2 text-sm font-semibold text-text-dark">{form.data.is_available_for_freelance ? 'Disponible pour des missions sur mesure' : 'Indisponible pour le freelance actuellement'}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-[30px] border border-border/80 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-8">
                    <div className="mb-6">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Edition du profil</p>
                        <h1 className="mt-2 text-2xl font-bold text-text-dark">Mettre a jour vos informations vendeur</h1>
                        <p className="mt-2 text-sm text-text-muted">
                            Ces informations seront utilisees dans votre espace vendeur et sur votre profil public.
                        </p>
                    </div>

                    <form onSubmit={submit} className="grid gap-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            <Field label="Nom complet" error={form.errors.name}>
                                <input
                                    type="text"
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                    className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                />
                            </Field>

                            <Field label="Email" error={form.errors.email}>
                                <input
                                    type="email"
                                    value={form.data.email}
                                    onChange={(event) => form.setData('email', event.target.value)}
                                    className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                />
                            </Field>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <Field label="Telephone" error={form.errors.phone}>
                                <input
                                    type="text"
                                    value={form.data.phone}
                                    onChange={(event) => form.setData('phone', event.target.value)}
                                    className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                />
                            </Field>

                            <Field label="Wilaya" error={form.errors.wilaya}>
                                <select
                                    value={form.data.wilaya}
                                    onChange={(event) => form.setData('wilaya', event.target.value)}
                                    className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                                >
                                    <option value="">Selectionnez votre wilaya</option>
                                    {wilayas.map((wilaya) => (
                                        <option key={wilaya} value={wilaya}>{wilaya}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <Field label="Bio vendeur" error={form.errors.bio}>
                            <textarea
                                rows={7}
                                value={form.data.bio}
                                onChange={(event) => form.setData('bio', event.target.value)}
                                placeholder="Parlez de votre expertise, de vos produits et de ce qui vous rend fiable pour les acheteurs."
                                className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
                            />
                        </Field>

                        <Field label="Bouton WhatsApp Elite" error={form.errors.whatsapp_cta_text}>
                            <input
                                type="text"
                                value={form.data.whatsapp_cta_text}
                                onChange={(event) => form.setData('whatsapp_cta_text', event.target.value)}
                                placeholder="Achat Instantane"
                                disabled={!seller?.can_use_custom_whatsapp_cta}
                                className="w-full rounded-2xl border border-border bg-[#f8fbf8] px-4 py-3 text-sm text-text-dark transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:bg-gray-100 disabled:text-text-muted"
                            />
                        </Field>

                        <label className="flex items-start gap-3 rounded-2xl border border-border bg-[#f8fbf8] px-4 py-4 text-sm text-text-dark">
                            <input
                                type="checkbox"
                                checked={form.data.is_available_for_freelance}
                                onChange={(event) => form.setData('is_available_for_freelance', event.target.checked)}
                                className="mt-1 accent-primary"
                            />
                            <span>
                                <span className="block font-semibold">Disponible pour mission</span>
                                <span className="mt-1 block text-text-muted">Montre publiquement que vous acceptez des projets sur mesure, consulting ou prestations freelance.</span>
                            </span>
                        </label>

                        <div className="rounded-[24px] bg-[#f8fbf8] p-5 text-sm text-text-muted">
                            <p className="font-semibold text-text-dark">Votre plan actuel: {seller?.seller_plan_label || 'Starter'}</p>
                            <p className="mt-2 leading-7">
                                {seller?.seller_plan === 'starter' && 'Le plan Starter permet jusqu a 3 produits publies et des coordonnees standards.'}
                                {seller?.seller_plan === 'pro' && 'Le plan Pro debloque les produits illimites, le badge vendeur verifie et une meilleure visibilite dans la boutique.'}
                                {seller?.seller_plan === 'elite' && 'Le plan Elite ajoute la priorite support, la personnalisation WhatsApp et la meilleure exposition marketplace.'}
                            </p>
                            <Link href="/vendeur/plans" className="mt-4 inline-flex items-center rounded-full border border-primary/20 bg-white px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
                                Gerer mon plan vendeur
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-text-muted">
                                Un bon profil vendeur augmente la confiance et peut ameliorer vos conversions.
                            </p>
                            <div className="flex flex-col items-end gap-2">
                                {form.recentlySuccessful && (
                                    <p className="text-xs font-medium text-primary">Profil vendeur mis a jour.</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="btn-primary px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {form.processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </SellerLayout>
    )
}
