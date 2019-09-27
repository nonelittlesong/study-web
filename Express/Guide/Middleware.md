>如果当前中间件不结束请求响应周期，那么就要用 `next()` 把控制权传递给下一个中间件。否则，请求将会挂起。  

功能：  
* 执行代码。
* 处理请求和响应对象。
* 结束请求-响应周期。
* 调用栈的下一个中间件。

类型：
* Application-level middleware
* Router-level middleware
* Error-handling middleware
* Built-in middleware
* Third-party middleware

## 加载顺序
* 多个中间件按加载顺序执行。
* 中间件必须在 route 之前加载。

## 中间件给请求添加属性
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

## 可配置的中间件
要想使你的中间件能够被配置，export 一个带有 options 对象或其他参数的函数，函数返回基于这些参数的中间件的实现。  
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

## 使用中间件
### 1、 应用级别中间件
* app.use()
* app.method()

To skip the rest of the middleware functions from a router middleware stack, call next('route') to pass control to the next route. NOTE: next('route') will work only in middleware functions that were loaded by using the app.METHOD() or router.METHOD() functions.  
This example shows a middleware sub-stack that handles GET requests to the /user/:id path.  
```js
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', function (req, res, next) {
  res.send('special')
})
```

### 2、 Router级别中间件
To skip the rest of the router’s middleware functions, call next('router') to pass control back out of the router instance.  

This example shows a middleware sub-stack that handles GET requests to the /user/:id path.  
```js
var app = express()
var router = express.Router()

// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/', function (req, res) {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, function (req, res) {
  res.sendStatus(401)
})
```

### 3、 错误处理中间件
**必须要有四个参数。**  
```js
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

### 4、 内置中间件

* [express.static](http://www.expressjs.com.cn/en/4x/api.html#express.static) serves static assets such as HTML files, images, and so on.
* [express.json](http://www.expressjs.com.cn/en/4x/api.html#express.json) parses incoming requests with JSON payloads. **NOTE: Available with Express 4.16.0+**
* [express.urlencoded](http://www.expressjs.com.cn/en/4x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads. **NOTE: Available with Express 4.16.0+**

### 5、 第三方中间件
```
$ npm install cookie-parser
```
```js
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

[更多第三方中间件](http://www.expressjs.com.cn/resources/middleware.html)
