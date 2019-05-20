https://laravelacademy.org/post/8355.html  

事件类通常存放在 `app/Events` 目录，监听器存放在 `app/Listeners`。  
如果你在应用中没有看到这些目录，不要担心，它们会在你使用 Artisan 命令生成事件和监听器的时候自动创建。  

# 注册事件/监听器
Laravel 自带的 `EventServiceProvider` 为事件监听器注册提供了方便之所。其中的 `$listen` 属性包含了事件（键）和对应监听器（值）数组。  
```php
/**
 * 应用的事件监听器映射.
 *
 * @var array
 * @translator laravelacademy.org
 */
protected $listen = [
    'App\Events\OrderShipped' => [
        'App\Listeners\SendShipmentNotification',
    ],
];
```
## 1、 生成事件/监听类
```
php artisan event:generate
```

## 2、 手动注册事件
通常，我们需要通过 `EventServiceProvider` 的 `$listen` 数组注册事件，此外，你还可以在 `EventServiceProvider` 的 `boot` 方法中手动注册基于闭包的事件：  
```php
/**
 * 注册应用的其它事件.
 *
 * @return void
 */
public function boot()
{
    parent::boot();

    Event::listen('event.name', function ($foo, $bar) {
        //
    });
}
```

## 3、 通配符事件监听器
你甚至还可以使用通配符`*`来注册监听器，这样就可以通过同一个监听器捕获多个事件。通配符监听器接收整个事件数据数组作为参数：  
（~下面的代码写在哪？~）  
```php
$events->listen('event.*', function ($eventName, array $data) {
    //
});
```

# 定义事件
事件类是一个处理与事件相关的简单数据容器，例如，假设我们生成的 `OrderShipped` 事件接收一个 `Eloquent ORM` 对象：  
```php
<?php

namespace App\Events;

use App\Order;
use Illuminate\Queue\SerializesModels;

class OrderShipped
{
    use SerializesModels;

    public $order;

    /**
     * 创建一个新的事件实例.
     *
     * @param  Order  $order
     * @return void
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }
}
```
正如你所看到的，该事件类不包含任何特定逻辑，只是一个存放被购买的 `Order` 对象的容器，如果事件对象被序列化的话，事件使用的 `SerializesModels trait` 将会使用 PHP 的 `serialize` 函数序列化所有 `Eloquent` 模型。  

# 定义监听器
接下来，让我们看看示例事件的监听器，事件监听器在 `handle` 方法中接收事件实例，`event:generate` 命令将会自动在 `handle` 方法中导入相应的事件类和类型提示事件。在 `handle` 方法内，你可以执行任何需要的逻辑以响应事件：  
```php
<?php

namespace App\Listeners;

use App\Events\OrderShipped;

class SendShipmentNotification
{
    /**
     * 创建事件监听器.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * 处理事件.
     *
     * @param  OrderShipped  $event
     * @return void
     */
    public function handle(OrderShipped $event)
    {
        // 使用 $event->order 发访问订单...
    }
}
```
>注：事件监听器还可以在构造器中类型提示任何需要的依赖，所有事件监听器通过服务容器解析，所以依赖会自动注入。  

## 1、 停止事件继续往下传播
有时候，你希望停止事件被传播到其它监听器，你可以通过从监听器的 `handle` 方法中返回 `false` 来实现。  

# 事件监听器队列
如果监听器将要执行耗时任务比如发送邮件或者发送 HTTP 请求，那么将监听器放到队列是一个不错的选择。在队列化监听器之前，确保已经配置好队列并且在服务器或本地环境启动一个队列监听器。  
要指定某个监听器需要放到队列，只需要让监听器类实现 `ShouldQueue` 接口即可，通过 Artisan 命令 `event:generate` 生成的监听器类已经将这个接口导入当前命名空间，所有你可以直接拿来使用：  
```php
<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    //
}
```

## 1、 自定义队列连接&队列名称
在监听器类中定义 `$connection` 和 `$queue` 属性：  
```php
<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    /**
     * 任务将被推送到的连接名称.
     *
     * @var string|null
     */
    public $connection = 'sqs';

    /**
     * 任务将被推送到的连接名称.
     *
     * @var string|null
     */
    public $queue = 'listeners';
}
```

## 2、 手动访问队列
如果你需要手动访问底层队列任务的 `delete` 和 `release` 方法，在生成的监听器中，默认导入的 `Illuminate\Queue\InteractsWithQueue` trait 为这两个方法提供了访问权限：  
```php
<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(OrderShipped $event)
    {
        if (true) {
            $this->release(30);
        }
    }
}
```

## 3、 处理失败任务
`failed` 方法接收事件实例和导致失败的异常：  
```php
<?php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(OrderShipped $event)
    {
        //
    }

    public function failed(OrderShipped $event, $exception)
    {
        //
    }
}
```

# 分发时间
要分发一个事件，可以传递事件实例到辅助函数 `event`，这个辅助函数会分发事件到所有注册的监听器。由于辅助函数 `event` 全局有效，所以可以在应用的任何地方调用它：  
（~什么是辅助函数~）  
```php
<?php

namespace App\Http\Controllers;

use App\Order;
use App\Events\OrderShipped;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * 处理给定订单.
     *
     * @param  int  $orderId
     * @return Response
     */
    public function ship($orderId)
    {
        $order = Order::findOrFail($orderId);

        // 订单处理逻辑...

        event(new OrderShipped($order));
    }
}
```
>注：测试的时候，只需要断言特定事件被分发，无需真正触发监听器，Laravel 自带的测试函数让这一实现轻而易举。  

# 事件订阅者

## 1、 编写事件订阅者
订阅者需要定义一个 `subscribe` 方法，该方法中传入一个事件分发器实例。  
你可以在给定的分发器中调用 `listen` 方法注册事件监听器：  
```php
<?php

namespace App\Listeners;

class UserEventSubscriber
{
    /**
     * 处理用户登录事件.
     * @translator laravelacademy.org
     */
    public function onUserLogin($event) {}

    /**
     * 处理用户退出事件.
     */
    public function onUserLogout($event) {}

    /**
     * 为订阅者注册监听器.
     *
     * @param  Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            'Illuminate\Auth\Events\Login',
            'App\Listeners\UserEventSubscriber@onUserLogin'
        );

        $events->listen(
            'Illuminate\Auth\Events\Logout',
            'App\Listeners\UserEventSubscriber@onUserLogout'
        );
    }

}
```

## 2、 注册事件订阅者
编写好订阅者之后，就可以通过事件分发器对订阅者进行注册，你可以使用 `EventServiceProvider` 提供的 `$subcribe` 属性来注册订阅者。例如，让我们添加一个 UserEventSubscriber ：  
```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * 应用的事件监听器映射.
     *
     * @var array
     */
    protected $listen = [
        //
    ];

    /**
     * 要注册的订阅者类.
     *
     * @var array
     */
    protected $subscribe = [
         'App\Listeners\UserEventSubscriber',
    ];
}
```
