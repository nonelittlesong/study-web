
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

### \# 其他
* 请求参数
  * [all()](#-获取所有输入值)
  * [input()](#-获取单个输入值)
  * [query()](#-从查询字符串中获取输入)
  * [only() & except()](#-获取输入的部分数据)
  * [has()](#-判断请求参数是否存在)
* Session
  * [flash() & flashOnly() & flashExcept()](#-session)
  * [old()](#-取出上次请求数据)
* Cookie
  * [cookie()](#-从请求中取出Cookie)
* 文件
  * [file() & hasFile()](1-获取上传的文件)
  
  
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

### \# 获取单个输入值
```php
$name = $request->input('name');
```

你还可以传递一个默认值作为第二个参数给 `input` 方法，如果请求输入值在当前请求 URL 中未出现时该值将会被返回：  
```php
$name = $request->input('name', '学院君');
```
比如我们访问` http://blog.dev/user/1?token=laravelacademy.org`，仍然可以获取到 `$name` 的值为 `学院君`。  

处理表单数组输入时，可以使用”.”来访问数组输入：  
```php
$input = $request->input('products.0.name');
$names = $request->input('products.*.name');
```
比如我们访问 `http://blog.dev/user/1?products[][name]=学院君&products[][name]=学院君小号`，则上述 `$input` 的值是 `学院君`，而 `$names` 的值是：  
```
array:2 [
  0 => "学院君",
  1 => "学院君小号"
]
```

### \# 从查询字符串中获取输入
`input` 方法会从整个请求负载（包括查询字符串）中获取数值，`query`则只会从查询字符串中获取数值：  
```php
$name = $request->query('name');
```
我们可以像 `input` 方法一样设置第二个参数为默认值：  
```php
$name = $request->query('name', '学院君');
```
你也可以调用一个不传任何参数的 `query` 方法以便以关联数组的方式获取整个查询字符串的值，类似 `all` 方法所做的：  
```php
$query = $request->query();
```
`query` 方法就是从 `query` 属性对象中获取参数值，`input` 方法会从 `query + request` 属性对象中获取参数值，请求实例上还有个 `post` 方法用于从 `request` 属性对象中获取参数值;  
`query` 方法用于获取 `GET` 请求查询字符串参数值，`input` 方法用于获取所有 `HTTP` 请求参数值，`post` 方法用于获取 `POST` 请求参数值。  

### \# 通过动态属性获取输入
```php
$name = $request->name;
```
实现原理：  
```php
/**
 * Get an input element from the request.
 *
 * @param string $key
 * @return mixed
 */
public function __get($key)
{
  if (array_key_exists($key, $this->all())) {
    return $this->route($key);
  }
}
```
要我说，这些语法糖没啥用，对性能没啥提升，只是方便使用而已，但这样也会增加使用者学习语法的成本。  

### \# 获取JSON输入值
发送 JSON 请求到应用的时候，只要 Content-Type 请求头被设置为 `application/json`，都可以通过 `input` 方法获取 JSON 数据，还可以通过“.”号解析数组：  
```php
$name = $request->input('user.name');
```

### \# 获取输入的部分数据
如果你需要取出输入数据的子集，可以使用 `only` 或 `except` 方法，这两个方法都接收一个数组或动态列表作为唯一参数，这和我们在上一篇控制器中提到的控制器中间件使用语法类似：  
```php
$input = $request->only(['username', 'password']);
$input = $request->only('username', 'password');

$input = $request->except(['credit_card']);
$input = $request->except('credit_card');
```
>注：`only` 方法返回所有你想要获取的参数键值对，不过，如果你想要获取的参数不存在，则对应参数会被过滤掉。  

### \# 判断请求参数是否存在
判断参数在请求中是否存在，可以使用 `has` 方法，如果参数存在则返回 `true`：  
```php
if ($request->has('name')) {
    //
}
```
该方法支持以数组形式查询多个参数，这种情况下，只有当参数都存在时，才会返回 `true`：  
```php
if ($request->has(['name', 'email'])) {
    //
}
```
如果你想要判断参数存在且参数值不为空，可以使用 `filled` 方法：  
```php
if ($request->filled('name')) {
    //
}
```


## 1、 上一次请求输入

### \# session
`Illuminate\Http\Request` 实例的 `flash` 方法会将当前输入存放到一次性 Session（所谓的一次性指的是从 Session 中取出数据后，对应数据会从 Session 中销毁）中，这样在下一次请求时上一次输入的数据依然有效：  
```php
$request->flash();
```
你还可以使用 `flashOnly` 和 `flashExcept` 方法将输入数据子集存放到 Session 中，这些方法在 Session 之外保存敏感信息时很有用，该功能适用于登录密码填写错误的场景：  
```php
$request->flashOnly('username', 'email');
$request->flashExcept('password');
```

### \# 将输入存储到Session然后重定向
如果你经常需要一次性存储输入请求输入并返回到表单填写页，可以在 `redirect()` 之后调用 `withInput()` 方法实现这样的功能：
```php
return redirect('form')->withInput();
return redirect('form')->withInput($request->except('password'));
```

### \# 取出上次请求数据
要从 Session 中取出上次请求的输入数据，可以使用 Request 实例提供的 `old` 方法。`old` 方法可以很方便地从 Session 中取出一次性数据：  
```php
$username = $request->old('username');
```
Laravel 还提供了一个全局的辅助函数 `old()`，如果你是在 Blade 模板中显示上次输入数据，使用辅助函数 `old()` 更方便，如果给定参数没有对应输入，返回 null：  
```htm
<input type="text" name="username" value="{{ old('username') }}">
```


## 2、 Cookie
### \# 从请求中取出Cookie
```php
$value = $request->cookie('name');
```

### \# 添加Cookie到响应
你可以使用 `cookie` 方法将一个 Cookie 添加到返回的 `Illuminate\Http\Response` 实例，你需要传递 Cookie 名称、值、以及有效期（分钟）到这个方法：  
```php
return response('欢迎来到 Laravel 学院')->cookie(
    'name', '学院君', $minutes
);
```
`cookie` 方法可以接收一些使用频率较低的参数，一般来说，这些参数和 PHP 原生函数 `setcookie` 作用和意义一致：  
```php
return response('欢迎来到 Laravel 学院')->cookie(
    'name', '学院君', $minutes, $path, $domain, $secure, $httpOnly
);
```
我们简单演示下该功能的使用，在 `routes/web.php` 定义两个路由如下：  
```php
Route::get('cookie/add', function () {
    $minutes = 24 * 60;
    return response('欢迎来到 Laravel 学院')->cookie('name', '学院君', $minutes);
});

Route::get('cookie/get', function(\Illuminate\Http\Request $request) {
    $cookie = $request->cookie('name');
    dd($cookie);
});
```
先访问 `http://blog.dev/cookie/add` 设置 Cookie，然后再通过` http://blog.dev/cookie/get` 获取 Cookie 值，如果在页面看到输出 `学院君`，则表示 Cookie 设置成功。  
**当然我们也可以通过 Chrome 浏览器的 F12 模式快速查看 Cookie 信息。**（加密过）  

### \# 生成Cookie实例
如果你想要生成一个 `Symfony\Component\HttpFoundation\Cookie` 实例以便后续添加到响应实例，可以使用全局辅助函数 `cookie`，该 Cookie 只有在添加到响应实例上才会发送到客户端：  
```php
$cookie = cookie('name', '学院君', $minutes);
return response('欢迎来到 Laravel 学院')->cookie($cookie);
```
我们改写下之前的 cookie/add 路由实现逻辑：  
```php
Route::get('cookie/add', function () {
    $minutes = 24 * 60;
    //return response('欢迎来到 Laravel 学院')->cookie('name', '学院君', $minutes);
    $cookie = cookie('name', '学院君X', $minutes);
    return response('欢迎来到 Laravel 学院')->cookie($cookie);
});
```
效果和之前一致，这次访问 `cookie/get` 路由，页面打印结果是 "学院君X"。  




# 三、 文件上传
## 1、 获取上传的文件
可以使用 `Illuminate\Http\Request` 实例提供的 `file` 方法或者动态属性来访问上传文件， `file` 方法返回 `Illuminate\Http\UploadedFile` 类的一个实例，该类继承自 PHP 标准库中提供与文件交互方法的 `SplFileInfo` 类：  
```php
$file = $request->file('photo');
$file = $request->photo;
```
你可以使用 `hasFile` 方法判断文件在请求中是否存在：  
```php
if ($request->hasFile('photo')) {
    //
}
```

### \# 验证文件是否上传成功
使用 `isValid` 方法判断文件在上传过程中是否出错：  
```php
if ($request->file('photo')->isValid()){
    //
}
```

### \# 文件路径和扩展名
```php
$path = $request->photo->path();
$extension = $request->photo->extension();
```

### \# [其他文件方法](https://github.com/symfony/symfony/blob/3.0/src/Symfony/Component/HttpFoundation/File/UploadedFile.php)


## 2、 保存上传的文件
### \# `config/filesystems.php`
`local` 配置存放上传文件，即本地文件系统，默认根目录是 `storage/app`。  
`public` 也是本地文件系统，只不过存放在这里的文件可以被公开访问，其对应的根目录是 `storage/app/public`，要让 Web 用户访问到该目录下存放文件的前提是在应用入口 `public` 目录下建一个软链 `storage` 链接到 `storage/app/public`。  

### \# store
`UploadedFile` 类有一个 `store` 方法，该方法会将上传文件移动到相应的磁盘路径上，该路径可以是本地文件系统的某个位置，也可以是云存储（如Amazon S3）上的路径。  
`store` 方法接收一个文件保存的相对路径（相对于文件系统配置的根目录），该路径不需要包含文件名，因为系统会自动生成一个唯一ID作为文件名。  
`store` 方法还接收一个可选的参数 —— 用于存储文件的磁盘名称作为第二个参数（对应文件系统配置 `disks` 的键名，默认值是 `local`），该方法会返回相对于根目录的文件路径：  
```php
$path = $request->photo->store('images');
$path = $request->photo->store('images', 's3');
```
如果你不想自动生成文件名，可以使用 `storeAs` 方法，该方法接收保存路径、文件名和磁盘名作为参数：  
```php
$path = $request->photo->storeAs('images', 'filename.jpg');
$path = $request->photo->storeAs('images', 'filename.jpg', 's3');
```
### \# 例子
在 `routes/api.php` 中定义如下文件上传路由：  
```
Route::post('file/upload', function(\Illuminate\Http\Request $request) {
    if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
        $photo = $request->file('photo');
        $extension = $photo->extension();
        //$store_result = $photo->store('photo');
        $store_result = $photo->storeAs('photo', 'test.jpg');
        $output = [
            'extension' => $extension,
            'store_result' => $store_result
        ];
        print_r($output);exit();
    }
    exit('未获取到上传文件或上传过程出错');
});
```
使用 Advanced REST Client 工具来演示 POST 表单提交。  
上传文件成功后可以去 `storage/app` 目录下查看。  
其他存储介质使用方式也差不多，无非是修改下 `store` 和 `storeAs` 对应的参数。  

