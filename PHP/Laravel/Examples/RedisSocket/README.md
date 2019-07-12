参考：  
* https://blog.csdn.net/nsrainbow/article/details/80428769


# 一、 环境
* ubuntu16.04
* nginx 1.10.3
* php 7.3.6
* node 10.15.3
* npm 6.9.2
* redis 5.0.5
* laravel 5.8

依赖包：  
* `sudo npm install -g laravel-echo-server`
* `composer require predis/predis`
* `npm install --save socket.io-client`
* `npm install --save laravel-echo`

# 二、 广播架构
redis + socket.io 方案：  
* laravel-echo-server - 使用 socket.io 机制实现的 broadcasting 服务端。
* laravel-echo - laravel-echo是 laravel broadcasting 的客户端。 laravel-echo 有两种连接机制可选： pusher 和 socket.io。
* socket.io - websocket 的一种nodejs实现。 laravel-echo 如果使用 socket.io 则须先安装 socket.io-client。
* predis - redis 客户端的 php 实现。
* Laravel Event - 广播事件类。
* Laravel Queue - 广播机制是基于 queue 机制来实现的。
* Redis Pub/Sub - redis的订阅机制。laravel-echo-server本质上只是一个Redis订阅服务的订阅者。

架构图：  

![RedisSocket](https://github.com/nonelittlesong/study-resources/blob/master/images/Laravel/RedisSocket.png)  

流程：  
1. Laravel 通过广播发布一个 Event 对象到 Redis;
2. Laravel Queue Worker（php artisan queue:work） 读取 Event 对象，使用 Pub/Sub 机制将 Event 对象发布出去;
3. laravel-echo-server（laravel-echo-server start） 通过 Pub/Sub 机制 监听到该 Event 对象;
4. laravel-echo 使用 socket.io 与 laravel-echo-server 相连接。


# 三、 Hello World
## 1、 开启广播服务
打开 `config/app.php`，找到 'providers' 属性，将 `App\Providers\BroadcastServiceProvider::class,` 前的注释去掉。  

## 2、 注册频道路由
`routes/channels.php`:  
```php
Broadcast::channel('news', function ($user, $id) { // 闭包用来判断是否有监听该频道的权限
    return true;                                   // 让任何人都能监听该频道
});
```

## 3、 定义Event
```
php artisan make:event News
```
* 增加对 ShouldBroadcast 的实现
* 修改broadcastOn 方法，使用公共广播通道 news
* 修改构造函数

```php
class News implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message; // php对象和数组传递到js，会转成js对象

    /**
     * Create a new event instance.
     *
     * @param $message
     *
     * @return void
     */
    public function __construct($message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('news'); // 公共频道
    }
}
```

## 4、 测试广播
### 定义广播命令
编辑 `routes/console.php`，新建 bignews 命令：  
```php
Artisan::command('bignews', function () {
    broadcast(new News(date('Y-m-d h:i:s A') . ": BIG NEWS!"));
    $this->comment(date('Y-m-d h:i:s A') . ": BIG NEWS!");
})->describe('Monitor a broadcast');
```

### 配置 .env
```
...
BROADCAST_DRIVER=redis
...
QUEUE_CONNECTION=redis
...
```

### 执行 bignews 命令
```
php artisan bignews
2019-07-10 07:44:37 AM: BIG NEWS!

Process finished with exit code 0.
```
通过 redis-cli 查看 redis 中的数据：  
```
$ redis-cli
127.0.0.1:6379> keys *
1) "laravel_database_queues:default:notify"
2) "laravel_database_queues:default"
```
### 开启 Laravel Queue Worker 消费 Event：  
```
$ php artisan queue:work
```

### 使用 laravel-echo-server 监听 Laravel Queue Worker 发布的 Event
初始化 laravel-echo-server:  
```
$ laravel-echo-server init
```
开启：  
```
$ laravel-echo-server start
```


## 5、 页面
### 导入 laravel-echo 和 socket.io-client
打开 `/resources/js/bootstrap.js`，添加：  
```js
import Echo from 'laravel-echo'
window.io = require('socket.io-client');
 
window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});
```

### 创建blade
newsroom.blade.php:  
```htm
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>News Room</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div class="content">
    News Room
</div>
<script src="{{ mix('js/app.js') }}"></script>
<script>
    Echo.channel('laravel_database_news')
        .listen('News', (e) => { // e 有两个属性， socket 和 message（由 laravel 事件类所定义的属性名决定）
        console.log(e.message);  // message 和 Event 的属性名必须保持一致
    });
</script>
</body>
</html>
```
>**注:** 客户端频道添加了前缀 `laravel_database_`。  
>**e 和 Event 的属性名必须保持一致。** socket会缓存该属性名，修改程序后应重启 `laravel-echo-server`。  


### 添加web路由
web.php:  
```php
Route::view('newsroom', 'newsroom');
```

