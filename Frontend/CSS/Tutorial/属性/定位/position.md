# [Position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

`position` 属性决定元素定位的方式，`top`、`right`、`bottom` 和 `left` 决定元素最终的位置。

Demos：

```css
position: static;

/* 相对定位 */
/* 相对定位在文档中的位置是偏移给定的值，但是不影响其他元素的偏移。*/
/* 可用于实现窗口抖动时，不改变周围元素的位置*/
position: relative;
top: 40px;
left: 40px;

/* 绝对定位 */
/* 对于最近的非 static 祖先元素定位 */
position: absolute;
top: 40px; left: 40px;

/* 固定定位 */
position: fixed;

/* 粘性定位 */
position: -webkit-sticky;
position: sticky;
top: 20px;
```

