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

5. [我的nginx配置](https://github.com/nonelittlesong/study-web/blob/master/nginx/README.md)

# 三、 安装MySQL
安装mysql:  
```
sudo apt install mysql-server  # 安装mysql-server
mysql -V                       # V字大写
```
开启mysql：  
```
systemctl start mysql
sudo systemctl enable mysql    # 权限
```
配置安全性：  
```
mysql_secure_installation
```

# 四、 安装php
```
sudo apt install php php-fpm php-mysql php-mbstring php-cgi php-xml php-curl
```
Laravel框架需要`php-mbstring`。  

如果不安装`php-cgi`，在使用phpstorm自带的服务器时会报错：  
```
php-cgi not found
Please ensure that configured PHP Interpreter built as CGI program (--enable-fastcgi was specified)
```

#### [安装最新的php](https://www.rosehosting.com/blog/how-to-install-php-7-3-on-ubuntu-16-04/)
```
sudo apt install software-properties-common python-software-properties
sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php
sudo apt update
```

