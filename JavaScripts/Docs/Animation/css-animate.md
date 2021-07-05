# CSS 动画

参考：

- [CSS Transitions | w3.org](https://www.w3.org/TR/css-transitions-1/#transitions)
- [CSS 动画 | javascript.info](https://zh.javascript.info/css-animations)

## 1. 过渡 transition

我们只需要定义某一个属性以及如何动态地表现其变化。当属性变化时，浏览器将会绘制出相应的过渡动画。

CSS 提供了四个属性来描述一个过渡：

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`  
  将延迟设置为负数，可使动画从中间开始

我们可以在 `transition` 中以 `property duration timing-function delay` 的顺序一次性定义它们，并且可以同时为多个属性设置过渡动画。

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

只要一个元素拥有名为 .animated 的类，那么任何背景颜色的变化都会被渲染为 3 秒钟的动画。

### 1.1. transition-timing-function

接受两种值：

- 贝塞尔曲线
- 阶越函数

#### 1.1.1. 贝塞尔曲线

设置四个控制点：

- 第一个点为 `(0, 0)`。
- 最后一个点为 `(1, 1)`。
- 对于中间值，x 必须位于 0..1 之间，y 可以是任意值。

语法： `cubic-bezier(x2, y2, x3, y3)`

- x 轴表示时间，0 — 开始时刻，1 — 结束时刻。
- y 轴表示过程的完成度，0 — 属性的起始值，1 — 属性的最终值。

CSS 提供了几条内置的曲线：

- `linear` — 直线，即 `cubic-bezier(0, 0, 1, 1)`
- `ease` — `(0.25, 0.1, 0.25, 1.0)`
- `ease-in` — `(0.42, 0, 1.0, 1.0)`
- `ease-out` — `(0, 0, 0.58, 1.0)`
- `ease-in-out` — `(0.42, 0, 0.58, 1.0)`

>注意：  
>贝塞尔曲线可以使动画『超出』其原本的范围。

