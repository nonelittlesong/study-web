# [Group By And Find The SUM](https://www.matthewdevaney.com/powerapps-collections-cookbook/group-by-and-find-the-sum/)

输入集合：

| Date | Item | Value |
| --- | --- | --- |
| 1/1/2020 | Hotel | 1050 |
| 1/1/2020 | Food | 30 |
| 1/2/2020 | Food | 75 |
| 1/3/2020 | Hotel | 1300 |
| 1/3/2020 | Food | 50 |
| 1/4/2020 | Flight | 800 |

输出集合：

| Item | Sum Of Value |
| --- | --- |
| Hotel | 2350 |
| Food | 155 |
| Flight | 800 |

解决代码：

```
// 创建一个集合
ClearCollect(myTravelExpenses,
    {Date: Date(2020,1,1), Item: "Hotel", Value: 1050},
    {Date: Date(2020,1,1), Item: "Food", Value: 30 },
    {Date: Date(2020,1,2), Item: "Food", Value: 75 },
    {Date: Date(2020,1,3), Item: "Hotel",Value: 1300},
    {Date: Date(2020,1,3), Item: "Food", Value: 50},
    {Date: Date(2020,1,4), Item: "Flight", Value: 800}
);

ClearCollect(
    mySolution,
    DropColumns(
        AddColumns(
            GroupBy(myTravelExpenses, "Item", "GroupedItems"),
            "Sum of Value",
            Sum(GroupedItems, Value)
        ),
        "GroupedItems"
    )
);
```

## [GroupBy](https://docs.microsoft.com/zh-cn/powerapps/maker/canvas-apps/functions/function-groupby)

语法：

`GroupBy(Table, ColumnName1[, ColumnName2, ...], GroupColumnName)`

- ColumnName(s) — 分组依据的列
- GroupColumnName — 将剩余的数据放入一列

## [Sum](https://docs.microsoft.com/zh-cn/powerapps/maker/canvas-apps/functions/function-aggregates)

语法1：

`Sum(Table, NumericalFormula)`

- NumericalFormula — 用于对每条记录求值的公式。 这个公式的结果用于聚合。 您可以在公式中使用的表的列。

语法2：

`Sum(NumericalFormula1, [NumericalFormula2, ...])`

- NumericalFormula(s) — 要运算的数值。
