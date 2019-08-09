# 一、 \<path>
## 1、 d
* M = moveto
* L = lineto
* H = horizontal lineto
* V = vertical lineto
* C = curveto
* S = smooth curveto
* Q = quadratic Bezier curveto
* T = smooth quadratic Bezier curveto
* A = elliptical Arc
* Z = closepath

**注意:**  
* 以上命令都允许小写字母：  
  * 大写表示绝对定位。
  * 小写表示相对于最后一个点的定位。
* L/l 可以省略。

## 例子
多边形：  
```htm
<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <symbol id="shape_polygon">
      <title>Polygon region shape</title>
      <path d="M 15.25,2.2372 3.625,11.6122 6,29.9872 l 20.75,-9.625 2.375,-14.75 z" stroke-width="2"/>
    </symbol>
  </defs>
</svg>

<svg height="32" viewbox="0 0 32 32"><use xlink:href="#shape_polygon"></use></svg>
```
