使用 `Async/Await` 实现 sleep 功能。

参考：  
* https://blog.koalatea.io/2018/05/14/node-js-sleep-using-async-await/

```js
function sleep(ms) {
  return new Promise(resolve => setTimeout(reslove, ms));
}

async function work() {
  console.log('Start sleeping');
  await sleep(5000);
  console.log('Five seconds later');
}

work();
```
