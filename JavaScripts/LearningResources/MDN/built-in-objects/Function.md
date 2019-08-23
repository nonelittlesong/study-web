# Function.prototype.bind()
新函数内的 `this` 被 `bind` 的第一个参数指定：  
```js
let module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

let unboundGetX = module.getX;
console.log(unboundGetX()); // undefined

let boundGetX = unboundGetX.bind(module);
console.log(boundGetX());   // 42
```

## 1、语法
```
function.bind(thisArg[, arg1[, arg2[, ...]]])
```
- thisArg >> 作为 `this`参数传递给目标函数。如果使用 `new` 运算符构造绑定函数，则忽略该值。当使用bind在setTimeout中创建一个函数（作为回调提供）时，作为thisArg传递的任何原始值都将转换为object。如果bind函数的参数列表为空，执行作用域的this将被视为新函数的thisArg。  
- arg1, arg2, ... >> 预先添加到绑定函数的参数列表的参数。

返回值：  
返回一个原函数的拷贝，并拥有指定的 `this` 和 初始参数。  

## 2、示例
### \# setTimeout
```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```
