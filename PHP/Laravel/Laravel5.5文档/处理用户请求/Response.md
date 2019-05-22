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
