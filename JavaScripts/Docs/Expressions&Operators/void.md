# void 运算符

语法：

```
void expression
```

这个运算符能向期望一个表达式的值是 undefined 的地方插入会产生副作用的表达式。

## 立即调用的函数表达式

利用 void 让引擎把一个 function 关键字识别成函数表达式而不是函数声明：

```js
void function iife() {
  var bar = function () {};
  var baz = function () {};
  var foo = function () {
    bar();
    baz();
   };
  var biz = function () {};

  foo();
  biz();
}();
```

## JavaScript URIs

当用户点击一个以 `javascript:` 开头的 URI 时，它会执行 URI 中的代码，然后用返回的值替换页面内容，除非返回的值是 undefined。void 运算符可用于返回 undefined 。例如：

```html
<a href="javascript:void(0);">
  这个链接点击之后不会做任何事情，如果去掉 void()，
  点击之后整个页面会被替换成一个字符 0。
</a>
<p> chrome中即使 <a href="javascript:0;"> 也没变化，firefox 中会变成一个字符串 0 </p>
<a href="javascript:void(document.body.style.backgroundColor='green');">
  点击这个链接会让页面背景变成绿色。
</a>
```

>注意:
>虽然这么做是可行的，但利用 `javascript:` 伪协议来执行 JavaScript 代码是不推荐的，推荐的做法是为链接元素绑定事件。

## 在箭头函数中避免泄露

箭头函数标准中，允许在函数体不使用括号来直接返回值。 如果右侧调用了一个原本没有返回值的函数，其返回值改变后，则会导致非预期的副作用。 安全起见，当函数返回值是一个不会被使用到的时候，应该使用 void 运算符，来确保返回 undefined（如下方示例），这样，当 API 改变时，并不会影响箭头函数的行为。

```js
button.onclick = () => void doSomething();
```

确保了当 doSomething 的返回值从 undefined 变为 true 的时候，不会改变函数的行为。
