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
