<details>
  <summary>常用配置文件和命令：</summary>

* nginx错误日志 - `/var/log/nginx/error.log`
* nginx配置文件 - `/etc/nginx/nginx.conf`
* php-fpm日志 - `/var/log/php7.0-fpm.log`
* www配置文件 - `/etc/php/7.0/fpm/pool.d/www.conf`
* xdebug配置文件 - `/etc/php/7.0/mods-available/xdebug.ini`

</details>
<details>
  <summary>学习资料：</summary>
  
1. https://github.com/threadshare/php  
2. https://blog.csdn.net/qianfeng_php/article/details/78984317
3. [官网](https://www.php.net/)
4. [菜鸟教程](http://www.runoob.com/php/php-tutorial.html)

</details>

框架：  
* [Laravel](https://laravel.com/)

工具:  
* [PhpStorm](https://www.jetbrains.com/zh/phpstorm/specials/phpstorm/phpstorm.html?utm_source=baidu&utm_medium=cpc&utm_campaign=cn-bai-br-phpstorm-ex-pc&utm_content=phpstorm-prue&utm_term=phpstorm&gclid=CJncwbbKv-ECFYYAXAod0SoGXA&gclsrc=ds)  


# 一、 [Xdebug](https://xdebug.org/)  
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
zend_extension=xdebug.so
xdebug.remote_enable=on
xdebug.remote_handler=dbgp # 默认，可缺省
xdebug.remote_port=9000 # 默认，可缺省
xdebug.remote_host=localhost # 默认，可缺省
```
### 3、 重启php-fpm
```sh
systemctl restart php7.0-fpm
```
**以上配置方法只使用于通过apt安装的环境。**  

# 二、 PHPStorm配置
[参考资料](https://blog.csdn.net/han_cui/article/details/80420252)  
