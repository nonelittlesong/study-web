# study-web
## FTP
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
