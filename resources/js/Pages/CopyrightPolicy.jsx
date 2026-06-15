import LegalPageLayout from '@/Components/LegalPageLayout';

const sections = [
    {
        title: '1. Propriété intellectuelle des produits',
        paragraphs: [
            'Chaque produit numérique reste protégé par le droit d\'auteur, les droits voisins et, lorsque applicable, les licences commerciales associées.',
            'L\'achat d\'un produit accorde à l\'acheteur un droit d\'usage personnel ou professionnel selon la licence du produit, mais ne transfère pas la propriété intellectuelle.',
        ],
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
        ),
    },
    {
        title: '2. Utilisations interdites',
        paragraphs: [
            'Il est interdit de redistribuer, revendre, dupliquer, partager publiquement ou intégrer un produit dans une offre concurrente sans autorisation expresse du titulaire des droits.',
            'La suppression de mentions de copyright, de filigranes ou de restrictions d\'usage est également interdite.',
        ],
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
        ),
    },
    {
        title: '3. Signalement de violation',
        paragraphs: [
            'Tout titulaire de droits peut signaler un contenu suspect en fournissant des éléments de preuve suffisants : identité du titulaire, lien du produit, nature de la violation et justificatifs.',
            'La marketplace se réserve le droit de suspendre un produit ou un compte pendant l\'examen du signalement.',
        ],
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
        ),
    },
    {
        title: '4. Mesures de protection',
        paragraphs: [
            'La plateforme peut mettre en place des mesures techniques comme des liens limités, des restrictions de téléchargement ou des contrôles manuels pour protéger les créations publiées.',
            'En cas de violation confirmée, le contenu peut être retiré et le compte vendeur sanctionné selon la gravité de l\'infraction.',
        ],
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
    },
];

// Additional detailed sections with more structure
const additionalSections = [
    {
        title: 'Licences et droits d\'usage',
        items: [
            { type: 'Licence Standard', description: 'Usage personnel uniquement, pas de redistribution' },
            { type: 'Licence Professionnelle', description: 'Usage commercial limité au sein de votre entreprise' },
            { type: 'Licence Extended', description: 'Usage commercial étendu avec modifications autorisées' },
        ],
    },
    {
        title: 'Sanctions applicables',
        items: [
            { type: 'Avertissement', description: 'Première infraction non-intentionnelle' },
            { type: 'Suspension temporaire', description: 'Récurrence des violations constatées' },
            { type: 'Bannissement définitif', description: 'Violation grave ou intentionnelle' },
        ],
    },
];

export default function CopyrightPolicy() {
    return (
        <LegalPageLayout
            eyebrow="Propriété intellectuelle"
            title="Copyright et droits d'auteur"
            subtitle="Cette page clarifie ce que les acheteurs peuvent faire avec les produits achetés et protège les créateurs contre la copie ou la redistribution abusive."
            sections={sections}
        >
            {/* Additional content enhancement */}
            <div className="mt-10 space-y-8">
                {/* Licence Types */}
                <div className="bg-gradient-to-br from-primary-light/10 to-secondary-light/5 rounded-2xl p-6 border border-primary-light/20">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-text-dark">Types de licences disponibles</h3>
                    </div>
                    <div className="grid gap-4">
                        {additionalSections[0].items.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 bg-white/50 rounded-xl">
                                <span className="font-semibold text-primary text-sm sm:w-36">{item.type}</span>
                                <span className="text-text-muted text-sm">{item.description}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sanctions Grid */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-text-dark">Échelle des sanctions</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {additionalSections[1].items.map((item, idx) => (
                            <div key={idx} className="text-center p-4 rounded-xl bg-gray-50">
                                <div className={`text-sm font-semibold mb-2 ${
                                    idx === 0 ? 'text-yellow-600' : idx === 1 ? 'text-orange-600' : 'text-red-600'
                                }`}>
                                    {item.type}
                                </div>
                                <div className="text-xs text-text-muted">{item.description}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Report CTA */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 text-center border border-gray-200">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.75m-1.5.75a6.01 6.01 0 01-1.5-.75m0 0c.91-1.439 2.33-2.499 4-2.75M12 6.75h.008v.008H12V6.75zM2.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-text-dark mb-2">Vous constatez une violation ?</h3>
                    <p className="text-text-muted text-sm mb-4">
                        Signalez-nous tout contenu suspect ou toute infraction aux droits d'auteur.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                        Signaler une violation
                    </a>
                </div>

                {/* Last updated */}
                <div className="text-center text-xs text-text-muted pt-4 border-t border-gray-100">
                    Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </LegalPageLayout>
    );
}