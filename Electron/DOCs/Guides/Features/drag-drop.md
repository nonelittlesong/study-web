# 文件拖拽效果

渲染进程中，实现 `dragstart` 的事件处理函数，发送消息给主进程：

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.querySelector('#drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

主进程中，接受消息，调用 `startDrag()`：

```js
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png' // 拖拽图标
  })
})
```
