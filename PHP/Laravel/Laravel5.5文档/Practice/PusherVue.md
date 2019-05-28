# 应用初始化
## 1、 配置
### \# 时间广播
取消`config/app.php`中广播服务前面的注释:  
```php
App\Providers\EventServiceProvider::class
```

### \# pusher驱动
修改`.env`中`BROADCAST_DRIVER`配置项为`pusher`：  
```
BROADCAST_DRIVER=pusher
```
安装pusher
```
composer require pusher/pusher-php-server
```

## 2、 设置Pusher凭证信息
1. 访问 [Pusher 官网](https://pusher.com)，注册并登录到用户后台，创建一个新的 Channels App。
2. 创建完成后即可在跳转页面中获取到 App Keys 相关信息。
3. 将对应字段填充到聊天室应用根目录下的 .env 相应配置项即可。

## 3、 前端资源初始化
我们使用 Laravel Mix 来编译前端 CSS 和 JavaScript：  
```
npm install
```
此外，Laravel 还提供了 JavaScript 库 Laravel Echo 来订阅和监听事件：  
```
npm install --save laravel-echo pusher-js
```
安装完成，还要告知 Laravel Echo 使用 Pusher，Laravel 已经在 `resources/assets/js/bootstrap.js` 中为我们提供了该实现，只不过默认注释起来了，只需要取消这段注释即可：  
```js
import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: true
});
```

## 4、 用户认证脚手架代码
```
php artisan make:auth
```
编辑`.env`中数据库相关配置项，然后运行：  
```
php artisan migrate
```

# 业务代码实现
