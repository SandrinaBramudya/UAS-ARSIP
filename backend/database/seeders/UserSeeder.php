<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ADMIN
        User::create([
            'name' => 'Admin Arsip',
            'email' => 'admin@arsip.test',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // USER
        User::create([
            'name' => 'User Arsip',
            'email' => 'user@arsip.test',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
    }
}
