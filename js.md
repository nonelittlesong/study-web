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
   
#### context
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
描边属性：  
* context.lineWidth
* context.lineWCap
* context.lineJoin

#### context方法之绘制矩形
与绘制矩形相关的方法有三个：fillRect(), strokeRect(), clearRect()。  
他们接受四个参数： x坐标，y坐标，宽度，高度。  
```
<body>

<canvas id="canvas" width="400" height="300">抱歉，您的浏览器不支持canvas元素</canvas>
  
<script>
    var canvas = document.getElementById("canvas");
    //检测浏览器是否支持canvas 该方法是否存在 取得上下文对象
    if (canvas.getContext) {
        var context = canvas.getContext("2d"); //2d用单引用括起来
        //描边矩形
        context.strokeStyoe = "yellow"; // 描边颜色为蓝色
        context.lineWidth = 4; //指定描边线的宽度
        context.strokeRect(50, 50, 120, 120);	//用指定的颜色描边矩形
        //填充矩形
	    context.fillStyle = "red";
	    context.fillRect(150, 150, 120, 120);
        //消除指定大小的区域
	    context.clearRect(110, 110, 30, 30);
    }
</script>

</body>
```

#### context方法之绘制路径
* beginPath() 开始绘制新路径
* closePath() 关闭绘制路径

```js
var canvas = document.getElementById("canvas");
if (canvas.getContext) {
    var context = canvas.getContext("2d"); // context类似与java中的Paint
    //========================圆=========================
    context.beginPath();
    /**
     * 圆心坐标（50,50）， 半径40
     * 起始角度0, 结束角度2*Math.PI
     * false:顺时针
     */
    context.arc(50, 50, 40, 0, 2*Math.PI, false);
    context.closePath();
    context.fillStyle = "red";
    context.fill(); // 以填充的方式绘制圆
    
    //========================弧============================
    context.beginPath();
    context.moveTo(20,20);
    context.lineTo(100,20);
    /**
     * 此弧与”过当前点和第一个点（150,20）的直线“相切
     * 此弧与”过第一个点（150,20)和第二个点（150,70）的直线“相切
     * 半径为50
     */
    context.arcTo(150,20,150,70,50);
    context.lineTo(150,120);
    context.closePath();
    context.strokeStyle="red";
    context.stroke();
    
    //=======================矩形==========================
    context.beginPath();
	context.rect(20, 20, 200, 200);
	context.closePath();
	context.strokeStyle = "red";
	context.stroke();
}
```

#### cn
