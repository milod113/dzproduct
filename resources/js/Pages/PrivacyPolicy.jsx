import AppLayout from '@/Layouts/AppLayout'

export default function PrivacyPolicy() {
    return (
        <AppLayout>
            <section className="bg-gradient-to-b from-primary-light/40 to-white pt-16 pb-8">
                <div className="container-max text-center">
                    <h1 className="section-title">Politique de confidentialité</h1>
                    <p className="section-subtitle mx-auto">Comment nous protégeons vos données personnelles</p>
                </div>
            </section>
            <section className="section-padding">
                <div className="container-max">
                    <div className="max-w-3xl mx-auto card p-8 md:p-10">
                        <div className="text-sm text-text-muted leading-relaxed space-y-4">
                            <h2 className="text-lg font-bold text-text-dark">1. Collecte des données</h2>
                            <p>Nous collectons uniquement les données nécessaires à la gestion de votre compte et au traitement de vos commandes : nom, email, numéro de téléphone et wilaya.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">2. Utilisation des données</h2>
                            <p>Vos données sont utilisées pour : traiter vos commandes, vous envoyer vos fichiers téléchargeables, vous informer des mises à jour de produits, et améliorer notre service.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">3. Protection des données</h2>
                            <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles contre tout accès non autorisé.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">4. Partage des données</h2>
                            <p>Nous ne partageons jamais vos données personnelles avec des tiers sans votre consentement explicite.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">5. Vos droits</h2>
                            <p>Vous avez le droit d'accéder, de modifier ou de supprimer vos données personnelles à tout moment depuis votre espace client.</p>

                            <h2 className="text-lg font-bold text-text-dark pt-4">6. Contact</h2>
                            <p>Pour toute question concernant votre vie privée, écrivez-nous à contact@boutiquedigitaledz.dz.</p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}
