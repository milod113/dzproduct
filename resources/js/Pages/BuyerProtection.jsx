import LegalPageLayout from '@/Components/LegalPageLayout'

const sections = [
    {
        title: '1. Transparence avant achat',
        paragraphs: [
            'La marketplace encourage des fiches produit claires, avec descriptions, formats, prix, badges vendeur et informations essentielles pour limiter les mauvaises surprises.',
            'Les acheteurs peuvent aussi s appuyer sur les signaux de confiance comme les vendeurs verifies ou top rated pour faire un choix plus sur.',
        ],
    },
    {
        title: '2. Securite de paiement',
        paragraphs: [
            'Les transactions sont traitees dans un cadre securise. Nous limitons l exposition des donnees sensibles et mettons en place une verification de base des flux de commande.',
            'En cas d anomalie ou de comportement suspect, la marketplace peut suspendre une commande pour controle manuel.',
        ],
    },
    {
        title: '3. Assistance en cas de probleme',
        paragraphs: [
            'Si un produit est inaccessible, non conforme ou pose un probleme de livraison, l acheteur peut contacter la plateforme afin d obtenir une resolution rapide.',
            'Selon le cas, nous pouvons coordonner avec le vendeur, relivrer le fichier, demander des explications ou etudier un remboursement.',
        ],
    },
    {
        title: '4. Engagement marketplace',
        paragraphs: [
            'Notre objectif est de construire un environnement fiable pour les achats digitaux en Algerie, avec des regles claires, des vendeurs responsables et un support accessible.',
            'La protection acheteur repose autant sur la qualite du catalogue que sur la rapidite de traitement des litiges et sur la transparence des politiques du site.',
        ],
    },
]

export default function BuyerProtection() {
    return (
        <LegalPageLayout
            eyebrow="Protection acheteur"
            title="Engagements de protection acheteur"
            subtitle="Cette page explique comment la marketplace protege les acheteurs avant, pendant et apres la commande pour renforcer la confiance et reduire la friction a l achat."
            sections={sections}
        />
    )
}
