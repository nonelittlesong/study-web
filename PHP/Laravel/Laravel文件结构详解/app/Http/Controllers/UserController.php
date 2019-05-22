<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;                                // app/User.php

class UserController extends Controller
{
  /**
   * 为指定用户显示详情
   *
   * @param int $id
   * @return Response
   * @author song
   */
  public function show($id) {
    return view('user.profile', ['user' => User::findOrFail($id)]);
  }
  
   /**
    * 存储新用户
    *
    * @param Request request
    *
    */
  public function store(Request $request) { // 依赖注入
    $name = $request->input('name');
    // 
  }
  
  /**
   * 更新指定用户
   *
   * @param Request $request
   * @param int $id
   * @return Response
   */
  public function update(Request $request, $id) // 添加路由参数
  {
      //
  }
}
