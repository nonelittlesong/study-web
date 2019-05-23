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



# 二、 定义翻译字符串
## 1、 使用缩写键
通常，翻译字符串存放在 `resources/lang` 目录下的文件中，这个目录包含了应用所支持的每种语言所对应的子目录：  
```
/resources
    /lang
        /en
            messages.php
        /es
            messages.php
```
所有语言文件都返回有对应缩写键的字符串数组，例如：  
```
<?php

// resources/lang/en/messages.php

return [
    'welcome' => 'Welcome to our application'
];
```

## 2、 使用翻译字符串作为键
对于那些对翻译有重度要求的应用来说，为每个字符串定义一个“short key”在视图中引用的时候会变得越来越难以理解，甚至引起困惑。因为这个原因，Laravel 还支持使用“默认”翻译字符串作为键来定义翻译字符串。  

使用翻译字符串作为键的翻译文件以 JSON 文件的方式存放在 `resources/lang` 目录下。例如，如果你的应用有一个西班牙版翻译，需要创建一个 `resources/lang/es.json` 文件：  
```
{
    "I love programming.": "Me encanta la programación."
}
```



# 三、 获取翻译字符串
你可以使用辅助函数 `__` 从语言文件中获取行，该方法接收文件和翻译字符串的键作为第一个参数，举个例子，我们从语言文件 `resources/lang/messages.php` 中获取`welcome` 对应的翻译字符串：  
```
echo __('messages.welcome');

echo __('I love programming.');
```
当然如果你使用了 Blade 模板引擎，可以使用 `{{ }}` 语法打印翻译字符串或者使用 @lang 指令：  
```
{{ __('messages.welcome') }}
@lang('messages.welcome')
```
如果指定的翻译字符串不存在，`__`函数将返回翻译字符串的键，所以，使用上面的例子，如果翻译字符串不存在的话，`__`函数将返回 `messages.welcome`。  

## 1、 替换翻译字符串中的参数
如果需要的话，你可以在翻译字符串中定义占位符，所有的占位符都有一个`:`前缀，例如，你可以用占位符 name 定义一个 welcome 消息：
```
'welcome' => 'Welcome, :name',
```
要在获取翻译字符串的时候替换占位符，传递一个替换数组作为 `__` 函数的第二个参数：  
```
echo __('messages.welcome', ['name' => 'laravel']);
```
如果占位符都是大写的，或者首字母是大写的，那么相应的，传入的值也会保持和占位符格式一致：  
```
'welcome' => 'Welcome, :NAME', // Welcome, LARAVEL
'goodbye' => 'Goodbye, :Name', // Goodbye, Laravel
```

## 2、复数
复数是一个复杂的问题，因为不同语言对复数有不同的规则，通过使用管道符“|”，你可以区分一个字符串的单数和复数形式：  
```
'apples' => 'There is one apple|There are many apples',
```
你还可以创建为多个数字区间指定翻译字符串的、更复杂的复数规则：  
```
'apples' => '{0} There are none|[1,19] There are some|[20,*] There are many',
```
之后，你可以使用 `trans_choice` 函数获取给定行数的语言行，在本例中，由于行数大于1，将会返回翻译字符串的复数形式：  
```
echo trans_choice('messages.apples', 10);
```



# 三、 覆盖 Vendor 包的语言文件
有些扩展包可能会自己处理语言文件。你可以通过将自己的文件放在 `resources/lang/vendor/{package}/{locale}` 目录下来覆盖它们而不是破坏这些包的核心文件来调整这些句子。  

所以，举个例子，如果你需要覆盖名为 `skyrim/hearthfire` 扩展包中的 `messages.php` 文件里的英文句子，可以创建一个 `resources/lang/vendor/hearthfire/en/messages.php` 文件。在这个文件中只需要定义你想要覆盖的句子，没有覆盖的句子仍然从该扩展包原来的语言文件中加载。  
