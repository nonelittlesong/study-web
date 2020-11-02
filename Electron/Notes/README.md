# 如何在两个网页间共享数据？
在两个网页（渲染进程）间共享数据的最简单的方法是使用浏览器中已经实现的 HTML5 API。其中比较好的方案是用 [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)，[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)，[sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)，或者[indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)。  

你还可以使用 Electron 内的 IPC 机制实现。 将数据存在主进程的某个全局变量中，然后在多个渲染进程中使用 remote 模块访问它。  

```js
// 在主进程中
global.sharedObject = {
  someProperty: 'default value'
}
```

```js
// 在第一个页面中
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value';
```

```js
// 在第二个页面中
console.log(require('electron').remote.getGlobal('sharedObject').someProperty);
```
