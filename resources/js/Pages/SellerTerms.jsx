import LegalPageLayout from '@/Components/LegalPageLayout'

const sections = [
    {
        title: '1. Responsabilites du vendeur',
        paragraphs: [
            'Chaque vendeur doit publier des produits legitimes, utiles et conformes a leur description. Les visuels, titres et promesses commerciales doivent rester honnetes et non trompeurs.',
            'Le vendeur est responsable de la qualite de ses fichiers, de leur bon fonctionnement et du respect des droits de propriete intellectuelle.',
        ],
    },
    {
        title: '2. Verification et conformite',
        paragraphs: [
            'La marketplace peut demander des informations complementaires, verifier l identite du vendeur ou suspendre un compte en cas de doute sur la fiabilite ou la legalite des contenus proposes.',
            'Les badges de confiance, comme Verified Seller ou Official Partner, restent attribues a la discretion de la plateforme selon les criteres internes de verification.',
        ],
    },
    {
        title: '3. Produits interdits',
        paragraphs: [
            'Sont interdits: les fichiers piratés, les contenus copies sans autorisation, les ressources revendues sans licence, les produits frauduleux, les contenus haineux, illicites ou portant atteinte aux droits de tiers.',
            'Tout signalement credible peut conduire a un retrait immediat du produit en attente de revision.',
        ],
    },
    {
        title: '4. Relation avec les acheteurs',
        paragraphs: [
            'Le vendeur doit adopter une communication professionnelle, repondre aux demandes legitimes et cooperer avec le support en cas de litige.',
            'La marketplace peut intervenir pour arbitrer une situation lorsque la confiance acheteur ou la reputation de la plateforme sont en jeu.',
        ],
    },
]

export default function SellerTerms() {
    return (
        <LegalPageLayout
            eyebrow="Conditions vendeur"
            title="Regles et obligations des vendeurs"
            subtitle="Un cadre vendeur solide augmente la qualite du catalogue, la confiance acheteur et la credibilite globale de la marketplace."
            sections={sections}
        />
    )
}
