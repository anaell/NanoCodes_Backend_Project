<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

// ── AUTH ROUTES ──────────────────────────────────────

Route::middleware('guest')->group(function () {

    // Login
    Route::get('/login', [AuthController::class, 'showLogin'])
        ->name('login');

    Route::post('/login', [AuthController::class, 'login']);

    // Register
    Route::get('/register', [AuthController::class, 'showRegister'])
        ->name('register');

    Route::post('/register', [AuthController::class, 'register']);

    // Password reset placeholder
    Route::get('/forgot-password', fn() => view('auth.forgot-password'))
        ->name('password.request');
});

// Logout
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

// Social auth placeholders (wire up with Socialite)
Route::get('/auth/google', fn() => redirect('/login'))
    ->name('auth.google');

Route::get('/auth/facebook', fn() => redirect('/login'))
    ->name('auth.facebook');

// Protected dashboard
Route::get('/dashboard', fn() => 'Welcome to dashboard')
    ->middleware('auth')
    ->name('dashboard');

// Redirect root to login
Route::get('/', function () {
    return redirect('/login');
});