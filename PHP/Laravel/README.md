相关资料：  

* [新建laravel项目的两种方法](https://www.jianshu.com/p/0941dcfc939a)  
* [使用PHPStorm开发Laravel项目](https://blog.csdn.net/han_cui/article/details/80420252)  
* [Laravel中文文档](https://learnku.com/docs/laravel/5.5/structure/1284#the-console-directory)  

# 配置Laravel
## 1、 初始化配置
### \# 目录权限
安装完 Laravel 后，需要配置一些目录的读写权限：`storage` 和 `bootstrap/cache` 目录对 Web 服务器指定的用户而言应该是可写的，否则 Laravel 应用将不能正常运行。如果你使用 Homestead 虚拟机做为开发环境，这些权限已经设置好了。  
Never set a directory to 777. you should change directory ownership. so set your current user that you are logged in with as owner and the webserver user (www-data, apache, ...) as the group. You can try this:  
```
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
```
then to set directory permission try this:  
```
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

