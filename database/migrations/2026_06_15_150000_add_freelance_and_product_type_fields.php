<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_available_for_freelance')->default(false)->after('seller_since');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('product_type')->default('digital')->after('slug');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_available_for_freelance');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('product_type');
        });
    }
};
