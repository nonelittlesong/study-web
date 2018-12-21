contents：  
* [function立即执行](#js中(function(\){...})()立即执行函数写法理解)

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

# [Canvas与Context](https://blog.csdn.net/h15882065951/article/details/70232080)
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

#### context方法之绘制文本
绘制文本的方法有两个： fillText()和strokeText()。  
这两个方法接收四个v参数： 绘制文本的内容， x坐标， y坐标， 最大像素宽度。  
两个方法均以以下3个属性为基础：  
* context.font 字体样式，大小
* context.textAlign 对齐方式（start， center， end）
* context.textBaseline 文本基线

```js
var context = canvas.getContext("2d");
context.fillStyle = "red";
context.font = "bold 26px";
context.textAlign = "start";
context.textBaseline = "top";
context.fillText("hello world", 100, 100, 200);
```

#### context方法之变换
* rotate(angle) 旋转图像angle角度
* scale(scaleX, scaleY) 缩放图像
* translate(x, y) 平移
* transform(a, b, c, d, e, f)
* setTransform(a, b, c, d, e, f)
* skew(x ,y) 将画布拉伸

#### context之save()和restore()方法
可以使用save()方法，保存先前设置的上下文的属性和状态。  
该方法将先前设置的属性和状态推入一个堆栈结构，等到你想用保存的属性和状态，就使用restore()方法。  
如果连续使用save()方法，可以将多个属性和状态的组合保存到栈结构中，此时再使用restore()方法一级一级向上返回。  
save()方法只能保存设置的属性和变换，不能保存绘制上下文的内容。  

#### 阴影
根据以下属性，可以为图形和路径添加阴影：  
1. context.shadowColor: 为阴影添加颜色;
2. context.shadowOffsetX: 为阴影添加X轴方向的偏移量;
3. context.shadowOffsetY: 为阴影添加Y轴方向的偏移量;
4. context.shadowBlur: 为阴影添加模糊程度。
```js
// 设置阴影属性
context.shadowOffsetX = 10;
context.shadowOffsetY = 20;
context.shadowBlur = 2;
context.shadowColor = "blue";
// 绘制矩形
context.fillStyle = "red";
context.fillRect(10,10,109,109);
```

#### 线性渐变
1. createLinearGradient()创建一个线性渐变对象。接受四个参数： 渐变起始位的x，y坐标， 渐变结束位的x，y坐标。  
2. addColorStop()指定色标（渐变颜色）。它接收两个参数： 色标位置(0或1）和css颜色值。  
3. 将fillStyle或strokeStyle设置为这个对象。  
```js
var gradient = context.createLinearGradient(30, 30, 200, 200);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
context.fillStyle = gradient;
context.fillRect(30, 30, 200, 200);
```

#### 径向渐变
createRadialGradient()创建径向渐变对象，它接收6个参数：起始圆的圆心xy坐标和半径r;结束圆的圆心xy坐标和半径R。  

# [Window对象](http://www.w3school.com.cn/jsref/dom_obj_window.asp)
Window对象表示浏览器中打开的窗口。  
如果文档包含框架（frame或iframe标签），浏览器会为HTML文档创建一个window对象，并为每个框架创建一个额外的window对象。  
#### Window对象集合

| 集合 | 描述 |
| ------ | ------ |
| frames\[] | 返回窗口中所有命名的框架。<br>该集合是Window对象数组，每个Window对象在窗口中含有一个框架或<iframe>。属性frames.length存放在数组frames[]中含有的元素的个数。注意，frames[]数组中引用的框架可能还包含框架，他们自己也有frames[]数组。 |

#### Window对象属性
| 属性 | 描述 |
| ---- | ---- |
| innerHeight | 返回窗口的文档显示区的高度 |
| innerWidth | 返回窗口的文档显示区的宽度 |

# [addEventListener()](http://www.runoob.com/jsref/met-element-addeventlistener.html)
element.addEventListener(event, function, useCapture)  

| 参数 | 描述 |
| --- | --- |
| event | 字符串，指定事件名 |
| function | 指定事件触发时执行的函数 |
| useCapture | 可选。布尔值，指定事件是在捕获或冒泡阶段执行 |

#### 事件集合
1. 鼠标事件：
   * click 单击
   * dbclick 双击
   * mousedown 鼠标按下
   * mouseout 鼠标移走
   * mouseover 鼠标移入
   * mouseup 鼠标弹起
   * mousemove 鼠标移动
2. 键盘事件：
   * keydown 键按下
   * keypress 键按下并松开
   * keyup 键弹起
3. HTML事件：
   * load 加载页面
   * unload 卸载离开页面
   * change 改变内容
   * scroll 滚动
   * focus 获得焦点
   * blur 失去焦点

#### 鼠标/键盘属性
| 属性 | 描述 |
| --- | --- |
| altKey | 返回事件触发时，ATL键是否被按下 |
| button | 事件触发时，哪个鼠标按钮被点击 |
| clientX | 鼠标指针的水平坐标 |
| clientY | 鼠标指针的垂直坐标 |
| ctrlKey | 事件触发时，ctrl键是否被按下 |
| metaKey | 事件触发时，meta键是否被按下 |
| relatedTarget | 返回与事件的目标节点相关的节点 |
| screenX | |
| screenY | |
|shiftKey | shift键是否被按下 |

# [Prototype](https://www.cnblogs.com/dengpeng1004/p/5317245.html)
作用： 为一个特定的类声明通用的变量和函数。  

**私有变量和私有函数**  
```js
function Obj() {
  var a = 0; // 私有变量
  var fn = function() { // 私有函数
    ...
  }
}

var o = new Obj();
console.log(o.a); // undefined
console.log(o.fn); // undefined
```
在函数对象Obj外部无法访问私有变量和私有函数。  

**静态变量和静态函数**  
```js
function Obj() {
 ...
}
Obj.a = 0;
Obj.fn = function() {
  ...
}

console.log(Obj.a); // 0
console.log(typeof Obj.fn); // function
var o = new Obj();
console.log(o.a); // undefined
console.log(typeof o.fn); // undefined
```
可以通过函数名访问，但无法通过实例访问。  

**实例变量和实例函数**  
```js
function Obj() {
  this.a = []; // 实例变量
  this.fn = function() { // 实例函数
    ...
  }
}

console.log(typeof Obj.a); // undefined
console.log(typeof Obj.fn); // undefined
var o = new Obj();
console.log(typeof o.a); // object
console.log(typeof o.fn); // function
```
可以通过实例访问，无法通过函数名访问。  

#### protptype
为了解决每个实例对象都会复制相同的实例方法。  
默认情况下prototype属性会默认获得一个constructor属性，这个属性是一个指向prototype所在函数的指针。  
