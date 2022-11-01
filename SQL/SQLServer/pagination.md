# 分页

使用 `offset-fetch` 进行分页。

`offset-fetch` 必须跟在 `order by` 后面。

如果 `order by` 的列不是唯一的，那么结果的顺序便是随机的。因此，建议 order by 最后加上具有唯一值的列。

```sql
declare @pageIndex as int;
declare @pageSize as int;
set @pageIndex = 1;
set @pageSize = 20;

select M.document_type, M.part_no
from Material M
order by M.document_type desc, M.part_no
offset (@pageIndex - 1) * @pageSize rows
fetch next @pageSize rows only;
```

## 循环分页

使用循环 `while-begin-end` 将每页的结果打印出来

```sql
declare @pageIndex as int
declare @pageSize as int
declare @maxIndex as int
set @pageIndex = 1
set @pageSize = 500
select @maxIndex = count(1) from MaterialV3
set @maxIndex = ceiling(@maxIndex / @pageSize)

while @maxIndex >= @pageIndex
begin
    select M.document_type, M.part_no
    from Material M
    order by M.document_type desc, M.part_no
    offset (@pageIndex - 1) * @pageSize rows
    fetch next @pageSize rows only
    set @pageIndex = @pageIndex + 1
end
```
