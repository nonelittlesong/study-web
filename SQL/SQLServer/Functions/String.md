# 字符串函数

## substring

获取子串

语法：

```
SUBSTRING(expression, start, length)
```

和 Java 不同，字符串的下标从 1 开始。  
如果 `start < 1`，返回结果的开头就是字符串 expression 的开头，长度取 `start + length - 1` 和 `0` 间的较大值。  
如果 `start > expression 的长度`，返回空字符串。

可以结合 `trim` 去掉首尾的空格。

```sql
select substring(rtrim(ltrim(M.part_no)), 0, 4) as [part no]
from Material M
```
