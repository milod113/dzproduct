<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (! Schema::hasColumn('products', 'file_size_label')) {
                $table->string('file_size_label')->nullable()->after('pages');
            }

            if (! Schema::hasColumn('products', 'item_count')) {
                $table->integer('item_count')->nullable()->after('file_size_label');
            }

            if (! Schema::hasColumn('products', 'skill_level')) {
                $table->string('skill_level')->nullable()->after('item_count');
            }

            if (! Schema::hasColumn('products', 'usage_license')) {
                $table->string('usage_license')->nullable()->after('skill_level');
            }

            if (! Schema::hasColumn('products', 'version')) {
                $table->string('version')->nullable()->after('usage_license');
            }

            if (! Schema::hasColumn('products', 'last_updated_at')) {
                $table->timestamp('last_updated_at')->nullable()->after('version');
            }

            if (! Schema::hasColumn('products', 'included_items')) {
                $table->json('included_items')->nullable()->after('last_updated_at');
            }

            if (! Schema::hasColumn('products', 'compatible_with')) {
                $table->json('compatible_with')->nullable()->after('included_items');
            }

            if (! Schema::hasColumn('products', 'benefits')) {
                $table->json('benefits')->nullable()->after('compatible_with');
            }
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $columns = [
                'file_size_label',
                'item_count',
                'skill_level',
                'usage_license',
                'version',
                'last_updated_at',
                'included_items',
                'compatible_with',
                'benefits',
            ];

            $existing = array_values(array_filter($columns, fn ($column) => Schema::hasColumn('products', $column)));

            if ($existing !== []) {
                $table->dropColumn($existing);
            }
        });
    }
};
