学习资料：  
1. https://github.com/threadshare/php  
2. https://blog.csdn.net/qianfeng_php/article/details/78984317
3. [官网](https://www.php.net/)
4. [菜鸟教程](http://www.runoob.com/php/php-tutorial.html)


框架：  
* [Laravel](https://laravel.com/)

工具:  
* [PhpStorm](https://www.jetbrains.com/zh/phpstorm/specials/phpstorm/phpstorm.html?utm_source=baidu&utm_medium=cpc&utm_campaign=cn-bai-br-phpstorm-ex-pc&utm_content=phpstorm-prue&utm_term=phpstorm&gclid=CJncwbbKv-ECFYYAXAod0SoGXA&gclsrc=ds)  


# [Xdebug](https://xdebug.org/)  
Xdebug is an extension for PHP to assist with debugging and development. It contains a single step debugger to use with IDEs; it upgrades PHP's var_dump() function; it adds stack traces for Notices, Warnings, Errors and Exceptions; it features functionality for recording every function call and variable assignment to disk; it contains a profiler; and it provides code coverage functionality for use with PHPUnit.   
## 安装配置（ubuntu 16.04）：
### 1、 使用apt自动安装
```sh
# sudo apt install php-xdebug
```
查看是否成功：  
```sh
$ php -version
```
### 2、 配置xdebug
通过apt安装的php在`/etc/php/7.0/`。  
编辑xdebug.ini：  
```sh
sudo vim /etc/php/7.0/mods-available/xdebug.ini
```
插入以下代码：  
```
zend_extension = xdebug.so
xdebug.profiler_enable = 1
xdebug.profiler_output_dir = "/tmp"
xdebug.remote_enable = 1
xdebug.remote_port=9000
xdebug.remote_host=localhost
```
