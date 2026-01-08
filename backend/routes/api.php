<?php
    
use Illuminate\Http\Request;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\api\AuthController;
use Illuminate\Support\Facades\Route;

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

    // USER
    Route::middleware('role:user')->group(function () {
        Route::post('/documents', [DocumentController::class, 'store']);
        Route::put('/documents/{id}', [DocumentController::class, 'update']);
        Route::get('/documents/my', [DocumentController::class, 'myDocuments']);
    });

    // ADMIN
    Route::middleware('role:admin')->group(function () {
        Route::get('/documents', [DocumentController::class, 'index']);
        Route::delete('/documents/{id}', [DocumentController::class, 'destroy']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});


