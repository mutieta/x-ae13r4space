<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ImageUploadController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/upload-image', [ImageUploadController::class, 'upload']);
Route::get('/upload-image', [ImageUploadController::class, 'upload'])->name('image.upload');
Route::get('/filament', function () {
    return redirect()->route('filament.pages.dashboard');
})->name('filament.dashboard');
Route::view('/upload', 'upload');


require __DIR__.'/auth.php';
