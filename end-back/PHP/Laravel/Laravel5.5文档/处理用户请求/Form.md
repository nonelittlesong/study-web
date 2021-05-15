
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
如果你不想使用请求实例上的 `validate` 方法，可以使用 `Validator` 门面手动创建一个验证器实例，该门面提供的 `make` 方法可用于生成一个新的验证器实例：  
```php
<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller{
    /**
     * 存储新的博客文章
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect('post/create')
                        ->withErrors($validator)
                        ->withInput();
        }

        // 存储博客文章...
    }
}
```
传递给 `make` 方法的第一个参数是需要验证的数据，第二个参数是要应用到数据上的验证规则。  

检查请求没有通过验证后，可以使用 `withErrors` 方法将错误数据存放到一次性 Session，使用该方法时，$errors 变量重定向后自动在视图间共享，从而允许你轻松将其显示给用户，`withErrors` 方法接收一个验证器、或者一个 `MessageBag` ，又或者一个 PHP 数组。  


## 1、 自动重定向
```php
Validator::make($request->all(), [
    'title' => 'required|unique:posts|max:255',
    'body' => 'required',
])->validate();
```

## 2、 命名错误包
如果你在单个页面上有多个表单，可能需要命名错误的 `MessageBag`，从而允许你为指定表单获取错误信息。只需要传递名称作为第二个参数给 `withErrors` 即可：  
```php
return redirect('register')
    ->withErrors($validator, 'login');
```
然后你就可以从 `$errors` 变量中访问命名的 `MessageBag` 实例：  
```
{{ $errors->login->first('email') }}
```

## 验证钩子之后
验证器允许你在验证完成后添加回调，这种机制允许你轻松执行更多验证，甚至添加更多错误信息到消息集合。使用验证器实例上的 `after` 方法即可：  
```php
$validator = Validator::make(...);

$validator->after(function($validator) {
    if ($this->somethingElseIsInvalid()) {
        $validator->errors()->add('field', 'Something is wrong with this field!');
    }
});

if ($validator->fails()) {
    //
}
```



# 四、 处理错误信息
调用 `Validator` 实例上的 `errors` 方法之后，将会获取一个 `Illuminate\Support\MessageBag` 实例，该实例中包含了多种处理错误信息的便利方法。在所有视图中默认有效的 `$errors` 变量也是一个 `MessageBag` 实例。  

### \# 获取某字段的第一条错误信息
要获取指定字段的第一条错误信息，可以使用 `first` 方法：  
```php
$errors = $validator->errors();
echo $errors->first('email');
```
### \# 获取指定字段的所有错误信息
如果你想要简单获取指定字段的所有错误信息数组，使用 `get` 方法：
```php
foreach ($errors->get('email') as $message) {
    //
}
```
如果是一个数组表单字段，可以使用 `*` 获取所有数组元素错误信息：  
```php
foreach ($errors->get('attachments.*') as $message) {
    //
}
```

### \# 获取所有字段的所有错误信息
要获取所有字段的所有错误信息，可以使用 `all` 方法：  
```php
foreach ($errors->all() as $message) {
    //
}
```

### \# 判断消息中是否存在某字段的错误信息
`has` 方法可用于判断错误信息中是否包含给定字段：  
```php
if ($errors->has(’email’)) {
    //
}
```

## 1、 自定义错误信息
如果需要的话，你可以使用自定义错误信息替代默认的，有多种方法来指定自定义信息。  
首先，你可以传递自定义信息作为第三个参数给 `Validator::make` 方法：  
```php
$messages = [
    'required' => 'The :attribute field is required.',
];

$validator = Validator::make($input, $rules, $messages);
```
在本例中，`:attribute` 占位符将会被验证时实际的字段名替换，你还可以在验证消息中使用其他占位符，例如：  
```php
$messages = [
    'same'    => 'The :attribute and :other must match.',
    'size'    => 'The :attribute must be exactly :size.',
    'between' => 'The :attribute must be between :min - :max.',
    'in'      => 'The :attribute must be one of the following types: :values',
];
```

