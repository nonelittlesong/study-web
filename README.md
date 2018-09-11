# study-web
## 一、FTP
参考：
* [Linux实例搭建FTP站点](https://help.aliyun.com/document_detail/86292.html?spm=a2c4g.11186623.6.794.12ae2c2dTJgDDd)

**1. 安装 vsftpd**  
```
$ yum install -y vsftpd
```
**2. 设置开机启动ftp**
```
$ systemctl enable vsftpd.service
```
**3. 启动ftp**  
```
$ systemctl start vsftpd.service
```
**4. 运行以下命令查看 FTP 服务端口**  
```
$ netstat -antup | grep ftp
```
**5. 配置vsftpd**  
```
$ vim /etc/vsftpd/vsftpd.conf
```
根据情况配置  
**6. 运行以下命令更改 /var/ftp/pub 目录的权限，为 FTP 用户添加写权限，并重新加载配置文件。**  
```
$ chmod o+w /var/ftp/pub/
$ systemctl restart vsftpd.service
```
**7. 设置安全组**  
[安全组规则的典型应用](https://help.aliyun.com/document_detail/58746.html?spm=a2c4g.11186623.2.22.516c24cestfkeM#ftp)  
## 二、530 Permission denied.
使用root账号登录，会出现530 Permission denied错误。  
解决方法：
* /etc/vsftpd/ftpusers注释调root这行
* /etc/vsftpd/vsftpd.conf添加userlist_deny=NO
* 重启`systemctl restart vsftpd.service`

## 三、425 Failed to establish connection.
解决办法：  
/etc/vsftpd/vsftpd.conf添加  
>pasv_enable=YES
>pasv_min_port=6000
>pasv_max_port=7000

阿里云**添加相应的安全组规则**  
重启`systemctl restart vsftpd.service`  

## 四、安装LAMP
[部署LAMP_建站教程_云服务器 ECS-阿里云](https://help.aliyun.com/document_detail/50774.html?spm=a2c4g.11186623.6.781.26262529FC4TsB)  
**1. MySQL：Warning：在命令行输入密码不安全**  
使用`mysql -uroot -p`连接mysql  

**2. MySQL：ERROR：不能使用root用户操作mysqld**  
添加不可登录的mysql用户，加入到mysql用户组：
```
$ groupadd mysql
$ useradd -g mysql -s /sbin/nologin mysql
```
更改MySQL安装目录的属性：`chown -R mysql:mysql /usr/local/mysql`  
在/etc/my.cnf中添加`user=mysql`，以使用mysql用户操作mysqld。  
## 五、Wordpress
