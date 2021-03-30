# Electron

* [官网](https://electronjs.org/)
* CLIs
  * [Electron Forge](https://www.electronforge.io/)
  * [Electron Builder](https://www.electron.build/)
  * [Electron React Boilerplate](https://electron-react-boilerplate.js.org/)
* [Electron API Demos](https://github.com/electron/electron-api-demos)
* [Electron Fiddle](https://www.electronjs.org/fiddle)  

<details>
<summary>Resources</summary>

- [electron-boilerplate](https://github.com/sindresorhus/electron-boilerplate)
- [awesome-electron](https://github.com/sindresorhus/awesome-electron)

</details>

## 1. 安装

```
# npm
$ npm i -D electron
# yarn
$ yarn add electron --dev
```

## 2. 实例

- [labeltools](https://github.com/nonelittlesong/my-via)  

## 3. Electron 架构

- [一图浅析electron架构 - CSDN](https://blog.csdn.net/sinat_41170942/article/details/79455766)  
- [Electron Application Architecture](https://www.electronjs.org/docs/tutorial/application-architecture)  
- [从 VSCode 看大型 IDE 技术架构 - 知乎](https://zhuanlan.zhihu.com/p/96041706)  

## 4. [Hello World](https://www.electronjs.org/docs/tutorial/first-app)

最小的 Electron 应用程序具有以下结构：

```
my-electron-app/
├── package.json
├── main.js
├── preload.js
└── index.html
```

main.js：

```js
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

index.html：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using Node.js <span id="node-version"></span>,
        Chromium <span id="chrome-version"></span>,
        and Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

>[CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)  

preload.js：

```js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```