# Array.prototype.filter with Async

能用 async 函数作为数组过滤器吗？

References

- [How to use Array.prototype.filter with async? | stackoverflow](https://stackoverflow.com/questions/47095019/how-to-use-array-prototype-filter-with-async)
- [Asynchronous array functions in Javascript](https://advancedweb.hu/asynchronous-array-functions-in-javascript/)

**不能！**

先 `Promise.all` 再过滤：

```js
const results = await Promise.all(your_promises)
const filtered_results = results.filter(res => //do your filtering here)
```