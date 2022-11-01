# order by

## 1. nulls last

SQL Server 可能不支持 `nulls last`，可以通过 trick 实现。

```sql
-- iif
select M.document_type, M.part_no
from Material M
order by IIF(M.document_type is null, 1, 0), M.document_type, M.part_no

-- case
select M.document_type, M.part_no
from Material M
order by case when M.document_type is null then 1 else 0 end,
         M.document_type, M.part_no
```

判断是否为 null，使用下面的代码会报错

```sql
-- [S0001][408] A constant expression was encountered in the ORDER BY list, position 1.

-- iif
select M.document_type, M.part_no
from MaterialV3 M
order by IIF(M.document_type = null, 1, 0), M.document_type, M.part_no
-- case
select M.document_type, M.part_no
from MaterialV3 M
order by case M.document_type when null then 1 else 0 end,
         M.document_type, M.part_no
```
