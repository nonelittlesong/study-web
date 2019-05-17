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

