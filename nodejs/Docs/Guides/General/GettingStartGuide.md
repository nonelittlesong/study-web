# 安装后如何开始？
构建一个web服务器： 创建一个文件`app.js`。  
```js
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

终端输入`node app.js`，然后访问`http://127.0.0.1:3000`。

express + socket.io  
```js
const http = require('http');
const port = process.env.PORT || 3000;
const path = require('path');
// express
const express = require('express');
const app = express();
// socket.io
const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  // ...
});
```
