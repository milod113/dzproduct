<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 20)->default('client')->after('is_admin');
        });

        DB::table('users')
            ->where('is_admin', true)
            ->update(['role' => 'admin']);

        DB::table('users')
            ->where('is_admin', false)
            ->where(function ($query) {
                $query->where('is_verified_seller', true)
                    ->orWhere('is_top_rated_seller', true)
                    ->orWhere('is_official_partner', true);
            })
            ->update(['role' => 'seller']);

        DB::table('users')
            ->whereIn('id', function ($query) {
                $query->select('seller_id')
                    ->from('products')
                    ->whereNotNull('seller_id');
            })
            ->update(['role' => 'seller']);
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
