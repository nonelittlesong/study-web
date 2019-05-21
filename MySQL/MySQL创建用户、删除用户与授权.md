参考：  
* [MySQL添加用户、删除用户与授权](https://www.cnblogs.com/wanghetao/p/3806888.html)  

# 一、 新建用户
## 1、 登录MySQL
```sh
$ mysql -u root -p
```

## 2、 创建用户
```sh
mysql> create user 'song'@'localhost' identified by 'Song,1003';
```
不要忘了分号`;`。  

* username：你将创建的用户名
* host：指定该用户在哪个主机上可以登陆，如果是本地用户可用localhost，如果想让该用户可以从任意远程主机登陆，可以使用通配符%
* password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器

## 3、 重新登录
```sh
mysql> exit;
mysql -u song -p
```


# 二、 授权
## 1、 root登录
```sh
mysql -u root -p
```

## 2、 创建数据库
```sh
mysql> create database Lara3;
```

## 3、 授权
```sh
mysql> grant privileges on databasename.tablename to 'username'@'host';
```
说明：  
* privileges: 用户的操作权限，如SELECT，INSERT，UPDATE等，如果要授予所的权限则使用ALL
* databasename: 数据库名
* tablename: 表名，如果要授予该用户对所有数据库和表的相应操作权限则可用\*表示，如\*.\*

例子：  
```sh
mysql> grant select, insert on test.user to 'pig'@'%';
mysql> grant all on *.* to 'pig'@'%';
mysql> grant all on maindataplus.* to 'pig'@'%';
```

注意：  
用以上命令授权的用户不能给其它用户授权，如果想让该用户可以授权，用以下命令:  
```sh
mysql> grant privileges on databasename.tablename to 'username'@'host' with grant option;
```


# 三、 设置与更改用户密码
命令：  
```sh
mysql> set password for 'username'@'host' = password('newpassword');
```
如果是当前用户：  
```sh
mysql> set password = password("newpassword");
```

# 四、 撤销用户权限
命令：  
```sh
mysql> revoke privileges on databasename.tablename from 'username'@'host';
```
>注意：  
假如你在给用户`'pig'@'%'`授权的时候是这样的（或类似的）：`GRANT SELECT ON test.user TO 'pig'@'%';`，则在使用`REVOKE SELECT ON *.* FROM 'pig'@'%';`命令并不能撤销该用户对test数据库中user表的SELECT 操作。  
相反，如果授权使用的是`GRANT SELECT ON *.* TO 'pig'@'%';`，则`REVOKE SELECT ON test.user FROM 'pig'@'%';`命令也不能撤销该用户对test数据库中user表的Select权限。  

具体信息可以用命令`SHOW GRANTS FOR 'pig'@'%';` 查看。  


# 五、 删除用户
```sh
mysql> drop user 'username'@'host';
```
