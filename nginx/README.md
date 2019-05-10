resources：  
* [Nginx中文文档](http://www.nginx.cn/doc/)  
* [nginx news](http://nginx.org/)  
* [nginx](http://nginx.org/en/)  
* [菜鸟教程](http://www.runoob.com/linux/nginx-install-setup.html)  
* [阿里云搭建LNMP环境（ CentOS 7）](https://help.aliyun.com/document_detail/97251.html?spm=a2c4g.11186623.6.990.3fe3685301ylyp)
* [详解Nginx服务器配置](http://baijiahao.baidu.com/s?id=1604485941272024493&wfr=spider&for=pc)

notes：  
* [linux用户操作](https://github.com/nonelittlesong/study-ubuntu/wiki/CentOS-User-and-Group)
* [systemctl](https://github.com/nonelittlesong/study-ubuntu/blob/master/systemctl.md)
* [查看进程](https://github.com/nonelittlesong/study-ubuntu)

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

