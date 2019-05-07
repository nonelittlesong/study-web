resources：  
* [Nginx中文文档](http://www.nginx.cn/doc/)  
* [nginx news](http://nginx.org/)  
* [nginx](http://nginx.org/en/)  
* [菜鸟教程](http://www.runoob.com/linux/nginx-install-setup.html)  
* [阿里云搭建LNMP环境（ CentOS 7）](https://help.aliyun.com/document_detail/97251.html?spm=a2c4g.11186623.6.990.3fe3685301ylyp)

notes：  
* [linux用户操作](https://github.com/nonelittlesong/study-ubuntu/wiki/CentOS-User-and-Group)
* [systemctl](https://github.com/nonelittlesong/study-ubuntu/blob/master/systemctl.md)

# Troubleshootings
## 1、 localhost被其他程序（如digits）占用
卸载digits：  
```
$ sudo apt-get remove digits
$ sudo apt-get autoremove
```
