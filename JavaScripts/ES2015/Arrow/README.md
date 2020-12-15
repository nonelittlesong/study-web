# 箭头函数

<details>
<summary>References</summary>

- [Arrow function | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Arrow function | sitepoint](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/#:~:text=Arrow%20functions%20are%20anonymous%20and%20change%20the%20way,or%20Python.%20%28See%20also%20lambdas%20in%20JavaScript%20%29.)
- [ES6 箭头函数里的 this](https://www.jianshu.com/p/c1ee12a328d2)
- [回调函数 - CSDN](https://blog.csdn.net/qq_33745501/article/details/80223841)
- [箭头函数 | 廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1031549578462080)
- [箭头函数不适用场景 | 菜鸟学院](http://www.cainiaoxueyuan.com/gcs/7875.html)

</details>

## 1. 什么时候使用箭头函数

<details>
<summary>References</summary>

- [When should I use Arrow functions in ECMAScript 6? | stackoverflow](https://stackoverflow.com/questions/22939130/when-should-i-use-arrow-functions-in-ecmascript-6)

</details>

- `function` — 在「全局作用域」和 `Object.prototype` 属性中使用 `function`。
- `class` — 创建构造函数使用 `class`。
- `=>` — 其他地方使用 `=>`。

## 2. 回调

作为回调函数时，箭头函数和普通匿名函数的区别

```html
<button id="btn" name="btn-name">
```

```js
'use strict';

window.name = 'global-name';

const objBind = {
  name: 'bind-name',
  func: function (callback) {
    callback.bind(this)();
  }
}

const objNotBind = {
    name: 'notbind-name',
    func: function (callback) {
        callback();
    }
}

objBind.func(() => {
  console.log('bind arrow', this.name);    // global-name
});

objBind.func(function () {
  console.log('bind plain', this.name);    // bind-name
});

objNotBind.func(() => {
  console.log('notbind arrow', this.name); // global-name
});

objNotBind.func(function () {
  console.log('notbind plain', this.name); // undefined，非严格模式下为 global-name
});

const $btn = document.querySelector('#btn');

$btn.addEventListener('click', () => {
    console.log('$btn arrow', this.name);  // global-name
}, false);

$btn.addEventListener('click', function () {
    console.log('$btn plain', this.name);  // btn-name
}, false);
```

## 1. 关键点
1. :warning: 回调函数不是匿名函数！
2. `箭头函数` 的优点：  
   * 解决匿名函数 this 指向问题。匿名函数的执行环境具有全局性（回调函数并非匿名函数）。  
   * `setTimeout` 等全局函数中使用 this 的问题。  
3. 常见 window 属性和方法：  
   `alert`、`document`、`parseInt`、`setTimeout`、`setInterval`、`location`。  
4. 在非严格模式下，没有直接的挂载者（或称调用者）的函数中 this 是指向 window，这是约定俗成的。  
   在 `use strict` 严格模式下，没有直接的挂载者的话，this 默认为 undefined。  
   以下都是在非严格模式下讨论。  

## 2. 普通函数的 this

this 对象是在「运行时」基于函数的执行环境绑定的。  
在全局函数中，this 指向的 是 window。  
当函数被作为某个对象的方法调用时，this 就等于那个对象。  

### 2.1. 普通回调函数

```js
$('#content').click(function() {
  var _this = this;
  $('.li').each(function() {
    _this;  // content 的 this
    this;   // 每个 li 的 this
  });
});
```

### 2.2. 普通匿名函数

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

普通函数中访问全局变量：

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

obj.dbl(); // 2 4
var func = obj.dbl;
func();    // 8 8
```

## 3. 箭头函数的 this

箭头函数的 this 在定义函数时绑定。

### 3.1. `setTimeout` 回调箭头函数

```js
var obj = {
  func: function() {
    console.log(this);
  },
  say: function() {
    setTimeout(() => {
      console.log(this);
    });
  }
}

obj.func();          // obj
obj.say();           // obj
var obj2 = 'obj2';
obj.say.call(obj2);  // obj2
```

### 3.2. 匿名箭头函数

```js
var a = 11;
function test2() {
  this.a = 22;
  return () => {
    console.log(this.a);
  };
}
var x = new test2()(); // 22
```