### \# 为给定属性指定自定义信息

有时候你可能只想为特定字段指定自定义错误信息，可以通过“.”来实现，首先指定属性名，然后是规则：  
```php
$messages = [
    'email.required' => '邮箱地址不能为空!',
];
```

### \# 在语言文件中指定自定义消息

在很多案例中，你可能想要在语言文件中指定自定义消息而不是将它们直接传递给 `Validator`。要实现这个，添加消息到 `resources/lang/xx/validation.php` 语言文件的 custom 数组：  
```php
'custom' => [
    'email' => [
        'required' => '邮箱地址不能为空!',
    ],
],
```

### \# 在语言文件中指定自定义属性

如果你想要将验证消息的 `:attribute` 部分替换成自定义属性名称，可以在语言文件 `resources/lang/xx/validation.php` 的 `attributes` 数组中指定自定义名称：  
```php
'attributes' => [
    'email' => '邮箱地址',
],
```

# 五、 [验证规则大全](https://laravelacademy.org/post/7978.html#toc_17)



# 六、 添加条件规则
### \# 存在时验证

在某些场景下，你可能想要只有某个字段存在的情况下进行验证检查，要快速实现这个，添加 `sometimes` 规则到规则列表：  
```
$v = Validator::make($data, [
    'email' => 'sometimes|required|email',
]);
```
在上例中，email 字段只有存在于 `$data` 数组时才会被验证。  

>注：如果你尝试验证一个总是存在但可能为空的字段时，参考可选字段注意事项。  

### \# 复杂条件验证

有时候你可能想要基于更复杂的条件逻辑添加验证规则。  
例如，你可能想要只有在另一个字段值大于 100 时才要求一个给定字段是必须的，或者，你可能需要只有当另一个字段存在时两个字段才都有给定值。  
添加这个验证规则并不是一件头疼的事。  
首先，创建一个永远不会改变的静态规则到 `Validator` 实例：  
```php
$v = Validator::make($data, [
    'email' => 'required|email',
    'games' => 'required|numeric',
]);
```
让我们假定我们的 Web 应用服务于游戏收藏者。如果一个游戏收藏者注册了我们的应用并拥有超过 100 个游戏，我们想要他们解释为什么他们会有这么多游戏，例如，也许他们在运营一个游戏二手店，又或者他们只是喜欢收藏。要添加这种条件，我们可以使用 Validator 实例上的 `sometimes` 方法：  
```php
$v->sometimes('reason', 'required|max:500', function($input) {
    return $input->games >= 100;
});
```

传递给 `sometimes` 方法的第一个参数是我们需要有条件验证的名称字段，第二个参数是我们想要添加的规则，如果作为第三个参数的闭包返回 `true`，规则被添加。该方法让构建复杂条件验证变得简单，你甚至可以一次为多个字段添加条件验证：  
```php
$v->sometimes(['reason', 'cost'], 'required', function($input) {
    return $input->games >= 100;
});
```
>注：传递给闭包的 `$input` 参数是 `Illuminate\Support\Fluent` 的一个实例，可用于访问输入和文件。  



# 七、 验证数组输入
验证表单数组输入字段不再是件痛苦的事情，例如，如果进入的 HTTP 请求包含 `photos[profile]` 字段，可以这么验证：  
```php
$validator = Validator::make($request->all(), [
    'photos.profile' => 'required|image',
]);
```
我们还可以验证数组的每个元素，例如，要验证给定数组输入中每个 `email` 是否是唯一的，可以这么做（这种针对提交的数组字段是二维数组，如 `person[][email]` 或 `person[test][email]`）：  
```php
$validator = Validator::make($request->all(), [
    'person.*.email' => 'email|unique:users',
    'person.*.first_name' => 'required_with:person.*.last_name',
]);
```
类似地，在语言文件中你也可以使用 `*` 字符指定验证消息，从而可以使用单个验证消息定义基于数组字段的验证规则：  
```php
'custom' => [
    'person.*.email' => [
        'unique' => '每个人的邮箱地址必须是唯一的',
    ]
],
```



