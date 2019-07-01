middleware 比 controller 多个参数 `next`。  

功能：  
* 执行代码。
* 处理请求和响应对象。
* 结束请求-响应周期。
* 调用栈的下一个中间件。

# 加载顺序
* 多个中间件按加载顺序执行。
* 中间件必须在 route 之前加载。

# 给 `req` 添加属性
```js
var express = require('express')
var app = express()

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.listen(3000)
```

# 注册中间件
要想使你的中间件能够被注册，export 一个带有 options 对象或其他参数的函数，函数返回基于这些参数的中间件的实现。  
my-middleware.js
```js
module.exports = function(options) {
  return function(req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```
```
var mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

# 官方或第三方中间件
* [cookie-session](https://github.com/expressjs/cookie-session)
* [express-session](https://www.npmjs.com/package/express-session)
* [compression](https://github.com/expressjs/compression)


