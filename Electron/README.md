├ ─ └ 

可以视 Electron 为小型的 Chromium 浏览器。  

* [官网](https://electronjs.org/)
* CLIs
  * [Electron Forge](https://www.electronforge.io/)
  * [Electron Builder](https://www.electron.build/)
  * [Electron React Boilerplate](https://electron-react-boilerplate.js.org/)
* [Electron API Demos](https://github.com/electron/electron-api-demos)

## 安装
```
# npm
$ npm i -D electron@latest
# yarn
$ yarn add electron@latest --dev
```

## [Hello World](https://www.electronjs.org/docs/tutorial/first-app)
main.js：  
```js
const { app, BrowserWindow } = require('electron');

// 创建一个对 BrowserWindow 的全局引用，避免窗口因为垃圾回收关闭
let win;

function createWindow () {
  // 创建窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true      // 在“渲染进程”中可以使用 node 特性
    }
  })

  // 加载主进程
  win.loadFile('index.html')

  // 打开测试工具，同 F12
  win.webContents.openDevTools()

  // 窗口“已经”关闭后调用
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}


// 在初始化完成后并准备好创建窗口时，调用
// 有些接口只能在此事件发生后使用
// v6
// app.on('ready', createWindow)
// v9
app.whenReady().then(createWindow);

// 在所有窗口关闭后退出
app.on('window-all-closed', () => {
  // MAC 系统除外
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // MAC 系统重新唤醒窗口
  // v6
  // if (win === null) {
  //   createWindow()
  // }
  // v9
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

// 可以在这里添加你的主进程代码；
// 或写在独立的文件中，在这里 require 他们。
```
index.html：  
```htm
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

>[CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)  


## 实例
- [labeltools](https://github.com/nonelittlesong/my-via)  
