# 一、 模块封装器
在执行代码前， Node.js 会使用一个如下的函数封装器将其封装：  
```js
(function(exports, require, module, __filename, __dirname) {
// 模块的代码实际上在这里
});
```
* 它保持了顶层的变量（用var、const或let定义）作用在模块范围内，而不是全局对象。
* 它有助于提供一些看似全局的但实际上是模块特定的变量，例如：  
  * 实现者可以用于从模块中导出值的 module 和 exports 对象。
  * 包含模块绝对文件名和目录路径的快捷变量 __filename 和 __dirname。
  
# 二、 module.exports
例子：  
```js
// a.js
const EventEmitter = require('events');

module.exports = new EventEmitter();

// 处理一些工作，并在一段时间后从模块自身触发 'ready' 事件。
setTimeout(() => {
  module.exports.emit('ready');
}, 1000);

// index.js
const a = require('./a');
a.on('ready', () => {
  console.log('模块 a 已准备好');
});
```

## 1、 对 `module.exports` 的赋值必须立即完成
x.js:  
```
setTimeout(() => {
  module.exports = { a: 'hello' };
}, 0);
```
y.js:  
```
const x = require('./x');
console.log(x.a);
```

## 2、 快捷方式
`module.exports.f = ...` 可以简写成 `exports.f = ...`。  

`require()`的假设实现：  
```js
function require(/* ... */) {
  const module = { exports: {} };
  ((module, exports) => {
    // 模块代码在这。在这个例子中，定义了一个函数。
    function someFunc() {}
    exports = someFunc;
    // 此时，exports 不再是一个 module.exports 的快捷方式，
    // 且这个模块依然导出一个空的默认对象。
    module.exports = someFunc;
    // 此时，该模块导出 someFunc，而不是默认对象。
  })(module, module.exports);
  return module.exports;
}
```
