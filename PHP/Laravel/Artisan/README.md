# 创建控制器
```
php artisan make:controller /User/ListController
```

# [创建视图](https://blog.csdn.net/qq_39603067/article/details/81057318)
在视图根目录`views`下创建`index.blade.php`视图文件:  
```
$ php artisan make:view index
```
在子目录`pages`下创建`index.blade.php`视图文件:  
```
$ php artisan make:view pages.index
```
在自定义目录(相对于系统根目录)下创建视图文件  
```
$ php artisan make:view index --directory=custom/path
```
指定视图文件扩展名:  
```
$ php artisan make:view index --extension=html
```
继承一个已存在的视图:  
```
$ php artisan make:view index --extends=app
```
在视图中添加title和content部分:  
```
$ php artisan make:view index --sections=title,content
```
**创建一个名为products的资源(包含index、create、edit、show视图文件)**:  
```
$ php artisan make:view products --resource
```
创建指定动作资源（index、create和edit）:  
```
$ php artisan make:view products --resource --verbs=index,create,edit
```
创建继承自layout且包含foo、bar的资源文件:  
```
$ php artisan make:view products --resource --extends=layout --sections=foo,bar
```

# 删除视图:  

删除视图文件 index.blade.php:  
```
$ php artisan scrap:view index
```
通过.删除子目录视图文件:  
```
$ php artisan scrap:view pages.index
```
