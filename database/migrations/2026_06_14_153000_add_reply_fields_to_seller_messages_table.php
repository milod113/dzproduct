<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('seller_messages', function (Blueprint $table) {
            $table->text('seller_reply')->nullable()->after('message');
            $table->timestamp('seller_replied_at')->nullable()->after('seller_reply');
        });
    }

    public function down(): void
    {
        Schema::table('seller_messages', function (Blueprint $table) {
            $table->dropColumn(['seller_reply', 'seller_replied_at']);
        });
    }
};
