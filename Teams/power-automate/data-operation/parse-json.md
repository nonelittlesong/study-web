# Power Automate 行为之 Parse JSON

- [Introduction to JSON | Bob German](https://techcommunity.microsoft.com/t5/microsoft-365-pnp-blog/introduction-to-json/ba-p/2049369)
- [JSON Intro for Microsoft 365 People | April Dunnam](https://www.sharepointsiren.com/2021/02/json-intro-for-microsoft-365-people/)
- [How to use Parse JSON action in Power Automate | Luise Freese](https://techcommunity.microsoft.com/t5/microsoft-365-pnp-blog/how-to-use-parse-json-action-in-power-automate/ba-p/2121861)
- [Using Parse JSON to process complex objects in Power Automate to Excel](https://www.youtube.com/watch?v=kk2dfIcwOn8)

## 1. 数据类型

- `array` — 数组
- `object` — 对象
- `{}` — 空
- `string` — 字符串
- `integer` — 整数
- `number` — 数字

>Tips:  
>可以通过【测试】获取请求的 body，再将 body 复制到 Parse JSON 行为的 `Generate from sample` 中，得到 schema。

## 2. Schema

- JSON 中可以存在 Schema 中没有的属性。

## 3. 缺点

1. 只适合解析简单的 JSON，当 JSON 很复杂或存在同名的属性时，会导致动态内容复杂易混淆。
2. [Power Automate 可以直接引用 JSON 的属性 | Django Lohn](https://knowhere365.space/power-automate-skip-the-parse-json-action-to-reference-data/)
