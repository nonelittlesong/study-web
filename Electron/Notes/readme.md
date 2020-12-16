# Electron 笔记

<details>
<summary>Table of Contents</summary>

- [AskSave](https://github.com/nonelittlesong/study-web/tree/master/Electron/Notes/AskSave) — 程序关闭前询问是否保存。
- [minWidth](https://github.com/nonelittlesong/study-web/blob/master/Electron/Notes/minWidth.md) — 必须同时设置 `minWidth` 和 `minHeight` 才会生效。

</details>

## 1. 如何在两个网页间共享数据？

### 1.1. HTML5 API

在两个网页（渲染进程）间共享数据的最简单的方法是使用浏览器中已经实现的 HTML5 API。其中比较好的方案是用：

- [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### 1.2. Remote 模块

将数据存在主进程的某个全局变量中，然后在多个渲染进程中使用 `remote` 模块访问它：

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
