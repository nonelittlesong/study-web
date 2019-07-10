# app.php
* 配置debug模式
* 配置log
* 配置自动加载的服务提供者
  * Laravel Framework Service Providers...
  * Package Service Providers...
  * Application Service Providers...
    * 自定义文件系统
    * 广播 `App\Providers\BroadcastServiceProvider::class` - 默认关闭

# filesystems.php
配置文件系统

# services.php
配置第三方服务：  

* github登录


# broadcasting.php
* pusher
* redis
* log
* null

# database.php
不要修改此文件，在 `.env` 中配置。

* 'default' - 读取 `.env` 中的 `DB_CONNECTION`，缺省值为'mysql'。
* 'connections' - 配置数据库。
* 'migrations'
* 'redis'

# queue.php
不要修改此文件，在 `.env` 中配置。

* 'default' - 读取 `.env` 文件中的 `QUEUE_CONNECTION`， 缺省值为'sync'。
* 'connections' - 配置 queue。
* 'failed'
