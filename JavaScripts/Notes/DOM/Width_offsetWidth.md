## 区别
1. offsetWidth 返回 padding + border + width 之和， style.width 只返回 width。
2. offsetWidth 只读， style.width 可读写。
3. offsetWidth 返回整数， style.width 返回字符串，并带有单位。
4. offsetWidth 可返回外部样式、嵌入样式和内联样式， style.width 只能返回内联样式。

## [Element.clientWidth](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientWidth)  
内联元素以及没有 CSS 样式的元素的 `clientWidth` 为 0。  
该属性包括内边距，不含 border、 margin 和垂直滚动条。  

>该属性值会被四舍五入为一个整数。如果你需要一个小数值，可使用  
>[element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。  
