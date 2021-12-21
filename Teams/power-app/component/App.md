# Power App 之 App 對象

- 不要再 `Onstart` 中使用 `Navigate`，`Navigate` 會强制系統在顯示第一個屏幕前計算完成。

## 1. StartScreen

不能使用全局变量和集合。

StartScreen 是一个数据流属性，不能包含行为函数。所有数据流函数都可用：

- 读取用于启动应用的参数 `Param` 函数
- 读取有关当前用户信息的 `User`函数
- `LookUp`、`Filter`、`CountRows`、`Max` 和从数据源读取的其他函数
- 通过连接器的任何 API 调用，但要注意它能快速返回
- `Connection`、`Compass` 和 App 等信号
