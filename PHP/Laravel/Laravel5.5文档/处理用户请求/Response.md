# 一、 创建响应
### \# 字符串 & 数组
字符串：  
```php
Route::get('/', function () {
    return 'Hello World';
});
```
数组：  
框架会自动将数组转化为一个 JSON 响应：  
```php
Route::get('/', function () {
    return [1, 2, 3];
});
```

>注： Eloquent 集合也会被自动转化为 JSON 响应。  

### \# Response对象
```php
Route::get('cookie/response', function () {
    return response('Hello World', 200)
        ->header('Content-Type', 'text/plain');
});
```


## 1、 添加响应头
大部分响应方法都可以以方法链的形式调用，从而可以流式构建响应（流接口模式）。例如，在发送响应给用户前可以使用 `header` 方法来添加一系列响应头：  
```php
return response($content)
    ->header('Content-Type', $type)
    ->header('X-Header-One', 'Header Value')
    ->header('X-Header-Two', 'Header Value');
```
或者你可以使用 `withHeaders` 方法来指定头信息数组添加到响应：  
```php
return response($content)
    ->withHeaders([
        'Content-Type' => $type,
        'X-Header-One' => 'Header Value',
        'X-Header-Two' => 'Header Value',
    ]);
```

## 2、 添加Cookie到响应
使用响应实例上的 `cookie` 方法可以轻松添加 Cookie 到响应。例如，你可以使用 `cookie` 方法生成 Cookie 并添加将其添加到响应实例：  
```php
return response($content)
    ->header('Content-Type', $type)
    ->cookie('name', 'value', $minutes);
```
`cookie` 方法还可以接收更多使用频率较低的额外可选参数，一般来说，这些参数和 PHP 原生提供的 `setcookie` 方法目的和意义差不多：  
```php
->cookie($name, $value, $minutes, $path, $domain, $secure, $httpOnly)
```
此外，还可以使用 `Cookie 门面`以"队列"形式将 Cookie 添加到响应。`queue` 方法接收 Cookie 实例或创建 Cookie 所必要的参数作为参数，这些 Cookie 会在响应被发送到浏览器之前添加到响应：  
```php
Route::get('cookie/response', function() {
    Cookie::queue(Cookie::make('site', 'Laravel学院',1));
    Cookie::queue('author', '学院君', 1);
    return response('Hello Laravel', 200)
        ->header('Content-Type', 'text/plain');
});
```

## 3、 Cookie & 加密
默认情况下，Laravel 框架生成的 Cookie 都经过了加密和签名，以免在客户端被篡改。如果你想要让特定的 Cookie 子集在生成时取消加密，可以通过 `app/Http/Middleware` 目录下的中间件 `App\Http\Middleware\EncryptCookies` 提供的 `$except` 属性来排除这些 Cookie：  
```php
/**
 * 不需要被加密的cookies名称
 *
 * @var array
 */
protected $except = [
    'cookie_name',
];
```



# 二、 重定向
重定向响应是 `Illuminate\Http\RedirectResponse` 类的实例，包含了必要的头信息将用户重定向到另一个 URL，有很多方式来生成 `RedirectResponse` 实例，最简单的方法就是使用全局辅助函数 `redirect`：  
```php
Route::get('dashboard', function () {
    return redirect('home/dashboard');
});
```
有时候你想要将用户重定向到上一个请求的位置，比如，表单提交后，验证不通过，你就可以使用辅助函数 `back` 返回到前一个 URL（由于该功能使用了 Session，使用该方法之前确保相关路由位于 `web` 中间件组或者应用了 Session 中间件）：  
```php
Route::post('user/profile', function () {
    // 验证请求...
    return back()->withInput();
});
```

## 1、 重定向到命名路由
如果调用不带参数的 `redirect` 方法，会返回一个 `Illuminate\Routing\Redirector` 实例，然后就可以使用 `Redirector` 实例上的所有方法。例如，要生成一个 `RedirectResponse` 到命名路由，可以使用 `route` 方法：  
```php
return redirect()->route('login');
```
如果路由中有参数，可以将其作为第二个参数传递到 route 方法：  
```php
// For a route with the following URI: profile/{id}
return redirect()->route('profile', ['id'=>1]);
```

### \# 通过Eloquent模型填充参数
如果要重定向到**带 ID 参数**的路由（ Eloquent 模型绑定 ），可以传递**模型本身**，ID 会被自动解析出来：  
```php
return redirect()->route('profile', [$user]);
```
如果你想要自定义这个路由参数中的默认参数名（默认是 `id`），需要重写模型实例上的 `getRouteKey` 方法：  
```php
/**
 * Get the value of the model's route key.
 *
 * @return mixed
 */
public function getRouteKey()
{
    return $this->slug;
}
```

## 2、 重定向到控制器动作
你还可以生成重定向到控制器动作的响应，只需传递控制器和动作名到 `action` 方法即可。记住，你不需要指定控制器的完整命名空间，因为 Laravel 的 `RouteServiceProvider` 将会自动设置默认的控制器命名空间：  
```php
return redirect()->action('HomeController@index');
```
和 `route` 方法一样，如果控制器路由要求参数，你可以将参数作为第二个参数传递给 `action` 方法：  
```php
return redirect()->action('UserController@profile', ['id'=>1]);
```

## 3、 带一次性Session数据的重定向
重定向到一个新的 URL 并将数据存储到一次性 Session 中通常是同时完成的，为了方便，可以创建一个 `RedirectResponse` 实例然后在同一个方法链上将数据存储到 Session，这种方式在 `action` 之后存储状态信息时特别方便：  
```php
Route::post('user/profile', function () {
    // 更新用户属性...
    return redirect('dashboard')->with('status', 'Profile updated!');
});
```
用户重定向到新页面之后，你可以从 Session 中取出并显示这些一次性信息，使用 Blade 语法实现如下（关于 Blade 模板使用我们会在后续教程详细讨论）：  
```htm
@if (session('status'))
    <div class="alert alert-success">
        {{ session('status') }}
    </div>
@endif
```
>注：这个一次性体现在从 Session 取出数据之后，这些数据就会被销毁，不复存在。  




# 三、 其他响应类型
