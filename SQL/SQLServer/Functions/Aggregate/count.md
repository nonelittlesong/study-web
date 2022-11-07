# count

count 的用法主要有 4 种：

1. `count(*)`
2. `count(1)`
3. `count(column)`
4. `count(distinct column)`

## `count(*)` VS `count(1)`

没有区别，括号中的值代表函数给每行赋予的值。你甚至可以 `count('whatever you want')`。

推荐使用 `count(*)`，更常见，不容易产生歧义，count 包括 null 的所有数据。

## `count(*)` VS `count(column)`

有区别，`count(column)` 不包括 null 的记录。

利用 `count` + `case`，我们可以不使用 `where`，来 count 符合某个条件的记录：

```sql
-- count + case
SELECT COUNT(CASE WHEN order_price > 1000 THEN 1 END)
AS significant_orders
FROM orders;
-- where
SELECT COUNT(*)
AS significant_orders
FROM orders
WHERE order_price > 1000;
```

## `count(column)` VS `count(distinct column)`

区别显而易见。。。
