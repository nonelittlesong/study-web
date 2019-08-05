# 本地快捷键
app 处于焦点。  

```js
const { Menu, MenuItem } = require('electron');
const menu = new Menu();

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff'); }
}));
```
根据操作系统配置不同的组合键：  
```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

# 全局快捷键
不处于焦点。  
```js
const { app, globalShortcut } = require('electron');

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed');
  });
});
```

# 在浏览器窗口内的快捷方式
* [mousetrap](https://github.com/ccampbell/mousetrap)
