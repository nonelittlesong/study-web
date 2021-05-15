参考：  
* [控制器](https://laravelacademy.org/post/7836.html)  

# 控制器入门
## 1、 定义控制器
```
php artisan make:controller UserController
```
所有的 Laravel 控制器应该继承自 Laravel 自带的控制器基类 `App\Http\Controllers\Controller`，我们为该控制器添加一个 `show` 方法：  
```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * 为指定用户显示详情
     *
     * @param int $id
     * @return Response
     * @author LaravelAcademy.org
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
定义指向该控制器的路由：  
```php
Route::get('user/{id}', 'UserController@show');
```

在 `resources/veiws` 目录下创建 `user` 子目录，然后在 `user` 目录下新建 `profile.blade.php` 文件，编辑文件内容如下：  
```
{{ dd($user) }}
```
这样我们在浏览器中访问 `http://blog.dev/user/1`，就会看到打印结果了。  


## 2、 命名空间
如果你在 `App\Http\Controllers` 目录下选择使用 PHP 命名空间嵌套或组织控制器，只需要使用相对于 `App\Http\Controllers` 命名空间的指定类名即可。因此，如果你的完整控制器类是 `App\Http\Controllers\Photos\AdminController`，则可以像这样注册路由：  
```
Route::get('foo', 'Photos\AdminController@method');
```

## 3、 单动作控制器
如果你想要定义一个只处理一个动作的控制器，可以在这个控制器中定义 `__invoke` 方法：  
```
<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;

class ShowProfile extends Controller
{
    /**
     * 展示给定用户的个人主页          
     *
     * @param  int  $id
     * @return Response
     */
    public function __invoke($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
当你为这个单动作控制器注册路由的时候，不需要指定方法：  
```php
Route::get('user/{id}', 'ShowProfile');
```
这背后的原理是在 PHP 中当尝试以调用函数的方式调用一个对象时，`__invoke()` 方法会被自动调用。  




# 控制器中间件
中间件可以像这样分配给控制器路由：  
```
Route::get('profile', 'UserController@show')->middleware('auth');
```
不过，将中间件放在控制器构造函数中更方便，在控制器的构造函数中使用 `middleware` 方法你可以很轻松地分配中间件给该控制器（该方法继承自控制器基类），这样该中间件对所有控制器方法都生效：  
```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('token');
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @author LaravelAcademy.org
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
这里我们在构造函数中声明使用 `token` 中间件（关于该中间件定义参考[中间件](https://laravelacademy.org/post/7812.html)这篇教程），这样当我们访问 `http://blog.dev/user/1` 的时候，就会跳转到 Laravel 学院，只有当访问 `http://blog.dev/user/1?token=laravelacademy.org` 时，才能访问到正确的页面。  

除此之外，我们还可以指定中间件对指定方法生效或者排除指定方法的校验：  
```php
$this->middleware('auth')->only('show'); // 只对该方法生效
$this->middleware('auth')->except('show');  // 对该方法以外的方法生效
```
如果要指定多个控制器方法可以以数组的方式传参：  
```php
$this->middleware('auth')->only(['show', 'index']); // 只对指定方法生效
$this->middleware('auth')->except(['show', 'index']);  // 对指定方法以外的方法生效
```
在控制器中还可以使用闭包注册中间件，这为我们定义只在某个控制器使用的中间件提供了方便，无需定义完整的中间件类：  
```php
$this->middleware(function ($request, $next) {
    // ...

    return $next($request);
});
```
还是以 UserController 为例，我们为其定义一个匿名中间件：  
```php
class UserController extends Controller
{
  public function __construct() {
    $this->middleware('token')->except('show');
    $this->middleware(function ($request, $next) {
      if (!is_numeric($request->input('id'))) {
        throw new NotFoundHttpException();
      }
      return $next($request);
    });
  }
}
```
这样当我们访问 `http://blog.dev/user/1` 会抛出 404 异常，只有当访问 `http://blog.dev/user/1?id=1` 时才能正常展示。

>注：你还可以将中间件分配给多个控制器动作，不过，这意味着你的控制器会变得越来越臃肿，这种情况下，需要考虑将控制器分割成多个更小的控制器。  




# 资源控制器
Laravel 的资源控制器可以让我们很便捷地构建基于资源的 RESTful 控制器，例如，你可能想要在应用中创建一个控制器，用于处理关于文章存储的 HTTP 请求，使用 Artisan 命令 `make:controller`，我们可以快速创建这样的控制器：  
```
php artisan make:controller PostController --resource
```
该 Artisan 命令将会生成一个控制器文件` app/Http/Controllers/PostController.php`，这个控制器包含了每一个资源操作对应的方法：  
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
```
接下来，可以通过 resource 方法为该控制器注册一个资源路由：

Route::resource('posts', 'PostController');

这个路由声明包含了处理文章资源对应动作的多个路由，相应地，Artisan生成的控制器也已经为这些动作设置了对应的处理方法：  

#### 资源控制器处理的动作

| 请求方式 | URI路径 | 控制器方法 | 路由名称 |
| --- | --- | --- | --- |
| GET | `/posts` | index | posts.index |
| GET | `/posts/create` | create | posts.create |
| POST | `/posts` | store | posts.store |
| GET | `/posts/{post}` | show | posts.show |
| GET | `/posts/{post}/edit` | edit | posts.edit |
| PUT/PATCH | `/posts/{post}` | update | posts.update |
| DELETE | `/posts/{post}` | destory | posts.destory |

#### 指定资源模型
如果你使用了路由模型绑定，并且想要在资源控制器的方法中对模型实例进行依赖注入，可以在生成控制器的使用使用 `--model` 选项：  
```
php artisan make:controller PostController --resource --model=Post
```

#### 伪造表单方法
由于 HTML 表单不支持发起 `PUT`、`PATCH` 和 `DELETE` 请求，需要添加一个隐藏的 `_method` 字段来伪造 HTTP 请求方式，辅助函数 `method_field` 可以帮我们做这件事：  
```
{{ method_field('PUT') }}
```

## 2、 部分资源路由
声明资源路由时可以指定该路由处理的动作子集：  
```php
Route::resource('post', 'PostController', ['only' => 
    ['index', 'show']
]);

Route::resource('post', 'PostController', ['except' => 
    ['create', 'store', 'update', 'destroy']
]);
```
#### API资源路由
声明被 API 消费的资源路由时，你可能需要排除展示 HTML 模板的路由，如 `create` 和 `edit`，为了方便起见，Laravel 提供了 `apiResource` 方法自动排除这两个路由：  
```php
Route::apiResource('post', 'PostController');
```
还真是细心周到，无微不至呢~~  

## 3、 命名资源路由
默认情况下，所有资源控制器动作都有一个路由名称，不过，我们可以通过传入 `names` 数组来覆盖这些默认的名称：  
```php
Route::resource('post', 'PostController', ['names' => 
    ['create' => 'post.build']
]);
```

## 4、 命名资源路由参数
默认情况下，`Route::resource` 将会基于资源名称的单数格式为资源路由创建路由参数，你可以通过在选项数组中传递 `parameters` 来覆盖这一默认设置。 `parameters` 是资源名称和参数名称的关联数组：  
```php
Route::resource('user', 'AdminUserController', ['parameters' => [
    'user' => 'admin_user'
]]);
```
上面的示例代码会为资源的 `show` 路由生成如下 URL：  
```
/user/{admin_user}
```

## 5、 本地化资源URI
默认情况下，`Route::resource` 创建的资源 URI 是英文风格的，如果你需要本地化 `create` 和 `edit` 请求路由，可以使用 `Route::resourceVerbs` 方法。该功能可以在 `AppServiceProvider` 的 `boot` 方法中实现：  
```php
use Illuminate\Support\Facades\Route;

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    Route::resourceVerbs([
        'create' => 'xinzeng',
        'edit' => 'bianji',
    ]);
}
```
定制化请求方式完成后，注册资源路由如 `Route::resource('wenzhang', 'PostController')` 将会生成如下 URI：  
```
/wenzhang/xinzeng
/wenzhang/{wenzhang}/bianji
```

## 6、 补充资源控制器
如果需要在默认资源路由之外添加额外的路由到资源控制器，应该在调用 `Route::resource` 之前定义这些路由，否则，通过 `resource` 方法定义的路由可能无意中覆盖掉补充的额外路由：  
```php
Route::get('posts/popular', 'PostController@method');
Route::resource('posts', 'PostController');
```
>注：注意保持控制器的单一职责，如果你发现指向控制器动作的路由超过默认提供的资源控制器动作集合了，考虑将你的控制器分割成多个更小的控制器。  




# 依赖注入
## 1、 构造函数注入
```php
<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;

class UserController extends Controller
{
    /**
     * The user repository instance.
     */
    protected $users;

    /**
     * 创建新的控制器实例
     *
     * @param UserRepository $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }
}
```

## 2、 方法注入
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

如果控制器方法期望输入路由参数，只需要将路由参数放到其他依赖之后，例如，如果你的路由定义如下：  
```
Route::put('user/{id}', 'UserController@update');
```
则需要以如下方式定义控制器方法来注入 `Illuminate\Http\Request` 依赖并访问路由参数 `id`：  
```
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
     * @translator http://laravelacademy.org
     */
    public function update(Request $request, $id)
    {
        //
    }
}
```
