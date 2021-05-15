
# Laravel 的文件夹结构

## 根目录

* app - app目录包含应用程序的核心代码。你应用中几乎所有的类都应该放在这里。
* bootstrap - 包含引导框架并配置自动加载的文件。该目录还包含了一个`cache`目录，存放着框架生成的用来提升性能的文件，比如路由和服务缓存文件。
* config - 包含应用程序的所有配置文件。我们鼓励你通读这些文件，以便帮助你熟悉所有可用的选项。
* database - 包含数据填充和迁移文件。你还可以把它作为SQLite数据库存放目录。
* public - 包含了入口文件 index.php, 它是进入应用程序的所有请求的入口点。此目录还包含了一些你的资源文件（如图片、JavaScript和CSS）。
* resources - 包含了视图和未编译的资源文件（如LESS、SASS或JavaScript）。此目录还包含你所有的语言文件。
* routes - 包含了应用程序的所有路由定义，Laravel默认包含了几个路由文件：web.php、api.php、 console.php 和 channels.php。
  * web.php - 文件包含RouteServiceProvider 放置在 web 中间件组中的路由，它提供会话状态、CSRF 防护和 cookie 加密。如果你的应用不提供无状态的、RESTful 风格的 API，则所有的路由都应该在 web.php 文件中定义。
  * api.php - 文件包含 RouteServiceProvider 放置在 api 中间件组中的路由，它提供了频率限制。这些路由都是无状态的，所以通过这些路由进入应用请求旨在通过令牌进行身份认证，并且不能访问会话状态。
  * console.php - 文件是定义所有基于闭包的控制台命令的地方。每个闭包都被绑定到一个命令实例并且允许和命令行 IO 方法进行简单的交互。尽管这些文件没有定义 HTTP 路由，但它也将基于控制台的入口点（路由）定义到应用程序中。
  * channels.php - 用来注册你的应用支持的所有的事件广播渠道的地方。
* storage - 目录包含编译的 Blade 模板、基于文件的会话和文件缓存、以及框架生成的其他文件。这个目录被细分成 app、framework 和 logs 三个子目录。app 目录可以用来存储应用生成的任何文件。framework 目录用来存储框架生成的文件和缓存。最后，logs 目录包含应用的日志文件。  
storage/app/public 可以用来存储用户生成的文件，比如需要公开访问的用户头像。你应该创建一个 public/storage 的软链接指向这个目录。你可以直接通过 php artisan storage:link 命令来创建此链接。
* tests - 目录包含自动化测试文件。Laravel 已内置了 PHPUnit 的测试范例供你参考。每个测试类都应该以 Test 作为后缀。你可以使用 phpunit 或者 php vendor/bin/phpunit 命令来运行测试。
* vendor - 目录包含了你的 Composer 依赖包。
* `.env` - 环境配置（session驱动，）。

## app目录

* console - 目录包含了所有自定义的 Artisan 命令。这些命令可以通过 make:command 来生成。这个目录还包含了控制台内核，可以用来注册你的自定义 Artisan 命令和你定义的 计划任务 的地方。
* Events - 目录默认是不存在的，它会在你运行 Artisan 命令 event:generate 或 event:make 时生成。Events 目录存放了 事件类。可以使用事件来提醒应用其他部分发生了特定的操作，为应用提供了大量的灵活性和解耦。
* Exceptions - 目录包含了应用的异常处理器，也是应用抛出异常的好地方。如果想自定义记录或者渲染异常的方式，你就要修改此目录下的 Handler 类。
* Http - 目录包含了控制器、中间件和表单请求。几乎所有的进入应用的请求的处理逻辑都被放在这里。
* Jobs - 目录默认是不存在的，它会在你运行 Artisan 命令 make:job 时生成。这个目录存放了应用中的 队列任务。应用的任务可以被推送到队列或者在当前请求的生命周期内同步运行。在当前请求期间同步运行的任务可以看做是一个「命令」，因为它们是 命令模式 的实现。
* Listeners - 目录默认是不存在的，它会在你运行 Artisan 命令 event:generate 或 make:listener 时生成。Listeners 目录包含了用来处理 事件 的类。事件监听器接收事件实例并执行响应该事件被触发的逻辑。例如，UserRegistered 事件可能由 SendWelcomeEmail 监听器处理。
* Mail - 目录默认不存在，它会在你运行 Artisan 命令 make:mail 时生成。Mail 目录包含应用所有的邮件发送类。邮件对象允许你将构建邮件的逻辑封装在可以使用     
  Mail::send 方法来发送邮件的地方。
* Notifications - 目录默认不存在，它会在你运行 Artisan 命令 make:notification 时生成。Notifications 目录包含应用发送的所有「事务性」通知，比如关于在应用中发生的事件的简单通知。Laravel 的通知功能抽象了通知发送，可以通过各种驱动（例如邮件、Slack、短信）发送通知，或是存储在数据库中。
* Policies - 目录默认不存在，它会通过运行 Artisan 命令 make:policy 来创建。Policies 目录包含了应用的授权策略类。策略可以用来决定一个用户是否有权限去操作指定资源。更多详情可以查看 授权文档。
* Providers - 目录包含了应用的所有 服务提供器。服务提供器通过在服务容器中绑定服务、注册事件、以及执行其他任务来为即将到来的请求做准备来启动应用。  
  在一个新的 Laravel 应用里，这个目录已经包含了一些服务提供器。你可以按照需要把自由添加自己的服务提供器到该目录。
* Rules - 目录默认不存在，它会在运行 Artisan 命令 make:rule 命令时被创建。Rules 目录包含应用自定义验证规则对象。这些规则意在将复杂的验证逻辑封装在一个简单的对象中。更多详情可以查看 验证文档。
