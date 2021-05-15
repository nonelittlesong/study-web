# 一、 配置
## 1、 错误详情
* `config/app.php`中的`debug`
* `.env`中的`APP_DEBUG`

## 2、 日志存储
日志文件类型：  
* single - 所有日志记录到单个文件中
* daily - 按日生成日志文件
* syslog - 通过系统syslog服务处理日志信息
* errorlog - 通过PHP `error_log`处理器处理日志信息

`config/app.php`:  
```
'log' => 'daily'
```

### \# 日志文件的最大生命周期
`config/app.php`:  
```
'log_max_files' => 30
```

## 3、 日志错误级别
```
'log_level' => env('APP_LOG_LEVEL', 'error'),
```
>注：Monolog 支持以下错误级别：`debug`、`info`、`notice`、`warning`、`error`、`critical`、`alert`、`emergency`。  

## 4、 自定义Monolog配置
你需要在 `bootstrap/app.php` 文件返回 `$app` 变量之前调用该方法：
```php
$app->configureMonologUsing(function($monolog) {
    $monolog->pushHandler(...);
});

return $app;
```
### \# 自定义频道名称
```
'log_channel' => env('APP_LOG_CHANNEL', 'my-app-name'),
```



# 二、 异常处理器
## 1、 report方法
`report` 方法用于记录异常并将其发送给外部服务如 `Bugsnag` 或 `Sentry`，默认情况下，`report` 方法只是将异常传递给异常被记录的基类，当然你也可以按自己的需要记录异常并进行相关处理。  

例如，如果你需要以不同方式报告不同类型的异常，可使用 PHP 的`instanceof` 比较操作符：  
```php
/**
 * 报告或记录异常
 *
 * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
 *
 * @param  \Exception  $e
 * @return void
 * @translator laravelacademy.org
 */
public function report(Exception $e){
    if ($e instanceof CustomException) { // 判断异常类型
        //
    }

    return parent::report($e);
}
```

### \# `report`辅助函数
有时候你可能需要报告一个异常并继续处理当前请求。辅助函数 `report` 允许你使用异常处理器的 `report` 方法快速报告一个异常而不会渲染错误页：  
```php
public function isValid($value)
{
    try {
        // Validate the value...
    } catch (Exception $e) {
        report($e);

        return false;
    }
}
```

### \# 通过类型忽略异常
异常处理器的 `$dontReport` 属性包含一个不会被记录的异常类型数组，默认情况下，`404` 错误异常不会被写到日志文件，如果需要的话你可以添加其他异常类型到这个数组：  
```php
/**
 * 不应该被报告的异常类型列表.
 *
 * @var array
 */
protected $dontReport = [
\Illuminate\Auth\AuthenticationException::class,
\Illuminate\Auth\Access\AuthorizationException::class,
\Symfony\Component\HttpKernel\Exception\HttpException::class,
\Illuminate\Database\Eloquent\ModelNotFoundException::class,
\Illuminate\Validation\ValidationException::class,
];
```

## 2、 render方法
`render` 方法负责将给定异常转化为发送给浏览器的 HTTP 响应，默认情况下，异常被传递给为你生成响应的基类。当然，你也可以按照自己的需要检查异常类型或者返回自定义响应：  
```php
/**
 * 将异常渲染到HTTP响应中
 *
 * @param  \Illuminate\Http\Request  $request
 * @param  \Exception  $e
 * @return \Illuminate\Http\Response
 */
public function render($request, Exception $e){
    if ($e instanceof CustomException) {
        return response()->view('errors.custom', [], 500);
    }

    return parent::render($request, $e);
}
```

## 3、 可报告&可渲染的异常
除了在异常处理器的 `report` 和 `render` 方法中进行异常类型检查外，还可以在自定义异常中直接定义 `report` 和 `render` 方法。当异常中存在这些方法时，框架会自动调用它们：  
```php
<?php

namespace App\Exceptions;

use Exception;

class RenderException extends Exception
{
    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
        //
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response(...);
    }
}
```



# 三、 HTTP异常
有些异常描述来自服务器的 HTTP 错误码，例如，这可能是一个“页面未找到”错误（404），“认证失败错误”（401）亦或是程序出错造成的500错误，为了在应用中生成这样的响应，可以使用 `abort` 辅助函数：  
```
abort(404);
```
`abort` 辅助函数会立即引发一个会被异常处理器渲染的异常，此外，你还可以像这样提供响应描述：  
```
abort(403, '未授权操作');
```
**该方法可在请求生命周期的任何时间点使用。**  

## 1、 自定义 HTTP 错误页面

在 Laravel 中，返回不同 HTTP 状态码的错误页面很简单，例如，如果你想要自定义 404 错误页面，创建一个 `resources/views/errors/404.blade.php` 文件，该视图文件用于渲染程序返回的所有 `404` 错误。需要注意的是，该目录下的**视图命名应该和相应的 HTTP 状态码相匹配**。`abort` 函数触发的 `HttpException` 异常会以 `$exception` 变量的方式传递给视图：  
```htm
<h2>{{ $exception->getMessage() }}</h2>
```



# 四、 日志
Laravel 基于强大的 Monolog 库提供了简单的日志抽象层，默认情况下，Laravel 被配置为在 `storage/logs` 目录下每天为应用生成日志文件，你可以使用 `Log 门面`记录日志信息到日志中：  
```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * 显示指定用户的属性
     *
     * @param  int  $id
     * @return Response
     */
    public function showProfile($id)
    {
        Log::info('Showing user profile for user: '.$id);
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```
>该日志记录器提供了 [RFC 5424](https://tools.ietf.org/html/rfc5424) 中定义的八种日志级别：emergency、alert、critical、error、warning、notice、info 和 debug。  
```
Log::emergency($error);
Log::alert($error);
Log::critical($error);
Log::error($error);
Log::warning($error);
Log::notice($error);
Log::info($error);
Log::debug($error);
```

### \# 上下文信息

上下文数据也会以数组形式传递给日志方法，然后和日志消息一起被格式化和显示：  
```
Log::info('User failed to login.', ['id' => $user->id]);
```

### \# 访问底层 Monolog 实例

Monolog 有多个可用于日志的处理器，如果需要的话，你可以访问 Laravel 使用的底层 Monolog 实例：
```
$monolog = Log::getMonolog();
```

