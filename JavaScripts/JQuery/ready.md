在 `jQuery 3.0` 中，除了 `$(handler)` 之外，其他 ready 方法都被弃用。  

# ready 和 load
- `ready` - DOM 加载完后。
- `load` - DOM 和所有资源加载完后。

# 原生
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
