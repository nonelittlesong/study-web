# 路由方法
## `app.all()`
`app.all()` 用来加载中间件：  
```js
app.all('/secret', function(req, res, next) {
    console.log('Accessing the secret section ...');
    next();
});
```

# 路由路径
* [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) - express 使用 path-to-regexp 匹配路径。
* [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) - 在线测试路径的工具。
* `（[\$])` - 在路径中使用美元符号。

>**注**: Query strings are not part of the route path.

## 1、 模式匹配
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

## 2、 正则
```js
app.get(/a/, function (req, res) {      // 匹配所有包含“a“的路径
  res.send('/a/')
})

app.get(/.*fly$/, function (req, res) { // 匹配以fly结尾的路径
  res.send('/.*fly$/')
})
```

# 路由参数
## 1、 `:name`  
路由参数的名字必须由 `word characters`(A-Za-z0-9_) 组成。  

## 2、 `-` 和 `.` 的特殊用途：  
```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

## 3、 使用正则进行限定：  
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

