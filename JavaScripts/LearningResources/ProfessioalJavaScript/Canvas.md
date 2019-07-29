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

