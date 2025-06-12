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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('filename')->unique();
            $table->string('path')->unique();
            $table->string('type'); // e.g., image, video, audio
            $table->string('size'); // e.g., 2MB, 500KB
            $table->string('alt_text'); 
            $table->string('caption')->nullable(); // Optional caption for the media
            $table->string('uploader'); // Name or ID of the user who uploaded the media
            $table->unsignedBigInteger('uploader_id')->nullable(); // Nullable for guest uploads
            $table->foreign('uploader_id')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
