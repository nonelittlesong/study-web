# [js中(function(){...})()立即执行函数写法理解](https://www.cnblogs.com/chris-oil/p/4862083.html)
要理解立即函数，先要理解一些基本概念。  
#### 函数声明，函数表达式，匿名函数
* 函数声明： function fnName(){...};使用function关键字声明一个函数，并给函数命名。  
* 函数表达式： var fnName = function(){...};使用function关键子声明，但未给函数命名，最后将匿名函数赋予一个变量。  
* 匿名函数： function(){...};使用function关键字声明一个函数，但未给函数声明，叫作匿名函数。匿名函数属于函数表达式。匿名函数有很多作用，赋予一个变量则创建函数，赋予一个事件则成为事件处理程序或创建闭包等。  

#### 函数声明与函数表达式的不同之处
1. Javascript引擎在解析时会“函数声明提升”（Function declaration Hoisting）当前执行环境上的函数声明，而函数表达式必须等到解析器执行到它所在的行时，才会自上而下一行一行地解析函数表达式。  
2. 函数表达式可以在后面加括号立即调用该函数。  

```js
fnName(); // OK，因为提升了函数声明
function fnName() {
    ...
}

fnName2(); // 错误
var fnName2 = function() {
    ...
}

var fnName3 = function() {
    alert("hello world");
}(); // 会立即调用函数

function fnName4() {
    alert("hello world");
}() // 不会报错，但解析器会忽略后面的括号

function() {
    console.log("hello world");
}(); // 语法错误，没有进行赋值操作
```

(function(){...})()和(function(){...}())  
```js
(function(a){
    console.log(a);   //firebug输出123,使用（）运算符
})(123);
 
(function(a){
    console.log(a);   //firebug输出1234，使用（）运算符
}(1234));
 
!function(a){
    console.log(a);   //firebug输出12345,使用！运算符
}(12345);
 
+function(a){
    console.log(a);   //firebug输出123456,使用+运算符
}(123456);
 
-function(a){
    console.log(a);   //firebug输出1234567,使用-运算符
}(1234567);
 
var fn=function(a){
    console.log(a);   //firebug输出12345678，使用=运算符
}(12345678)
```
可以看到输出结果，在function前面加!,+,-,=甚至是逗号都能得到函数立即执行的结果。这是因为他们将函数声明转换为函数表达式，消除了歧义。  
加()是最安全的做法。  
作用：  
javascript中没有私有作用域的概念，使用这种技术可以模拟一个私有作用域。  
JQuery使用的就是这种技术，将JQuery代码包裹在(function(window,undefined){...jquery代码...}(window)中，可以达到保护JQuery内部变量的作用。  

