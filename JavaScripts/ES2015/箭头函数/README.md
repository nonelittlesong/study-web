
参考：  
- [ES6 箭头函数里的 this](https://www.jianshu.com/p/c1ee12a328d2)  
- [回调函数 - CSDN](https://blog.csdn.net/qq_33745501/article/details/80223841)  

## 了解前须知

1. `箭头函数` 的优点：  
   * 解决匿名函数 this 指向问题。匿名函数的执行环境具有全局性。（回调函数并非匿名函数）  
   * `setTimeout` 等全局函数中使用 this 的问题。  
2. 常见 window 属性和方法：  
   `alert`、`document`、`parseInt`、`setTimeout`、`setInterval`、`location`。  
3. 在非严格模式下，没有直接的挂载者（或称调用者）的函数中 this 是指向 window，这是约定俗成的。  
   在“use strict”严格模式下，没有直接的挂载者的话，this 默认为 undefined。  
   以下都是在非严格模式下讨论。  

## 普通函数的 this
this 对象是在运行时基于函数的执行环境绑定的。  
在全局函数中，this 指向的 是window。  
当函数被作为某个对象的方法调用时，this 就等于那个对象。  

普通函数作回调函数的例子：  
```js
$('#content').click(function() {
  var _this = this;
  $('.li').each(function() {
    _this;  // content 的 this
    this;   // 每个 li 的 this
  });
});
```

普通匿名函数的例子：  
```js
var name = 'the window';
var object = {
  name: 'my object',
  getNameFun: function() {
    return function() {
      return this.name;
    }
  }
};
console.log(object.getNameFun()()); // the window
console.log(object.getNameFun().call(object)); // my object

var object2 = {
  name: 'my object2',
  getNameFun: function() {
    var that = this;
    return function() {
      return that.name;
    }
  }
};
console.log(object2.getNameFun()()); // my object2
```

普通函数中访问全局变量的例子：  
```js
window.val = 1;
var obj = {
  val: 2,
  dbl: function () {
    this.val *= 2;
    val *= 2;
    console.log(val);
    console.log(this.val);
  }
};
// 说出下面的结果
obj.dbl();
var func = obj.dbl;
func();
// 2 4 8 8
```

## 箭头函数的 this
