# 获取错误
在同步代码中抛出的错误， `route handlers` 和 `middleware` 不需要处理：  
```js
app.get("/", function (req, res) {
  throw new Error("BROKEN"); // Express will catch this on its own.
});
```

在异步代码中抛出的错误，必须传递给`next()`：  
```js
app.get("/", function (req, res, next) {
  fs.readFile("/file-does-not-exist", function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    }
    else {
      res.send(data);
    }
  });
});
```
如果只抛异常，可以简化：  
```js
app.get("/", [
  function (req, res, next) {
    fs.writeFile("/inaccessible-path", "data", next);
  },
  function (req, res) {
    res.send("OK");
  }
]);
```

不管使用哪种方式，请确保 Express 获得了异常。  

# 默认 `error handler`
放在中间件栈最下面。  

# 自定义 `error handler`
