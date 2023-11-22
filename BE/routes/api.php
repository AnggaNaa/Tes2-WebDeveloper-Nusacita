<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\DepartementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signin', [UserController::class, "signIn"]);
Route::post('/signup', [UserController::class, "signUp"]);

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/units', [UnitController::class, "getUnits"]);
    Route::get('/units/{id}', [UnitController::class, "getDetailUnit"]);
    Route::post('/units', [UnitController::class, "create"]);
    Route::delete('/units/{id}', [UnitController::class, "delete"]);
    Route::patch('/units/{id}', [UnitController::class, "update"]);
    Route::get('/unit/search', [UnitController::class, 'search']);

    Route::get('/departements', [DepartementController::class, "getDepartements"]);
    Route::post('/departements', [DepartementController::class, "create"]);
    Route::patch('/departement/{id}', [DepartementController::class, "update"]);
    Route::delete('/departement/{id}', [DepartementController::class, "delete"]);
    Route::get('/departement/{id}', [DepartementController::class, "getDetailDepartement"]);
    Route::get('/departements/search', [DepartementController::class, 'search']);
});

