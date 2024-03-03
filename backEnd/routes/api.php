<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\SlideController;
use App\Http\Controllers\Api\V1\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::prefix('v1')->namespace('api\v1')->group(function(){
    Route::post('register_user',[AuthController::class,'RegisterUser']);
    Route::post('login_user',[AuthController::class,'LoginUser']);
    Route::post('upload_file',[FileController::class,'upload']);
    Route::post('slide_create',[SlideController::class,'create']);
    Route::get('slide_show',[SlideController::class,'show']);
});
