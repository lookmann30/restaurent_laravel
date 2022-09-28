<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TestjsonController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::controller(TodoController::class)->group(function () {
    Route::get('todos', 'index');
    Route::post('todo', 'store');
    Route::get('todo/{id}', 'show');
    Route::put('todo/{id}', 'update');
    Route::delete('todo/{id}', 'destroy');
}); 

Route::controller(MenuController::class)->group(function () {
    Route::get('menus', 'index');
}); 

Route::controller(TestjsonController::class)->group(function () {
    Route::post('detail', 'store');
}); 

Route::controller(OrderController::class)->group(function () {
    Route::get('orders/{id}', 'index');
    Route::post('order', 'store');
    Route::get('ordersById/{id}', 'show');
    Route::put('order/{id}', 'update');
    Route::put('orderCancel/{id}', 'destroy');
    // Route::delete('order/{id}', 'destroy');
}); 