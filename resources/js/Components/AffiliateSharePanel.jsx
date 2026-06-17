import { useMemo, useState } from 'react'
import { router, usePage } from '@inertiajs/react'

function ShareAction({ href, onClick, children, tone = 'default', disabled = false }) {
    const toneClass = {
        default: 'border-border bg-white text-text-dark hover:border-primary/25 hover:text-primary',
        primary: 'border-primary/15 bg-primary-light text-primary hover:bg-primary hover:text-white',
        whatsapp: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white',
        telegram: 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white',
        facebook: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white',
    }[tone] || 'border-border bg-white text-text-dark'

    const classes = `inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${toneClass} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`

    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer" className={classes}>
                {children}
            </a>
        )
    }

    return (
        <button type="button" onClick={onClick} disabled={disabled} className={classes}>
            {children}
        </button>
    )
}

export default function AffiliateSharePanel({ product, compact = false }) {
    const { auth } = usePage().props
    const [copied, setCopied] = useState(false)

    const referralUrl = useMemo(() => {
        const referralCode = auth?.user?.referral_code

        if (!referralCode || typeof window === 'undefined') {
            return null
        }

        return `${window.location.origin}/boutique/${product.slug}?ref=${encodeURIComponent(referralCode)}`
    }, [auth?.user?.referral_code, product.slug])

    const shareText = `Decouvre ce produit sur Boutique Digitale DZ : ${product.name}`
    const encodedUrl = referralUrl ? encodeURIComponent(referralUrl) : ''
    const encodedText = encodeURIComponent(shareText)

    const ensureAffiliateAccess = () => {
        if (!auth?.user) {
            router.visit('/connexion')
            return false
        }

        if (!referralUrl) {
            router.visit('/affiliation')
            return false
        }

        return true
    }

    const copyLink = async () => {
        if (!ensureAffiliateAccess()) {
            return
        }

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(referralUrl)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2200)
            return
        }

        window.prompt('Copiez votre lien d affiliation :', referralUrl)
    }

    const nativeShare = async () => {
        if (!ensureAffiliateAccess()) {
            return
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: shareText,
                    url: referralUrl,
                })
                return
            } catch (error) {
                if (error?.name === 'AbortError') {
                    return
                }
            }
        }

        await copyLink()
    }

    return (
        <div className={`rounded-[28px] border border-primary/10 bg-[linear-gradient(135deg,rgba(11,122,53,0.08),rgba(255,255,255,0.96),rgba(14,165,233,0.06))] ${compact ? 'p-4' : 'p-5 md:p-6'}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="inline-flex rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
                        Affiliation
                    </div>
                    <h3 className={`mt-3 font-bold text-text-dark ${compact ? 'text-base' : 'text-xl'}`}>Partagez ce produit et gagnez une commission</h3>
                    <p className="mt-2 text-sm leading-7 text-text-muted">
                        Partagez votre lien personnel sur WhatsApp, Telegram ou vos reseaux. Si quelqu un achete via votre lien, la commission est creditee sur votre espace affiliation.
                    </p>
                </div>
                <div className="rounded-2xl bg-[#112b21] px-4 py-3 text-white shadow-[0_16px_35px_rgba(17,43,33,0.18)]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/70">Commission</p>
                    <p className="mt-1 text-lg font-bold">10%</p>
                </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Votre lien affilié</p>
                <p className="mt-2 break-all font-mono text-sm text-text-dark">
                    {referralUrl || 'Connectez-vous et activez votre espace affiliation pour generer un lien partageable.'}
                </p>
            </div>

            <div className={`mt-4 grid gap-3 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 xl:grid-cols-4'}`}>
                <ShareAction onClick={copyLink} tone="primary">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    {copied ? 'Lien copie' : 'Copier le lien'}
                </ShareAction>

                <ShareAction onClick={nativeShare} tone="default">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 111.176-2.347m0 0l7.857-4.365M8.393 8.56a2.25 2.25 0 002.758 3.366m0 0l5.856 3.255m-5.856-3.255a2.25 2.25 0 012.758 3.366M17.007 15.181a2.25 2.25 0 11-.001 0z" />
                    </svg>
                    Partage rapide
                </ShareAction>

                <ShareAction href={referralUrl ? `https://wa.me/?text=${encodedText}%20${encodedUrl}` : null} tone="whatsapp" disabled={!referralUrl}>
                    <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.52 3.48A11.8 11.8 0 0012.04 0C5.5 0 .18 5.3.18 11.84c0 2.08.54 4.11 1.57 5.9L0 24l6.43-1.69a11.8 11.8 0 005.61 1.43h.01c6.53 0 11.85-5.3 11.85-11.85 0-3.16-1.23-6.13-3.38-8.41zm-8.48 18.2h-.01a9.9 9.9 0 01-5.05-1.39l-.36-.21-3.82 1 1.02-3.73-.24-.38a9.8 9.8 0 01-1.52-5.22c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.11 1.03 6.98 2.9a9.82 9.82 0 012.9 6.99c0 5.45-4.44 9.89-9.9 9.89zm5.43-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.61-.92-2.21-.24-.57-.49-.49-.67-.5h-.57c-.2 0-.53.08-.8.38-.27.3-1.05 1.02-1.05 2.48 0 1.46 1.08 2.88 1.23 3.08.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.62.71.22 1.35.19 1.86.11.57-.09 1.77-.72 2.02-1.41.25-.69.25-1.29.18-1.41-.08-.12-.28-.2-.58-.35z" />
                    </svg>
                    WhatsApp
                </ShareAction>

                <div className="grid grid-cols-2 gap-3">
                    <ShareAction href={referralUrl ? `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` : null} tone="telegram" disabled={!referralUrl}>
                        <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21.94 4.66a1.5 1.5 0 00-1.64-.24L2.77 11.65a1.5 1.5 0 00.12 2.82l4.58 1.49 1.5 4.83a1.5 1.5 0 002.67.46l2.57-3.47 4.62 3.38a1.5 1.5 0 002.34-.9l2.91-14.03a1.5 1.5 0 00-.54-1.57zM9.33 15.2l-.52 3.03-.83-2.68 9.57-7.58L9.33 15.2z" />
                        </svg>
                        Telegram
                    </ShareAction>

                    <ShareAction href={referralUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` : null} tone="facebook" disabled={!referralUrl}>
                        <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.27 10.44 22v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.9h2.77l-.44 2.9h-2.33V22C18.34 21.27 22 17.1 22 12.07z" />
                        </svg>
                        Facebook
                    </ShareAction>
                </div>
            </div>
        </div>
    )
}
