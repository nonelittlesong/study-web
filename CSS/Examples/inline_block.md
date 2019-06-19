# 行内元素和块级元素
## 1、 水平居中
* 如果是一个行内元素，就对它的父元素应用`text-align: center;`。
* 如果是一个块级元素，就对它自身应用`margin:auto`。

## 2、 垂直居中
### 基于绝对定位
#### \# 一个早期的垂直居中方法，要求元素有固定的宽度和高度
```css
main {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -3em;
    margin-left: -9em;
    width: 18em;
    height: 6em;
}
```
借助`calc()`函数，简化：  
```css
main {
    position: absolute;
    top: calc(50% - 3em);
    left: calc(50% - 9em);
    width: 18em;
    height: 6em;
}
```
这种方法最大的局限性在于： **它要求宽高固定**。

