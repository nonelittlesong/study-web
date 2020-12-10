`readline` 模块 提供接口（如 process.stdin ）从可读流一次一行地读取数据。  

使用方法：  
```js
const readline = require('readline');
```

例子：  
```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
});
```


# Class:Interface

Interface 的实例通过 `readline.createInterface()` 方法创建。  
每个实例与一个可读的输入流和一个可读的输出流相关。  


## Event:'close'
一下情况触发 `close` 事件：  
* 调用 `rl.close()` 并且 `readline.Interface` 放弃对 输入输出流的控制。
* input 流接收到 `'end'` 事件。
* input 流接收到 `<ctrl>-D` 表示 end-of-transmission(EOT)。
* input 流接收到 `<ctrl>-C` 表示 SIGINT 并且 readline.Interface实例没有注册 `'SIGINT'` 事件。


## Event:'line'  
```js
rl.on('line', (input) => {
  console.log(`Received: ${input}`);
});
```

## Event:'pause'
触发条件：  
* input 流暂停。
* input 流没暂停，并接收到 'SIGCONT' 事件。

```js
rl.on('pause', () => {
  console.log('Readline paused.');
});
```

## Event:'resume'
```js
rl.on('resume', () => {
  console.log('Readline resumed.');
});
```

## Event:'SIGCONT'
触发条件：  
`fg`。  
如果 input 流在 `SIGTSTP` 请求前暂停，不会触发。  
```js
rl.on('SIGCONT', () => {
  // prompt 会自动恢复流
  rl.prompt();
});
```


## Event: 'SIGINT'
触发条件：  
`<ctrl>-C`。  
如果没有注册 `'SIGINT'` 事件，会暂停 input 流。  
```js
rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});
```

## Event: 'SIGTSTP'
`<ctrl>-Z`。如果没有注册 `'SIGTSTP'` 事件，程序进入后台。  

当用 `fg`，会触发 `'pause'` 和 `'SIGCONT'` 事件。  

```js
rl.on('SIGTSTP', () => {
  // This will override SIGTSTP and prevent the program from going to the background
  console.log('Caught SIGTSTP.');
});
```

## rl.close()
调用时，会触发 `'close'` 事件。  

不会立刻终止其它由 readline.Interface 发出的事件。  

## rl.pause()
调用 `rl.pause()` 不会立刻暂停其他由 readline.Interface 发出的事件。  

## rl.prompt(\[preserveCursor])
* preserveCursor \<boolean> - if true, 阻止 cursor 重设为0。  

`rl.prompt()` 会恢复暂停的 input 流。  

如果 `output` 为 `null` 或 `undefined`，那么 prompt 不可写。  


## rl.question(query, callback)
* query \<string> - 
* callback \<Function> - 

## rl.resume()
恢复 input 流。  

## rl.setPrompt(prompt)
* prompt \<string>

设置调用 `rl.prompt` 时，写入 `output` 的 prompt。  


## rl.write(data[, key])
* data <string>
* key <Object>
  * ctrl <boolean>
  * meta <boolean>
  * shift <boolean>
  * name <string>

