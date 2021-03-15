# study-websocket

参考：

- [C++ WebSocket 库 | 简书](https://www.jianshu.com/p/64e36cd3ed1a)  
- [C++ 使用 websocket 协议 | 简书](https://www.jianshu.com/p/37c0ec230218)  
- [WebSocket | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) - 是基于 TCP 协议的全双工协议，在建立连接时要借助 HTTP 协议。

## websocket 实现

- C  
  - [uWebSockets github](https://github.com/uNetworking/uWebSockets)  
- JS  
  - [uWebsockets nodejs](https://github.com/uNetworking/uWebSockets.js)  
  - [Socket.IO](https://socket.io/) - 是一个封装了 WebSocket、基于 Node 的 JavaScript 框架，包括 client 的 JavaScript 和 server 的 Node。
  - [SockJS | npm](https://www.npmjs.com/package/sockjs)
  - [ws | npm](https://www.npmjs.com/package/ws)
  
## websocket 协议数据格式

```
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```

- `FIN` - 标识是否为此消息的最后一个数据包，占 1 bit。  
- `RSV1` `RSV2` `RSV3` - 用于扩展协议，一般为0，各占 1 bit。  
- `opcode` - 数据包类型（frame type），占 4 bits：  
  - `0x0` - 标识一个中间数据包；  
  - `0x1` - 标识一个 text 类型数据包；  
  - `0x2` - 标识一个 binary 类型数据包；  
  - `0x3-7` - 保留；  
  - `0x8` - 标识一个断开连接类型数据包；  
  - `0x9` - 标识一个 ping 类型数据包；  
  - `0xA` - 标识一个 pong 类型数据包；  
  - `0xB-F` - 保留。  
- `MASK` - 占 1 bit。用于标识 `Payload Data` 是否经过掩码处理：  
  如果是 1，`Masking-key` 域的数据即是掩码密钥，用于解码 `Payload Data`。客户端发出的数据帧需要进行掩码处理，所以此位是 1。  
- `Payload length` - `Payload Data` 的长度，占 7 或 7+16 或 7+64 bits。  
  - 如果其值在 0-125，则是 `Payload Data` 的真实长度；  
  - 如果其值是 126，则后面 2 个字节形成的 16 bits 无符号整数的值是 `Payload Data` 的真实长度；  
  - 如果其值是 127，则后面 8 个字节形成的 64 bits 无符号整数的值是 `Payload Data` 的真实长度。  
