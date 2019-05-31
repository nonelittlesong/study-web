# 一、 定义模型
```
php artisan make:model User
```
生成数据库迁移文件：  
```
php artisan make：model User --migration
php artisan make:model User -m
```

# 二、 Eloquent模型约定
## 1、 数据表的名称
默认：  
模型类名+s  
自定义：  
在模型内定义`$table`属性。  
```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    /**
     * 与模型关联的数据表
     *
     * @var string
     */
    protected $table = 'my_flights';
}
```

