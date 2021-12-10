
# Power Automate 操作团队

参考：

- [Use Power Automate to bulk add members into Microsoft Teams](https://nikkichapple.com/use-power-automate-to-bulk-add-members-into-microsoft-teams/)

## 1. 创建团队

假设，将 `SharePoint List` 中的`多选人员列`（设置列名：客户们）的人添加到团队：

1. 选择 `创建团队`
   - `团队名称` — `Title`团队，队名不能与现有团队名重复
   - `说明` — 随便填

2. 选择 `将成员添加到团队中`
   - `团队` — 添加动态内容 `新团队 ID`
   - `AAD ID` — `客户们 Email`，如果是一个数组，会自动封装 `应用到每一个`，自动添加输入项 `从先前的步骤中选择一个输出` 为 `客户们`。

