# 本地文件拖放
在 Render 进程中，接收 ondragstart 事件并发送消息到 Main 进程：  
```htm
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```
在 Main 进程中，接收拖拽过来的文件路径和在拖拽过程中要显示的图标：  
```js
const { ipcMain } = require('electron');

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  });
});
```
