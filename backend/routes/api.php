<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

/*
|--------------------------------------------------------------------------
| PROTECTED
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // ✅ USER: Upload, Update, List My Documents
    Route::middleware('role:user')->group(function () {
        Route::post('/documents', [DocumentController::class, 'store']);
        Route::put('/documents/{document}', [DocumentController::class, 'update']);
        Route::get('/documents/my', [DocumentController::class, 'myDocuments']);
    });

    // ✅ ADMIN: List All Documents & Users
    Route::middleware('role:admin')->group(function () {
        Route::get('/documents', [DocumentController::class, 'index']);
        Route::get('/users', [UserController::class, 'index']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });

    // ✅ SHARED: Delete Document (User & Admin bisa akses)
    // Pengecekan kepemilikan ada di dalam controller
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);
    
    Route::post('/logout', [AuthController::class, 'logout']);
});