<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('documents')->insert([
            [
                'document_number' => 'DOC-001',
                'title' => 'Panduan Sistem Informasi',
                'category' => 'Panduan',
                'unit' => 'IT',
                'document_date' => '2024-01-10',
                'file_path' => 'documents/panduan-sistem-informasi.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'document_number' => 'DOC-002',
                'title' => 'Standar Operasional Prosedur',
                'category' => 'SOP',
                'unit' => 'HRD',
                'document_date' => '2024-02-05',
                'file_path' => 'documents/sop-hrd.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'document_number' => 'DOC-003',
                'title' => 'Laporan Tahunan',
                'category' => 'Laporan',
                'unit' => 'Keuangan',
                'document_date' => '2023-12-31',
                'file_path' => 'documents/laporan-tahunan.pdf',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
