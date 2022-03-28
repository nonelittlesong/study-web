[socket.io](https://socket.io/) 底层是 [engine.io](https://github.com/socketio/engine.io)，这个库实现了跨平台的双向通信。

engine.io 使用了 Websocket 和 XMLHttpRequest（或JSONP） 封装了一套自己的 Socket 协议（暂时叫做 EIO Socket），在低版本浏览器使用长轮询替代 WebSocket。

# 前端

首先，EIO Socket 通过一个 XHR 握手。前端发送一个 XHR，告诉服务器我要开始长轮询了;后端返回数据中包括一个 open 标志（数字0表示），以及一个 sid 和 upgrades 字段。  
* sid - 是本次 EIO Socket 的 SESSION ID。
* upgrades - 正常情况下是 \['websocket']，表示可以将 长轮询 升级为 WebSocket。

经过测试，还有 pingInterval 和 pingTimeout 两个字段。  

**前端在发送第一个 XHR 的时候就开始了长轮询，这个时候如果有收发数据的需求，是通过长轮询实现的。**  

前端收到 upgrades 后，EIO 会检测浏览器是否支持 WebSocket，如果支持，就会启动一个 WebSocket 连接。然后通过这个 WebSocket 往服务器发送一条内容为 probe，
类型为 ping 的数据。如果服务器返回了内容为 probe，类型为 pong 的数据，前端就会把前面建立的长轮询停掉，后面只使用 WebSocket 通道进行收发数据。  

EIO Socket 生命周期内，会间隔一段时间 ping-pong 一次，来检测网络是否正常。  

WebSocket 帧：  
![ping-pong](https://github.com/nonelittlesong/study-resources/blob/master/images/WebSocket/socketio-workflow.jpg)  

绿色发送，白色接收。  
2是ping，3是pong。  
4是message。  

socket.io 在 engine.io 的基础上做了一些封装，比如:  
socket.io:  
```js
io.emit('add user', 'm');
```
engine.io:  
```js
eio.send('message', '2["add user", "m"]'); // 2 是 socket.io 定义的包类型
```

再例如，engine.io-client 需要在 open 之后才能 send，而 socket.io 就不需要， open 之前 emit 的数据会在 open 之后发出。  

另外， socket.io 还提供了 namespace，复用，自动重连等特性。  


# 服务端

服务端使用 ws 库实现 WebSocket 协议。  
socket.io 服务启动时，会先启动一个 ws 服务。socket.io 会监听 HTTP 服务器的 upgrade 和 request 事件:  
* upgrade 事件触发： 说明可能是 WebSocket 握手，先简单校验一下，然后把请求交给 ws 服务进行处理，拿到 WebSocket 对象。
* request 事件触发： 根据 url 路径判断是不是 socket.io 的 XHR 请求，拿到 res 和 req 对象。

