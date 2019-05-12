# 一、 系统要求
ubuntu16.04  

# 二、 安装Nginx
1. 安装nginx。  
```
sudo apt-get update
sudo apt-get install nginx
```

2. 输入命令`nginx -v`可查看Nginx的版本号。  

3. 启动Nginx服务并设置开机自动启动
```
systemctl start nginx
systemctl enable nginx
```
4. 安装最新版
```
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:nginx/stable 
sudo apt-get update
sudo apt-get install nginx
```

# 三、 安装MySQL

# 四、 安装php
```
sudo apt install php php-fpm php-mysql php-mbstring php-cgi
```
Laravel框架需要`php-mbstring`。  

如果不安装`php-cgi`，在使用phpstorm自带的服务器时会报错：  
```
php-cgi not found
Please ensure that configured PHP Interpreter built as CGI program (--enable-fastcgi was specified)
```
