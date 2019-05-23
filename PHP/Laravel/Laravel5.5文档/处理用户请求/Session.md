一、 简介
>注：Laravel 并没有使用 PHP 内置的 Session 功能，而且自己实现了一套更加灵活更加强大的 Session 机制，核心逻辑请参考 `Illuminate\Session\Middleware\StartSession` 这个中间件，因此在 Laravel 应用中不要试图通过 `$_SESSION` 方式去获取应用的 Session 值，这是徒劳的。  
另外，还有一个大家都感到困惑的问题，就是在 Laravel 的控制器构造函数中是无法获取应用 Session 数据的，这是因为 Laravel 的 Session 通过 StartSession 中间件启动，既然是中间件就会在服务容器注册所有服务之后执行，而控制器们的构造函数都是在容器注册服务的时候执行的，所以这个时候 Session 尚未启动，又何来的获取数据呢？解决办法是**将获取 Session 数据逻辑后置或者在构造函数中引入在 StartSession 之后执行的中间件**。  

## 1、 配置
Session 配置文件位于 `config/session.php`。默认情况下，Laravel 使用的 Session 驱动为 `file` 驱动，这对许多应用而言是没有什么问题的。在生产环境中，你可能考虑使用 [memcached](https://memcached.org/) 或者 [redis](https://redis.io/) 驱动以便获取更佳的 Session 性能，尤其是线上同一个应用部署到多台机器的时候，这是最佳实践。  

Session 驱动用于定义请求的 Session 数据存放在哪里，Laravel 可以处理多种类型的驱动：  

* `file` – Session 数据存储在 `storage/framework/sessions` 目录下；
* `cookie` – Session 数据存储在经过安全加密的 Cookie 中；
* `database` – Session 数据存储在数据库中
* `memcached` / `redis` – Session 数据存储在 Memcached/Redis 缓存中，访问速度最快；
* `array` – Session 数据存储在简单 PHP 数组中，在多个请求之间是非持久化的。

>注：数组驱动通常用于运行测试以避免 Session 数据持久化。  


## 2、 Session 驱动预备知识
### \# 数据库
当使用 `database` 作为 Session 驱动时，需要设置表包含 Session 字段，下面是该数据表的表结构声明：  
```
Schema::create('sessions', function ($table) {
    $table->string('id')->unique();
    $table->unsignedInteger('user_id')->nullable();
    $table->string('ip_address', 45)->nullable();
    $table->text('user_agent')->nullable();
    $table->text('payload');
    $table->integer('last_activity');
});
```
你可以使用 Artisan 命令 `session:table` 在数据库中创建这张表：  
```
php artisan session:table
php artisan migrate
```

### \# Redis
在 Laravel 中使用 Redis 作为 Session 驱动前，需要通过 Composer 安装 `predis/predis` 包。可以在 `database` 配置文件中配置 Redis 连接，在 Session 配置文件中，`connection` 选项用于指定 Session 使用哪一个 Redis 连接。  

比如我在 `config/database.php` 中为 Redis 配置了一个 Session 连接：  
```php
`redis` => [
  'client' => 'predis',
  'default' => [
    'host' => env('REDIS_HOST', '127.0.0.1'),
    'password' => env('REDIS_PASSWORD', null),
    'port' => env('REDIS_PORT', 6379),
    'database' => 0,
  ],
  'session' => [
    'host' => env('SESS_REDIS_HOST', '127.0.0.1'),
    'password' => env('SESS_REDIS_PASSWORD', null),
    'port' => env('SESS_REDIS_PORT', 6379),
    'database' => 0,
  ]
],
```
然后在 `config/session.php` 中配置 Session 驱动为 `redis`，对应的 `connection` 项指向 `database` 中的 `redis.session` 配置：  
```php
'driver' => env('SESSION_DRIVER', 'file'),
'connection' => 'session',
```
>注：SESSION_DRIVER=redis 在 .env 中设置。  




# 二、 使用Session
## 1、 获取数据
* `session()`辅助函数
* Request实例的`session`属性

### \# Request实例
控制器方法依赖通过 Laravel 服务容器自动注入：  
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller{
    /**
     * 显示指定用户的属性
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function show(Request $request, $id)
    {
        $value = $request->session()->get('key');

        //
    }
}
```
从 Session 中获取数据的时候，还可以传递默认值作为第二个参数到 `get` 方法，默认值在指定键在 Session 中不存在时返回。如果你传递一个闭包作为默认值到 `get` 方法，该闭包会执行并返回执行结果：  
```php
$value = $request->session()->get('key', 'default');

$value = $request->session()->get('key', function() {
    return 'default';
});
```

### \# 全局Session辅助函数
还可以使用全局的 PHP 函数 `session` 来获取和存储 Session 数据。  
如果只传递一个字符串参数到 `session` 方法，则返回该 Session 键对应的值；如果传递的参数是 key/value 键值对数组，则将这些数据保存到 Session：  
```php
Route::get('home', function () {
    // 从session中获取数据...
    $value = session('key');
    // 指定默认值...
    $value = session('key', 'default');
    // 存储数据到session...
    session(['key' => 'value']);
});
```
>注：通过 HTTP 请求实例和辅助函数 `session` 处理数据并无实质性差别，这两个方法在测试用例中都可以通过 `assertSessionHas` 方法进行测试。  


### \# 获取所有Session数据
如果你想要从 Session 中获取所有数据，可以使用 `all` 方法：  
```php
$data = $request->session()->all();
```

### \# 判断Session中是否存在指定项
`has` 方法可用于检查数据项在 Session 中是否存在。如果存在并且不为 `null` 的话返回 `true`：  
```php
if ($request->session()->has('users')) {
    //
}
```
要判断某个值在 Session 中是否存在，即使是 `null` 的话也无所谓，则可以使用 `exists` 方法。如果值存在的话 `exists` 返回 `true`：  
```php
if ($request->session()->exists('users')) {
    //
}
```


## 2、 存储数据
* `put` 方法
* `session` 辅助函数

```php
//通过调用请求实例的 put 方法
$request->session()->put('key', 'value');

// 通过全局辅助函数 session
session(['key' => 'value']);
```

### \# 推送数据到数组Session
`push` 方法可用于推送数据到值为数组的 Session，例如，如果 `user.teams` 键包含团队名数组，可以像这样推送新值到该数组：  
```php
$request->session()->push('user.teams', 'developers');
```

### \# 获取&删除数据
`pull` 方法将会通过一条语句从 Session 获取并删除数据：
```php
$value = $request->session()->pull('key', 'default');
```

## 3、 一次性数据
有时候你可能想要在 Session 中存储只在下个请求中有效的数据，这可以通过 `flash` 方法来实现。使用该方法存储的 Session 数据只在随后的 HTTP 请求中有效，然后将会被删除：  
```php
$request->session()->flash('status', '登录Laravel学院成功!');  
```
如果你需要在更多请求中保持该一次性数据，可以使用 `reflash` 方法，该方法将所有一次性数据保留到下一个请求，如果你只是想要保存特定一次性数据，可以使用 `keep` 方法：  
```php
$request->session()->reflash();
$request->session()->keep(['username', 'email']);
```

## 4、 删除数据
`forget` 方法从 Session 中移除指定数据，如果你想要从 Session 中移除所有数据，可以使用 `flush` 方法：  
```php
$request->session()->forget('key');
$request->session()->flush();
```

## 5、 重新生成 Session ID
重新生成 Session ID 经常用于阻止恶意用户对应用进行 `session fixation` 攻击。  

如果你使用内置的 `LoginController` 的话，Laravel 会在认证期间自动重新生成 session ID，如果你需要手动重新生成 session ID，可以使用 `regenerate` 方法：  
```php
$request->session()->regenerate();
```



# 三、 添加自定义Session驱动
## 1、 实现驱动
自定义 Session 驱动需要实现 `SessionHandlerInterface` 接口，该接口包含少许我们需要实现的方法，比如一个基于 MongoDB 的 Session 驱动实现如下：  
```php
<?php

namespace App\Extensions;

class MongoHandler implements SessionHandlerInterface
{
    public function open($savePath, $sessionName) {}
    public function close() {}
    public function read($sessionId) {}
    public function write($sessionId, $data) {}
    public function destroy($sessionId) {}
    public function gc($lifetime) {}
}
```
>注：Laravel 默认并没有附带一个用于包含扩展的目录，你可以将扩展放置在任何地方，这里我们创建一个 `Extensions` 目录用于存放 `MongoHandler`。  

由于这些方法并不是很容易理解，所以我们接下来快速过一遍每一个方法：  

* `open` 方法用于基于文件的 Session 存储系统，由于 Laravel 已经有了一个 file Session 驱动，所以在该方法中不需要放置任何代码，可以将其置为空方法。
* `close` 方法和 `open` 方法一样，也可以被忽略，对大多数驱动而言都用不到该方法。
* `read` 方法应该返回与给定 `$sessionId` 相匹配的 Session 数据的字符串版本，从驱动中获取或存储 Session 数据不需要做任何序列化或其它编码，因为 Laravel 已经为我们做了序列化。
* `write` 方法应该将给定 `$data` 写到持久化存储系统相应的 `$sessionId`, 例如 MongoDB, Dynamo 等等。再次重申，不要做任何序列化操作，Laravel 已经为我们处理好了。
* `destroy` 方法从持久化存储中移除 `$sessionId` 对应的数据。
* `gc` 方法销毁大于给定 `$lifetime` 的所有 Session 数据，对本身拥有过期机制的系统如 `Memcached` 和 `Redis` 而言，该方法可以留空。

## 2、 注册驱动

Session 驱动被实现后，需要将其注册到框架，要添加额外驱动到 Laravel Session 后端，可以使用 `Session` 门面上的 `extend` 方法。我们在某个服务提供者（已存在或新创建）的 `boot` 方法中调用该方法：  
```php
<?php

namespace App\Providers;

use App\Extensions\MongoSessionStore;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;

class SessionServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        Session::extend('mongo', function($app) {
            // Return implementation of SessionHandlerInterface...
            return new MongoSessionStore;
        });
    }

    /**
     * Register bindings in the container.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```
Session 驱动被注册之后，就可以在配置文件 `config/session.php` 中使用 `mongo` 驱动了。  

