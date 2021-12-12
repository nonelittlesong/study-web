# [Power App 添加流](https://docs.microsoft.com/zh-cn/powerapps/maker/canvas-apps/using-logic-flows)

## 1. 创建流

1. 登录到 Power Apps
2. 创建流 > 即时云端流 — 不要直接再 automate 中创建流
3. 输入流名称，如 `FlowName`
4. 在【选择如何触发此流】下，选择 Power Apps

## 2. 流参数

- 从【动态内容】中选择 Ask in Power Apps，会自动生成动态内容如 `ContentName`。
- 重复上一步可以获取多个参数

>注意：  
>1、不能自定义参数名，必需使用动态内容作为参数

## 3. 向应用添加流

1. 回到 Power Apps，添加流
2. 添加流 `FlowName`
3. 为按钮 OnSelect 属性添加公式
4. 在公式栏输入以下公式 — 流参数和 `Run` 参数的个数需一致  
   ```
   FlowName.Run(<你要传给 ContentName 的数据>)
   ```

>注意：  
>1、如果修改了流，可能要重新连接流（如，添加结点）

## 4. 传多个数据

参考：

- [Passing the PowerApps Collection to MS Flow](https://powerusers.microsoft.com/t5/Building-Power-Apps/Passing-the-PowerApps-Collection-to-MS-Flow/m-p/299054)
- [JSON for canvas apps](https://powerapps.microsoft.com/en-us/blog/json-for-canvas-apps/)
- [bulk upload image to SP documents](https://powerusers.microsoft.com/t5/Building-Power-Apps/Using-ForAll-to-run-a-Flow-and-pass-in-parameters-from-a/m-p/449002)

1. Power App 将集合转为 JSON
   - `Set(JSONName, JSON(CollectionName))`
2. Automate 创建一个解析 JSON 的流
3. Power App 传递 JSON 格式的集合
   - `FlowName.Run(JSONName)`
