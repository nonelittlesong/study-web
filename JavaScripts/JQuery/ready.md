# 原生 JS 实现 JQuery 的 `$(handler)` / `$(document).ready(handler)`

参考：  
- https://www.sitepoint.com/jquery-document-ready-plain-javascript/
- [domReady](https://github.com/ded/domready)

在 `jQuery 3.0` 中，除了 `$(handler)` 之外，其他 ready 方法都被弃用。  

## 1. ready 和 load

- `ready` - DOM 加载完后。
- `load` - DOM 和所有资源加载完后。

## 2. 什么时候用 `window.onload`

1. 在所有资源加载完成前，显示加载动画。
2. 需要对图片的尺寸进行计算。

## 3. 也许你不需要 `jQuery.ready()`

如果你的 JS 代码在 `<head>` 标签内部，那么你需要通过 `jQuery.ready()` 确保你的 JS 代码在 DOM 加载完之后运行。

但是，当你的 JS 代码放在 `<body>` 标签的最后面时，已经确保 DOM 都加载完了，不需要使用 `$(handler)` / `jQuery.ready()`。

## 4. 原生

```js
var callback = function(){
  // Handler when the DOM is fully loaded
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
```
