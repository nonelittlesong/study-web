# 应用初始化
## 1、 配置
### \# 事件广播
取消`config/app.php`中广播服务前面的注释:  
```php
App\Providers\EventServiceProvider::class
```
修改`.env`中`BROADCAST_DRIVER`配置项为`pusher`：  
```
BROADCAST_DRIVER=pusher
```
