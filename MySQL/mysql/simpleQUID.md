# 简单的增删改查

参考：

- [MySQL之增删改查 | cnblogs](https://www.cnblogs.com/heyangblog/p/7624645.html)

`desc data_worker`:  

```
+-----------------+-------------+------+-----+---------+-------+
| Field           | Type        | Null | Key | Default | Extra |
+-----------------+-------------+------+-----+---------+-------+
| machine_id      | varchar(50) | NO   | PRI | NULL    |       |
| mac_address     | varchar(17) | NO   | PRI | NULL    |       |
| token           | varchar(32) | YES  |     | NULL    |       |
| token_validdate | datetime    | YES  |     | NULL    |       |
| last_login_time | datetime    | YES  |     | NULL    |       |
| last_login_ip   | varchar(39) | YES  |     | NULL    |       |
+-----------------+-------------+------+-----+---------+-------+
```

## 1. 增

### 1.1. 指定的字段添加数据

>字段名不能用引号 `"` 或 `'` 括起来

```
mysql> insert into data_worker(machine_id, mac_address)
    -> values("M01", "84-ef-18-bc-b1-fa");
```

查看结果：

```
mysql> select * from data_worker;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

### 1.2. 按字段顺序添加数据

>`null` 不能省略

```
mysql> insert into data_worker
    -> values("song", "dc-fe-07-d4-d3-89", null, null, null, null);
```

查看结果：

```
mysql> select * from data_worker;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
| song       | dc-fe-07-d4-d3-89 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

### 1.3. set

语法：

```
insert into table_name
set field1=value1[, field2=value2, ···];
```

例子：

```
mysql> insert into data_worker
    -> set mac_address="30-e3-7a-5d-97-56", machine_id="chen";

mysql> select * from data_worker;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| chen       | 30-e3-7a-5d-97-56 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
| song       | dc-fe-07-d4-d3-89 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

### 1.4 同时添加多条数据

语法：

```
insert into table_name[(field1, field2, ···, fieldN)]
values
  (value1, value2, ..., valueN),
  (value21, value22, ..., value2N),
  ···,
  (valueM1, value1M2, ···, valueMN);
```

例子：

```
mysql> insert into data_worker(mac_address, machine_id)
    -> values
    -> ("16-dd-a6-a0-1d-d7", "li"),
    -> ("02-42-b9-94-01-f1", "kang");

mysql> select * from data_worker;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| chen       | 30-e3-7a-5d-97-56 | NULL  | NULL            | NULL            | NULL          |
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| li         | 16-dd-a6-a0-1d-d7 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
| song       | dc-fe-07-d4-d3-89 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

## 2. 删

语法： `delete from table_name [where ···]`

### 2.1. 根据条件表达式删除数据

```
mysql> delete from data_worker
    -> where machine_id="chen";

mysql> select * from data_worker;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| li         | 16-dd-a6-a0-1d-d7 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
| song       | dc-fe-07-d4-d3-89 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

### 2.2. 删除全部数据

delete 语句没有条件表达式时，会删除所有数据：

```
mysql> delete from data_worker;
```

另一种方法，`truncate`：

语法： `truncate [table] <table_name>`

## 3. 改

语法：

```
update <table_name>
set field1=value1[, field2=value2, ···, fieldN=valueN]
[where 条件表达式]
```

## 4. 查

### 4.1. 查询指定字段

语法：

```
select field1, field2, ···
from table_name
```

例子：

```
mysql> select  machine_id, mac_address, token, token_validdate, last_login_time, last_login_ip
    -> from data_worker;

+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| li         | 16-dd-a6-a0-1d-d7 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
| song       | dc-fe-07-d4-d3-89 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

>1. 字段的顺序可以更改，相应的结果也会更改字段顺序。
>2. 可以使用 `*` 通配符表示所有字段，即 `select * from data_worker`。

### 4.2. 按条件查询

例子：

```
mysql> select mac_address from data_worker
    -> where machine_id="kang";
+-------------------+
| mac_address       |
+-------------------+
| 02-42-b9-94-01-f1 |
+-------------------+
```

### 4.2.1. in

语法：

```
select * | field1, field2, ···
from <table_name>
where fieldX [not] in (value1, value2, ···);
```

例子：

```
mysql> select mac_address from data_worker
    -> where machine_id not in ("li", "M01");
+-------------------+
| mac_address       |
+-------------------+
| 02-42-b9-94-01-f1 |
| dc-fe-07-d4-d3-89 |
+-------------------+
```

### 4.2.2. between..and

语法：

```
select * | field1, field2, ···
from <table_name>
where fieldX [not] between value1 and value2;
```

例子：

```
mysql> select * from data_worker
    -> where machine_id between "a" and "n";
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| li         | 16-dd-a6-a0-1d-d7 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

>字符串默认不区分大小写

### 4.2.3. null

语法：

```
select * | field1, field2, ···
from <table_name>
where fieldX is [not] null;
```

例子：

```
mysql> select machine_id from data_worker
    -> where token is null;
+------------+
| machine_id |
+------------+
| kang       |
| li         |
| M01        |
| song       |
+------------+
```

### 4.2.4. like

语法：

```
select * | field1, field2, ···
from <table_name>
where fieldX [not] line <pattern>;
```

- `%` — 匹配任意长度的字符串
- `_` — 匹配单个字符

### 4.2.5. and & or



## 4.3. distinct

去掉重复的值。

语法：

```
select distinct fieldX from <table_name>
[where ···];
```

### 4.4. 聚合函数

| 聚合函数 | 作用 |
| --- | --- |
| count() | 返回某列的行数 |
| sum() | 返回某列的和 |
| avg() | 返回某列的平均值 |
| max() | 返回某列的最大值 |
| min() | 返回某列的最小值 |

#### `count()`

```
mysql> select count(machine_id) from data_worker;
+-------------------+
| count(machine_id) |
+-------------------+
|                 4 |
+-------------------+

mysql> select count(token) from data_worker;
+--------------+
| count(token) |
+--------------+
|            0 |
+--------------+

mysql> select count(token), count(machine_id) from data_worker;
+--------------+-------------------+
| count(token) | count(machine_id) |
+--------------+-------------------+
|            0 |                 4 |
+--------------+-------------------+

mysql> select count(*) from data_worker;
+----------+
| count(*) |
+----------+
|        4 |
+----------+
```

>`count()` 默认不包含 `null` 值。

#### `sum()` & `avg()`

>将不能转为数字的字符串视为 0
>`null` 不会计入总数
>不接受 `*` 作为参数。

```
mysql> select sum(machine_id) from data_worker;
+-----------------+
| sum(machine_id) |
+-----------------+
|               0 |
+-----------------+

mysql> select avg(machine_id) from data_worker;
+-----------------+
| avg(machine_id) |
+-----------------+
|               0 |
+-----------------+

mysql> select sum(*) from data_worker;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '*) from data_worker' at line 1

mysql> select avg(*) from data_worker;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '*) from data_worker' at line 1
```

#### `max()` & `min()`

>字符串根据 ASCII 顺序排列

```
mysql> select max(machine_id) from data_worker;
+-----------------+
| max(machine_id) |
+-----------------+
| song            |
+-----------------+
```

### 4.5. 排序查询

语法：

```
select field1, field2, ···
from <table_name>
order by field1 [asc|desc], field2 [asc|desc], ···;
```

例子：

```
mysql> select mac_address, machine_id
    -> from data_worker
    -> where token is null
    -> order by machine_id desc, mac_address asc;
+-------------------+------------+
| mac_address       | machine_id |
+-------------------+------------+
| dc-fe-07-d4-d3-89 | song       |
| 84-ef-18-bc-b1-fa | M01        |
| 16-dd-a6-a0-1d-d7 | li         |
| 02-42-b9-94-01-f1 | kang       |
| 02-42-b9-94-01-f1 | 1234       |
+-------------------+------------+
```

## 4.6. 分组查询

语法：

```
select field1, field2, ···
from <table_name>
group by field1, field2, ···
[having <条件表达式>];
```

`having` 和 `where` 的区别：

- `having` 对分组后的结果进行过滤，`where` 用于分组前。
- `having` 后面可以跟聚合函数，`where` 不可以。

例子：

```
mysql> select * from data_worker;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| 1234       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| li         | 16-dd-a6-a0-1d-d7 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
| M02        | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| song       | dc-fe-07-d4-d3-89 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+

# ========= 与聚合函数一起使用 =========

mysql> select count(*) from data_worker group by mac_address;
+----------+
| count(*) |
+----------+
|        3 |
|        1 |
|        1 |
|        1 |
+----------+
```

## 4.7. limit

限制查询结果的偏移量和数量。

语法：

```
select * | field1, field2, ···
from <table_name>
limit [偏移量, ]记录数;
```

- 偏移量 — 指定查询结果从第几条开始，默认为 0。
- 记录数 — 指定查询结果的条数。

例子：

```
mysql> select * from data_worker limit 1, 3;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| li         | 16-dd-a6-a0-1d-d7 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

## 4.8. 别名

### 4.8.1. 表的别名

语法：

```
select * from <table_name> [as] <nickname>
```

例子：

```
mysql> select * from data_worker as w
    -> where w.mac_address="02-42-b9-94-01-f1";
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| 1234       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| M02        | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

### 4.8.2. 字段的别名

语法：

```
select field1 [as] f1, field2 [as] f2, ···
from <table_name>
```

例子：

```
mysql> select machine_id id, mac_address mac
    -> from data_worker w
    -> where w.mac_address="02-42-b9-94-01-f1";
+------+-------------------+
| id   | mac               |
+------+-------------------+
| 1234 | 02-42-b9-94-01-f1 |
| kang | 02-42-b9-94-01-f1 |
| M02  | 02-42-b9-94-01-f1 |
+------+-------------------+

mysql> select machine_id id, mac_address mac
    -> from data_worker w
    -> where w.mac="02-42-b9-94-01-f1";
ERROR 1054 (42S22): Unknown column 'w.mac' in 'where clause'
```

### 4.9. 函数

见[MySQL之常用函数](https://www.cnblogs.com/heyangblog/p/7624317.html)。
