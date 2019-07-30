# 一、 重设宽高
画布改变大小会被重绘的解决方案：  
```htm
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Canvas Demensions Reset</title>
</head>
<style type="text/css">
canvas {
  background: lawngreen;
}
</style>
<body>
<canvas id="canvas" width=300 height=300></canvas>
<button id="add">add</button>
<button id="sub">sub</button>
</body>
<script type="text/javascript">
var content = document.getElementById("canvas").getContext("2d");
content.fillRect(50, 50, 100, 100);
content.fillStyle="black";

document.getElementById("add").onclick = function() {
  var width = canvas.getAttribute("width");
  var height = canvas.getAttribute("height");
  
  var data = content.getImageData(0, 0, width, height);
  
  width = parseInt(width) + 10;
  height = parseInt(height) + 10;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  
  content.putImageData(data, 0, 0);
}
```
