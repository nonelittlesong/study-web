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



