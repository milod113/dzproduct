<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (! Schema::hasColumn('products', 'preview_points')) {
                $table->json('preview_points')->nullable()->after('benefits');
            }

            if (! Schema::hasColumn('products', 'faq_items')) {
                $table->json('faq_items')->nullable()->after('preview_points');
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $columns = ['preview_points', 'faq_items'];
            $existing = array_values(array_filter($columns, fn ($column) => Schema::hasColumn('products', $column)));

            if ($existing !== []) {
                $table->dropColumn($existing);
            }
        });
    }
};
