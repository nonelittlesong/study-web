# Power App 数据源相关公式

## `AddColumns`, `DropClumns`, `RenameColumns` & `ShowColumns`

- [函数的参数支持委派](https://docs.microsoft.com/zh-cn/powerapps/maker/canvas-apps/functions/function-table-shaping)

>备注：  
>不会修改原始表  

```
AddColumns(Table, ColumnName1, Formula1 [, ColumnName2, Formula2, ... ])
```

| 参数 | 必需/可选 | 类型 | 描述 |
| --- | --- | --- | --- |
| Table | 必需 | | 要运算的表 |
| ColumnName(s) | 必需 | String | 要添加的列名，双引号 |
| Formula(s) | 必需 | | 计算新列的值 |

```
DropColumns(Table, ColumnName1 [, ColumnName2, ... ])
```

| 参数 | 必需/可选 | 类型 | 描述 |
| --- | --- | --- | --- |
| Table | 必需 | | 要运算的表 |
| ColumnName(s) | 必需 | String | 要删除的列名 |

```
RenameColumns(Table, OldColumnName1, NewColumnName1 [, OldColumnName2, NewColumnName2, ... ])
```

| 参数 | 必需/可选 | 类型 | 描述 |
| --- | --- | --- | --- |
| Table | 必需 | | 要运算的表 |
| OldColumnName(s) | 必需 | String | 原始列名 |
| NewColumnName(s) | 必需 | String | 替换名 |

```
ShowColumns(Table, ColumnName1 [, ColumnName2, ... ])
```

| 参数 | 必需/可选 | 类型 | 描述 |
| --- | --- | --- | --- |
| Table | 必需 | | 要运算的表 |
| ColumnName(s) | 必需 | String | 要显示的列名 |

## `Collect`, `Clear` & `ClearCollect`

- 只能在【行为公式】中使用

```
Collect(DataSource, Item, ...)
```

| 参数 | 必需/可选 | 类型 | 描述 |
| --- | --- | --- | --- |
| DataSource | 必需 | | 将向其添加数据的数据源，如果不存在，将创建一个集合 |
| Item(s) | 必需 | | 要添加到数据源的一个或多个记录，或表 |

以表格的形式返回修改后的数据源。

`Item`:

- 单个值 — 该值位于新记录的 Value 字段，其他属性为 blank
- 记录 — 每个命名属性都置于新记录的对应属性中。所有其他属性为 blank
- 表 — 表中的每个记录都作为数据源的单个记录添加。表不是以嵌套表形式添加到记录。为实现此目的，需首先将表包装在记录中。

当用于集合时，将根据需要添加额外的列。数据源无法添加新列？

```
Clear(Collection)
```

没有返回值。

清除集合的所有记录，集合的列将保留。

```
ClearCollect(Collection, Item, ...)
```

先清除集合的所有记录，再向集合添加一个或多个记录或表。

## `Filter`

```
Filter(Table, Formula1[, Formula2, ...])
```

| 参数 | 必需/可选 | 类型 | 描述 |
| --- | --- | --- | --- |
| Table | 必需 | | 要搜索的表 |
| Formula(s) | 必需 | | 函数返回计算结果为 true 的记录，可以引用表中的列 |

## `First`, `FirstN`, `Last` & `LastN`

- [与数据源一起使用时，无法委派这些函数](https://docs.microsoft.com/zh-cn/powerapps/maker/canvas-apps/functions/function-first-last)

```
# 返回第一条记录
First(Table)
# 返回最后一条记录
Last(Table)
# 返回前 N 条记录
FirstN(Table [, NumberOfRecords ])
# 返回后 N 条记录
LastN(Table [, NumberOfRecords ])
```


## `Lookup`

```
Lookup(Table, Formula[, ReductionFormula])
```

| 参数 | 必需/可选 | 类型 | 描述 |
| --- | --- | --- | --- |
| Table | 必需 | | 要搜索的表 |
| Formula | 必需 | | 计算表的每个记录时所依据的公式，可引用表中的列 |
| ReductionFormula | 可选 | | 将记录缩减为一个值的公式 |

函数返回 `Formula` 计算为 true 的【第一条】记录，如果 `ReductionFormula` 不为空，结果将记录缩减为一个值。

## `Patch`

- 修改或创建数据源中一条或多条记录
- 合并数据源外的记录



## `Search`

```
Search(Table, SearchString, Column1[, Column2...])
```

| 参数 | 必需/可选 | 类型 | 描述 |
| --- | --- | --- | --- |
| Table | 必需 | | 要搜索的表 |
| SearchString | 必需 | String | 要搜索的字符串，如果是空白或空字符串，将返回所有记录 |
| Column(s) | 必需 | String | 要搜索的列。列必需包含文本。<br>列名称必需使用双引号括起来的字符串。<br>列名称必需是静态的，不能用公式计算。 |

如果在任意这些列的数据中找到了作为部分匹配项的 SearchString，将返回完整的记录。

>备注：  
>对于列名称带空格的 SharePoint 和 Excel 数据源，请将每个空格指定为 `_x0020_`。  
>例如，将 `Column Name` 指定为 `Column_x0020_Name`。  


