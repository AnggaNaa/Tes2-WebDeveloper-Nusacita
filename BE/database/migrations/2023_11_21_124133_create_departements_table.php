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
        Schema::create('m_departements', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("name");
            $table->string("slug");
            $table->timestamps();
            $table->uuid("unit_id");
            $table->foreign('unit_id')->references('id')->on('m_units');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('m_departements');
    }
};
