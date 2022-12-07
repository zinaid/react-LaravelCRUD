<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('add_task', [TaskController::class, 'store'])->name('add_task');
Route::get('tasks', [TaskController::class, 'index'])->name('tasks');
Route::get('tasks/{id}', [TaskController::class, 'show'])->name('tasks');
Route::post('tasks/{id}', [TaskController::class, 'update'])->name('tasks');
Route::delete('tasks/{id}', [TaskController::class, 'destroy'])->name('tasks');