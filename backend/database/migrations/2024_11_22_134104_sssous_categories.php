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
        Schema::create('sssous_categories', function (Blueprint $table) {
            $table->id();
            $table->string('nom_ssscat', 250);
            $table->unsignedBigInteger('sscat_id');
            $table->foreign('sscat_id')
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
