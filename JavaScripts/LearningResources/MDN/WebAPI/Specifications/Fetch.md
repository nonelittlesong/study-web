## 语法
```
Promise<Response> fetch(input[, init]);
```
### 参数
**input**  
- [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/API/USVString) 字符串 - 包含要获取资源的 URL。
- [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 对象。

**init**（可选）  
一个普通对象，可选属性有：  
- method： 请求方法，如 `GET`、`POST`。
- headers： 请求的头信息，形式为 `Headers` 的对象或包含 `ByteString` 值的对象字面量。
- body： 请求的 body 信息。

## 示例
