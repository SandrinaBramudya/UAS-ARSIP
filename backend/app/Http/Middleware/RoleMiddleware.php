<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role): Response
    {
        // ✅ Cek apakah user terautentikasi
        if (!$request->user()) {
            Log::warning('RoleMiddleware: User not authenticated');
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        $user = $request->user();
        
        // 🔍 Debug logging
        Log::info('RoleMiddleware check', [
            'user_id' => $user->id,
            'user_role' => $user->role,
            'required_role' => $role,
            'match' => $user->role === $role
        ]);

        // ✅ Cek role
        if ($user->role !== $role) {
            Log::warning('RoleMiddleware: Role mismatch', [
                'user_role' => $user->role,
                'required_role' => $role
            ]);
            
            return response()->json([
                'message' => 'Unauthorized',
                'debug' => [
                    'your_role' => $user->role,
                    'required_role' => $role
                ]
            ], 403);
        }

        return $next($request);
    }
}