 <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artisan_skill', function (Blueprint $table) {
            $table->uuid('artisan_id');
            $table->uuid('skill_id');
            
            $table->primary(['artisan_id', 'skill_id']);
            $table->foreign('artisan_id')->references('id')->on('artisans')->onDelete('cascade');
            $table->foreign('skill_id')->references('id')->on('skills')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artisan_skill');
    }
};