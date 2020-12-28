# 本地快捷键和全局快捷键。  

> `preventDefault()` 会阻止 Electron 的快捷键！

## 1. 本地快捷键

应用程序处于焦点状态。

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

根据操作系统配置不同的快捷键：

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## 2. 全局快捷键

应用程序不处于焦点时触发。

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## 3. 浏览器窗口内的快捷方式

```js
window.addEventListener('keyup', doSomething, true)
```

>第三个参数 `true`，意味着当前监听器总是在其他监听器之前接收按键，以避免其他监听器调用 `stopPropagation()`。  

在 `keydown` 和 `keyup` 事件之前，会发出 [before-input-event](https://www.electronjs.org/docs/api/web-contents#event-before-input-event)事件。 它可以用于捕获和处理在菜单中不可见的自定义快捷方式。

如果您不想手动进行快捷键解析，可以使用一些库来进行高级的按键检测。例如 [mousetrap](https://github.com/ccampbell/mousetrap)。
