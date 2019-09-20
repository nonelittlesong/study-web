请求体解析中间件。  

参考：  
- [Express 中间件----body-parser](https://www.jianshu.com/p/ea0122ad1ac0)
- [四种常见的 POST 提交数据方式](https://imququ.com/post/four-ways-to-post-data-in-http.html#simple_thread) by Jerry Qu
- [body-parser npm](https://www.npmjs.com/package/body-parser)

可以解析 JSON、 Raw、 文本、 URL-encode。  
```js
var express = require('express')
//获取模块
var bodyParser = require('body-parser')

var app = express()

// 创建 application/json 解析
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login 获取 URL编码的请求体
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

// POST /api/users 获取 JSON 编码的请求体
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
});
app.listen(3000);
```

## 一、 API

### bodyParser.json(options)
object/array 放在 `req.body` 中。  

options:  
1. inflate - 设置为true时，deflate压缩数据会被解压缩；设置为true时，deflate压缩数据会被拒绝。默认为true。
2. limit - 设置请求的最大数据量。默认为'100kb'
3. reviver - 传递给JSON.parse()方法的第二个参数，详见JSON.parse()
4. strict - 设置为true时，仅会解析Array和Object两种格式；设置为false会解析所有JSON.parse支持的格式。默认为true
5. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。这个选项可以是一个函数或是字符串，当是字符串是会使用type-is来查找MIMI类型；当为函数是，中间件会通过fn(req)来获取实际值。默认为application/json。
6. verify - 这个选项仅在verify(req, res, buf, encoding)时受支持

### bodyParser.urlencoded(options)

options:  
1. extended - 当设置为false时，会使用querystring库解析URL编码的数据；当设置为true时，会使用qs库解析URL编码的数据。后没有指定编码时，使用此编码。默认为true
2. inflate - 设置为true时，deflate压缩数据会被解压缩；设置为true时，deflate压缩数据会被拒绝。默认为true。
3. limit - 设置请求的最大数据量。默认为'100kb'
4. parameterLimit - 用于设置URL编码值的最大数据。默认为1000
5. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。这个选项可以是一个函数或是字符串，当是字符串是会使用type-is来查找MIMI类型；当为函数是，中间件会通过fn(req)来获取实际值。默认为application/octet-stream。
6. verify - 这个选项仅在verify(req, res, buf, encoding)时受支持

### bodyParser.raw(options)
Buffer 值放在 `req.body` 中。  

options：  
1. inflate - 设置为true时，deflate压缩数据会被解压缩；设置为true时，deflate压缩数据会被拒绝。默认为true。
2. limit - 设置请求的最大数据量。默认为'100kb'
3. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。这个选项可以是一个函数或是字符串，当是字符串是会使用type-is来查找MIMI类型；当为函数是，中间件会通过fn(req)来获取实际值。默认为application/octet-stream。
4. verify - 这个选项仅在verify(req, res, buf, encoding)时受支持

### bodyParser.text(options)
string 放在 `req.body` 中。  

options：  
1. defaultCharset - 如果Content-Type后没有指定编码时，使用此编码。默认为'utf-8'
2. inflate - 设置为true时，deflate压缩数据会被解压缩；设置为true时，deflate压缩数据会被拒绝。默认为true。
3. limit - 设置请求的最大数据量。默认为'100kb'
4. type - 该选项用于设置为指定MIME类型的数据使用当前解析中间件。这个选项可以是一个函数或是字符串，当是字符串是会使用type-is来查找MIMI类型；当为函数是，中间件会通过fn(req)来获取实际值。默认为application/octet-stream。
5. verify - 这个选项仅在verify(req, res, buf, encoding)时受支持
