<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            // Role
            $table->enum('role', ['user', 'artisan', 'admin'])->default('user');
            
            // Authentication
            $table->string('email')->unique();
            $table->string('password');
            
            // Contact
            $table->string('phone_no')->nullable()->unique();
            $table->string('whatsapp_no')->nullable()->unique();
            
            // Personal
            $table->string('f_name');
            $table->string('l_name');
            $table->string('profile_pic_url')->nullable();
            $table->string('nin')->nullable()->unique();
            
            // Timestamps
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};