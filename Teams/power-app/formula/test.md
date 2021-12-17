# Power App 判断

参考：

- [Power Apps 中的 Blank、Coalesce、IsBlank 和 IsEmpty 函数](https://docs.microsoft.com/zh-cn/powerapps/maker/canvas-apps/functions/function-isblank-isempty)
- [Power Apps 中的 If 和 Switch 函数](https://docs.microsoft.com/zh-cn/powerapps/maker/canvas-apps/functions/function-if)

## 1. `Blank`

返回一個 blank 值，用于数据源存儲 NULL 值，可用于删除表中的某个字段的值

## 2. `IsBlank`

1. 测试 blank 值或一个空字符串，用 `IsBlank()`

2. 如果，只测试 blank 值且不包括空字符串，用 `If(Value = Blank(), ...)`

3. 判断空值或错误，用 `IsBlankOrError()`

## 3. `IsEmpty`

判断【表】是否存在任何记录。

## 4. `Coalesce`

按顺序对参数求值，返回第一个不是 blank 或空字符串的值。如果所有参数都是 blank 或空字符串，则返回 blank。

## 5. `If` 和 `Switch`

