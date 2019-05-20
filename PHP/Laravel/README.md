相关资料：  

* [新建laravel项目的两种方法](https://www.jianshu.com/p/0941dcfc939a)  
* [使用PHPStorm开发Laravel项目](https://blog.csdn.net/han_cui/article/details/80420252)  
* [Laravel中文文档](https://learnku.com/docs/laravel/5.5/structure/1284#the-console-directory)  

# 配置Laravel
## 1、 初始化配置
### \# 目录权限
安装完 Laravel 后，需要配置一些目录的读写权限：`storage` 和 `bootstrap/cache` 目录对 Web 服务器指定的用户而言应该是可写的，否则 Laravel 应用将不能正常运行。如果你使用 Homestead 虚拟机做为开发环境，这些权限已经设置好了。  
Never set a directory to 777. you should change directory ownership. so set your current user that you are logged in with as owner and the webserver user (www-data, apache, ...) as the group. You can try this:  
```
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
```
then to set directory permission try this:  
```
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### \# 应用key
接下来要做的事情就是将应用的 key（APP_KEY）设置为一个随机字符串，如果你是通过 Composer 或者 Laravel 安装器安装的话，该 key 的值已经通过 `php artisan key:generate` 命令生成好了。  
通常，该字符串应该是 32 位长，通过 `.env` 文件中的 APP_KEY 进行配置，如果你还没有将 `.env.example` 文件重命名为 `.env`，现在立即这样做。如果应用 **key 没有被设置，用户 Session 和其它加密数据将会有安全隐患!**  

### \# 更多配置
Laravel 几乎不再需要其它任何配置就可以正常使用了，不过，你最好再看看 `config/app.php` 文件，其中包含了一些基于应用可能需要进行改变的配置，比如 `timezone` 和 `locale`（分别用于配置时区和本地化）。  
你可能还想要配置 Laravel 的一些其它组件，比如缓存、数据库、Session 等，关于这些我们将会在后续文档一一探讨。  




# Web服务器配置
## Nginx
如果你使用的是 Nginx，使用如下站点配置指令就可以支持 URL 美化：  
```
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```
当然，使用 `Homestead` 或 `Valet` 的话，以上配置已经为你配置好，无需额外操作。  




# 环境配置
[dotenv](https://github.com/vlucas/phpdotenv)  
## 1、 获取环境变量配置值
应用每次接受请求时，`.env` 中列出的所有配置及其对应值都会被载入到 PHP 超全局变量 `$_ENV` 中，然后你就可以在应用中通过辅助函数 `env` 来获取这些配置值。实际上，如果你去查看 Laravel 的配置文件，就会发现很多地方已经在使用这个辅助函数了：  
```
'debug' => env('APP_DEBUG', false),
```
传递到 `env` 函数的第二个参数是默认值，如果环境变量没有被配置将会使用该默认值。  

## 2、 判断当前的应用环境
当前应用环境由 `.env` 文件中的 `APP_ENV` 变量决定，你可以通过 `App` [门面](https://laravelacademy.org/post/8616.html)上的 `environment` 方法来访问其值：  
```php
$environment = App::environment();
```
你也可以向 `environment` 方法传递参数来判断当前环境是否匹配给定值，如果需要的话你甚至可以传递多个值。如果当前环境与给定值匹配，该方法返回 true：  
```php
if (App::environment('local')) {
    // The environment is local
}

if (App::environment('local', 'staging')) {
    // The environment is either local OR staging...
}
```




# 访问配置值
你可以使用全局辅助函数 `config` 在应用代码的任意位置访问配置值，配置值以**文件名+“.”+配置项**的方式进行访问，当配置项没有被配置的时候返回默认值：  
```php
$value = config('app.timezone');
```
如果要在运行时设置配置值，传递数组参数到 `config` 方法即可：  
```php
config(['app.timezone' => 'Asia/Shanghai']);
```

# 缓存配置文件
为了给应用加速，你可以使用 Artisan 命令 `config:cache` 将所有配置文件的配置缓存到单个文件里，这将会将所有配置选项合并到单个文件从而被框架快速加载。  

应用每次上线，都要运行一次 `php artisan config:cache`，但是在本地开发时，没必要经常运行该命令，因为配置值经常会改变。  

>注：如果在部署过程中执行 `config:cache` 命令，需要确保只在配置文件中调用了 `env` 方法。  

# 维护模式
当你的应用处于维护模式时，所有对应用的请求都应该返回同一个自定义视图。这一功能在对应用进行升级或者维护时，使得“关闭”站点变得轻而易举。对维护模式的判断代码位于应用默认的中间件栈中，如果应用处于维护模式，访问应用时状态码为 `503` 的 `MaintenanceModeException` 将会被抛出。  

要开启维护模式，关闭站点，只需执行 Artisan 命令 `down` 即可：  
```
php artisan down
```
还可以提供 `message` 和 `retry` 选项给 `down` 命令。`message` 的值用于显示或记录自定义消息，而 `retry` 的值用于设置 HTTP 请求头的 Retry-After：  
```
php artisan down --message="Upgrading Database" --retry=60
```
要关闭维护模式，开启站点，对应的 Artisan 命令是 `up`：
```
php artisan up
```
>注：你可以通过定义自己的模板来定制默认的维护模式模板，自定义模板视图位于 `resources/views/errors/503.blade.php`。  

## 1、 维护模式&队列
当你的站点处于维护模式中时，所有的[队列任务](https://laravelacademy.org/post/8369.html)都不会执行；当应用退出维护模式这些任务才会被继续正常处理。  

## 2、 维护模式的替代方案
由于维护模式命令的执行需要几秒时间，你可以考虑使用 [Envoyer](https://envoyer.io/) 实现 0 秒下线作为替代方案。  

