* Laravel内置了验证用户中间件
* Laravel内置了CSRF保护中间件
* CORS中间件可以为离开站点的响应添加合适的头
* 日志中间件可以记录所有进入站点的请求

中间件Path： `app/Http/Middleware`  

# 一、 定义中间件
```
php artisan make:middleware CheckToken
```

这个命令会在 `pp/Http/Middleware` 目录下创建一个新的中间件类 `CheckToken`，在这个中间件中，我们只允许提供的 `token` 等于指定值 `laravelacademy.org` 的请求访问路由，否则，我们将跳转到 Laravel 学院网站：  
```php
<?php

namespace App\Http\Middleware;

use Closure;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      if ($request->input('token') != 'open_the_door') {
        return redirect()->to(`https://laravelacademy.org/post/7812.html`);
      }
        return $next($request);
    }
}
```
>注：此时只是定义好了中间件的逻辑，要让这个中间件生效，还要将其注册到指定路由中  

## 1、 请求之前/之后的中间件
之前：  
```php
<?php

namespace App\Http\Middleware;

use Closure;

class BeforeMiddleware
{
    public function handle($request, Closure $next)
    {
        // 执行动作

        return $next($request);
    }
}
```
之后：  
```php
<?php

namespace App\Http\Middleware;

use Closure;

class AfterMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // 执行动作

        return $response;
    }
}
```



# 二、 注册中间件
* 全局中间件
* 中间件组
* 指定路由中间件

## 1、 全局中间件
添加到`app/Http/Kernel.php`的数组属性`$middleware`中：  
```php
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        \App\Http\Middleware\TrustProxies::class,
        CheckToken::class, // 添加全局中间件
    ];
```
>但除非真的需要，否则我们一般不会把业务级别的中间件放到全局中间件中。  

## 2、 指定路由中间件
1. 在`app/Http/Kernel.php`中分配给该中间件一个`key`
2. 在路由中使用`middleware`方法添加`key`

`app/Http/Kernel.php`:  
```php
// 在 App\Http\Kernel 类中...

/**
 * 应用的路由中间件列表
 *
 * 这些中间件可以分配给路由组或者单个路由
 *
 * @var array
 */
protected $routeMiddleware = [
    'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
    'token' => CheckToken::class
];
```

`routes/web.php`:  
```php
Route::get('/', function () {
    //
})->middleware('token');
```

这样，当我们在浏览器中访问 `http://blog.dev` 时就会跳到 `http://laravelacademy.org`，只有当访问 `http://blog.dev?token=laravelacademy.org` 时才能看welcome界面。  

可以使用数组分配多个中间件到路由：  
```php
Route::get('/', function () {
    //
})->middleware('token', 'auth');
```
分配中间件的时候还可以传递完整的类名（不过不推荐这种方式）：  
```php
use App\Http\Middleware\CheckToken;

Route::get('admin/profile', function () {
    //
})->middleware(CheckToken::class);
```

## 3、 中间件组
