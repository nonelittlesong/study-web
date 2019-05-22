
# 一、 访问请求实例
在控制器中获取当前HTTP请求实例，需要在构造函数或方法中对`\Illuminate\Http\Request`类进行依赖注入。  
这样，当前请求实例会被服务容器自动注入：  
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * 存储新用户
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $name = $request->input('name');

        //
    }
}
```
