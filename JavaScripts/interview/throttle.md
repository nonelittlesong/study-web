# 节流函数

**节流函数**是指触发事件后，再一段时间间隔内无法连续调用，只有过了一段时间，才能进行下一次函数调用。

注意事项：

- 第一次立即执行
- 每隔一段时间执行一次
- 在间隔时间内触发，需要在间隔末尾执行一次

```js
function throttle(fn, timeout) {
  let lastExecTime = 0;
  let throttleId = null;
  return function(...rest) {
    // + 将日期转为数字，相当于 const now = new Date().getTime();
    const now = +new Date();
    const remaining = now - lastExecTime;
    if (remaining >= timeout) {
      if (throttleId) {
        clearTimeout(throttleId);
        throttleId = null;
      }
      fn.apply(this, rest);
      lastExecTime = now;
    } else if(!throttleId) {
      throttleId = setTimeout(() => {
        fn.apply(this, rest);
        lastExecTime = now;
        throttleId = null;
      }, timeout - remaining);
    }
  }
}
```