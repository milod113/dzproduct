<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddThematicImageToCategories extends Migration
{
	public function up(): void
	{
		Schema::table('categories', function (Blueprint $table) {
			if (!Schema::hasColumn('categories', 'thematic_image')) {
				$table->string('thematic_image')->nullable()->after('image');
			}
		});
	}

	public function down(): void
	{
		Schema::table('categories', function (Blueprint $table) {
			if (Schema::hasColumn('categories', 'thematic_image')) {
				$table->dropColumn('thematic_image');
			}
		});
	}
}
