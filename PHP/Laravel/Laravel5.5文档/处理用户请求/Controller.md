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
如果你在 `App\Http\Controllers` 目录下选择使用 PHP 命名空间嵌套或组织控制器，只需要使用相对于 `App\Http\Controllers` 命名空间的指定类名即可。因此，如果你的完整控制器类是 `App\Http\Controllers\Photos\AdminController`，则可以像这样注册路由：  
```
Route::get('foo', 'Photos\AdminController@method');
```

## 3、 单动作控制器
如果你想要定义一个只处理一个动作的控制器，可以在这个控制器中定义 `__invoke` 方法：  
```
<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class ShowProfile extends Controller
{
    /**
     * 展示给定用户的个人主页          
     *
     * @param  int  $id
     * @return Response
     */
    public function __invoke($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
当你为这个单动作控制器注册路由的时候，不需要指定方法：  
```php
Route::get('user/{id}', 'ShowProfile');
```
这背后的原理是在 PHP 中当尝试以调用函数的方式调用一个对象时，`__invoke()` 方法会被自动调用。  




# 控制器中间件
