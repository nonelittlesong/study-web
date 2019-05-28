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
## 1、 消息模型
首先要为发送的消息创建一个模型类及其对应数据库迁移文件：  
```
php artisan make:model Message -m
```
在新生成的 `app/Messaage` 模型类中新增下面这行代码以方便批量赋值：  
```php
/**
 * Fields that are mass assignable
 *
 * @var array
 */
protected $fillable = ['message'];
```
然后在 `databases/migrations` 目录下编写刚生成的 `messages` 对应迁移文件的 `up` 方法：  
```php
Schema::create('messages', function (Blueprint $table) {
    $table->increments('id');
    $table->integer('user_id')->unsigned();
    $table->text('message');
    $table->timestamps();
});
```
最后执行迁移命令生成数据表 `messages`：  
```
php artisan migrate
```

## 2、 用户与消息的关联关系
很显然，用户与消息之间是一对多的关系，在 `User` 模型类中新增关联方法：  
```php
/**
 * A user can have many messages
 *
 * @return \Illuminate\Database\Eloquent\Relations\HasMany
 */
public function messages()
{
    return $this->hasMany(Message::class);
}
```
接下来在 `Message` 模型类中定义与之相对的关联关系：  
```php
/**
 * A message belong to a user
 *
 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
 */
public function user()
{
    return $this->belongsTo(User::class);
}
```

## 3、 控制器代码
创建控制器 `ChatsController` 实现具体业务逻辑：  
```
php artisan make:controller ChatsController
```
编写刚生成的控制器类 `app/Http/Controllers/ChatsController` 代码如下：  
```php
<?php

namespace App\Http\Controllers;

use Auth;
use App\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ChatsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');  // 登录用户才能访问
    }

    /**
     * Show chats
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('chat');
    }

    /**
     * Fetch all messages
     *
     * @return Message
     */
    public function fetchMessages()
    {
        return Message::with('user')->get();
    }

    /**
     * Persist message to database
     *
     * @param  Request $request
     * @return Response
     */
    public function sendMessage(Request $request)
    {
        $user = Auth::user();

        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);

        return ['status' => 'Message Sent!'];
    }
}
```
该控制器提供了三个业务方法，`index` 用于显示聊天室视图，`fetchMessages` 用户获取所有消息，`sendMessage` 用于发送消息。  

## 4、 注册应用路由
