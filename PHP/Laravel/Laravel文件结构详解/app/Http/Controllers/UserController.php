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
}
