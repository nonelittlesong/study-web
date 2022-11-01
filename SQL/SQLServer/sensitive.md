# Case Sensitive

SQL Server 默认不区分大小写。想要区分大小写，得修改数据库的 Collation。

SQL Server 有 4 个级别的 `Collation`

1、服务器级别

```sql
select serverproperty('collation');
```

2、数据库级别

```sql
select databaseproperty('AdventureWorks', 'Collation') SQLCollation;
```

3、列级别

```sql
select TABLE_NAME, COLUMN_NAME, COLLATION_NAME
from INFORMATION_SCHEMA.COLUMNS
where TABLE_NAME = 'ACCOUNT';
```

4、表达式级别

```sql
SELECT account_no FROM ACCOUNT ORDER BY account_no COLLATE SQL_Latin1_General_CP1_CI_AS;
```

表达式 Collation 只影响查询的结果。

## 1. 查看 Collation 描述

```sql
SELECT * FROM sys.fn_helpcollations();
```

## 2. 修改 Collation

不能修改服务器的 Collation。

修改数据库的 Collation：

```sql
ALTER DATABASE myDB COLLATE Greek_CS_AI;
```

修改数据库的 Collation 不会影响列和表达式的 Collation。

修改列的 Collation：

```sql
ALTER TABLE myTable ALTER COLUMN mycol NVARCHAR(10) COLLATE Greek_CS_AI;
```
