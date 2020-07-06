## [主进程和渲染进程](https://www.electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes)
Electron 使用了 Chromium 多进程架构。每个网页都拥有一个自己的进程，叫做渲染进程。  

主进程和渲染进程间通信：  
- [ipcRenderer](https://www.electronjs.org/docs/api/ipc-renderer) 和 [ipcMain](https://www.electronjs.org/docs/api/ipc-main)  
- [remote](https://www.electronjs.org/docs/api/remote)  
- [how to share data between web pages?](https://www.electronjs.org/docs/faq#how-to-share-data-between-web-pages)  
  - 使用 HTML5 API。  
  - 使用 Electron 的 IPC 系统，在主进程中设置一个全局变量。  

## [使用 Electron APIs](https://www.electronjs.org/docs/tutorial/application-architecture#using-electron-apis)

## [使用 Node.js APIs](https://www.electronjs.org/docs/tutorial/application-architecture#using-nodejs-apis)
>**注意：**  
>native Node.js 模块需要先编译后使用！！  
>[Electron 使用 native Node 模块](https://www.electronjs.org/docs/tutorial/using-native-node-modules#using-native-node-modules)  

## [性能](https://www.electronjs.org/docs/tutorial/performance)

### 1) 谨慎地加载模块
