
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

### \# 通过路由闭包访问请求
还可以在路由闭包中注入 `Illuminate\Http\Request`，在执行闭包函数的时候服务容器会自动注入输入请求：  
```php
use Illuminate\Http\Request;

Route::get('/', function (Request $request) {
    //
});
```

## 1、 Request的方法
### \# path()
`path` 方法将会返回请求的路径信息，因此，如果请求URL是 `http://domain.com/user/1`，则 `path` 方法将会返回 `user/1`：  
```php
$path = $request->path();
```
### \# is()
`is` 方法允许你验证请求路径是否与给定模式匹配。该方法参数支持 `*` 通配符：  
```php
if($request->is('user/*')){
    //
}
```
如果请求URL是 `http://domain.com/user/1`，该方法会返回 `true`。  

### \# url()
想要获取完整的 URL，而不仅仅是路径信息，可以使用请求实例提供的 `url` 或 `fullUrl` 方法， `url` 方法返回不带查询字符串的 URL，而 `fullUrl` 方法返回结果则包含查询字符串：  
```php
// 不包含查询字符串
$url = $request->url();

// 包含查询字符串
$url_with_query = $request->fullUrl();
```
例如，我们请求 `http://domain.com/user/1?token=laravelacademy.org`，则上述 `$url` 的值是 `http://domain.com/user/1`，`$url_with_query` 的值是 `http://blog.dev/user/1?token=laravelacademy.org`。  

### \# method() & isMethod()
`method` 方法将会返回 HTTP 请求方式。你还可以使用 `isMethod` 方法来验证 HTTP 请求方式是否匹配给定字符串：  
```php
$method = $request->method(); // GET/POST

if($request->isMethod('post')){ 
    // true or false
}
```

### \# all()

## 2、 [PSR-7请求](https://www.php-fig.org/psr/psr-7/)
PSR-7 标准指定了 HTTP 消息接口，包括请求和响应。如果你想要获取遵循 PSR-7 标准的请求实例而不是 Laravel 请求实例，首先需要安装一些库。Laravel 可以使用 Symfony HTTP Message Bridge 组件将典型的 Laravel 请求和响应转化为兼容 PSR-7 接口的实现：  
```
composer require ymfony/psr-http-message-bridge
composer require zendframework/zend-diactoros
```
安装完这些库之后，只需要在路由或控制器中通过对请求示例进行类型提示就可以获取 PSR-7 请求：  
```php
use Psr\Http\Message\ServerRequestInterface;

Route::get('/', function (ServerRequestInterface $request) {
    //
});
```
>注：如果从路由或控制器返回的是 PSR-7 响应实例，则其将会自动转化为 Laravel 响应实例并显示出来。  




# 二、 请求字符串处理中间件
默认情况下，Laravel 在 `App\Http\Kernel` 的全局中间件堆栈中引入了 `TrimStrings` 和 `ConvertEmptyStringsToNull` 中间件。这些中间件会自动对请求中的字符串字段进行处理，前者将字符串两端的空格清除，后者将空字符串转化为 `null`。这样，在路由和控制器中我们就不必对字符串字段做额外的处理。  
如果你想要禁止该行为，可以从 `App\Http\Kernel` 的中间件堆栈属性 `$middleware` 中移除这两个中间件。  




# 三、 获取请求输入
### \# 获取所有输入值
你可以使用 `all` 方法以数组格式获取所有输入值：  
```php
$input = $request->all();
```
如果请求 URL 是 `http://blog.dev/user/1?token=laravelacademy.org&name=学院君`，则对应 `$input` 返回值是：  
```
array:2 [
  "token" => "laravelacademy.org",
  "name" => "学院君"
]
```

### \# 
