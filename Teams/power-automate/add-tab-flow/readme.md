# Power Automate 创建选项卡

参考：

- [Read large Excel files within seconds without creating tables using Microsoft Graph](https://sharepains.com/2018/10/17/microsoft-flow-read-large-excel-files-within-seconds-without-creating-tables-using-microsoft-graph/)
- [Populate Excel template faster with Power Automate](https://sharepains.com/2020/08/04/populate-excel-template-power-automate/)
- [Create new tabs in your Teams in Microsoft Teams using Power Automate](https://sharepains.com/2020/12/21/new-tabs-microsoft-teams-power-automate/)

## 1. MS Graph 接口

POST：

```
https://graph.microsoft.com/beta/teams/{id}/channels/{id}/tabs
```

可以通过 MS Graph 或 Action 得到团队和频道的 ID。

- Action
  - 使用 Get a team 和 List channels 动作得到团队和频道的 ID

## 2. 认证

