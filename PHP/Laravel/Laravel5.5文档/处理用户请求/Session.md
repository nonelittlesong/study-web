一、 简介
>注：Laravel 并没有使用 PHP 内置的 Session 功能，而且自己实现了一套更加灵活更加强大的 Session 机制，核心逻辑请参考 `Illuminate\Session\Middleware\StartSession` 这个中间件，因此在 Laravel 应用中不要试图通过 `$_SESSION` 方式去获取应用的 Session 值，这是徒劳的。  
另外，还有一个大家都感到困惑的问题，就是在 Laravel 的控制器构造函数中是无法获取应用 Session 数据的，这是因为 Laravel 的 Session 通过 StartSession 中间件启动，既然是中间件就会在服务容器注册所有服务之后执行，而控制器们的构造函数都是在容器注册服务的时候执行的，所以这个时候 Session 尚未启动，又何来的获取数据呢？解决办法是**将获取 Session 数据逻辑后置或者在构造函数中引入在 StartSession 之后执行的中间件**。  



