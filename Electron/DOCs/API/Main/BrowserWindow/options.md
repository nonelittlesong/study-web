## nodeIntegration

渲染进程要使用 `node` 特性，必须设为 `true`。（Electron 12 后，还要 `contextIsolation: false`）

## contextIsolation

参考：

- [重大更新 | Electron](https://www.electronjs.org/docs/breaking-changes#%E9%BB%98%E8%AE%A4%E6%9B%B4%E6%94%B9%EF%BC%9A-%E4%B8%8A%E4%B8%8B%E6%96%87%E9%9A%94%E7%A6%BB-%E9%BB%98%E8%AE%A4%E4%B8%BA-true)
- [Context Isolation](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md)

Electron 12 后，`contextIsolation`  默认为 true。
要在渲染进程中使用 node 特性，需要将 `nodeIntegration` 设为 true，把 `contextIsolation` 设为 false。

### 迁移

过去，我在 preload.js 中使用 `window.X = apiObject` 提供 API。现在呢？

过去，`contextIsolation: false`：

```js
window.myAPI = {
  doAThing: () => {}
}
```

现在，`contextIsolation: true`：

```js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
});
```

在浏览器中，可以像过去一样使用 `window.myAPI`。

### 安全考虑

设置 `contextIsolation: true` 并使用 `contextBridge` 不能保证一定安全：

```js
// ❌ 坏代码
// 暴露了强大的 API 允许任何网页发送任何信息。
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
});
```

正确做法：

```js
// ✅ 好代码
// 为每个 IPC message 提供一个方法
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
});
```
