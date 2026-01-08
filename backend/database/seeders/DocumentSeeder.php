<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('role', 'user')->first();

        if (!$user) return;

        Document::create([
            'user_id' => $user->id,
            'document_number' => 'DOC-001',
            'title' => 'Dokumen Contoh',
            'category' => 'Administrasi',
            'unit' => 'TU',
            'document_date' => now(),
            'file_path' => 'uploads/documents/sample.pdf',
            'file_size' => 204800, // 200KB
        ]);
    }
}
