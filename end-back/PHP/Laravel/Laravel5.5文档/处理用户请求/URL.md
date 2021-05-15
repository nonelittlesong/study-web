一、 快速入门
## 1、 生成URL
`url` 辅助函数可用于为应用生成任意 URL，并且生成的 URL 会自动使用当前请求的 `scheme`（HTTP or HTTPS） 和 `host` 属性：  
```php
$post = App\Post::find(1);

echo url("/posts/{$post->id}");

// 输出 http://example.com/posts/1
```

## 2、 访问当前URL
如果没有传递路径信息给 `url` 辅助函数，则会返回一个 `Illuminate\Routing\UrlGenerator` 实例，从而允许你访问当前 URL 的信息：  
```php
// 获取不带请求字符串的当前 URL...
echo url()->current();

// 获取包含请求字符串的当前 URL...
echo url()->full();

// 获取上一个请求的完整 URL...
echo url()->previous();
```
上述每一个方法都可以通过 URL 门面进行访问，例如：  
```php
use Illuminate\Support\Facades\URL;

echo URL::current();
```



# 二、 命名路由URL
`route` 可用于生成指向命名路由的 URL。命名路由允许你生成不与路由中定义的实际 URL 耦合的 URL，因此，**当路由的 URL 改变了，route 函数调用不需要做任何更改**。例如，假设你的应用包含一个定义如下的路由：  
```php
Route::get('/post/{post}', function () {
    //
})->name('post.show');

要生成指向该路由的 URL，可以这样使用 route 辅助函数：

echo route('post.show', ['post' => 1]);

// 输出 http://example.com/post/1
```
通常我们会使用 Eloquent 模型的主键来生成 URL，因此，可以传递 Eloquent 模型作为参数值，`route` 辅助函数会自动解析模型主键值，所以，上述方法还可以这么调用：  
```php
echo route('post.show', ['post' => $post]);
```



# 三、 控制器动作URL
`action` 辅助函数用于为控制器动作生成 URL，和路由中的定义一样，你不需要传递完整的控制器命名空间，却而代之地，传递相对于`App\Http\Controllers` 命名空间的控制器类名即可：  
```php
$url = action('HomeController@index');
```
如果控制器方法接收路由参数，你可以将其作为第二个参数传递给该方法：  
```php
$url = action('UserController@profile', ['id' => 1]);
```



# 四、 参数默认值
对某些应用而言，你可能希望为特定 URL 参数指定请求默认值，例如，假设多个路由都定义了一个 {locale} 变量：  
```php
Route::get('/{locale}/posts', function () {
    //
})->name('post.index');
```
每次调用 `route` 辅助函数都要传递 `locale` 变量显得很笨拙，所以，我们可以在当前请求中使用 `URL::defaults` 方法为这个参数定义一个默认值，我们可以在某个路由中间件中调用该方法以便可以访问当前请求：  
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\URL;

class SetDefaultLocaleForUrls
{
    public function handle($request, Closure $next)
    {
        URL::defaults(['locale' => $request->user()->locale]);

        return $next($request);
    }
}
```
一旦设置好 `locale` 参数的默认值之后，就不必在通过 `route` 辅助函数生成 URL 时每次指定传递的值了。  
