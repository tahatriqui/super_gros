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
        Schema::create('ssous_categories', function (Blueprint $table) {
            $table->id();
            $table->string('nom_scat', 250);
            $table->unsignedBigInteger('scat_id');
            $table->foreign('scat_id')
            ->references('id')
            ->on('sous_categories')
            ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
