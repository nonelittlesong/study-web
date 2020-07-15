# 父子窗口
使用 `parent` 选项，创建子窗口：  
```js
const { BrowserWindow } = require('electron')

let top = new BrowserWindow()
let child = new BrowserWindow({ parent: top })
child.show()
top.show()
```
`child` 窗口将总是显示在 `top` 窗口的顶部。  

## 1、 模态窗口
禁用父窗口的子窗口。  
创建模态窗口必须设置 `parent` 和 `modal` 选项：  
```js
const { BrowserWindow } = require('electron')

let child = new BrowserWindow({ parent: top, modal: true, show: false })
child.loadURL('https://github.com')
child.once('ready-to-show', () => {
  child.show()
})
```

# 静态方法
## BrowserWindow.fromWebContents(webContents)
* webContents

返回 BrowserWindow - 拥有给定 webContents 的窗口。

## BrowserWindow.getFocusedWindow()
返回当前获得焦点的窗口。  
>**注意：**  
>可用于创建模态窗口时，设置 parent 选项。  

