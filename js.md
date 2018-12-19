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

# [Canvas](https://blog.csdn.net/h15882065951/article/details/70232080)
#### 基本用法
开始标签和结束标签之间是后备信息，当用户的浏览器不支持时显示。  
1. 想要在canvas区域画图，第一步是获取绘图上下文。  
   ```js
   var canvas = document.getElementById("canvas");
   if (canvas.getContext) {
       var context = canvas.getContext('2d'); // 2d用单引号
   }
   ```
2. 导入图片canvas.toDataURL("image/png");
   ```js
   // 获取图像的URL
   var imgURL = canvas.toDataURL("image/png"); // 默认图片格式为png，可以自定义
   // 显示图片
   var image = document.createElement("img"); // 添加一个img元素
   image.src = imgURL;
   document.body.appendChild(image); // 将图片元素添加到页面中
   ```
   
#### 2D上下文
2D上下文的坐标原点在canvas左上角。x往右越大，y往下越大。  
绘制2D图像三步走：  
1. 获取上下文对象 getContext('2d');
2. 指定填充（fillStyle）或描边（strokeStyle）颜色。描边还能设置线条交叉和末端的形式;  
3. 绘制图形

#### context属性
设置填充和描边的颜色：  
```js
context.fillStyle = "red";
context.strokeStyle = "blue";
```
* context.lineWidth
* context.lineWCap
* context.lineJoin

#### 绘制矩形
与绘制矩形相关的方法有三个：fillRect(), strokeRect(), clearRect()。  
他们接受四个参数： x坐标，y坐标，宽度，高度。  
