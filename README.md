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
