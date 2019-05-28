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
