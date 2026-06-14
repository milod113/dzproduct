<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_verified_seller')->default(false)->after('is_admin');
            $table->boolean('is_top_rated_seller')->default(false)->after('is_verified_seller');
            $table->boolean('is_official_partner')->default(false)->after('is_top_rated_seller');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('seller_id')->nullable()->after('category_id')->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropConstrainedForeignId('seller_id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['is_verified_seller', 'is_top_rated_seller', 'is_official_partner']);
        });
    }
};
