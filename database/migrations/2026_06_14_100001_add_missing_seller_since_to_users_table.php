<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'seller_since')) {
            Schema::table('users', function (Blueprint $table) {
                $table->timestamp('seller_since')->nullable()->after('is_official_partner');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'seller_since')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('seller_since');
            });
        }
    }
};
