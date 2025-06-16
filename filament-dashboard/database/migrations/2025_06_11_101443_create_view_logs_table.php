<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('view_logs', function (Blueprint $table) {
            $table->id();

            // Logged in user or null for guest
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');

            // URL or path visited
            $table->string('url');

            // IP and browser info (optional)
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();

            $table->timestamps(); // Logs the exact time
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('view_logs');
    }
};
