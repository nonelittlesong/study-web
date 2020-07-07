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

### 2) 过早地加载和执行代码
以 Visual Studio 代码为例。当你打开一个文件，它会立刻展示没有高亮的内容，优先实现和文本的交互功能。  

>ES6 的 import 如何延迟加载？？  

### 3) 阻塞主进程

1. 对于需要长期占用 CPU 繁重任务，使用 [worker threads](https://nodejs.org/api/worker_threads.html)，考虑将他们移动到 BrowserWindow，或（作为最后手段）生成一个专用进程。  
2. 尽可能避免使用同步 IPC 和 remote 模块。  
3. 避免在主线程使用阻塞的 I/O 操作。  

### 4) 阻塞渲染进程

- [requestIdleCallback()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)  
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)  

### 5) 不必要的 polyfills

### 6) 不必要或阻塞的网络请求

### 7) 打包你的代码
webpack  
