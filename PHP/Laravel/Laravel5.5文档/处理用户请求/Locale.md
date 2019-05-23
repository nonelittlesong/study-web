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

