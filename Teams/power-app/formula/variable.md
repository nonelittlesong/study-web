# [了解画布应用中的变量](https://docs.microsoft.com/zh-cn/powerapps/maker/canvas-apps/working-with-variables)

| 变量类型 | Scope | 描述 | 建立的函数 |
| --- | --- | --- | --- |
| 全局变量 | 应用 | 包含应用程序任何位置的数字、字符串、布尔值、记录、表等 | Set |
| 上下文变量 | 屏幕 | 仅可在一个屏幕内引用 | UpdateContext <br> Navigate |
| 集合 | 应用 | 包含可从应用任意位置进行引用的一个表。 允许修改表的内容，而不是作为一个整体进行设置。 可以保存到本地设备，以供将来使用。| Collect <br> ClearCollect |


## 1. 全局变量

全局变量的公式：

- 使用 `Set` 函数定义一个全局变量，`Set(MyVar, 1)` 可定义一个全局变量 MyVar，初始化为 1。
- 使用 `Set` 函数赋值一个全局变量，用法同上。
- 全局变量可以存储包括字符串、数字、记录和表在内的任何值。

## 2. 环境变量

### 2.1. 删除环境变量

解决方案 -> Default Solution -> 环境变量 -> 删除你想删除的环境变量。

