<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('likes', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('article_id');
    $table->enum('entity_type', ['article', 'comment'])->default('article');
    $table->unsignedBigInteger('entity_id')->nullable();
    $table->timestamps(); // This adds created_at and updated_at automatically

    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    $table->foreign('article_id')->references('id')->on('articles')->onDelete('cascade');
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};
