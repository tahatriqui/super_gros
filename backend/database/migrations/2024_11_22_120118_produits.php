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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('details', 250);
            $table->string('img_pro', 250);
            $table->string('parametres', 250);
            $table->unsignedBigInteger('ssdcat_id');
            $table->foreign('ssdcat_id')
            ->references('id')
            ->on('ssous_categories')
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
