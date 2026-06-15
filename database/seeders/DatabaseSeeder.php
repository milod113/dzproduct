<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Review;
use App\Models\BlogPost;
use App\Models\Coupon;
use App\Models\Download;
use App\Models\Payment;
use App\Models\SellerMessage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ─────────────────────────────────────────
        //  USERS
        // ─────────────────────────────────────────

        // Admin
        $admin = User::factory()->create([
            'name'             => 'Admin Boutique Digitale',
            'email'            => 'admin@boutiquedigitaledz.dz',
            'phone'            => '0555 12 34 56',
            'wilaya'           => 'Alger',
            'is_admin'         => true,
            'role'             => 'admin',
            'email_verified_at'=> now(),
            'password'         => bcrypt('password'),
        ]);

        // Sellers
        $sellers = [
            [
                'name'                  => 'Ahmed K.',
                'email'                 => 'ahmed@email.dz',
                'phone'                 => '0555 98 76 54',
                'wilaya'                => 'Oran',
                'is_available_for_freelance' => true,
                'bio'                   => 'Expert freelance et formateur en marketing digital avec 5 ans d\'expérience.',
                'is_verified_seller'    => true,
                'is_top_rated_seller'   => true,
                'seller_since'          => Carbon::now()->subYears(3),
            ],
            [
                'name'                  => 'Fatima Z.',
                'email'                 => 'fatima@email.dz',
                'phone'                 => '0555 45 67 89',
                'wilaya'                => 'Constantine',
                'is_available_for_freelance' => true,
                'bio'                   => 'Designer graphique et créatrice de templates Canva professionnels.',
                'is_verified_seller'    => true,
                'seller_since'          => Carbon::now()->subYears(2),
            ],
            [
                'name'                  => 'Yacine M.',
                'email'                 => 'yacine@email.dz',
                'phone'                 => '0555 32 10 98',
                'wilaya'                => 'Alger',
                'is_available_for_freelance' => true,
                'bio'                   => 'Développeur web et formateur en programmation et SEO.',
                'is_verified_seller'    => true,
                'is_official_partner'   => true,
                'seller_since'          => Carbon::now()->subYears(4),
            ],
            [
                'name'                  => 'Imane K.',
                'email'                 => 'imane@email.dz',
                'phone'                 => '0555 76 54 32',
                'wilaya'                => 'Béjaïa',
                'bio'                   => 'Coach en développement personnel et auteure d\'ebooks.',
                'is_verified_seller'    => true,
                'seller_since'          => Carbon::now()->subYear(),
            ],
            [
                'name'                  => 'Karim B.',
                'email'                 => 'karim@email.dz',
                'phone'                 => '0555 11 22 33',
                'wilaya'                => 'Annaba',
                'bio'                   => 'Comptable agréé et consultant pour PME algériennes.',
                'is_verified_seller'    => true,
                'is_top_rated_seller'   => true,
                'seller_since'          => Carbon::now()->subYears(2),
            ],
            [
                'name'                  => 'Sara T.',
                'email'                 => 'sara@email.dz',
                'phone'                 => '0555 88 99 00',
                'wilaya'                => 'Tizi Ouzou',
                'bio'                   => 'Professeure de langues et conceptrice de packs pédagogiques.',
                'is_verified_seller'    => true,
                'seller_since'          => Carbon::now()->subMonths(8),
            ],
        ];

        $sellerIds = [];
        foreach ($sellers as $s) {
            $user = User::factory()->create(array_merge($s, [
                'role'              => 'seller',
                'email_verified_at' => now(),
                'password'          => bcrypt('password'),
            ]));
            $sellerIds[] = $user->id;
        }

        // Regular buyers
        $buyers = [
            ['name' => 'Mohamed A.',   'email' => 'mohamed@email.dz',  'wilaya' => 'Alger'],
            ['name' => 'Nadia R.',     'email' => 'nadia@email.dz',    'wilaya' => 'Sétif'],
            ['name' => 'Amine L.',     'email' => 'amine@email.dz',    'wilaya' => 'Blida'],
            ['name' => 'Lina M.',      'email' => 'lina@email.dz',     'wilaya' => 'Tlemcen'],
            ['name' => 'Riad S.',      'email' => 'riad@email.dz',     'wilaya' => 'Batna'],
            ['name' => 'Asma B.',      'email' => 'asma@email.dz',     'wilaya' => 'Msila'],
            ['name' => 'Omar F.',      'email' => 'omar@email.dz',     'wilaya' => 'Skikda'],
            ['name' => 'Yasmine D.',   'email' => 'yasmine@email.dz',  'wilaya' => 'Oran'],
        ];

        $buyerIds = [];
        foreach ($buyers as $b) {
            $user = User::factory()->create(array_merge($b, [
                'role'              => 'client',
                'phone'             => '05' . rand(50, 59) . ' ' . rand(10, 99) . ' ' . rand(10, 99) . ' ' . rand(10, 99),
                'email_verified_at' => now(),
                'password'          => bcrypt('password'),
            ]));
            $buyerIds[] = $user->id;
        }

        // ─────────────────────────────────────────
        //  CATEGORIES
        // ─────────────────────────────────────────

        $categories = [
            ['name' => 'Ebooks',                    'slug' => 'ebooks',                    'description' => 'Guides et livres numériques inspirants',                    'icon' => 'BookOpen',     'sort_order' => 1, 'color' => '#6366f1'],
            ['name' => 'Packs Éducatifs',           'slug' => 'packs-educatifs',           'description' => 'Cours, résumés et exercices prêts à l\'emploi',             'icon' => 'GraduationCap','sort_order' => 2, 'color' => '#10b981'],
            ['name' => 'Templates Réseaux Sociaux', 'slug' => 'templates-reseaux-sociaux', 'description' => 'Templates Canva pour un feed professionnel',                 'icon' => 'Layout',       'sort_order' => 3, 'color' => '#f59e0b'],
            ['name' => 'CV & Lettres de Motivation','slug' => 'cv-lettres-motivation',     'description' => 'Modèles modernes prêts à personnaliser',                    'icon' => 'FileText',     'sort_order' => 4, 'color' => '#3b82f6'],
            ['name' => 'Documents Business',        'slug' => 'documents-business',        'description' => 'Modèles de documents pour votre entreprise',                 'icon' => 'Briefcase',    'sort_order' => 5, 'color' => '#8b5cf6'],
            ['name' => 'Mini-Cours',                'slug' => 'mini-cours',                'description' => 'Formations courtes pour passer à l\'action',                 'icon' => 'Video',        'sort_order' => 6, 'color' => '#ef4444'],
            ['name' => 'Photographie & Design',     'slug' => 'photographie-design',       'description' => 'Presets Lightroom, mockups et ressources créatives',         'icon' => 'Camera',       'sort_order' => 7, 'color' => '#ec4899'],
            ['name' => 'Développement Web',         'slug' => 'developpement-web',         'description' => 'Scripts, thèmes, plugins et snippets de code',               'icon' => 'Code',         'sort_order' => 8, 'color' => '#14b8a6'],
            ['name' => 'Finance & Investissement',  'slug' => 'finance-investissement',    'description' => 'Guides et outils pour gérer et investir votre argent',       'icon' => 'TrendingUp',   'sort_order' => 9, 'color' => '#f97316'],
        ];

        $categoryMap = [];
        foreach ($categories as $cat) {
            $c = Category::create($cat);
            $categoryMap[$cat['slug']] = $c->id;
        }

        // ─────────────────────────────────────────
        //  PRODUCTS
        // ─────────────────────────────────────────

        $productsData = [
            // ── Ebooks ──
            ['cat' => 'ebooks', 'name' => 'Guide du Freelance en Algérie 2025',        'slug' => 'guide-freelance-algerie-2025',        'price' => 590,  'old_price' => 890,  'sales' => 1240, 'rating' => 4.8, 'file_type' => 'pdf',  'pages' => 87,  'description' => 'Un guide complet pour lancer, gérer et développer votre activité freelance en Algérie : statut juridique, plateformes, tarification et facturation.'],
            ['cat' => 'ebooks', 'name' => 'Ebook Productivité & Gestion du Temps',     'slug' => 'ebook-productivite-gestion-temps',    'price' => 490,  'old_price' => null, 'sales' => 980,  'rating' => 4.5, 'file_type' => 'pdf',  'pages' => 64,  'description' => 'Maîtrisez votre temps et boostez votre productivité grâce aux meilleures méthodes : GTD, Pomodoro, time-blocking.'],
            ['cat' => 'ebooks', 'name' => 'Guide E-commerce Algérie',                  'slug' => 'guide-ecommerce-algerie',             'price' => 690,  'old_price' => 990,  'sales' => 760,  'rating' => 4.7, 'file_type' => 'pdf',  'pages' => 102, 'description' => 'Tout ce qu\'il faut savoir pour lancer et gérer une boutique en ligne en Algérie : logistique, paiement, marketing.'],
            ['cat' => 'ebooks', 'name' => 'Ebook Bien-être & Développement Personnel', 'slug' => 'ebook-bien-etre-developpement',        'price' => 390,  'old_price' => null, 'sales' => 1500, 'rating' => 4.4, 'file_type' => 'pdf',  'pages' => 72,  'description' => 'Guide pratique pour améliorer votre santé mentale, vos habitudes et votre équilibre vie-pro / vie-perso.'],
            ['cat' => 'ebooks', 'name' => 'Ebook Investir en Algérie',                 'slug' => 'ebook-investir-algerie',              'price' => 790,  'old_price' => 1190, 'sales' => 620,  'rating' => 4.6, 'file_type' => 'pdf',  'pages' => 95,  'description' => 'Comprendre les opportunités d\'investissement en Algérie : immobilier, bourse, or, startups.'],
            ['cat' => 'ebooks', 'name' => 'Guide Réseaux Sociaux pour Entrepreneurs',  'slug' => 'guide-reseaux-sociaux-entrepreneurs', 'price' => 490,  'old_price' => null, 'sales' => 840,  'rating' => 4.6, 'file_type' => 'pdf',  'pages' => 58,  'description' => 'Stratégies Instagram, Facebook, TikTok et LinkedIn adaptées au marché algérien.'],
            ['cat' => 'ebooks', 'name' => 'Ebook Droit de l\'Entreprise en Algérie',   'slug' => 'ebook-droit-entreprise-algerie',      'price' => 690,  'old_price' => null, 'sales' => 310,  'rating' => 4.3, 'file_type' => 'pdf',  'pages' => 110, 'description' => 'Guide juridique simplifié pour créer et gérer son entreprise en conformité avec la législation algérienne.'],

            // ── Packs Éducatifs ──
            ['cat' => 'packs-educatifs', 'name' => 'Pack Réussite Bac Algérie (Toutes Filières)',     'slug' => 'pack-reussite-bac-algerie',          'price' => 790,  'old_price' => 1200, 'sales' => 3200, 'rating' => 4.9, 'file_type' => 'zip', 'pages' => null, 'description' => 'Cours complets, résumés et séries d\'exercices corrigés pour toutes les filières du Bac algérien.'],
            ['cat' => 'packs-educatifs', 'name' => 'Pack Langues Étrangères (EN/FR/ES)',              'slug' => 'pack-langues-etrangeres',            'price' => 990,  'old_price' => null, 'sales' => 1450, 'rating' => 4.7, 'file_type' => 'zip', 'pages' => null, 'description' => 'Apprenez l\'anglais, le français et l\'espagnol avec des fiches de vocabulaire, grammaire et exercices.'],
            ['cat' => 'packs-educatifs', 'name' => 'Pack Préparation Concours Administratifs',        'slug' => 'pack-preparation-concours-admin',    'price' => 890,  'old_price' => 1290, 'sales' => 940,  'rating' => 4.6, 'file_type' => 'zip', 'pages' => null, 'description' => 'Tout pour préparer les concours de la Fonction Publique algérienne : QCM, culture générale, culture islamique.'],
            ['cat' => 'packs-educatifs', 'name' => 'Pack Code et Programmation pour Débutants',       'slug' => 'pack-code-programmation-debutants',  'price' => 1290, 'old_price' => null, 'sales' => 1100, 'rating' => 4.8, 'file_type' => 'zip', 'pages' => null, 'description' => 'Initiez-vous à Python, HTML/CSS et JavaScript avec des exercices progressifs et des projets concrets.'],
            ['cat' => 'packs-educatifs', 'name' => 'Pack BEM (Brevet de l\'Enseignement Moyen)',      'slug' => 'pack-bem-algerie',                   'price' => 590,  'old_price' => 890,  'sales' => 2600, 'rating' => 4.9, 'file_type' => 'zip', 'pages' => null, 'description' => 'Révisions complètes et annales corrigées pour préparer le BEM algérien dans toutes les matières.'],
            ['cat' => 'packs-educatifs', 'name' => 'Pack Master & Licence (Sciences Économiques)',     'slug' => 'pack-master-licence-eco',            'price' => 990,  'old_price' => null, 'sales' => 780,  'rating' => 4.5, 'file_type' => 'zip', 'pages' => null, 'description' => 'Cours magistraux, TD et examens corrigés pour les filières économiques et de gestion.'],
            ['cat' => 'packs-educatifs', 'name' => 'Pack Anglais des Affaires (Business English)',    'slug' => 'pack-anglais-affaires',              'price' => 790,  'old_price' => 990,  'sales' => 670,  'rating' => 4.6, 'file_type' => 'zip', 'pages' => null, 'description' => 'Maîtrisez l\'anglais professionnel : emails, réunions, négociations et présentations.'],

            // ── Templates Réseaux Sociaux ──
            ['cat' => 'templates-reseaux-sociaux', 'name' => 'Pack 50 Templates Canva Pro (Feed Instagram)', 'slug' => 'templates-canva-pro-instagram',    'price' => 490, 'old_price' => 790,  'sales' => 2300, 'rating' => 4.7, 'file_type' => 'zip', 'pages' => null, 'description' => '50 templates Canva modifiables pour un feed Instagram cohérent et professionnel.'],
            ['cat' => 'templates-reseaux-sociaux', 'name' => 'Pack Stories Instagram (30 Templates)',        'slug' => 'templates-stories-instagram',      'price' => 390, 'old_price' => null, 'sales' => 1890, 'rating' => 4.4, 'file_type' => 'zip', 'pages' => null, 'description' => '30 templates Stories Instagram modifiables sur Canva, tous formats inclus.'],
            ['cat' => 'templates-reseaux-sociaux', 'name' => 'Pack Templates TikTok & Reels',               'slug' => 'templates-tiktok-reels',           'price' => 290, 'old_price' => null, 'sales' => 3200, 'rating' => 4.2, 'file_type' => 'zip', 'pages' => null, 'description' => 'Templates vidéo TikTok et Reels tendance, modifiables avec CapCut ou Canva.'],
            ['cat' => 'templates-reseaux-sociaux', 'name' => 'Pack Templates LinkedIn Pro',                  'slug' => 'templates-linkedin-pro',           'price' => 350, 'old_price' => 490,  'sales' => 670,  'rating' => 4.3, 'file_type' => 'zip', 'pages' => null, 'description' => 'Optimisez votre présence LinkedIn avec des bannières, posts et carrousels professionnels.'],
            ['cat' => 'templates-reseaux-sociaux', 'name' => 'Kit Identité Visuelle pour Marques DZ',       'slug' => 'kit-identite-visuelle-marques-dz', 'price' => 690, 'old_price' => 990,  'sales' => 450,  'rating' => 4.8, 'file_type' => 'zip', 'pages' => null, 'description' => 'Créez une identité visuelle cohérente : logo, palette, typographie, templates réseaux.'],
            ['cat' => 'templates-reseaux-sociaux', 'name' => 'Pack Ramadan & Aïd Templates',                'slug' => 'pack-ramadan-aid-templates',       'price' => 290, 'old_price' => null, 'sales' => 4100, 'rating' => 4.6, 'file_type' => 'zip', 'pages' => null, 'description' => 'Templates Canva spéciaux Ramadan et Aïd pour votre communication sur les réseaux sociaux.'],

            // ── CV & Lettres de Motivation ──
            ['cat' => 'cv-lettres-motivation', 'name' => 'CV Moderne Algérie (10 Templates Word)',     'slug' => 'cv-moderne-algerie-word',        'price' => 390, 'old_price' => 590,  'sales' => 2100, 'rating' => 4.6, 'file_type' => 'zip',  'pages' => null, 'description' => '10 modèles de CV modernes et élégants au format Word, faciles à personnaliser.'],
            ['cat' => 'cv-lettres-motivation', 'name' => 'Lettre de Motivation Pro (5 Modèles)',       'slug' => 'lettre-motivation-pro-modeles',  'price' => 290, 'old_price' => null, 'sales' => 1800, 'rating' => 4.5, 'file_type' => 'zip',  'pages' => null, 'description' => '5 modèles de lettres de motivation adaptés aux standards du recrutement en Algérie.'],
            ['cat' => 'cv-lettres-motivation', 'name' => 'Portfolio Design Créatif (Template Canva)',  'slug' => 'portfolio-design-creatif-canva', 'price' => 490, 'old_price' => 690,  'sales' => 450,  'rating' => 4.7, 'file_type' => 'zip',  'pages' => null, 'description' => 'Template de portfolio Canva pour créatifs, designers et photographes.'],
            ['cat' => 'cv-lettres-motivation', 'name' => 'Pack Entretien Emploi Complet',             'slug' => 'pack-entretien-emploi-complet',  'price' => 490, 'old_price' => null, 'sales' => 780,  'rating' => 4.5, 'file_type' => 'pdf',  'pages' => 55,  'description' => 'Guide complet pour réussir vos entretiens : questions courantes, tenues, posture, relance.'],
            ['cat' => 'cv-lettres-motivation', 'name' => 'CV ATS-Compatible (Format Optimisé)',       'slug' => 'cv-ats-compatible-optimise',     'price' => 350, 'old_price' => 490,  'sales' => 920,  'rating' => 4.7, 'file_type' => 'docx', 'pages' => null, 'description' => 'CV optimisé pour passer les filtres ATS (Applicant Tracking System) des recruteurs modernes.'],

            // ── Documents Business ──
            ['cat' => 'documents-business', 'name' => 'Business Plan Complet Algérie',          'slug' => 'business-plan-complet-algerie',  'price' => 690,  'old_price' => 990,  'sales' => 670,  'rating' => 4.8, 'file_type' => 'zip',  'pages' => null, 'description' => 'Template de business plan professionnel adapté au marché algérien, avec projections financières.'],
            ['cat' => 'documents-business', 'name' => 'Pack Factures & Devis Pro',              'slug' => 'pack-factures-devis-pro',        'price' => 490,  'old_price' => null, 'sales' => 890,  'rating' => 4.6, 'file_type' => 'zip',  'pages' => null, 'description' => 'Modèles professionnels de factures, devis et bons de commande en français et arabe.'],
            ['cat' => 'documents-business', 'name' => 'Pack Contrats de Travail & Prestation',  'slug' => 'pack-contrats-travail-prestation','price' => 590,  'old_price' => 890,  'sales' => 340,  'rating' => 4.5, 'file_type' => 'zip',  'pages' => null, 'description' => 'Modèles de contrats CDD, CDI, contrat de prestation et NDA conformes à la législation algérienne.'],
            ['cat' => 'documents-business', 'name' => 'Pack Comptabilité pour PME',             'slug' => 'pack-comptabilite-pme',          'price' => 790,  'old_price' => null, 'sales' => 560,  'rating' => 4.6, 'file_type' => 'zip',  'pages' => null, 'description' => 'Tableaux de bord, suivi de trésorerie, bilan simplifié et outils comptables pour PME algériennes.'],
            ['cat' => 'documents-business', 'name' => 'Kit Communication Professionnelle',      'slug' => 'kit-communication-professionnelle','price' => 490, 'old_price' => 690,  'sales' => 430,  'rating' => 4.4, 'file_type' => 'zip',  'pages' => null, 'description' => 'Templates d\'emails professionnels, comptes-rendus de réunion et présentations PowerPoint.'],
            ['cat' => 'documents-business', 'name' => 'Registre Légal & Statuts d\'Entreprise', 'slug' => 'registre-legal-statuts-entreprise','price' => 590, 'old_price' => null, 'sales' => 290,  'rating' => 4.3, 'file_type' => 'zip',  'pages' => null, 'description' => 'Modèles de statuts SARL/EURL, PV d\'assemblée et documents légaux pour la création d\'entreprise.'],

            // ── Mini-Cours ──
            ['cat' => 'mini-cours', 'name' => 'Formation Marketing Digital Algérie',    'slug' => 'formation-marketing-digital-algerie', 'price' => 1290, 'old_price' => 1990, 'sales' => 1560, 'rating' => 4.9, 'file_type' => 'zip', 'pages' => null, 'description' => 'Formation complète en marketing digital : SEO, publicité Facebook, email marketing et analytics.'],
            ['cat' => 'mini-cours', 'name' => 'Formation Canva de Zéro à Pro',           'slug' => 'formation-canva-zero-pro',           'price' => 990,  'old_price' => null, 'sales' => 2100, 'rating' => 4.8, 'file_type' => 'zip', 'pages' => null, 'description' => 'Apprenez Canva en partant de zéro : logos, posts, présentations, vidéos et bien plus.'],
            ['cat' => 'mini-cours', 'name' => 'Formation SEO & Référencement Web',       'slug' => 'formation-seo-referencement-web',    'price' => 1490, 'old_price' => 1990, 'sales' => 1200, 'rating' => 4.9, 'file_type' => 'zip', 'pages' => null, 'description' => 'Maîtrisez le référencement naturel pour faire apparaître votre site en première page de Google.'],
            ['cat' => 'mini-cours', 'name' => 'Formation Montage Vidéo (CapCut & Pr)',  'slug' => 'formation-montage-video-capcut-pr',  'price' => 1490, 'old_price' => null, 'sales' => 890,  'rating' => 4.7, 'file_type' => 'zip', 'pages' => null, 'description' => 'Créez des vidéos professionnelles avec CapCut (mobile) et Premiere Pro (desktop), de A à Z.'],
            ['cat' => 'mini-cours', 'name' => 'Formation Dropshipping Algérie',          'slug' => 'formation-dropshipping-algerie',      'price' => 1990, 'old_price' => 2490, 'sales' => 780,  'rating' => 4.6, 'file_type' => 'zip', 'pages' => null, 'description' => 'Lancez votre business de dropshipping en Algérie : trouver fournisseurs, marketing, livraison.'],
            ['cat' => 'mini-cours', 'name' => 'Formation Excel pour Professionnels',     'slug' => 'formation-excel-professionnels',      'price' => 890,  'old_price' => 1290, 'sales' => 1340, 'rating' => 4.7, 'file_type' => 'zip', 'pages' => null, 'description' => 'Maîtrisez Excel : formules avancées, tableaux croisés dynamiques, macros VBA et dashboards.'],
            ['cat' => 'mini-cours', 'name' => 'Formation Rédaction Web & Copywriting',   'slug' => 'formation-redaction-web-copywriting', 'price' => 990,  'old_price' => null, 'sales' => 650,  'rating' => 4.6, 'file_type' => 'zip', 'pages' => null, 'description' => 'Écrivez des contenus qui vendent : blogs, pages de vente, emails et publicités en arabe et français.'],

            // ── Photographie & Design ──
            ['cat' => 'photographie-design', 'name' => 'Pack 20 Presets Lightroom (Style Cinéma)',   'slug' => 'presets-lightroom-cinema',         'price' => 490, 'old_price' => 690,  'sales' => 1230, 'rating' => 4.8, 'file_type' => 'zip', 'pages' => null, 'description' => '20 presets Lightroom professionnels pour des photos au rendu cinématique, compatibles mobile et desktop.'],
            ['cat' => 'photographie-design', 'name' => 'Pack Mockups Produits Algériens',            'slug' => 'mockups-produits-algeriens',        'price' => 390, 'old_price' => null, 'sales' => 560,  'rating' => 4.5, 'file_type' => 'zip', 'pages' => null, 'description' => '30 mockups PSD et Canva pour présenter vos produits (bijoux, vêtements, packaging) de manière pro.'],
            ['cat' => 'photographie-design', 'name' => 'Pack Fonds d\'Écran & Wallpapers DZ',       'slug' => 'fonds-ecran-wallpapers-dz',         'price' => 190, 'old_price' => null, 'sales' => 2400, 'rating' => 4.3, 'file_type' => 'zip', 'pages' => null, 'description' => '100 fonds d\'écran haute résolution inspirés de l\'Algérie : paysages, art islamique, calligraphie.'],
            ['cat' => 'photographie-design', 'name' => 'Kit Icônes & Illustrations Arabes',         'slug' => 'kit-icones-illustrations-arabes',   'price' => 490, 'old_price' => 690,  'sales' => 340,  'rating' => 4.6, 'file_type' => 'zip', 'pages' => null, 'description' => 'Pack de 500 icônes vectorielles et illustrations au style arabe/berbère pour vos projets créatifs.'],
            ['cat' => 'photographie-design', 'name' => 'Polices Arabes & Tifinagh Premium',         'slug' => 'polices-arabes-tifinagh-premium',   'price' => 290, 'old_price' => null, 'sales' => 480,  'rating' => 4.4, 'file_type' => 'zip', 'pages' => null, 'description' => '30 polices arabes et tifinagh premium pour vos designs, logos et créations graphiques.'],

            // ── Développement Web ──
            ['cat' => 'developpement-web', 'name' => 'Template Site Vitrine Pro (HTML/CSS/JS)',    'slug' => 'template-site-vitrine-pro',       'price' => 790,  'old_price' => 990,  'sales' => 430,  'rating' => 4.7, 'file_type' => 'zip', 'pages' => null, 'description' => 'Template complet de site vitrine responsive avec HTML5, CSS3, JS et formulaire de contact.'],
            ['cat' => 'developpement-web', 'name' => 'Thème WordPress E-commerce Algérie',        'slug' => 'theme-wordpress-ecommerce-algerie','price' => 1290, 'old_price' => 1990, 'sales' => 280,  'rating' => 4.8, 'file_type' => 'zip', 'pages' => null, 'description' => 'Thème WordPress WooCommerce optimisé pour le e-commerce algérien avec intégration CIB/Baridimob.'],
            ['cat' => 'developpement-web', 'name' => 'Pack Scripts PHP Utilitaires',              'slug' => 'pack-scripts-php-utilitaires',     'price' => 690,  'old_price' => null, 'sales' => 210,  'rating' => 4.5, 'file_type' => 'zip', 'pages' => null, 'description' => '15 scripts PHP prêts à l\'emploi : authentification, panier, newsletter, gestion fichiers.'],
            ['cat' => 'developpement-web', 'name' => 'Boilerplate Laravel + Vue.js (SaaS Ready)', 'slug' => 'boilerplate-laravel-vuejs-saas',   'price' => 1990, 'old_price' => 2490, 'sales' => 160,  'rating' => 4.9, 'file_type' => 'zip', 'pages' => null, 'description' => 'Boilerplate complet Laravel + Vue.js avec authentification, rôles, Stripe et tableau de bord admin.'],
            ['cat' => 'developpement-web', 'name' => 'Plugin WhatsApp Click-to-Chat (WordPress)', 'slug' => 'plugin-whatsapp-click-to-chat',    'price' => 390,  'old_price' => 590,  'sales' => 890,  'rating' => 4.6, 'file_type' => 'zip', 'pages' => null, 'description' => 'Plugin WordPress pour ajouter un bouton WhatsApp flottant sur votre site, configurable facilement.'],

            // ── Finance & Investissement ──
            ['cat' => 'finance-investissement', 'name' => 'Guide Épargne & Budget Familial Algérie',  'slug' => 'guide-epargne-budget-familial',    'price' => 490, 'old_price' => null, 'sales' => 920,  'rating' => 4.5, 'file_type' => 'pdf',  'pages' => 68,  'description' => 'Apprenez à épargner, budgétiser et planifier vos finances en tant que famille algérienne.'],
            ['cat' => 'finance-investissement', 'name' => 'Tableau de Bord Finances Personnelles',    'slug' => 'tableau-bord-finances-personnelles','price' => 390, 'old_price' => 590,  'sales' => 1100, 'rating' => 4.7, 'file_type' => 'xlsx','pages' => null, 'description' => 'Fichier Excel complet pour suivre vos revenus, dépenses, épargne et objectifs financiers.'],
            ['cat' => 'finance-investissement', 'name' => 'Guide Créer une Startup en Algérie',       'slug' => 'guide-creer-startup-algerie',       'price' => 790, 'old_price' => 1090, 'sales' => 540,  'rating' => 4.6, 'file_type' => 'pdf',  'pages' => 92,  'description' => 'Tout sur l\'écosystème startup algérien : ANSEJ, ANADE, levée de fonds et success stories.'],
            ['cat' => 'finance-investissement', 'name' => 'Calculateur de Rentabilité Immobilière',   'slug' => 'calculateur-rentabilite-immobilier', 'price' => 590, 'old_price' => null, 'sales' => 380,  'rating' => 4.8, 'file_type' => 'xlsx','pages' => null, 'description' => 'Outil Excel pour calculer la rentabilité d\'un bien immobilier : loyer, charges, impôts, plus-value.'],
        ];

        $productIds = [];
        foreach ($productsData as $p) {
            $product = Product::create([
                'category_id'  => $categoryMap[$p['cat']],
                'seller_id'    => $sellerIds[array_rand($sellerIds)],
                'name'         => $p['name'],
                'slug'         => $p['slug'],
                'product_type' => 'digital',
                'description'  => $p['description'],
                'price'        => $p['price'],
                'old_price'    => $p['old_price'] ?? null,
                'file_path'    => 'products/' . $p['slug'] . '.' . $p['file_type'],
                'file_type'    => $p['file_type'],
                'pages'        => $p['pages'] ?? null,
                'is_active'    => true,
                'sales_count'  => $p['sales'],
                'rating_avg'   => $p['rating'],
                'created_at'   => Carbon::now()->subDays(rand(10, 365)),
            ]);
            $productIds[] = $product->id;
        }

        $serviceProducts = [
            [
                'seller_email' => 'yacine@email.dz',
                'category_slug' => 'developpement-web',
                'name' => 'Revue de code Laravel',
                'slug' => 'revue-code-laravel-service',
                'price' => 4500,
                'description' => 'Audit rapide de votre projet Laravel avec recommandations sur architecture, performance, securite et qualite du code.',
            ],
            [
                'seller_email' => 'ahmed@email.dz',
                'category_slug' => 'documents-business',
                'name' => 'Consulting marketing digital 1h',
                'slug' => 'consulting-marketing-digital-1h',
                'price' => 6000,
                'description' => 'Session individuelle pour clarifier votre strategie de contenu, acquisition, tunnel de vente et positionnement.',
            ],
            [
                'seller_email' => 'fatima@email.dz',
                'category_slug' => 'templates-reseaux-sociaux',
                'name' => 'Creation de kit visuel sur mesure',
                'slug' => 'creation-kit-visuel-sur-mesure',
                'price' => 8500,
                'description' => 'Conception d un kit branding avec palette, typos, mini charte et templates adaptes a votre marque.',
            ],
        ];

        foreach ($serviceProducts as $service) {
            $seller = User::where('email', $service['seller_email'])->first();
            $categoryId = $categoryMap[$service['category_slug']] ?? null;

            if (!$seller || !$categoryId) {
                continue;
            }

            Product::create([
                'category_id' => $categoryId,
                'seller_id' => $seller->id,
                'name' => $service['name'],
                'slug' => $service['slug'],
                'product_type' => 'service',
                'description' => $service['description'],
                'price' => $service['price'],
                'old_price' => null,
                'file_path' => null,
                'file_type' => null,
                'pages' => null,
                'is_active' => true,
                'sales_count' => rand(8, 30),
                'rating_avg' => rand(44, 50) / 10,
                'created_at' => Carbon::now()->subDays(rand(5, 60)),
            ]);
        }

        // ─────────────────────────────────────────
        //  COUPONS
        // ─────────────────────────────────────────

        $coupons = [
            ['code' => 'DZ10',       'discount_percent' => 10, 'usage_limit' => 100,  'used_count' => 47,  'expires_at' => Carbon::now()->addYear()],
            ['code' => 'BIENVENUE20','discount_percent' => 20, 'usage_limit' => 50,   'used_count' => 12,  'expires_at' => Carbon::now()->addMonths(6)],
            ['code' => 'BAC2025',    'discount_percent' => 15, 'usage_limit' => 200,  'used_count' => 156, 'expires_at' => Carbon::now()->addMonths(3)],
            ['code' => 'RAMADAN30',  'discount_percent' => 30, 'usage_limit' => 500,  'used_count' => 489, 'expires_at' => Carbon::now()->subDays(10), 'is_active' => false],
            ['code' => 'PRO50',      'discount_percent' => 50, 'usage_limit' => 20,   'used_count' => 3,   'expires_at' => Carbon::now()->addMonths(2)],
        ];

        foreach ($coupons as $c) {
            Coupon::create([
                'code'             => $c['code'],
                'discount_percent' => $c['discount_percent'],
                'is_active'        => $c['is_active'] ?? true,
                'usage_limit'      => $c['usage_limit'],
                'used_count'       => $c['used_count'],
                'expires_at'       => $c['expires_at'],
            ]);
        }

        // ─────────────────────────────────────────
        //  BLOG POSTS
        // ─────────────────────────────────────────

        $blogData = [
            ['title' => 'Comment lancer son activité freelance en Algérie en 2025',              'slug' => 'lancer-activite-freelance-algerie-2025',             'category' => 'Freelance',   'read_time' => 8,  'excerpt' => 'Découvrez les étapes clés pour démarrer votre carrière de freelance en Algérie : statut, plateformes et tarification.'],
            ['title' => 'Les meilleurs outils de productivité pour étudiants algériens',         'slug' => 'meilleurs-outils-productivite-etudiants-algeriens',  'category' => 'Éducation',   'read_time' => 5,  'excerpt' => 'Optimisez votre temps d\'étude avec ces outils numériques indispensables et gratuits.'],
            ['title' => 'Marketing digital en Algérie : guide complet 2025',                    'slug' => 'marketing-digital-algerie-guide-complet-2025',       'category' => 'Marketing',   'read_time' => 12, 'excerpt' => 'Développez votre stratégie de marketing digital adaptée au marché algérien.'],
            ['title' => 'Comment créer un CV qui attire les recruteurs en Algérie',             'slug' => 'creer-cv-attire-recruteurs-algerie',                 'category' => 'Carrière',    'read_time' => 6,  'excerpt' => 'Les conseils pratiques pour rédiger un CV percutant qui passe les filtres des recruteurs.'],
            ['title' => 'Les tendances e-commerce en Algérie pour 2025',                        'slug' => 'tendances-ecommerce-algerie-2025',                   'category' => 'E-commerce',  'read_time' => 9,  'excerpt' => 'Analyse des tendances et opportunités du commerce électronique en Algérie cette année.'],
            ['title' => 'Formation en ligne : comment choisir la bonne plateforme',             'slug' => 'formation-en-ligne-choisir-bonne-plateforme',        'category' => 'Formation',   'read_time' => 7,  'excerpt' => 'Guide pour sélectionner la plateforme de formation en ligne adaptée à vos objectifs.'],
            ['title' => 'Les 10 métiers du numérique les mieux payés en Algérie',              'slug' => 'metiers-numeriques-mieux-payes-algerie',             'category' => 'Carrière',    'read_time' => 8,  'excerpt' => 'Découvrez quels métiers du digital offrent les meilleures rémunérations sur le marché algérien.'],
            ['title' => 'Canva pour les débutants : guide complet en arabe et français',        'slug' => 'canva-debutants-guide-complet-arabe-francais',       'category' => 'Design',      'read_time' => 10, 'excerpt' => 'Apprenez à créer des visuels professionnels avec Canva, expliqué étape par étape.'],
            ['title' => 'Comment réussir son Bac avec les ressources numériques',               'slug' => 'reussir-bac-ressources-numeriques',                  'category' => 'Éducation',   'read_time' => 6,  'excerpt' => 'Stratégies et ressources numériques pour maximiser vos chances de succès au Baccalauréat.'],
            ['title' => 'Investir dans l\'immobilier en Algérie : ce qu\'il faut savoir',      'slug' => 'investir-immobilier-algerie-guide',                  'category' => 'Finance',     'read_time' => 11, 'excerpt' => 'Guide pratique pour investir intelligemment dans l\'immobilier algérien en 2025.'],
            ['title' => 'TikTok pour les entrepreneurs algériens : stratégie complète',        'slug' => 'tiktok-entrepreneurs-algeriens-strategie',           'category' => 'Marketing',   'read_time' => 7,  'excerpt' => 'Comment utiliser TikTok pour développer votre marque et trouver des clients en Algérie.'],
            ['title' => 'Créer sa micro-entreprise en Algérie : guide ANADE & ANSEJ',          'slug' => 'micro-entreprise-algerie-anade-ansej',               'category' => 'Business',    'read_time' => 13, 'excerpt' => 'Tout ce que vous devez savoir pour créer votre micro-entreprise avec les dispositifs d\'aide algériens.'],
        ];

        foreach ($blogData as $i => $post) {
            BlogPost::create([
                'user_id'      => 1,
                'title'        => $post['title'],
                'slug'         => $post['slug'],
                'excerpt'      => $post['excerpt'],
                'content'      => implode('', array_map(fn($s) => "<p>{$s}</p>", [
                    $post['excerpt'],
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur interdum, nisl nisi consectetur nisl, nec consectetur nisl nisi vel nisi.',
                    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
                    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
                ])),
                'category'     => $post['category'],
                'read_time'    => $post['read_time'],
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(count($blogData) - $i),
                'views_count'  => rand(200, 8000),
            ]);
        }

        // ─────────────────────────────────────────
        //  ORDERS, PAYMENTS, DOWNLOADS & REVIEWS
        // ─────────────────────────────────────────

        $ordersData = [
            [
                'user_id'    => $buyerIds[0],
                'number'     => 'CMD-001',
                'status'     => 'completed',
                'method'     => 'CIB',
                'products'   => [0, 2, 3],   // indices into $productIds
                'coupon'     => null,
                'discount'   => 0,
                'days_ago'   => 60,
            ],
            [
                'user_id'    => $buyerIds[1],
                'number'     => 'CMD-002',
                'status'     => 'completed',
                'method'     => 'BaridiMob',
                'products'   => [6, 7],
                'coupon'     => 'DZ10',
                'discount'   => 10,
                'days_ago'   => 45,
            ],
            [
                'user_id'    => $buyerIds[2],
                'number'     => 'CMD-003',
                'status'     => 'completed',
                'method'     => 'Dahabia',
                'products'   => [14, 20, 21],
                'coupon'     => null,
                'discount'   => 0,
                'days_ago'   => 30,
            ],
            [
                'user_id'    => $buyerIds[3],
                'number'     => 'CMD-004',
                'status'     => 'pending',
                'method'     => 'CIB',
                'products'   => [28],
                'coupon'     => 'BIENVENUE20',
                'discount'   => 20,
                'days_ago'   => 2,
            ],
            [
                'user_id'    => $buyerIds[4],
                'number'     => 'CMD-005',
                'status'     => 'completed',
                'method'     => 'Virement',
                'products'   => [1, 8, 15, 22],
                'coupon'     => null,
                'discount'   => 0,
                'days_ago'   => 15,
            ],
            [
                'user_id'    => $buyerIds[5],
                'number'     => 'CMD-006',
                'status'     => 'completed',
                'method'     => 'BaridiMob',
                'products'   => [5, 30],
                'coupon'     => 'BAC2025',
                'discount'   => 15,
                'days_ago'   => 7,
            ],
            [
                'user_id'    => $buyerIds[6],
                'number'     => 'CMD-007',
                'status'     => 'cancelled',
                'method'     => 'CIB',
                'products'   => [11],
                'coupon'     => null,
                'discount'   => 0,
                'days_ago'   => 20,
            ],
            [
                'user_id'    => $buyerIds[7],
                'number'     => 'CMD-008',
                'status'     => 'completed',
                'method'     => 'Dahabia',
                'products'   => [4, 9, 33],
                'coupon'     => null,
                'discount'   => 0,
                'days_ago'   => 5,
            ],
        ];

        foreach ($ordersData as $od) {
            $items     = collect($od['products'])->map(fn($idx) => $productIds[$idx] ?? $productIds[0]);
            $prices    = Product::whereIn('id', $items)->pluck('price', 'id');
            $subtotal  = $prices->sum();
            $discount  = (int) round($subtotal * ($od['discount'] / 100));
            $total     = $subtotal - $discount;
            $createdAt = Carbon::now()->subDays($od['days_ago']);

            $order = Order::create([
                'user_id'      => $od['user_id'],
                'order_number' => $od['number'],
                'status'       => $od['status'],
                'subtotal'     => $subtotal,
                'discount'     => $discount,
                'total'        => $total,
                'coupon_code'  => $od['coupon'],
                'created_at'   => $createdAt,
                'updated_at'   => $createdAt,
            ]);

            foreach ($items as $productId) {
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $productId,
                    'price'      => $prices[$productId],
                ]);
            }

            Payment::create([
                'order_id'       => $order->id,
                'user_id'        => $od['user_id'],
                'payment_method' => $od['method'],
                'status'         => $od['status'] === 'completed' ? 'completed' : ($od['status'] === 'cancelled' ? 'failed' : 'pending'),
                'amount'         => $total,
                'transaction_id' => 'TXN-' . strtoupper(Str::random(10)),
                'created_at'     => $createdAt,
            ]);

            if ($od['status'] === 'completed') {
                foreach ($items as $productId) {
                    Download::create([
                        'user_id'        => $od['user_id'],
                        'product_id'     => $productId,
                        'order_id'       => $order->id,
                        'downloaded_at'  => $createdAt->copy()->addMinutes(rand(5, 60)),
                        'download_count' => rand(1, 4),
                    ]);
                }
            }
        }

        // ─────────────────────────────────────────
        //  REVIEWS
        // ─────────────────────────────────────────

        $reviewsData = [
            ['user_id' => $buyerIds[0], 'product_id' => $productIds[0],  'rating' => 5, 'comment' => 'Excellent guide, très complet et bien structuré. J\'ai lancé mon activité en moins d\'un mois !'],
            ['user_id' => $buyerIds[1], 'product_id' => $productIds[6],  'rating' => 5, 'comment' => 'Pack incroyable, ma fille a eu son Bac grâce aux résumés. Je recommande vivement !'],
            ['user_id' => $buyerIds[2], 'product_id' => $productIds[14], 'rating' => 4, 'comment' => 'Templates de qualité professionnelle. Quelques ajustements de couleurs mais globalement parfait.'],
            ['user_id' => $buyerIds[3], 'product_id' => $productIds[20], 'rating' => 5, 'comment' => 'CV moderne et élégant. J\'ai décroché un entretien dans la semaine !'],
            ['user_id' => $buyerIds[4], 'product_id' => $productIds[1],  'rating' => 4, 'comment' => 'Très bon ebook sur la productivité. Des conseils applicables immédiatement au quotidien.'],
            ['user_id' => $buyerIds[5], 'product_id' => $productIds[30], 'rating' => 5, 'comment' => 'Formation SEO de qualité, j\'ai déjà vu des résultats en 3 semaines sur mon site.'],
            ['user_id' => $buyerIds[6], 'product_id' => $productIds[7],  'rating' => 5, 'comment' => 'Les templates Canva sont superbes ! Mon feed Instagram a complètement changé.'],
            ['user_id' => $buyerIds[7], 'product_id' => $productIds[4],  'rating' => 5, 'comment' => 'Business plan très bien fait, adapté au contexte algérien. Bravo au créateur !'],
            ['user_id' => $buyerIds[0], 'product_id' => $productIds[29], 'rating' => 4, 'comment' => 'Formation Canva claire et bien expliquée. Idéale pour les débutants comme moi.'],
            ['user_id' => $buyerIds[1], 'product_id' => $productIds[8],  'rating' => 5, 'comment' => 'Pack BEM indispensable pour les parents qui veulent aider leurs enfants. Très complet.'],
            ['user_id' => $buyerIds[2], 'product_id' => $productIds[21], 'rating' => 3, 'comment' => 'Contenu intéressant mais certaines sections mériteraient d\'être mises à jour pour 2025.'],
            ['user_id' => $buyerIds[3], 'product_id' => $productIds[35], 'rating' => 5, 'comment' => 'Le thème WordPress est magnifique et bien optimisé. Support réactif en cas de problème.'],
            ['user_id' => $buyerIds[4], 'product_id' => $productIds[40], 'rating' => 4, 'comment' => 'Le tableau de suivi financier est très bien conçu. Exactement ce que je cherchais.'],
            ['user_id' => $buyerIds[5], 'product_id' => $productIds[5],  'rating' => 5, 'comment' => 'Formation marketing digital ultra complète ! Les modules sur Facebook Ads m\'ont aidé à tripler mes ventes.'],
            ['user_id' => $buyerIds[6], 'product_id' => $productIds[32], 'rating' => 4, 'comment' => 'Presets Lightroom magnifiques, donnent un rendu très professionnel à mes photos.'],
        ];

        foreach ($reviewsData as $r) {
            Review::create(array_merge($r, ['is_approved' => true]));
        }

        SellerMessage::create([
            'seller_id' => $sellerIds[0],
            'sender_id' => $buyerIds[0],
            'product_id' => $productIds[0],
            'sender_name' => 'Mohamed A.',
            'sender_email' => 'mohamed@email.dz',
            'sender_phone' => '0555 34 56 78',
            'subject' => 'Question avant achat',
            'message' => 'Bonjour, est-ce que ce produit contient aussi des exemples pratiques adaptes au marche algerien ?',
        ]);

        SellerMessage::create([
            'seller_id' => $sellerIds[2],
            'sender_id' => $buyerIds[3],
            'product_id' => $productIds[5],
            'sender_name' => 'Lina M.',
            'sender_email' => 'lina@email.dz',
            'sender_phone' => '0555 66 77 88',
            'subject' => 'Demande d informations',
            'message' => 'Je souhaite savoir si une mise a jour est incluse apres achat et si le contenu convient aux debutants.',
        ]);
    }
}
