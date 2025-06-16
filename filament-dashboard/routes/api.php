<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserController;

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register'])->name('register');   
Route::post('/logout', [UserController::class, 'logout'])->name('logout');

Route::post('/auth/google', [UserController::class, 'googleAuth']);

