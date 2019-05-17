resources：  
* [Nginx中文文档](http://www.nginx.cn/doc/)  
* [nginx news](http://nginx.org/)  
* [阿里云搭建LNMP环境（ CentOS 7）](https://help.aliyun.com/document_detail/97251.html?spm=a2c4g.11186623.6.990.3fe3685301ylyp)
* [Nginx配置](https://www.jianshu.com/p/849343f679aa)

notes：  
* [linux用户操作](https://github.com/nonelittlesong/study-ubuntu/wiki/CentOS-User-and-Group)
* [systemctl](https://github.com/nonelittlesong/study-ubuntu/blob/master/systemctl.md)
* [查看进程](https://github.com/nonelittlesong/study-ubuntu)

# 配置nginx ver.2
https://blog.csdn.net/lgyaxx/article/details/79507525  

在`/etc/nginx/nginx.conf`中，有：  
```
include /etc/nginx/sites-enabled/*;
```
>类似Apache的配置，Nginx配置中也存在`sites-available`这个文件夹，不过与Apache略有不同的是，Nginx配置完`vhost`后，使用`symbolic link`将配置文件链接至`sites-enabled`文件夹。  

那么我们首先打开Nginx配置：  
```sh
$ cd /etc/nginx/sites-available
$ cp default mysite.com
```
可以看到，我们将sites-available文件夹下的default配置文件拷贝后，生成了我们需要修改的名为mysite.com的配置文件。打开这个文件：  
```
$ vim mysite.com
```
可以看到，里面有一段这样的配置：  
```
# Virtual Host configuration for example.com 
# 
# You can move that to a different file under sites-available/ and symlink that 
# to sites-enabled/ to enable it. 
# 
#server { 
#       listen 80; 
#       listen [::]:80; 
# 
#       server_name example.com; 
# 
#       root /var/www/example.com; 
#       index index.html; 
# 
#       location / { 
#               try_files $uri $uri/ =404; 
#       } 
#}
```
我在文章头部已经说过，我的Laravel项目文件在/var/www/myproject中，我们假设我们将要使用mysite.com这个域名作为我们网站地址。那么我们将以上配置做出修改如下：  
```
server {
        listen 80;
        listen [::]:80;

        root /var/www/myproject/public;

        index index.php;

        server_name mysite.com www.mysite.com;

        location / {
                try_files $uri $uri/ /index.php?$query_string;
        }

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass unix:/run/php/php7.2-fpm.sock;
        }

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        location ~ /\.ht {
                deny all;
        }
}
```

可以看到，我们在server_name中加上了`mysite.com`及`www.mysite.com`这个alias，所以两者都可以用来访问我们的项目。  

index后面我们添加了index.php，因为我们需要php来动态加载页面。  

接下来我们看到  
```
location / {
  try_files $uri $uri/ /index.php?$query_string;
}
```
这段location配置非常重要，注意我们在try_files的最后，添加了/index.php?$query_string。这一步非常重要，因为为了使Laravel正常工作，所有的请求都应该被传递给Laravel本身，即所有的请求都被传递给了index.php，Laravel的应用主文件。如果这一步没有配置，那么我们只能够打开项目主页，其余页面将无法跳转。  

```
location ~ \.php$ {
  include snippets/fastcgi-php.conf;
  fastcgi_pass unix:/run/php/php7.2-fpm.sock;
}
这一段中我们设置好php-fpm的相关配置。然后保存退出。

接下来我们输入  
```sh
$ sudo ln -s /etc/nginx/sites-available/mysite.com /etc/nginx/sites-enabled/
```
以激活我们的网站。注意：这里一定要使用绝对路径，而不能使用相对路径（例如../sites-available），切记。  

完成后，我们重启Nginx：  
```sh
$ sudo systemctl restart nginx
```
好了，这样一来，mysite.com就成功地被指向我们的项目地址，并且nginx可以正常处理请求加载出页面了。  

其他配置：  
```
    server {
        location / {
            index index.php index.html index.htm;
        }
        location ~ \.php$ {
            root /home/song/PhpstormProjects/Lara3/public;
            fastcgi_pass unix:/run/php/php7.0-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
        location ~ .*\.(js|css|png|jpg)$ {
            root /home/song/PhpstormProjects/Lara3/resources;
            if (-f $request_filename) {
                expires 1d;
                break;
            }
        }
    }

```

# 配置nginx
在`/etc/php/7.3/fpm/pool.d/www.conf`中，有：  
```
listen = /run/php/php7.3-fpm.sock
```
因此，在nginx中，进行如下配置：  
```
fastcgi_pass unix:/run/php/php7.3-fpm.sock
```
## 1、 

# 常用指令
### 查看端口
```sh
lsof -i:端口号
# 或者
netstat -tunlp |grep 端口号
```

# Troubleshootings
## 1、 localhost被其他程序（如digits）占用
卸载digits：  
```
$ sudo apt-get remove digits
$ sudo apt-get autoremove
```
## 2、 [解决Nginx php-fpm配置有误引起的502错误](https://www.centos.bz/2017/07/nginx-php-fpm-502-error/)
修改nginx.conf:  
将`astcgi_pass 127.0.0.1:9000;`  
修改为`fastcgi_pass unix:/run/php/php7.0-fpm.sock;`  

## 3、 [nginx无法加载资源文件](https://www.cnblogs.com/IT--Loding/p/6294185.html)
```
location ~ .*\.(js|css|png|jpg)$ {               # 这是是需要加载文件的正则过滤 如果有其他文件再加上即可
  root /home/song/PhpstormProjects/DefectDetect; # 这是网站根目录
  if (-f $request_filename) {
    expires 1d;
    break;
  }
}
```
expires 设置缓存。  
**expires缓存会导致在修改资源文件后，网页依然会加载过时的资源。**  

## 4、 [laravel.log无法打开](https://stackoverflow.com/questions/23411520/how-to-fix-error-laravel-log-could-not-be-opened)
```
UnexpectedValueException
The stream or file "/home/song/PhpstormProjects/Lara3/storage/logs/laravel.log" could not be opened: failed to open stream: Permission denied
```
