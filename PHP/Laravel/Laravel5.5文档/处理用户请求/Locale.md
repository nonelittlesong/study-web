# 一、 简介
Laravel 的本地化特性允许你在应用中轻松实现多语言支持。语言字符串默认存放在 `resources/lang` 目录中，该目录包含了应用支持的每种语言的子目录：  
```
/resources
    /lang
        /en
            messages.php
        /es
            messages.php
```
所有语言文件都返回一个键值对数组，例如：  
```
<?php

return [
    'welcome' => 'Welcome to our application'
];
```

## 1、 配置 Locale 选项
应用默认语言存放在配置文件 `config/app.php` 中，当然，你可以修改该值来满足应用需要。你还可以在运行时使用 App 门面上的 `setLocale` 方法改变当前语言：  
```php
Route::get('welcome/{locale}', function ($locale) {
    App::setLocale($locale);
    //
});
```
你还可以配置一个“备用语言”，当当前语言不包含给定语言行时备用语言被返回。和默认语言一样，备用语言也在配置文件 `config/app.php` 中配置：  
```
'fallback_locale' => 'en',
```

### \# 判断当前的本地语言
你可以使用 App 门面上的 `getLocale` 和 `isLocale` 方法来获取当前的本地语言或者检查是否与给定本地语言匹配：  
```php
$locale = App::getLocale();

if (App::isLocale('en')) {
    //
}
```

