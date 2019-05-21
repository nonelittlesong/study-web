<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('hello', function () {
  return 'Hello, this is my first route!';
});

/**
 * 可选参数
 */
Route::get('/name/{name?}/{age?}', function($myname = 'Wu Xiaosong', $age = 12) {
  return $myname . $age;
});
Route::get('/name/{name?}/age/{age?}', function($myname = 'Wu Xiaosong', $age = 12) {
  return $myname . $age;
});

/**
 * 子域名
 */
Route::domain('{account}.blog.dev')->group(function() {
  Route::get('user/{id}', function ($account, $id) {
    return 'This is ' . $account . ' page of User ' . $id;
  });
});
