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
