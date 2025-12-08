<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;

// Catch-all OPTIONS route to ensure preflight requests always receive CORS headers.
// This avoids failures when the browser sends a preflight to an URL with a trailing
// slash or where routing would otherwise redirect or return 404/405 without headers.
Route::options('{any}', function (Request $request) {
	return response('', 204)
		->header('Access-Control-Allow-Origin', '*')
		->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
		->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
})->where('any', '.*');

Route::get('/tasks', [TaskController::class, 'index']);
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); 
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/tasks/{task}', [TaskController::class, 'show']);
Route::put('/tasks/{task}', [TaskController::class, 'update']);