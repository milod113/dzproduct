import AppLayout from '@/Layouts/AppLayout'

export default function Terms() {
    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max text-center">
                    <h1 className="section-title">Conditions générales</h1>
                    <p className="section-subtitle mx-auto">Conditions générales de vente et d'utilisation de Boutique Digitale DZ</p>
                </div>
            </section>
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-3xl mx-auto card p-8 md:p-10">
                        <div className="text-sm text-text-muted leading-relaxed space-y-4">
                            <h2 className="text-lg font-bold text-text-dark">1. Présentation</h2>
                            <p>Boutique Digitale DZ est une plateforme de vente de produits numériques en Algérie. Les présentes conditions régissent l'utilisation de la plateforme et l'achat de produits.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">2. Produits numériques</h2>
                            <p>Tous les produits vendus sur Boutique Digitale DZ sont numériques (fichiers téléchargeables). Aucun produit physique n'est expédié. Le téléchargement est accessible immédiatement après confirmation du paiement.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">3. Prix et paiement</h2>
                            <p>Les prix sont indiqués en Dinar Algérien (DZD). Le paiement s'effectue via CIB, Edahabia, BaridiMob ou virement bancaire. Toutes les transactions sont 100% sécurisées.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">4. Droit de rétractation</h2>
                            <p>Conformément à la législation algérienne, vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation et demander un remboursement.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">5. Propriété intellectuelle</h2>
                            <p>Tous les produits vendus sont protégés par le droit d'auteur. Il est interdit de redistribuer, revendre ou partager les fichiers téléchargés.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">6. Contact</h2>
                            <p>Pour toute question concernant ces conditions, contactez-nous à contact@boutiquedigitaledz.dz.</p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
