// 时间同步服务器
const http = require('http');

const server = http.createServer((req, res) => {

  // 返回服务器时间
  if (req.url == '/api/time') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    const date = new Date();
    res.write(JSON.stringify({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }));
    res.end();
  }
})

server.listen(3001, '0.0.0.0');

console.log('Node.js web server at port 3001 is running...');
