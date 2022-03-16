
参考：

- [Animating SVGs With Pure HTML and CSS | medium](https://medium.com/swlh/animating-svgs-with-pure-html-and-css-e69eab12a5e)
- [SVG | MDN](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [A Guide to SVG Animations (SMIL) | CSS-TRICKS](https://css-tricks.com/guide-svg-animations-smil/)
- [A how-to guide to SVG animation | tiny](https://www.tiny.cloud/blog/guide-svg-animation/)
- [Animating SVG with CSS](https://css-tricks.com/animating-svg-css/)

## 1. HTML 中的 svg 元素

### 1.1. 属性

[更多属性参考 MDN 官网。。。](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)

- `width` & `height` 控制元素的宽和高

### 1.2. defs

定义可重复使用的图形元素。



# 一、 `<path>`
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
