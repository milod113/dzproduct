import LegalPageLayout from '@/Components/LegalPageLayout'

const sections = [
    {
        title: '1. Produits eligibles au remboursement',
        paragraphs: [
            'Boutique Digitale DZ vend principalement des produits numeriques telechargeables. Une demande de remboursement peut etre etudiee si le produit est inaccessible, corrompu, non conforme a sa description ou livre en doublon.',
            'Les demandes liees a un simple changement d avis, a une mauvaise lecture de la fiche produit ou a une incompatibilite non mentionnee avant achat peuvent etre refusees.',
        ],
    },
    {
        title: '2. Delai de demande',
        paragraphs: [
            'L acheteur doit contacter le support dans un delai raisonnable apres l achat, idealement sous 7 jours, en expliquant clairement le probleme rencontre.',
            'Plus la demande est precise, plus notre equipe peut la traiter rapidement avec le vendeur et verifier la situation.',
        ],
    },
    {
        title: '3. Verification de la demande',
        paragraphs: [
            'Nous pouvons demander des captures d ecran, des details techniques ou des informations de commande pour confirmer que le probleme vient bien du produit ou de sa livraison.',
            'Si une correction simple est possible, comme un nouveau lien de telechargement ou un fichier corrige, cette solution peut etre proposee avant un remboursement total.',
        ],
    },
    {
        title: '4. Decision et traitement',
        paragraphs: [
            'Lorsque la demande est acceptee, le remboursement est traite selon le mode de paiement utilise et les delais techniques applicables.',
            'Si la demande est refusee, une explication claire est fournie a l acheteur pour maintenir la transparence et la confiance.',
        ],
    },
]

export default function RefundPolicy() {
    return (
        <LegalPageLayout
            eyebrow="Politique de remboursement"
            title="Remboursements et retours"
            subtitle="Une politique claire aide a rassurer les acheteurs tout en protegeant les vendeurs contre les demandes abusives."
            sections={sections}
        />
    )
}
