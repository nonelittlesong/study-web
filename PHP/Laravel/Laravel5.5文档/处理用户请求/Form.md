
# 一、 快速入门
## 1、 定义路由
`routes/web.php`：  
```php
// 显示创建博客文章表单...
Route::get('post/create', 'PostController@create');
// 存储新的博客文章...
Route::post('post', 'PostController@store');
```

## 2、 创建控制器
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    /**
     * 显示创建新的博客文章的表单
     *
     * @return Response
     */
    public function create()
    {
        return view('post.create');
    }

    /**
     * 存储新的博客文章
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        // 验证并存储博客文章...
    }
}
```

## 3、 编写验证逻辑
现在我们准备用验证新博客文章输入的逻辑填充 store 方法。我们使用 `Illuminate\Http\Request` 对象提供的 `validate` 方法来实现这一功能，如果验证规则通过，代码将会继续往下执行；反之，如果验证失败，将会抛出一个异常，相应的错误响应也会自动发送给用户。在这个传统的 HTTP 请求案例中，将会生成一个重定向响应，如果是 AJAX 请求则会返回一个 JSON 响应。  

要更好地理解 `validate` 方法，让我们回顾下 `store` 方法：  
```php
/**
 * 存储博客文章
 *
 * @param  Request  $request
 * @return Response
 */
public function store(Request $request){
    $validatedData = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ]);

    // 验证通过，存储到数据库...
}
```

正如你所看到的，我们只是传入期望的验证规则到 `validate` 方法。再强调一次，如果验证失败，相应的响应会自动生成。如果验证通过，控制器将会继续往下执行。  

>注：实际执行代码之前，需要在数据库中创建 `posts` 数据表，因为这里用到了 `unique:posts` 这个验证规则，该规则会去数据库中查询传入标题是否已存在以保证唯一性。  

### \# 首次验证失败后中止后续规则验证
有时候你可能想要在首次验证失败后停止检查该属性的其它验证规则，要实现这个功能，可以在规则属性中分配 `bail` 作为首规则：  
```php
$request->validate([
    'title' => 'bail|required|unique:posts|max:255',
    'body' => 'required',
]);
```
在这个例子中，如果 `title` 属性上的 `required` 规则验证失败，则不会检查 `unique` 规则，规则会按照分配顺序依次进行验证。  

### \# 嵌套属性注意事项
如果 HTTP 请求中包含“嵌套”参数，可以使用“.”在验证规则中指定它们：  
```php
$request->validate([
    'title' => 'required|unique:posts|max:255',
    'author.name' => 'required',
    'author.desc' => 'required',
]);
```
这样的验证规则适用于验证如下标签请求：  
```htm
<form method="POST" action="{{route('posts.store')}}">
    {{csrf_field()}}
    <input type="text" name="title"/>
    <input type="text" name="author[name]"/>
    <input type="text" name="author[desc]"/>
    <textarea cols="20" rows="5" name="body"></textarea>
    <button type="submit">submit</button>
</form>
```

## 4、 显示验证错误信息
验证未通过，Laravel 将会自动将用户重定向回上一个位置。  
此外，所有验证错误信息会自动存放到一次性 Session。  

注意我们并没有在 `GET` 路由中显式绑定错误信息到视图。这是因为 Laravel 总是从 Session 数据中检查错误信息，而且如果有的话会自动将其绑定到视图。所以，值得注意的是每次请求的所有视图中总是存在一个`$errors` 变量，从而允许你在视图中方便而又安全地使用。`$errors` 变量是一个`Illuminate\Support\MessageBag` 实例。想要了解更多关于该对象的信息，查看其[文档](https://laravelacademy.org/post/7978.html#toc_15)。

>注：`$errors` 变量会通过 `web` 中间件组中的 `Illuminate\View\Middleware\ShareErrorsFromSession` 中间件绑定到视图，如果使用了该中间件，那么 `$errors` 变量在视图中总是有效，从而方便你随时使用。  

所以，在我们的例子中，验证失败的话用户将会被重定向到控制器的 `create` 方法，从而允许我们在视图中显示错误信息：  
```htm
<!-- /resources/views/post/create.blade.php -->

