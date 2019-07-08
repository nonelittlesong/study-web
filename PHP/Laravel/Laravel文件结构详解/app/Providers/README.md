* 系统服务提供者
* 自定义服务提供者

# EventServiceProvider
注册事件/监听器。  
```php
protected $listen = [
    'App\Events\OrderShipped' => [
        'App\Listeners\SendShipmentNotification',
    ],
];
```

# RouteServiceProvider
* 设置路由参数约束
* 定义控制器命名空间

