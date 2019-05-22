任何时候在 Laravel 应用中定义 HTML 表单，都需要在表单中引入 CSRF 令牌字段:  
```htm
<form method="POST" action="/profile">
    {{ csrf_field() }}
    ...
</form>
```

>注：CSRF 中间件只只作用于 `routes/web.php` 中定义的路由，因为该文件下的路由分配了 `web` 中间件组，而 `VerifyCsrfToken` 位于 `web` 中间件组中。  


# 一、 排除指定 URL 不做 CSRF 安全校验
有时候我们需要从 CSRF 保护中间件中排除一些 URL，例如，如果你使用了第三方支付系统（如支付宝或微信支付）来处理支付并用到他们提供的回调功能，这时候就需要从 Laravel 的 CSRF 保护中间件中排除回调处理器路由，因为第三方支付系统并不知道要传什么 token 值给我们定义的路由。  

通常我们需要将这种类型的路由放到文件 `routes/web.php` 之外，比如 `routes/api.php`。不过，如果必须要加到 `routes/web.php` 中的话，你也可以在 `VerifyCsrfToken` 中间件中将要排除的 URL 添加到 `$except` 属性数组：  
```php
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * 从 CSRF 验证中排除的 URL
     *
     * @var array
     */
    protected $except = [
        'alipay/*',
    ];
}
```


# 二、 X-CSRF-Token
除了将 CSRF 令牌作为 POST 参数进行验证外，还可以通过设置 `X-CSRF-Token` 请求头来实现验证，`VerifyCsrfToken` 中间件会检查 `X-CSRF-TOKEN` 请求头。实现方式如下，首先创建一个 meta 标签并将令牌保存到该 meta 标签：  
```htm
<meta name="csrf-token" content="{{ csrf_token() }}">
```
然后在 js 库（如 jQuery）中添加该令牌到所有请求头，这为基于 AJAX 的请求提供了简单、方便的方式来避免 CSRF 攻击：  
```js
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```
#### CSRF 令牌和 JavaScript
构建 JavaScript 驱动的应用时，给 JavaScript HTTP 库每个出口请求添加 CSRF 令牌字段很方便。默认情况下，`resources/assets/js/bootstrap.js` 文件已经通过 Axios HTTP 库注册了 `csrf-token` 这个 meta 标签的值作为令牌字段值，如果你没有使用这个库，则需要手动配置来实现类似的功能。  

# 三、 X-XSRF-Token
Laravel 还会将 CSRF 令牌保存到名为 `XSRF-TOKEN` 的 Cookie 中，你可以使用该 Cookie 值来设置 `X-XSRF-TOKEN` 请求头。

一些 JavaScript 框架，比如 Angular 和 Axios，会为你自动进行设置，基本上你不太需要手动设置这个值。

最后，`VerifyCsrfToken` 中间件框架底层实现源码位于 `vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php`。  

