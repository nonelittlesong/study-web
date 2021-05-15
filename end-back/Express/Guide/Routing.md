## [路由方法](http://www.expressjs.com.cn/en/4x/api.html#app.METHOD)

### `app.all()`
```js
app.all('/secret', function(req, res, next) {
    console.log('Accessing the secret section ...');
    next();
});
```

## 路由路径
* [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) - express 使用 path-to-regexp 匹配路径。
* [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) - 在线测试路径的工具。
* `（[\$])` - 匹配请求中的美元符号。

### 1、 模式匹配
```js
app.get('/ab?cd', function (req, res) {    // 匹配 acd 和 abcd
  res.send('ab?cd')
})

app.get('/ab+cd', function (req, res) {    // 匹配 abcd abbcd abbbcd ...
  res.send('ab+cd')
})

app.get('/ab*cd', function (req, res) {    // 匹配 abcd abxcd abRANDOMcd ab123cd ...
  res.send('ab*cd')
})

app.get('/ab(cd)?e', function (req, res) { // 匹配 abe abcde
  res.send('ab(cd)?e')
})
```

### 2、 正则
```js
app.get(/a/, function (req, res) {      // 匹配所有包含“a“的路径
  res.send('/a/')
})

app.get(/.*fly$/, function (req, res) { // 匹配以fly结尾的路径
  res.send('/.*fly$/')
})
```

## 路由参数
**保存在 `req.params` 中：**  
```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

>路由参数的名字必须由 `word characters`(A-Za-z0-9_) 组成。  

**`-` 和 `.` 在路径中会按字面翻译，但在参数中会有特殊用途：**  
```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

**使用正则限定参数：**  
```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```
>**注：** 在 Express 4.x 中，`*` 不能被正常翻译。使用 `{0，}` 代替 `*`。


## 路由回调
```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
```

## 响应方法
| 方法 | 描述 |
| --- | --- |
| res.downloand() | 下载一个文件 |
| res.end() | 结束响应 |
| res.json() | 发送json响应 |
| res.jsonp() | 发送支持jsonp的json响应 |
| res.redirect() | 重定向一个请求 |
| res.render() | Render a view template |
| res.send() | 发送不同类型的响应 |
| res.sendFile() | 字节流发送文件 |
| res.sendStatus() | 发送响应状态 |

## `app.route()`
```js
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

## `express.Router`
模块化路由。  

birds.js:  
```js
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```
在app中加载birds.js:  
```js
var birds = require('./birds')

// ...

app.use('/birds', birds)
```
The app will now be able to handle requests to /birds and /birds/about, as well as call the timeLog middleware function that is specific to the route.  



