<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_missions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('client_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('seller_id')->constrained('users')->cascadeOnDelete();
            $table->string('mission_number')->unique();
            $table->string('status')->default('reserved');
            $table->string('brief_title')->nullable();
            $table->text('brief_objective')->nullable();
            $table->text('brief_requirements')->nullable();
            $table->string('brief_deadline')->nullable();
            $table->string('brief_reference_link')->nullable();
            $table->text('brief_notes')->nullable();
            $table->text('seller_delivery_message')->nullable();
            $table->timestamp('brief_submitted_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_missions');
    }
};
