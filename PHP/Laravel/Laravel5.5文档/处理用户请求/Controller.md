参考：  
* [控制器](https://laravelacademy.org/post/7836.html)  

# 控制器入门
## 1、 定义控制器
```
php artisan make:controller UserController
```
所有的 Laravel 控制器应该继承自 Laravel 自带的控制器基类 `App\Http\Controllers\Controller`，我们为该控制器添加一个 `show` 方法：  
```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * 为指定用户显示详情
     *
     * @param int $id
     * @return Response
     * @author LaravelAcademy.org
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
定义指向该控制器的路由：  
```php
Route::get('user/{id}', 'UserController@show');
```

在 `resources/veiws` 目录下创建 `user` 子目录，然后在 `user` 目录下新建 `profile.blade.php` 文件，编辑文件内容如下：  
```
{{ dd($user) }}
```
这样我们在浏览器中访问 `http://blog.dev/user/1`，就会看到打印结果了。  


## 2、 命名空间
