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

/*
 * 定义文件上传路由器
 *
 */
// 用于显式上传表单
Route::get('form', 'RequestController@formPage');
// 用于处理文件上传
Route::post('form/file_upload', 'RequestController@fileUpload');