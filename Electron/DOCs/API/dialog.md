# dialog.showOpenDialog(\[browserWindow, ]options[, callback])
* browserWindow - 父窗体，使 dialog 成为模态窗体。
* options
* callback - 选择文件后调用，路径数组为参数。

返回 `Promise<Object>`:  
* `canceled` - 是否取消
* `filePaths` - String\[]
* `bookmarks`

例子：  
```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```
