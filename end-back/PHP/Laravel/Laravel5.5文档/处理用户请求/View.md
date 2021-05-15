# 一、 创建视图
```htm
<!-- 该视图存放 resources/views/greeting.blade.php -->
<html>
    <body>
        <h1>Hello, {{ $name }}</h1>
    </body>
</html>
```
由于这个视图存放在 `resources/views/greeting.blade.php`，我们可以通过辅助函数 `view` 像这样返回这个视图响应：  
```php
Route::get('/', function () {
    return view('greeting', ['name' => '学院君']);
});
```
正如你所看到的，传递给 `view` 方法的第一个参数是 `resources/views` 目录下相应的视图文件的名字，第二个参数是一个数组，该数组包含了在该视图中所有有效的数据。在这个例子中，我们传递了一个 `name` 变量，在视图中通过使用 Blade 语法将其显示出来。  

当然，视图还可以存放在 `resources/views` 的子目录中，用“.”号来引用嵌套视图，例如，如果视图存放路径是 `resources/views/admin/profile.blade.php`，那我们可以这样引用它：  
```php
return view('admin.profile', $data);
```

### \# 判断视图是否存在
如果需要判断视图是否存在，可调用 `View` 门面上的 `exists` 方法，如果视图在磁盘存在则返回 `true`：  
```php
use Illuminate\Support\Facades\View;

if (View::exists('emails.customer')) {
    //
}
```

### \# 创建第一个有效视图
调用 `View` 门面上的 `first` 方法，可以用于创建给定视图数组中的第一个存在的视图：  
```php
use Illuminate\Support\Facades\View;

return View::first(['custom.admin', 'admin'], $data);
```
**这个功能在应用或扩展包允许视图被自定义或覆盖时很有用。**  




# 二、 传递数据到视图
通过数组方式将数据传递到视图：  
```php
return view('greetings', ['name' => '学院君']);
```
除此之外，还可以通过 `with` 方法添加独立的数据片段到视图：  
```php
$view = view('greeting')->with('name', '学院君');
```

### \# 在视图间共享数据
有时候，我们需要在所有视图之间共享数据片段，这时候可以使用视图门面的 `share` 方法，通常，需要在某个服务提供者的 `boot` 方法中调用 `share` 方法，你可以将其添加到 `AppServiceProvider` 或生成独立的服务提供者来存放这段代码逻辑：  
```php
<?php

namespace App\Providers;

use View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * 启动所有应用服务
     *
     * @return void
     */
    public function boot()
    {
        View::share('key', 'value');
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



# 三、 视图 Composer
视图 Composer 是当视图被渲染时的回调函数或类方法。  
如果你有一些数据要在视图每次渲染时都做绑定，可以使用视图 Composer 将逻辑组织到一个单独的地方。  

在本例中，首先要在某个服务提供者中注册视图 Composer，我们将会使用 `View` 门面来访问 `Illuminate\Contracts\View\Factory` 的底层实现，记住，Laravel 不会包含默认的视图 Composer 目录，我们可以按照自己的喜好组织其路径，例如可以创建一个 `app/Http/ViewComposers` 目录：  
```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * 在容器中注册绑定.
     *
     * @return void
     * @author http://laravelacademy.org
     */
    public function boot()
    {
        // 使用基于类方法的 composers...
        View::composer(
            'profile', 'App\Http\ViewComposers\ProfileComposer'
        );

        // 使用基于回调函数的 composers...
        View::composer('dashboard', function ($view) {});
    }

    /**
     * 注册服务提供者.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```
>注：如果创建一个新的服务提供者来包含视图 Composer 注册，需要添加该服务提供者到配置文件 `config/app.php` 的 `providers` 数组中。

现在我们已经注册了视图 Composer，每次 `profile` 视图被渲染时都会执行 `ProfileComposer@compose` 方法，接下来我们来定义该 Composer 类：  
```php
<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Repositories\UserRepository;

class ProfileComposer
{
    /**
     * 用户仓库实现.
     *
     * @var UserRepository
     */
    protected $users;

    /**
     * 创建一个新的属性composer.
     *
     * @param UserRepository $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        // 依赖注入通过服务容器自动解析...
        $this->users = $users;
    }

    /**
     * 绑定数据到视图.
     *
     * @param View $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('count', $this->users->count());
    }
}
```
视图被渲染前，Composer 类的 `compose` 方法被调用，同时 `Illuminate\View\View` 实例被注入该方法，从而可以使用其 with 方法来绑定数据到视图。
>注：所有视图 Composer 都通过服务容器被解析，所以你可以在 Composer 类的构造函数中声明任何你需要的依赖。  

### \# 添加 Composer 到多个视图
你可以传递视图数组作为 `composer` 方法的第一个参数来一次性将视图 Composer 添加到多个视图：  
```php
View::composer(
    ['profile', 'dashboard'],
    'App\Http\ViewComposers\MyViewComposer'
);
```
`composer` 方法还支持 `*` 通配符，从而允许将一个 Composer 添加到所有视图：  
```php
View::composer('*', function ($view) {
    //
});
```

### \# 视图创建器
视图创建器和视图 Composer 非常类似，不同之处在于**前者在视图实例化之后立即失效**而不是等到视图即将渲染。使用 `View` 门面的 `creator` 方法即可注册一个视图创建器：  
```php
View::creator('profile', 'App\Http\ViewCreators\ProfileCreator');
```
