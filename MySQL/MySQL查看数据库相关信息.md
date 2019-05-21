参考：  
* [MySQL查看数据库相关信息](https://www.cnblogs.com/jiangxiaobo/p/6110647.html)  

# 0、 使用数据库
```sh
mysql> use Lara3
```

# 1、 查看所有数据库
```sh
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| INVOICE            |
| mysql              |
| performance_schema |
| test               |
+--------------------+
rows in set (0.00 sec)
 
mysql>
```

# 2、 查看当前使用的数据库
```sh
mysql> select database();
+------------+
| database() |
+------------+
| INVOICE    |
+------------+
row in set (0.00 sec)
 
mysql>
```

# 3、 查看数据库的表们
```sh
mysql> show tables;
```

# 4、 查看数据库端口
```sh
mysql> show variables  like 'port';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| port          | 3306  |
+---------------+-------+
row in set (0.00 sec)
```

# 5、 查看当前数据库大小
例如，我要查看INVOICE数据库的大小，那么可以通过下面SQL查看：  
```sh
mysql> use  information_schema
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A
 
Database changed
mysql> select concat(round(sum(data_length)/(1024*1024),2) + round(sum(index_length)/(1024*1024),2),'MB') as 'DB Size'
    -> from tables 
    -> where table_schema='INVOICE';
+-----------+
| DB Size   |
+-----------+
| 7929.58MB |
+-----------+
row in set, 1 warning (0.00 sec)
```

# 6、 查看MySQL的所有用户信息
```sh
mysql>  select distinct concat('user: ''',user,'''@''',host,''';') as query from mysql.user;
+-------------------------------------+
| query                               |
+-------------------------------------+
| user: 'root'@'127.0.0.1';           |
| user: 'root'@'::1';                 |
| user: 'root'@'gettesx20.test.com'; |
| user: 'root'@'localhost';           |
+-------------------------------------+
rows in set (0.00 sec)
 
mysql>
```

# 7、  查看某个具体用户的权限
```sh
mysql> show grants for 'root'@'localhost';
+---------------------------------------------------------------------------------------------------------------------------------+
| Grants for root@localhost                                                                                                              |
+---------------------------------------------------------------------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY PASSWORD '*C7B1594FD74578DA3A92A61720AC67C6DBE6FC23' WITH GRANT OPTION |
| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION                                                                           |
+---------------------------------------------------------------------------------------------------------------------------------+
rows in set (0.00 sec)
```

# 8、 查看数据库的最大连接数
```sh
mysql>  show variables like '%max_connections%';
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 151   |
+-----------------+-------+
row in set (0.00 sec)
 
mysql>
```

# 9、 查看数据库当前连接数，并发数
```sh
mysql> show status like 'Threads%';
+-------------------+-------+
| Variable_name     | Value |
+-------------------+-------+
| Threads_cached    | 0     |
| Threads_connected | 1     |
| Threads_created   | 1     |
| Threads_running   | 1     |
+-------------------+-------+
rows in set (0.00 sec)
```

# 10、 查看数据文件存放路径
```sh
mysql> show variables like '%datadir%';
+---------------+-------------------+
| Variable_name | Value             |
+---------------+-------------------+
| datadir       | /mysqldata/mysql/ |
+---------------+-------------------+
row in set (0.00 sec)
 
mysql>
```

# 11、 查看数据库编码
```sh
mysql> show variables like 'character%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | utf8                       |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | latin1                     |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
rows in set (0.00 sec)
```
