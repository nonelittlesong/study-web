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

## 2、 主键
默认：`id`。  

自定义：`protected $primaryKey`。  

* 主键默认是一个递增的整数值。  
* 如果使用的是非递增或者非数字的主键，须设置`public $incrementing = false`。
* 如果主键不是一个整数，须定义`protected $keyType = 'string'`。

## 3、 时间戳
默认：  
Eloquent 会默认数据表中存在 `created_at` 和 `updated_at` 这两个字段。  

自定义：  
* 不需要这两个字段 - `public $timestamps = false;`。
* 自定义时间戳格式 - `protected $dateFormat = 'U';`。
* 自定义时间戳字段名 - `const CREATED_AT = 'creation_date'; const UPDATED_AT = 'last_update';`。