<h1>Create Post</h1>

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<!-- Create Post Form -->
```

## 5、 可选字段注意事项
默认情况下，Laravel自带了 `TrimStrings` 和 `ConvertEmptyStringsToNull` 中间件，这两个中间件位于 `App\Http\Kernel` 类的全局中间件堆栈中，因为这个原因，你需要经常将“可选”的请求字段标记为 `nullable` —— 如果你不想让验证器将 null 判定为无效的话。例如：  
```php
$this->validate($request, [
    'title' => 'required|unique:posts|max:255',
    'body' => 'required',
    'publish_at' => 'nullable|date',
]);
```

### \# AJAX请求&验证
在 AJAX 请求中使用 `validate` 方法时，Laravel 不会生成重定向响应。取而代之的，Laravel 生成一个包含验证错误信息的 JSON 响应。该 JSON 响应会带上一个 HTTP 状态码 `422`。  




# 二、 复杂表单请求验证
## 1、 创建表单请求
```
php artisan make:request StoreBlogPost
```
实现`rules`方法：  
```php
/**
 * 获取应用到请求的验证规则
 *
 * @return array
 */
public function rules(){
    return [
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ];
}
```
**表单输入请求会在控制器方法被调用之前被验证**:  
```php
/**
 * 存储输入的博客文章
 *
 * @param  StoreBlogPostRequest  $request
 * @return Response
 */
public function store(StoreBlogPost $request){
    // The incoming request is valid...
}
```
如果验证失败，重定向响应会被生成并将用户退回上一个位置，错误信息也会被存储到**一次性 Session** 以便在视图中显示。  
如果是 AJAX 请求，带 `422` 状态码的 HTTP 响应将会返回给用户，该响应数据中还包含了 JSON 格式的验证错误信息。  

### \# 添加验证后钩子到表单请求
如果你想要添加“验证后”钩子到表单请求，可以使用 `withValidator` 方法。该方法接收完整的构造验证器，从而允许你在**验证规则执行前**调用任何验证器方法：  
```php
/**
 * 配置验证器实例.
 *
 * @param  \Illuminate\Validation\Validator  $validator
 * @return void
 */
public function withValidator($validator)
{
    $validator->after(function ($validator) {
        if ($this->somethingElseIsInvalid()) {
            $validator->errors()->add('field', 'Something is wrong with this field!');
        }
    });
}
```


## 2、 授权表单请求
表单请求类还包含了一个 `authorize` 方法，你可以通过该方法检查认证用户是否有权限更新指定资源。  
例如，如果用户尝试更新一条博客评论，那么他必须是该评论的所有者。举个例子：  
```php
/**
 * 判定用户是否有权限发起请求.
 *
 * @return bool
 * @translator laravelacademy.org
 */
public function authorize()
{
    $comment = Comment::find($this->route('comment'));
    return $comment && $this->user()->can('update', $comment);
}
```
由于所有请求都继承自 Laravel 请求基类，我们可以使用 `user` 方法获取当前认证用户，还要注意上面这个例子中对 `route` 方法的调用。该方法赋予用户访问被调用路由 URI 参数的权限，比如下面这个例子中的 `{comment}` 参数：  
```php
Route::post('comment/{comment}');
```
如果 `authorize` 方法返回 `false`，一个包含 `403` 状态码的 HTTP 响应会自动返回而且控制器方法将不会被执行。  

如果你计划在应用的其他部分调用授权逻辑，只需在 `authorize` 方法中简单返回 `true` 即可：  
```
/**
 * 判断请求用户是否经过授权
 *
 * @return bool
 */
public function authorize(){
    return true;
}
```

## 3、 自定义错误消息
你可以通过重写 `messages` 方法自定义表单请求使用的错误消息，该方法应该返回属性/规则对数组及其对应错误消息：  
```php
/**
 * 获取被定义验证规则的错误消息
 *
 * @return array
 * @translator laravelacademy.org
 */
public function messages(){
    return [
        'title.required' => 'A title is required',
        'body.required'  => 'A message is required',
    ];
}
```




# 三、 手动创建验证器



