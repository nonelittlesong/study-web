# channels.php
```php
<?php
 
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
| 注册事件广播频道
| 回调函数判断客户端是否能监听频道
|
*/
 
Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
 
Broadcast::channel('news', function ($user, $id) {
    return true;
});
```

# console.php
* 自定义 artisan 命令。
