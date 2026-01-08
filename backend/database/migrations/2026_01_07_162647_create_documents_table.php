<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();

            // RELATION
            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->string('document_number')->nullable();
            $table->string('title');
            $table->string('category');
            $table->string('unit')->nullable();

            $table->dateTime('document_date');

            $table->string('file_path');
            $table->unsignedBigInteger('file_size'); // BYTES

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
