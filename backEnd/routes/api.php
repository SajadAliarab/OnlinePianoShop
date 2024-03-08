<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\SlideController;
use App\Http\Controllers\Api\V1\FileController;
use App\Http\Controllers\Api\V1\ProductDetailsController;
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
    Route::delete('delete_file/{fileName}',[FileController::class,'deleteFile']);
    Route::post('slide_create',[SlideController::class,'create']);
    Route::get('slide_show',[SlideController::class,'show']);
    Route::put('slide_update/{id}',[SlideController::class,'update']);
    Route::delete('slide_delete/{id}',[SlideController::class,'delete']);
    Route::post('brand_create',[ProductDetailsController::class,'createBrand']);
    Route::get('brand_show',[ProductDetailsController::class,'showBrand']);
    Route::put('brand_update/{id}',[ProductDetailsController::class,'updateBrand']);
    Route::delete('brand_delete/{id}',[ProductDetailsController::class,'deleteBrand']);
    Route::post('category_create',[ProductDetailsController::class,'createCategory']);
    Route::get('category_show',[ProductDetailsController::class,'showCategory']);
    Route::put('category_update/{id}',[ProductDetailsController::class,'updateCategory']);
    Route::delete('category_delete/{id}',[ProductDetailsController::class,'deleteCategory']);
    Route::post('color_create',[ProductDetailsController::class,'createColor']);
    Route::get('color_show',[ProductDetailsController::class,'showColor']);
    Route::put('color_update/{id}',[ProductDetailsController::class,'updateColor']);
    Route::delete('color_delete/{id}',[ProductDetailsController::class,'deleteColor']);
});
