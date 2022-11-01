# with

指定临时命名的结果集，称为公用表表达式（CTE）。

公用表达式可以包括对自身的引用。

语法：

```sql
WITH expression_name [(column_name [, ...])]
AS (CTE_query_definition)
```

CTE_query_definition:

指定一个其结果集填充公用表表达式的 SELECT 语句。 除了 CTE 不能定义另一个 CTE 以外，CTE_query_definition 的 SELECT 语句必须满足与创建视图相同的要求。

参考：

- [WITH | MS](https://learn.microsoft.com/zh-cn/sql/t-sql/queries/with-common-table-expression-transact-sql?view=sql-server-ver16)

## 1. 准则

不能在 CTE_query_definition 中使用以下子句：

- `ORDER BY`（除非指定了 TOP 子句）
- `INTO`
- 带有查询提示的 `OPTION` 子句
- `FOR BROWSE`

## 2. 递归准则

在递归成员的 CTE_query_definition 中不能出现下列项：

- `SELECT DISTINCT`
- `GROUP BY`
- `PIVOT`（当数据库兼容性级别为 110 或更高级别时。请参阅 SQL Server 2016 中数据库引擎功能的中断性变更。）
- `HAVING`
- 标量聚合
- `TOP`
- `LEFT`、`RIGHT`、`OUTER JOIN`（允许使用 `INNER JOIN`）
- 子查询
- 应用于 CTE_query_definition 中 CTE 的递归引用的提示。

## 例子

- [Sql Server WITH 语句示例](https://gist.github.com/nonelittlesong/ebb11a9ae2a6fb4eb5536996e0740102)
