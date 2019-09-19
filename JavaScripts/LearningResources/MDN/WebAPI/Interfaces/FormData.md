构建一系列键值对，可以被 [`XMLHttpRequest.send()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) 发送。编码为 `multipart/form-data`。  

如果想构建一个简单的 GET 请求，可直接传递给 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。  

实现了 `FormData` 的对象可以直接用 `for...of`，不需要 [`entries()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries):  
`for (var p of myFormData)` 和 `for (var p of myFormData.entries())` 的效果一样。  