# 八、 自定义验证规则
## 1、 使用Rule对象
如上所述，Laravel 提供了多种有用的验证规则；不过，你可能还是需要指定一些自己的验证规则。  
注册自定义验证规则的一种方法是使用规则对象，要生成一个新的规则对象，可以使用 Artisan 命令 make:rule。  
下面我们使用这个命令来生成一个用于验证字符串是否是大写的规则，生成的新规则对象类位于 `app/Rules` 目录：  
```
php artisan make:rule Uppercase
```
规则创建之后，就可以定义行为方法，一个规则对象包含两个方法`：passes` 和 `message`，passes 方法接收属性值和名称，并且基于属性值是否有效返回 `true` 或 `false`。`message` 方法用于在验证失败时返回验证错误消息：  
```php
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Uppercase implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return strtoupper($value) === $value;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute must be uppercase.';
    }
}
```
当然，你可以在 `message` 方法中调用辅助函数 `trans` 来返回一个在语言文件中定义的错误消息：  
```php
/**
 * Get the validation error message.
 *
 * @return string
 */
public function message()
{
    return trans('validation.uppercase');
}
```
规则定义好之后，就可以将其以规则对象实例的方式和其他验证规则一起提供给验证器：  
```php
use App\Rules\Uppercase;

$request->validate([
    'name' => ['required', new Uppercase],
]);
```

## 2、 使用扩展
另一个注册自定义验证规则的方式是使用 Validator 门面上的 `extend` 方法。我们在某个服务提供者（`AppServiceProvider`）中使用该方法注册一个自定义验证规则：  
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * 启动应用服务
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('foo', function($attribute, $value, $parameters, $validator) {
            return $value == 'foo';
        });
    }

    /**
     * 注册服务提供者
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```
自定义验证器闭包接收四个参数：要验证的属性名称、属性值、传递给规则的参数数组以及 Validator 实例。  

你还可以传递类和方法到 `extend` 方法而不是闭包：  
```
Validator::extend('foo', 'FooValidator@validate');
```
### \# 定义错误信息

你还需要为自定义规则定义错误信息。你可以使用内联自定义消息数组或者在验证语言文件中添加条目来实现这一功能。消息应该被放到数组的第一维，而不是在只用于存放属性指定错误信息的 `custom` 数组内：  
```php
"foo" => "Your input was invalid!",
"accepted" => "The :attribute must be accepted.",
// 验证错误信息其它部分...
```
当创建一个自定义验证规则时，你可能有时候需要为错误信息定义自定义占位符，可以通过创建自定义验证器然后调用 Validator 门面上的 `replacer` 方法来实现。在服务提供者的 `boot` 方法中编写如下代码：  
```php
/**
 * 启动应用服务
 *
 * @return void
 * @translator laravelacademy.org
 */
public function boot(){
    Validator::extend(...);
    Validator::replacer('foo', function($message, $attribute, $rule, $parameters) {
        return str_replace(...);
    });
}
```
### \# 隐式扩展

默认情况下，被验证的属性如果没有提供或者验证规则为 `required` 而值为空，那么正常的验证规则，包括自定义扩展将不会执行。例如，`unique` 规则将不会检验 `null` 值：  
```php
$rules = ['name' => 'unique'];
$input = ['name' => null];
Validator::make($input, $rules)->passes(); // true
```
如果要求即使为空时也要验证属性，则必须要暗示属性是必须的，要创建一个隐式扩展，可以使用 `Validator::extendImplicit()` 方法：  
```php
Validator::extendImplicit('foo', function($attribute, $value, $parameters, $validator) {
    return $value == 'foo';
});
```
>注：一个隐式扩展仅仅暗示属性是必须的，至于它到底是缺失的还是空值这取决于你。  
