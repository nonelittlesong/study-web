
## 1. [导入 .sql 文件](https://www.runoob.com/mysql/mysql-database-import.html)

### 1.1. mysql

```
# 注意权限
$ mysql -u<user> -p<password> < <sqlfile.sql>
```

### 1.2. source

```
mysql> create database abc;      # 创建数据库
mysql> use abc;                  # 使用已创建的数据库 
mysql> set names utf8;           # 设置编码
mysql> source /home/abc/abc.sql  # 导入备份数据库
```

### 1.3. load data

```

```

### 1.4. mysqlimport
