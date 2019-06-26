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
