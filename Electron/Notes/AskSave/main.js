mainWindow.on('close', (e) => {
  e.preventDefault();
  mainWindow.webContents.send('action', 'exiting');
});

ipcMain.on('reqaction', (event, payload) => {
  switch(payload) {
    case 'exit':
      console.log('exit');
      //mainWindow = null;
      mainWindow.destroy();
      app.quit();
      break;
  }
});

/**
 * 方案二
 * 主进程不添加额外代码
 */
