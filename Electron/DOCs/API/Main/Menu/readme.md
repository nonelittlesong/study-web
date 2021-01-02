# Electron Menu

创建应用菜单(窗口导航栏处)和上下文菜单(右键)。

## 1. [MenuItem](https://www.electronjs.org/docs/api/menu-item)

语法：`new MenuItem(options)`

`options`:

- `checked` Boolean(optional)

## 1. Context Menu

通过监听 `context-menu` 事件：

```js
app.on('browser-window-created', (ev, win) => {
  win.webContents.on('context-menu', (ev2, params) => {
    menu.popup(win, params.x, params.y);
  });
});
```

`params`:

- `x` 整数 — x 坐标
- `y` 整数 — y 坐标
- `linkURL` 字符串 — 
