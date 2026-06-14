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
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin Boutique Digitale',
            'email' => 'admin@boutiquedigitaledz.dz',
            'phone' => '0555 12 34 56',
            'wilaya' => 'Alger',
            'is_admin' => true,
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Ahmed K.',
            'email' => 'ahmed@email.dz',
            'phone' => '0555 98 76 54',
            'wilaya' => 'Oran',
            'is_verified_seller' => true,
            'is_top_rated_seller' => true,
        ]);

        User::factory()->create([
            'name' => 'Fatima Z.',
            'email' => 'fatima@email.dz',
            'phone' => '0555 45 67 89',
            'wilaya' => 'Constantine',
            'is_verified_seller' => true,
        ]);

        User::factory()->create([
            'name' => 'Yacine M.',
            'email' => 'yacine@email.dz',
            'phone' => '0555 32 10 98',
            'wilaya' => 'Alger',
            'is_verified_seller' => true,
            'is_official_partner' => true,
        ]);

        User::factory()->create([
            'name' => 'Imane K.',
            'email' => 'imane@email.dz',
            'phone' => '0555 76 54 32',
            'wilaya' => 'Béjaïa',
            'is_verified_seller' => true,
        ]);

        $categories = [
            ['name' => 'Ebooks', 'slug' => 'ebooks', 'description' => 'Guides et livres numériques inspirants', 'icon' => 'BookOpen', 'sort_order' => 1],
            ['name' => 'Packs Éducatifs', 'slug' => 'packs-educatifs', 'description' => 'Cours, résumés et exercices prêts à l\'emploi', 'icon' => 'GraduationCap', 'sort_order' => 2],
            ['name' => 'Templates Réseaux Sociaux', 'slug' => 'templates-reseaux-sociaux', 'description' => 'Templates Canva pour un feed professionnel', 'icon' => 'Layout', 'sort_order' => 3],
            ['name' => 'CV & Lettres de Motivation', 'slug' => 'cv-lettres-motivation', 'description' => 'Modèles modernes prêts à personnaliser', 'icon' => 'FileText', 'sort_order' => 4],
            ['name' => 'Documents Business', 'slug' => 'documents-business', 'description' => 'Modèles de documents pour votre entreprise', 'icon' => 'Briefcase', 'sort_order' => 5],
            ['name' => 'Mini-Cours', 'slug' => 'mini-cours', 'description' => 'Formations courtes pour passer à l\'action', 'icon' => 'Video', 'sort_order' => 6],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        $productsData = [
            ['category' => 1, 'name' => 'Guide du Freelance en Algérie', 'slug' => 'guide-freelance-algerie', 'price' => 590, 'sales' => 1240, 'rating' => 4.8, 'description' => 'Un guide complet pour lancer votre activité freelance en Algérie.'],
            ['category' => 2, 'name' => 'Pack Réussite Bac Algérie', 'slug' => 'pack-reussite-bac', 'price' => 790, 'sales' => 3200, 'rating' => 4.9, 'description' => 'Cours, résumés et exercices pour réussir le Bac.'],
            ['category' => 3, 'name' => 'Templates Canva Pro Algérie', 'slug' => 'templates-canva-pro', 'price' => 490, 'sales' => 890, 'rating' => 4.7, 'description' => '50 templates Canva pour un feed professionnel.'],
            ['category' => 4, 'name' => 'CV Moderne Algérie', 'slug' => 'cv-moderne-algerie', 'price' => 390, 'sales' => 2100, 'rating' => 4.6, 'description' => 'Modèle de CV moderne prêt à personnaliser.'],
            ['category' => 5, 'name' => 'Business Plan Algérie', 'slug' => 'business-plan-algerie', 'price' => 690, 'sales' => 670, 'rating' => 4.8, 'description' => 'Modèle de business plan adapté au marché algérien.'],
            ['category' => 6, 'name' => 'Marketing Digital Algérie', 'slug' => 'marketing-digital-algerie', 'price' => 1290, 'sales' => 1560, 'rating' => 4.9, 'description' => 'Formation complète en marketing digital.'],
            ['category' => 1, 'name' => 'Ebook Productivité', 'slug' => 'ebook-productivite', 'price' => 490, 'sales' => 980, 'rating' => 4.5, 'description' => 'Maîtrisez votre temps et boostez votre productivité.'],
            ['category' => 2, 'name' => 'Pack Langues Étrangères', 'slug' => 'pack-langues-etrangeres', 'price' => 990, 'sales' => 1450, 'rating' => 4.7, 'description' => 'Apprenez l\'anglais, le français et l\'espagnol.'],
            ['category' => 3, 'name' => 'Templates Instagram', 'slug' => 'templates-instagram', 'price' => 390, 'sales' => 2300, 'rating' => 4.4, 'description' => 'Templates stories et posts Instagram.'],
            ['category' => 4, 'name' => 'Lettre de Motivation Pro', 'slug' => 'lettre-motivation-pro', 'price' => 290, 'sales' => 1800, 'rating' => 4.5, 'description' => 'Modèle de lettre de motivation professionnelle.'],
            ['category' => 5, 'name' => 'Pack Factures Pro', 'slug' => 'pack-factures-pro', 'price' => 490, 'sales' => 890, 'rating' => 4.6, 'description' => 'Modèles de factures professionnelles.'],
            ['category' => 6, 'name' => 'Formation Canva Débutant', 'slug' => 'formation-canva-debutant', 'price' => 990, 'sales' => 2100, 'rating' => 4.8, 'description' => 'Apprenez Canva de zéro à pro.'],
            ['category' => 1, 'name' => 'Guide E-commerce Algérie', 'slug' => 'guide-ecommerce-algerie', 'price' => 690, 'sales' => 760, 'rating' => 4.7, 'description' => 'Lancez votre boutique en ligne en Algérie.'],
            ['category' => 2, 'name' => 'Pack Préparation Concours', 'slug' => 'pack-preparation-concours', 'price' => 890, 'sales' => 940, 'rating' => 4.6, 'description' => 'Préparez les concours administratifs.'],
            ['category' => 3, 'name' => 'Templates LinkedIn', 'slug' => 'templates-linkedin', 'price' => 350, 'sales' => 670, 'rating' => 4.3, 'description' => 'Optimisez votre profil LinkedIn.'],
            ['category' => 4, 'name' => 'Portfolio Design Pro', 'slug' => 'portfolio-design-pro', 'price' => 490, 'sales' => 450, 'rating' => 4.7, 'description' => 'Template de portfolio pour créatifs.'],
            ['category' => 5, 'name' => 'Pack Contrat Travail', 'slug' => 'pack-contrat-travail', 'price' => 590, 'sales' => 340, 'rating' => 4.5, 'description' => 'Modèles de contrats de travail.'],
            ['category' => 6, 'name' => 'Formation SEO Algérie', 'slug' => 'formation-seo-algerie', 'price' => 1490, 'sales' => 1200, 'rating' => 4.9, 'description' => 'Maîtrisez le référencement web.'],
            ['category' => 1, 'name' => 'Ebook Bien-être', 'slug' => 'ebook-bien-etre', 'price' => 390, 'sales' => 1500, 'rating' => 4.4, 'description' => 'Guide du bien-être au quotidien.'],
            ['category' => 2, 'name' => 'Pack Code et Programmation', 'slug' => 'pack-code-programmation', 'price' => 1290, 'sales' => 1100, 'rating' => 4.8, 'description' => 'Initiez-vous à la programmation.'],
            ['category' => 3, 'name' => 'Templates TikTok', 'slug' => 'templates-tiktok', 'price' => 290, 'sales' => 3200, 'rating' => 4.2, 'description' => 'Templates vidéo TikTok tendance.'],
            ['category' => 4, 'name' => 'Pack Entretien Emploi', 'slug' => 'pack-entretien-emploi', 'price' => 490, 'sales' => 780, 'rating' => 4.5, 'description' => 'Préparez vos entretiens avec confiance.'],
            ['category' => 5, 'name' => 'Pack Comptabilité', 'slug' => 'pack-comptabilite', 'price' => 790, 'sales' => 560, 'rating' => 4.6, 'description' => 'Modèles comptables pour entrepreneurs.'],
            ['category' => 6, 'name' => 'Formation Montage Vidéo', 'slug' => 'formation-montage-video', 'price' => 1490, 'sales' => 890, 'rating' => 4.7, 'description' => 'Créez des vidéos professionnelles.'],
        ];

        foreach ($productsData as $p) {
            Product::create([
                'category_id' => $p['category'],
                'seller_id' => collect([2, 3, 4, 5])->random(),
                'name' => $p['name'],
                'slug' => $p['slug'],
                'description' => $p['description'],
                'price' => $p['price'],
                'file_path' => 'products/' . $p['slug'] . '.zip',
                'file_type' => 'zip',
                'is_active' => true,
                'sales_count' => $p['sales'],
                'rating_avg' => $p['rating'],
            ]);
        }

        Coupon::create([
            'code' => 'DZ10',
            'discount_percent' => 10,
            'is_active' => true,
            'usage_limit' => 100,
            'used_count' => 5,
            'expires_at' => Carbon::now()->addYear(),
        ]);

        $blogData = [
            ['title' => 'Comment lancer son activité freelance en Algérie en 2025', 'slug' => 'lancer-activite-freelance-algerie-2025', 'category' => 'Freelance', 'excerpt' => 'Découvrez les étapes clés pour démarrer votre carrière de freelance en Algérie.'],
            ['title' => 'Les meilleurs outils de productivité pour étudiants algériens', 'slug' => 'meilleurs-outils-productivite-etudiants-algeriens', 'category' => 'Éducation', 'excerpt' => 'Optimisez votre temps d\'étude avec ces outils numériques indispensables.'],
            ['title' => 'Marketing digital en Algérie : guide complet 2025', 'slug' => 'marketing-digital-algerie-guide-complet-2025', 'category' => 'Marketing', 'excerpt' => 'Développez votre stratégie de marketing digital adaptée au marché algérien.'],
            ['title' => 'Comment créer un CV qui attire les recruteurs en Algérie', 'slug' => 'creer-cv-attire-recruteurs-algerie', 'category' => 'Carrière', 'excerpt' => 'Les conseils pratiques pour rédiger un CV percutant.'],
            ['title' => 'Les tendances e-commerce en Algérie pour 2025', 'slug' => 'tendances-ecommerce-algerie-2025', 'category' => 'E-commerce', 'excerpt' => 'Analyse des tendances du commerce électronique en Algérie.'],
            ['title' => 'Formation en ligne : comment choisir la bonne plateforme', 'slug' => 'formation-en-ligne-choisir-bonne-plateforme', 'category' => 'Formation', 'excerpt' => 'Guide pour sélectionner la plateforme de formation en ligne adaptée.'],
        ];

        foreach ($blogData as $i => $post) {
            BlogPost::create([
                'user_id' => 1,
                'title' => $post['title'],
                'slug' => $post['slug'],
                'excerpt' => $post['excerpt'],
                'content' => str_repeat('<p>' . $post['excerpt'] . '</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>', 3),
                'category' => $post['category'],
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(count($blogData) - $i),
            ]);
        }

        $order = Order::create([
            'user_id' => 2,
            'order_number' => 'CMD-001',
            'status' => 'completed',
            'subtotal' => 1870,
            'discount' => 0,
            'total' => 1870,
        ]);

        OrderItem::create(['order_id' => $order->id, 'product_id' => 1, 'price' => 590]);
        OrderItem::create(['order_id' => $order->id, 'product_id' => 3, 'price' => 490]);
        OrderItem::create(['order_id' => $order->id, 'product_id' => 4, 'price' => 790]);

        Payment::create([
            'order_id' => $order->id,
            'user_id' => 2,
            'payment_method' => 'CIB',
            'status' => 'completed',
            'transaction_id' => 'TXN-' . Str::random(10),
        ]);

        foreach ([1, 3, 4] as $productId) {
            Download::create([
                'user_id' => 2,
                'product_id' => $productId,
                'order_id' => $order->id,
                'downloaded_at' => Carbon::now(),
                'download_count' => 1,
            ]);
        }

        $reviewsData = [
            ['user_id' => 2, 'product_id' => 1, 'rating' => 5, 'comment' => 'Excellent guide, très utile pour les freelances en Algérie.', 'is_approved' => true],
            ['user_id' => 3, 'product_id' => 2, 'rating' => 5, 'comment' => 'Pack incroyable, ma fille a eu son bac grâce à ce résumé !', 'is_approved' => true],
            ['user_id' => 4, 'product_id' => 3, 'rating' => 4, 'comment' => 'Templates de qualité, quelques ajustements nécessaires.', 'is_approved' => true],
            ['user_id' => 5, 'product_id' => 4, 'rating' => 5, 'comment' => 'CV moderne et élégant, les recruteurs adorent.', 'is_approved' => true],
        ];

        foreach ($reviewsData as $r) {
            Review::create($r);
        }
    }
}
