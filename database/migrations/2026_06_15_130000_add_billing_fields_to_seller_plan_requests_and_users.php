<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('seller_plan_requests', function (Blueprint $table) {
            $table->unsignedInteger('plan_price')->default(0)->after('requested_plan');
            $table->string('currency', 10)->default('DZD')->after('plan_price');
            $table->string('payment_status')->default('pending_payment')->after('status');
            $table->timestamp('paid_at')->nullable()->after('payment_proof');
            $table->timestamp('expires_at')->nullable()->after('reviewed_at');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('seller_plan_started_at')->nullable()->after('seller_plan');
            $table->timestamp('seller_plan_expires_at')->nullable()->after('seller_plan_started_at');
        });
    }

    public function down(): void
    {
        Schema::table('seller_plan_requests', function (Blueprint $table) {
            $table->dropColumn([
                'plan_price',
                'currency',
                'payment_status',
                'paid_at',
                'expires_at',
            ]);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'seller_plan_started_at',
                'seller_plan_expires_at',
            ]);
        });
    }
};
