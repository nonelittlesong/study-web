
- [多个连续的箭头函数与柯里化](https://blog.csdn.net/allanGold/article/details/86667908)
- [Using async/await in ExpressJS middlewares](https://www.acuriousanimal.com/2018/02/15/express-async-middleware.html)

express 使用 `async` 函数作为中间件，必须进行异常处理：  
```js
app.get('/hello', async (req, res, next) => {
  try {
    // Do something
    next();
  } catch (error) {
    next(error);
  }
};
```

封装:  
```js
const asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next);

app.get('/hello', asyncHandler((req, res, next) => {
  // Some code here.
}));
```
