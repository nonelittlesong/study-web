<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RequestController extends Controller
{
    // 渲染表单视图
  public function formPage() {
    return view('request.form');
  }

  // 处理post请求实现文件上传
  public function fileUpload(Request $request) {

    if ($request->hasFile('picture')) {
      //dd($request->file('picture'));

      $picture = $request->file('picture');
      if (!$picture->isValid()) {
        abort(400, '无效的上传文件');
      }
      // 文件扩展名
      $extension = $picture->getClientOriginalExtension();
      // 文件名
      $fileName = $picture->getClientOriginalName();
      // 生成新的统一格式的文件名
      $newFileName = md5($fileName . time() . mt_rand(1, 10000)) . '.' . $extension;
      // 图片保存路径
      $savePath = 'images/' . $newFileName;
      // Web 访问路径
      $webPath = '/storage/' . $savePath;

      // 将文件保存到本地 storage/app/public/images 目录下，先判断同名文件是否已经存在，如果存在直接返回
      if (Storage::disk('public')->has($savePath)) {
        return response()->json(['path' => $webPath]);
      }
      // 否则执行保存操作，保存成功将访问路径返回
      if ($picture->storePubliclyAs('images', $newFileName, ['disk' => 'public'])) {
        return response()->json(['path' => $webPath]);
      }
      abort(500, '文件上传失败');
    } else {
      abort(400, '请选择要上传的文件');
    }
  }
}
