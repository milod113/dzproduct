<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('products', 'old_price')) {
            Schema::table('products', function (Blueprint $table) {
                $table->decimal('old_price', 10, 2)->nullable()->after('price');
                $table->integer('pages')->nullable()->after('file_type');
            });
        }

        if (! Schema::hasColumn('orders', 'coupon_code')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->string('coupon_code')->nullable()->after('discount');
            });
        }

        if (! Schema::hasColumn('payments', 'amount')) {
            Schema::table('payments', function (Blueprint $table) {
                $table->decimal('amount', 10, 2)->nullable()->after('status');
            });
        }

        if (! Schema::hasColumn('blog_posts', 'read_time')) {
            Schema::table('blog_posts', function (Blueprint $table) {
                $table->integer('read_time')->nullable()->after('category');
                $table->integer('views_count')->default(0)->after('read_time');
            });
        }
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['old_price', 'pages']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('coupon_code');
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn('amount');
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['read_time', 'views_count']);
        });
    }
};
