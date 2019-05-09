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

# 三、 安装MySQL

# 四、 安装php
```
sudo apt install php php-fpm php-mysql php-mbstring
```
