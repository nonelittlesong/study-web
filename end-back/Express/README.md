* [Express中文](http://www.expressjs.com.cn/)
* [Express](http://expressjs.com/)
* [Express菜鸟教程](https://www.runoob.com/nodejs/nodejs-express-framework.html)

# 安装
创建工作目录：  
```
$ mkdir myapp
$ cd myapp
```
创建 package.json 文件：  
```
$ npm init
```
这里需要输入几个参数，大部分可以默认。需要注意的是：  
```
entry point: (index.js)
```
可以自定义程序入口，如`app.js`。

安装 `express`：  
```
$ npm install express
```

# Hello World
```js
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World'));
app.listen(3000, () => console.log('Example app listening on port 3000'));
```

# express-generator
安装：  
```
$ npm install express-generator -g
```
创建应用：  
```
$ express --view=pug myapp
```
安装所有依赖包：  
```
$ cd myapp
$ npm install
```
启动程序：  
```
$ DEBUG=myapp:* npm start
```

# Basic routing
定义：  
```js
app.method(path, handler);
```
* app 是 Express 实例。
* method 是 HTTP 请求方法，**使用小写**。
* path 是服务器路径。
* handler 是当路由匹配时执行的函数。
