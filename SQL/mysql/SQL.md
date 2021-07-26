# SQL

参考：

- [MySQL之增删改查 | cnblogs](https://www.cnblogs.com/heyangblog/p/7624645.html)

`DESC data_worker`:  

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

>字段名不能用 `"` 或 `'` 括起来

```
mysql> INSERT INTO data_worker(machine_id, mac_address)
    -> VALUES('M01', '84-ef-18-bc-b1-fa');
```

查看结果：

```
mysql> SELECT * FROM data_worker;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

### 1.2. 按字段顺序添加数据

>`NULL` 不能省略

```
mysql> INSERT INTO data_worker
    -> VALUES('song', 'dc-fe-07-d4-d3-89', NULL, NULL, NULL, NULL);
```

查看结果：

```
mysql> SELECT * FROM data_worker;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
| song       | dc-fe-07-d4-d3-89 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

### 1.3. SET

语法：

```
INSERT INTO table_name
SET field1=value1[, field2=value2, ···];
```

例子：

```
mysql> INSERT INTO data_worker
    -> SET mac_address='30-e3-7a-5d-97-56', machine_id='chen';

mysql> SELECT * FROM data_worker;
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
INSERT INTO table_name[(field1, field2, ···, fieldN)]
VALUES
  (value1, value2, ..., valueN),
  (value21, value22, ..., value2N),
  ···,
  (valueM1, valueM2, ···, valueMN);
```

例子：

```
mysql> INSERT INTO data_worker(mac_address, machine_id)
    -> VALUES
    -> ("16-dd-a6-a0-1d-d7", "li"),
    -> ("02-42-b9-94-01-f1", "kang");

mysql> SELECT * FROM data_worker;
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

>`DELETE` 语句没有条件表达式时，会删除所有数据！

语法： `DELETE FROM table_name [WHERE ···]`

### 2.1. 根据条件表达式删除数据

```
mysql> DELETE FROM data_worker
    -> WHERE machine_id='chen';

mysql> SELECT * FROM data_worker;
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

```
mysql> DELETE FROM data_worker;
```

另一种方法，`truncate`：

语法： `truncate [table] table_name`

## 3. 改

语法：

```
update <table_name>
SET field1=value1[, field2=value2, ···, fieldN=valueN]
[WHERE 条件表达式];
```

## 4. 查

### 4.1. 查询指定字段

语法：

```
SELECT [DISTINCT] column1, column2, ···
FROM table_name;
```

例子：

```
mysql> SELECT  machine_id, mac_address, token, token_validdate, last_login_time, last_login_ip
    -> FROM data_worker;

+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| li         | 16-dd-a6-a0-1d-d7 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
| song       | dc-fe-07-d4-d3-89 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

>1. 查询时字段的顺序更改，结果的字段顺序也会更改。
>2. 可以使用 `*` 通配符表示所有字段，即 `SELECT * FROM table_name`。

### 4.2. 按条件查询 WHERE

例子：

```
mysql> SELECT mac_address FROM data_worker
    -> WHERE machine_id="kang";
+-------------------+
| mac_address       |
+-------------------+
| 02-42-b9-94-01-f1 |
+-------------------+
```

### 4.2.1. IN

`IN` 是多个 `OR` 的缩写。

语法：

```
SELECT column_name(s)
FROM table_name
WHERE fieldX [NOT] IN (value1, value2, ···);

SELECT column_name(s)
FROM table_name
WHERE column_name [NOT] IN (SELECT STATEMENT);
```

例子：

```
mysql> SELECT mac_address FROM data_worker
    -> WHERE machine_id NOT IN ('li', 'M01');
+-------------------+
| mac_address       |
+-------------------+
| 02-42-b9-94-01-f1 |
| dc-fe-07-d4-d3-89 |
+-------------------+
```

### 4.2.2. BETWEEN..AND

- 查询指定值，可以是数字、字符串和日期。
- 闭区间。

语法：

```
SELECT column_name(s)
FROM table_name
WHERE column_name [NOT] BETWEEN value1 AND value2;
```

例子：

```
SELECT * FROM Products
WHERE Price BETWEEN 10 AND 20
AND CategoryID NOT IN (1,2,3);

SELECT * FROM Products
WHERE ProductName BETWEEN 'Carnarvon Tigers' AND 'Mozzarella di Giovanni'
ORDER BY ProductName;

SELECT * FROM Orders
WHERE OrderDate BETWEEN '1996-07-01' AND '1996-07-31';
```

>字符串默认不区分大小写

### 4.2.3. NULL

语法：

```
SELECT column_name(s)
FROM table_name
WHERE column_name IS [NOT] NULL;
```

例子：

```
mysql> SELECT machine_id FROM data_worker
    -> WHERE token IS NULL;
+------------+
| machine_id |
+------------+
| kang       |
| li         |
| M01        |
| song       |
+------------+
```

### 4.2.4. LIKE

语法：

```
SELECT column1, column2, ...
FROM table_name
WHERE columnN [NOT] LIKE <pattern>;
```

- `%` — 匹配任意长度的字符串
- `_` — 匹配单个字符

### 4.3. 聚合函数

| 聚合函数 | 作用 |
| --- | --- |
| COUNT() | 返回某列的行数 |
| SUM() | 返回某列的和 |
| AVG() | 返回某列的平均值 |
| MAX() | 返回某列的最大值 |
| MIN() | 返回某列的最小值 |

#### 4.3.1. COUNT()

>`COUNT()` 默认不包含 `NULL` 值。

```
mysql> SELECT COUNT(machine_id) FROM data_worker;
+-------------------+
| COUNT(machine_id) |
+-------------------+
|                 4 |
+-------------------+

mysql> SELECT COUNT(token), COUNT(machine_id) FROM data_worker;
+--------------+-------------------+
| COUNT(token) | COUNT(machine_id) |
+--------------+-------------------+
|            0 |                 4 |
+--------------+-------------------+

mysql> SELECT COUNT(*) FROM data_worker;
+----------+
| COUNT(*) |
+----------+
|        4 |
+----------+
```

#### 4.3.2. SUM() & AVG()

>- 将不能转为数字的字符串视为 0  
>- `NULL` 不会计入总数  
>- 不接受 `*` 作为参数  

```
mysql> SELECT SUM(machine_id) FROM data_worker;
+-----------------+
| SUM(machine_id) |
+-----------------+
|               0 |
+-----------------+

mysql> SELECT AVG(machine_id) FROM data_worker;
+-----------------+
| AVG(machine_id) |
+-----------------+
|               0 |
+-----------------+

mysql> SELECT SUM(*) FROM data_worker;
ERROR 1064 (42000): You have an error IN your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '*) FROM data_worker' at line 1

mysql> SELECT AVG(*) FROM data_worker;
ERROR 1064 (42000): You have an error IN your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '*) FROM data_worker' at line 1
```

#### 4.3.3. MAX() & MIN()

>字符串根据 ASCII 顺序排列

```
mysql> SELECT MAX(machine_id) FROM data_worker;
+-----------------+
| MAX(machine_id) |
+-----------------+
| song            |
+-----------------+
```

### 4.4. 排序查询 ORDER BY

语法：

```
SELECT field1, field2, ···
FROM table_name
ORDER BY fieldA [ASC|DESC], fieldB [ASC|DESC], ···;
```

例子：

```
mysql> SELECT mac_address, machine_id
    -> FROM data_worker
    -> WHERE token IS NULL
    -> ORDER BY machine_id DESC, mac_address ASC;
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

### 4.5. 分组查询 GROUP BY

`HAVING` 和 `WHERE` 的区别：

- `HAVING` 对分组后的结果进行过滤，`WHERE` 用于分组前。
- `HAVING` 后面可以跟聚合函数，`WHERE` 不可以。

语法：

```
SELECT field1, field2, ···
FROM table_name
GROUP BY fieldA, fieldB, ···
[HAVING <条件表达式>];
```

例子：

```
mysql> SELECT * FROM data_worker;
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

mysql> SELECT COUNT(*)
    -> FROM data_worker
    -> GROUP BY mac_address
    -> ORDER BY COUNT(*) DESC;
+----------+
| COUNT(*) |
+----------+
|        3 |
|        1 |
|        1 |
|        1 |
+----------+
```

### 4.6. 分页查询 LIMIT

语法：

```
SELECT column_name(s)
FROM table_name
WHERE condition
LIMIT [偏移量, ]记录数;
```

- 偏移量 — 指定查询结果从第几条开始，默认为 0。
- 记录数 — 指定查询结果的条数。

例子：

```
mysql> SELECT *
    -> FROM data_worker
    -> LIMIT 1, 3;
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| li         | 16-dd-a6-a0-1d-d7 | NULL  | NULL            | NULL            | NULL          |
| M01        | 84-ef-18-bc-b1-fa | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

## 5. 别名

### 5.1. 表的别名

语法：

```
SELECT columns
FROM table_name [AS] <nickname>
```

例子：

```
mysql> SELECT * FROM data_worker AS w
    -> WHERE w.mac_address='02-42-b9-94-01-f1';
+------------+-------------------+-------+-----------------+-----------------+---------------+
| machine_id | mac_address       | token | token_validdate | last_login_time | last_login_ip |
+------------+-------------------+-------+-----------------+-----------------+---------------+
| 1234       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| kang       | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
| M02        | 02-42-b9-94-01-f1 | NULL  | NULL            | NULL            | NULL          |
+------------+-------------------+-------+-----------------+-----------------+---------------+
```

### 5.2. 字段的别名

语法：

```
SELECT field1 [AS] f1, field2 [AS] f2, ···
FROM <table_name>
```

例子：

```
mysql> SELECT machine_id id, mac_address 'mac address'
    -> FROM data_worker w
    -> WHERE w.mac_address="02-42-b9-94-01-f1";
+------+-------------------+
| id   | mac address       |
+------+-------------------+
| 1234 | 02-42-b9-94-01-f1 |
| kang | 02-42-b9-94-01-f1 |
| M02  | 02-42-b9-94-01-f1 |
+------+-------------------+

mysql> SELECT machine_id id, mac_address mac
    -> FROM data_worker w
    -> WHERE w.mac="02-42-b9-94-01-f1";
ERROR 1054 (42S22): Unknown column 'w.mac' IN 'WHERE clause'
```

## 6. 函数

见 [MySQL之常用函数](https://www.cnblogs.com/heyangblog/p/7624317.html)。
