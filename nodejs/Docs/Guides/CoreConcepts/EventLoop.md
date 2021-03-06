通过在任何可能的时间，把操作卸载到系统内核，事件循环使Node.js可以执行非阻塞操作，尽管JavaScript是单线程。  

事件循环 - 处理回调的循环。  

# 事件循环
每个阶段都有各自的回调队列。  
当事件循环进入某个阶段，将执行特定的操作，然后执行队列中的回调，直到队列空了或达到最大限制。  
然后进入下个阶段。  
```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

* timers - 执行 `setTimeout()` 和 `setInterval()` 中的回调。
* pending callbacks - executes I/O callbacks deferred to the next loop iteration.
* idle, prepare - 只在内部使用。
* poll - 获取新的IO事件，执行I/O相关回调（除了close回调，timers和setImmediate）;node会在这里阻塞。
* check - `setImmediate()` 回调在这里产生。
* close callbacks - 一些 close 回调。例如 `socket.on('close', ...)`。

# Phases
## timers
`timers` 指定回调开始执行时间的最小值。  
>注： 技术上，poll 阶段控制 timers 何时执行。  


```js
const fs = require('fs');

function someAsyncOperation(callback) {
    // 假设读取文件要消耗95ms
    fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;
    
    console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95ms to complete
someAsyncOperation(() => {
    const startCallback = Date.now();
    
    // do something that will take 10ms...
    while (Date.now() - startCallback < 10) {
        // do nothing
    }
});
```
上面的 `timer` 将在105ms后执行。  

>Note: To prevent the poll phase from starving the event loop, libuv (the C library that implements the Node.js event loop and all of the asynchronous behaviors of the platform) also has a hard maximum (system dependent) before it stops polling for more events.  

# pending callbacks
处理系统相关的回调。  
This phase executes callbacks for some system operations such as types of TCP errors. For example if a TCP socket receives `ECONNREFUSED` when attempting to connect, some \*nix systems want to wait to report the error. This will be queued to execute in the **pending callbacks** phase.  

## poll
`poll` 阶段主要有两个函数：  
1. 计算阻塞和轮询I/O多久，然后
2. 执行 `poll` 队列中的事件。

当 `event loop` 进入了 `poll` 阶段，并且没有 `timers` 要处理，以下二者之一将会发生：  
* 如果 `poll queue` 不是空的， `event loop`将同步地执行回调队列，直到队列为空或者到达了限制。
* 如果队列是空的，以下二者之一将会发生：
  * 如果有 `setImmediate()`，事件循环结束 `poll pahse` 进入 `check phase`。
  * 如果没有 `setImmediate()`，`event loop` 将等待回调进入队列并立即执行。
  
一旦 `poll queue` 空了， `event loop` 将检查 `timers` 的执行时间是否到了。如果有一个或多个 `timers` 准备好了， `event loop` 就会滚到 `timers phase` 去执行 `timers` 的回调。


## check
当 `poll` 结束或空闲时立即执行 `setImmediate()` 的回调。  


## close callbacks
如果 `socket` 或 `handle` 突然关闭（例如`socket.destroy()`)， `close` 事件将会在这个阶段发出。  
否则， 它会通过 `process.nextTick()` 发出。  


# `setImmediate()` VS `setTimeout()`
如果不是在 I/O cycle 中调用，执行顺序不确定：  
```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```
```
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
```
如果在 I/O cycle 中调用，则 immediate 先调用：  
```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```
```
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

# process.nextTick()

