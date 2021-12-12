
- [connectors/Approvals](https://docs.microsoft.com/en-us/connectors/approvals/)
- [microsoft teams approvals with custom connectors](https://docs.microsoft.com/en-us/power-automate/teams/approvals-custom-connector)
- [approvals 执行时间限制](https://docs.microsoft.com/en-us/power-automate/modern-approvals#create-long-running-approvals)




## 1. [审批分配给多人](https://thrivenextgen.com/how-to-use-multi-choice-people-picker-fields-with-microsoft-flow-approvals/)

当我们把多选人员的 Emails 设置给 Approval 被分配者，Automate 自动将步骤放入循环器中。

为了解决上面的问题，我们要手动拼接 Emails：

1. 添加一个 `初始化变量` connector（必须放在顶层），类型为 String
2. 添加一个 `追加变量` connector
   - `Name` — 初始化变量的名称
   - `Value` — `多选人员Email;`

## 2. 附件

