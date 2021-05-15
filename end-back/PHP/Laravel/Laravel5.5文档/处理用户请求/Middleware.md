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
Laravel自带`web`和`api`两个中间件组：  
```php
/**
 * 应用的中间件组
 *
 * @var array
 */
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        // \Illuminate\Session\Middleware\AuthenticateSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],

    'api' => [
        'throttle:60,1',
        'bindings',
    ],
];
```

中间件组使用和分配单个中间件同样的语法被分配给路由和控制器动作。再次申明，中间件组的目的只是让一次分配给路由多个中间件的实现更加方便：  
```php
Route::get('/', function () {
    //
})->middleware('web');

Route::group(['middleware' => ['web']], function () {
    //
});
```

默认情况下， `RouteServiceProvider` 自动将中间件组 `web` 应用到 `routes/web.php` 文件，将中间件组 `api` 应用到 `routes/api.php`。  

当然我们可以自己设置自己的中间件组，以实现更灵活的中间件分配策略：  
```php
/**
 * 应用的中间件组.
 *
 * @var array
 */
protected $middlewareGroups = [
    'web' => [
        \App\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        // \Illuminate\Session\Middleware\AuthenticateSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        \App\Http\Middleware\VerifyCsrfToken::class,
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],

    'api' => [
        'throttle:60,1',
        'bindings',
    ],

    'blog' => [
        'token',
    ]
];
```

我们修改 `routes/web.php` 下面的中间件分配方式：  
```php
Route::group(['middleware'=>['blog']],function(){
    Route::get('/', function () {
        return view('welcome', ['website' => 'Laravel']);
    });

    Route::view('/view', 'welcome', ['website' => 'Laravel学院']);
});
```



# 三、 中间件参数
```php
<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * 处理输入请求
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @param string $role
     * @return mixed
     * translator http://laravelacademy.org
     */
    public function handle($request, Closure $next, $role)
    {
        if (! $request->user()->hasRole($role)) {
            // Redirect...
        }

        return $next($request);
    }

}
```
中间件参数可以在定义路由时通过 `:` 分隔中间件名和参数名来指定，多个中间件参数可以通过逗号分隔：  
```php
Route::put('post/{id}', function ($id) {
    //
})->middleware('role:editor');
```



# 四、 终端中间件
终端中间件，可以理解为一个善后的后台处理中间件。有时候中间件可能需要在 HTTP 响应发送到浏览器之后做一些工作，比如，Laravel 内置的 `session` 中间件会在响应发送到浏览器之后将 Session 数据写到存储器中，为了实现这个功能，需要定义一个终止中间件并添加 `terminate` 方法到这个中间件：  
```php
<?php

namespace Illuminate\Session\Middleware;

use Closure;

class StartSession
{
    public function handle($request, Closure $next)
    {
        return $next($request);
    }

    public function terminate($request, $response)
    {
        // 存储session数据...
    }
}
```
`terminate` 方法将会接收请求和响应作为参数。**定义了一个终端中间件之后，还需要将其加入到 `app/Http/Kernel.php` 文件的全局中间件列表中**。  

当调用中间件上的 `terminate` 方法时，Laravel 将会从服务容器中取出一个该中间件的新实例，如果你想要在调用 `handle` 和 `terminate` 方法时使用同一个中间件实例，则需要使用容器提供的 `singleton` 方法以单例的方式将该中间件注册到容器中。  

