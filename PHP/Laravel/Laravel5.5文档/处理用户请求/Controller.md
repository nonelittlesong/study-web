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
中间件可以像这样分配给控制器路由：  
```
Route::get('profile', 'UserController@show')->middleware('auth');
```
不过，将中间件放在控制器构造函数中更方便，在控制器的构造函数中使用 `middleware` 方法你可以很轻松地分配中间件给该控制器（该方法继承自控制器基类），这样该中间件对所有控制器方法都生效：  
```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('token');
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @author LaravelAcademy.org
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
这里我们在构造函数中声明使用 `token` 中间件（关于该中间件定义参考[中间件](https://laravelacademy.org/post/7812.html)这篇教程），这样当我们访问 `http://blog.dev/user/1` 的时候，就会跳转到 Laravel 学院，只有当访问 `http://blog.dev/user/1?token=laravelacademy.org` 时，才能访问到正确的页面。  

除此之外，我们还可以指定中间件对指定方法生效或者排除指定方法的校验：  
```php
$this->middleware('auth')->only('show'); // 只对该方法生效
$this->middleware('auth')->except('show');  // 对该方法以外的方法生效
```
如果要指定多个控制器方法可以以数组的方式传参：  
```php
$this->middleware('auth')->only(['show', 'index']); // 只对指定方法生效
$this->middleware('auth')->except(['show', 'index']);  // 对指定方法以外的方法生效
```
在控制器中还可以使用闭包注册中间件，这为我们定义只在某个控制器使用的中间件提供了方便，无需定义完整的中间件类：  
```php
$this->middleware(function ($request, $next) {
    // ...

    return $next($request);
});
```
还是以 UserController 为例，我们为其定义一个匿名中间件：  
```php
class UserController extends Controller
{
  public function __construct() {
    $this->middleware('token')->except('show');
    $this->middleware(function ($request, $next) {
      if (!is_numeric($request->input('id'))) {
        throw new NotFoundHttpException();
      }
      return $next($request);
    });
  }
}
```
这样当我们访问 `http://blog.dev/user/1` 会抛出 404 异常，只有当访问 `http://blog.dev/user/1?id=1` 时才能正常展示。

>注：你还可以将中间件分配给多个控制器动作，不过，这意味着你的控制器会变得越来越臃肿，这种情况下，需要考虑将控制器分割成多个更小的控制器。  




# 资源控制器
