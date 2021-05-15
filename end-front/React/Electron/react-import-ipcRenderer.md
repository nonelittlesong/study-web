# React 如何导入 ipcRenderer 模块

参考：

- [Calling the Electron ipcRenderer method in a React component | erikmartinjordan.com](https://erikmartinjordan.com/electron-react-ipcrenderer)
- [How to import the electron ipcRenderer in a React | stackoverflow](https://stackoverflow.com/questions/44008674/how-to-import-the-electron-ipcrenderer-in-a-react-webpack-2-setup)

## 方案一

在 `webpack.config.js` 中，添加

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ExternalsPlugin('commonjs', [
      'electron'
    ])
  ]
  // ...
}
```

然后，通过

```js
import { ipcRenderer } from 'electron';
```

使用 ipcRenderer 模块。

## 方案二

创建 `preload.js` 文件

```js
window.ipcRenderer = require('electron').ipcRenderer;
```

在 `main.js` 中

```js
// Create the browser window.
mainWindow = new BrowserWindow({
  alwaysOnTop: true,
  frame: false,
  fullscreenable: false,
  transparent: true,
  titleBarStyle: 'customButtonsOnHover',
  show: false,
  width: 300, 
  height: 350,
  webPreferences: {
    nodeIntegration: true,
    preload: __dirname + '/preload.js' // 在此处，预加载 preload.js
  }
});

// Blur window when close o loses focus
mainWindow.webContents.on('did-finish-load', () => mainWindow.webContents.send('ping', '🤘') );
```

mianWindow 将预加载 `preload.js` 文件。现在，React 组件可以使用 `window.ipcRenderer` 方法。

```js
// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  useEffect( () => {
    window.ipcRenderer.on('ping', (event, message) => { 
      console.log(message) 
    });
  }, []);
          
  return (
    <div className = 'App'></div>
  );
}

export default App;
```