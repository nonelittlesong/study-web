参考：  
* [MDN Canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

# 一、 \<canvas> 元素
```htm
<canvas id="tutorial" width="300" height="150"></canvas>
```
`canvas` 只有两个属性 `width` 和 `height`。默认 300 x 150。  

>注： 如果你绘制的图形是扭曲的，尝试用 width 和 height 属性，而不是使用 css。  



## 1、 toDataURL
导出 canvas 的图像：  
```js
var drawing = document.getElementById("drawing");

if (drawing.getContext) {
  var imgURI = drawing.toDataURL("image/png");
  
  var image = document.createElement("img");
  image.src = imgURI;
  document.body.appendChild(image);
}
```

# 二、 context
## scale
对之后绘制的图形的定位和宽高进行缩放。  
不会修改之前的图形。  
修改 canvas 的宽高会重置 context。  

## 1、 fill 和 stroke
```js
ctx.fillStyle = "red";
ctx.strokeStyle = "#00FF00";
```

## 2、 矩形
1. fillRect()
2. strokeRect()
3. clearRect()


## 3、 路径
* arc(x, y, radius, startAngle, endAngle, counterclockwise)
* arcTo(x1, y1, x2, y2, radius)
* bezierCurveTo(c1x, c1y, c2x, c2y, x, y) - 从上一点开始绘制一条曲线，到(x, y)为止，并且以(c1x, c1y)和(c2x, c2y)为控制点。
* lineTo(x, y) - 从上一点开始绘制一条直线，到(x, y)为止。
* moveTo(x, y) - 将绘图游标移动到(x, y)，不画线。
* quadraticCurveTo(cx, cy, x, y) - 从上一点开始绘制一条二次曲线，到(x, y)为止，并且以(cx, cy)为控制点。
* rect(x, y, width, height) - 从点(x, y)开始绘制一个矩形。这个方法绘制的是矩形路径，不是`strokeRect()`和`fillRect()`所绘制的独立的形状。

绘制完路径后：  
* closePath() - 如果想绘制一条连接到起点的线条。
* fill() - 使用 `fillStyle` 填充。
* stroke() - 使用 `strokeStyle` 描边。
* clip() - 在路径上创建一个剪切区域。

