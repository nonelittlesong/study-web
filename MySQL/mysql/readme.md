# MySQL

- [mysql | w3schools](https://www.w3schools.com/mysql/default.asp)

## 1. 创建

创建数据库：

```
CREATE DATABASE databasename;
```

创建表：

```
CREATE TABLE table_name (
  column1 datatype,
  column2 datatype,
  ...
)

# 用表创建表
CREATE TABLE new_table_name AS
    SELECT column1, column2,...
    FROM existing_table_name
    WHERE ....;
```

## 2. 删除

删除数据库：

```
DROP DATABASE databasename;

# 删除表的内容，而不是表本身
TRUNCATE TABLE table_name;
DELETE FROM table_name;
```

删除表：

```
DROP TABLE table_name;
```

## 3. AFTER TABLE

- `AFTER TABLE` 用于添加、删除或修改表的列。
- `AFTER TABLE` 也用于添加和删除约束。

```
# 添加列
ALTER TABLE table_name
ADD column_name datatype;

# 删除列
ALTER TABLE table_name
DROP COLUMN column_name;

# 修改列
ALTER TABLE table_name
MODIFY COLUMN column_name datatype;
```

## 4. 约束

可以在 `CREATE TABLE` 和 `AFTER TABLE` 语句中创建约束。

```
CREATE TABLE table_name (
    column1 datatype constraint,
    column2 datatype constraint,
    column3 datatype constraint,
    ....
);
```

### 4.1. NOT NULL

```
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    Age int
);

ALTER TABLE Persons
MODIFY Age int NOT NULL;
```

### 4.2. UNIQUE

```
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    UNIQUE (ID)
);

# 给多个列创建 UNIQUE 约束
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    CONSTRAINT UC_Person UNIQUE (ID,LastName)
);

# AFTER TABLE
ALTER TABLE Persons
ADD UNIQUE (ID);
ALTER TABLE Persons
ADD CONSTRAINT UC_Person UNIQUE (ID,LastName);

# 删除 UNIQUE 约束
ALTER TABLE Persons
DROP INDEX UC_Person;
```

### 4.3. PRIMARY KEY

```
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (ID)
);
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    CONSTRAINT PK_Person PRIMARY KEY (ID,LastName)
);

ALTER TABLE Persons
ADD PRIMARY KEY (ID);
ALTER TABLE Persons
ADD CONSTRAINT PK_Person PRIMARY KEY (ID,LastName);

# 删除 PRIMARY KEY 约束
ALTER TABLE Persons
DROP PRIMARY KEY;
```

### 4.4. FOREIGN KEY

外键指一个表的一个或多个 field，是另一个表的主键。

```
CREATE TABLE Orders (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
);

# 给约束命名 或 定义包含多个列的约束
CREATE TABLE Orders (
    OrderID int NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID),
    CONSTRAINT FK_PersonOrder FOREIGN KEY (PersonID)
    REFERENCES Persons(PersonID)
);

# AFTER TABLE
ALTER TABLE Orders
ADD FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);

ALTER TABLE Orders
ADD CONSTRAINT FK_PersonOrder
FOREIGN KEY (PersonID) REFERENCES Persons(PersonID);

# 删除 FOREIGN KEY 约束
ALTER TABLE Orders
DROP FOREIGN KEY FK_PersonOrder;
```

### 4.5. CHECK

限制值的范围。

```
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    CHECK (Age>=18)
);

# 给约束命名 或 定义包含多个列的约束
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    City varchar(255),
    CONSTRAINT CHK_Person CHECK (Age>=18 AND City='Sandnes')
);
```

### 4.6. DEFAULT

```
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    City varchar(255) DEFAULT 'Sandnes'
);

# 设置系统值
CREATE TABLE Orders (
    ID int NOT NULL,
    OrderNumber int NOT NULL,
    OrderDate date DEFAULT CURRENT_DATE()
);

# AFTER
ALTER TABLE Persons
ALTER City SET DEFAULT 'Sandnes';

# 删除
ALTER TABLE Persons
ALTER City DROP DEFAULT;
```

### 4.7. CREATE INDEX

添加索引，加速查询。

```
CREATE INDEX index_name
ON table_name (column1, column2, ...);

# 添加不可重复的索引
CREATE UNIQUE INDEX index_name
ON table_name (column1, column2, ...);

# 删除索引
ALTER TABLE table_name
DROP INDEX index_name;
```

### 4.8. AUTO_INCREMENT

默认起始值为 1，每次增加 1。

```
CREATE TABLE Persons (
    Personid int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (Personid)
);

# 修改起始值
ALTER TABLE Persons AUTO_INCREMENT=100;
```

## 5. [导入 .sql 文件](https://www.runoob.com/mysql/mysql-database-import.html)

### 5.1. mysql

```
# 注意权限
$ mysql -u<user> -p<password> < <sqlfile.sql>
```

### 5.2. source

```
mysql> create database abc;      # 创建数据库
mysql> use abc;                  # 使用已创建的数据库 
mysql> set names utf8;           # 设置编码
mysql> source /home/abc/abc.sql  # 导入备份数据库
mysql> use mysql;                # 退出当前数据库
```

### 5.3. load data

```

```

### 5.4. mysqlimport

## 6. 查看配置端口

- https://www.cnblogs.com/2016024291-/p/9045548.html
