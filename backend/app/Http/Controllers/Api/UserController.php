<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    // =====================
    // ADMIN: LIHAT SEMUA USER
    // =====================
    public function index()
    {
        return User::withCount('documents')->get();
    }

    // =====================
    // ADMIN: HAPUS USER
    // =====================
    public function destroy(User $user)
    {
        if ($user->role === 'admin') {
            return response()->json([
                'message' => 'Admin tidak bisa dihapus'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus'
        ]);
    }
}
