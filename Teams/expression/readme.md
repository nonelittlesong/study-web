# Workflow Definition Language

- [Workflow Definition Language](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-workflow-definition-language)
- [Expression for Power Automate](https://docs.microsoft.com/en-us/azure/logic-apps/workflow-definition-language-functions-reference)

## 1. 函数的用法

| 用法 | 语法 |
| --- | --- |
| 传递 item 给函数 | `@<functionName>(<item>)` |
| 获取参数的值，将值传给函数 | `@<functionName>(parameters('<parameterName>'))` |
| 嵌套的函数 | `@<functionName1>(<functionName2>(<item>))` |
| 当返回结果是一个 object，获取 object 的属性 | `@<functionName>(<item>).<propertyName>` |

## 2. 注意

- 内联在普通文本中的函数表达式，需要用 `{}` 括起来：
  - 正确 — `"<text>/@{<function-name>('<parameter-name>')}/<text>"`
  - 错误 — `"<text>/@<function-name>('<parameter-name>')/<text>"`
  - 可以 — `"@<function-name>('<parameter-name>')"`
