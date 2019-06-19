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

#### \# 利用`transform`属性
```css
main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
```


### 基于 viewport
**margin的百分比值是以父元素的宽度作为解析基准的。**  
```css
main {
    width: 18em;
    padding: 1em 1.5em;
    margin: 50vh auto 0;
    transform: translateY(-50%);
}
```
它只适用于在视口中居中的场景。  


### 基于 Flexbox
* 先给父元素设置：`display： flex`
* 再给自身设置：`margin: auto`
```css
body {
    display: flex;
    min-height: 100vh;
    margin: 0;
}
main {
    margin: auto;
}
```

Flexbox 的另一个好处在于，它还可以将匿名容器（即没有被标签包裹的文本节点）垂直居中：  
```htm
<main>Center me, please!</main>
```
```css
main {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18;
    height: 10em;
}
