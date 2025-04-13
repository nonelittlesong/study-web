# 多页面通信

## 1. `postMessage` —— 跨窗口/跨域通信

适用于：

1. 两个窗口或 iframe，不管是否同源。
2. 页面通过 `window.open` 打开的新窗口或 iframe。

发送方：

```js
otherWindow.postMessage('Hello from page A', 'https://example.com');
```

接收方：

```js
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://example.com') return; // 安全检查
  console.log('收到消息:', event.data);
});
```

## 2. BroadcastChannel —— 同源页面广播通信

同源的多个页面（可以是不同的 tab 或 iframe）。

所有页面

```js
const channel = new BroadcastChannel('my_channel');

// 发送消息
channel.postMessage('Hello all tabs');

// 接收消息
channel.onmessage = (e) => {
  console.log('收到消息:', e.data);
};
```

## 3. SharedWorker —— 共享的 worker 通道

适用于：

1. 同源页面。
2. 更高级的通信方式，允许多个页面共享一个后台线程。

shared-worker.js
```js
onconnect = function (e) {
  const port = e.ports[0];
  port.onmessage = (event) => {
    port.postMessage('Hi from worker');
  };
};
```

页面中：
```js
const worker = new SharedWorker('shared-worker.js');
worker.port.onmessage = (e) => {
  console.log(e.data);
};
worker.port.postMessage('Hello');
```

## 4. localStorage + storage 事件

适用于：

1. 同源页面。
2. 可以在不同 tab 之间通信。

页面 A：
```js
localStorage.setItem('msg', 'Hello');
```

页面 B：
```js
window.addEventListener('storage', (e) => {
  if (e.key === 'msg') {
    console.log('收到消息:', e.newValue);
  }
});
```

注意：`storage` 事件只会在 其他页面 被触发，不能在当前页面触发。


## 5. 父子页面直接访问（同源）

如果两个页面是父子窗口且同源，可以直接访问：

```js
// 父页面调用 iframe 中函数
document.getElementById('myIframe').contentWindow.myFunction();

// 子页面调用父页面函数
window.parent.myFunction();
```
