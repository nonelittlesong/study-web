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
