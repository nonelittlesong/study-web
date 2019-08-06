const { app, BrowserWindow } = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javaScript object is garbage collected.
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load the index.html of the app
  const modalPath = path.join(__dirname, 'index.html');
  win.loadFile(modalPath);

  win.webContents.openDevTools();

  // Open the DevTools.
  // win.webContents.openDevTools();
  
  // Emitted when the window is closed
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

