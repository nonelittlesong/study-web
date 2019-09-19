构建一系列键值对，可以被 [`XMLHttpRequest.send()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) 发送。编码为 `multipart/form-data`。  

如果想构建一个简单的 GET 请求，可直接传递给 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。  

实现了 `FormData` 的对象可以直接用 `for...of`，不需要 [`entries()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries):  
`for (var p of myFormData)` 和 `for (var p of myFormData.entries())` 的效果一样。  

## 方法
### FormData.append()
```js
formData.append(name, value);
formData.append(name, value, filename);
```

- `name` - 域名。它的数据保存在 `value` 中。
- `value` - 域的值。可以是 `USVString` 或 [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/append)（包括子类 [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)）。
- `filename`
  - 当第二个参数是 `Blob`，默认是 "blob"。
  - 当第二个参数是 `File`，默认是文件名。
  
>**注：** 如果给 `FormData` 添加 `Blob` 数据，文件名会被放在请求头 "Content-Disposition" 中（不同浏览器有差异）。  

## 例子
和常规表单数据一样，可以同一个 `name` 多个 `value`。  
```js
// 为了和 PHP 命名习惯一致，名称中加了[]
formData.append('userpic[]', myFileInput1.files[0], 'chris1.jpg');
formData.append('userpic[]', myFileInput2.files[0], 'chris2.jpg');
```
