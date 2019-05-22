
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

### \# 依赖注入和路由参数
要获取路由参数，只需要将路由参数放在其他依赖后：  
```php
Route::put('user/{id}','UserController@update');
```
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * 更新指定用户
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }
}
```

### \# 
