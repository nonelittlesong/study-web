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

### \# 应用key
接下来要做的事情就是将应用的 key（APP_KEY）设置为一个随机字符串，如果你是通过 Composer 或者 Laravel 安装器安装的话，该 key 的值已经通过 `php artisan key:generate` 命令生成好了。  
通常，该字符串应该是 32 位长，通过 `.env` 文件中的 APP_KEY 进行配置，如果你还没有将 `.env.example` 文件重命名为 `.env`，现在立即这样做。如果应用 **key 没有被设置，用户 Session 和其它加密数据将会有安全隐患!**  

###
