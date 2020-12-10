# Float 属性引起的父元素塌陷问题
父元素是一个没有样式（如没有 height）的 div/ul 等其它类block元素，子元素里面设置浮动，父元素就会发生塌陷问题。  

```htm
<div class="father">
    <div class="son1" style="float:left">我是浮动的子元素</div>
    <div class="son2">我是非浮动子元素</div>
</div>
```

# 解决方案

## 1、 `::after` 伪类
```css
.son2::after {
    content: "";
    clear: both;
    display: block;
}
```
>注意： 是 son2 不是 son1。  

## 2、 添加一个块级元素设置 `clear` 属性
```htm
<div class="father">
    <div class="son1" style="float:left">我是浮动的子元素</div>
    <div class="son2">我是非浮动子元素</div>
    <div class="clear"></div>
</div>
```
```css
.clear {
    clear: both;
}
```
`bootstrap` 对其进行了封装。  

## 3、 后面的元素设置 `clear` 属性
```css
.son2 {
    clear: both;
}
```
相当于**在前面加了clear元素**：  
```htm
<div class="father">
    <div class="son1" style="float:left">我是浮动的子元素</div>
    <div class="clear"></div>
    <div class="son2">我是非浮动子元素</div>
</div>
```
```css
.clear {
    clear: both;
}
```

## 4、 为父元素设置`overflow: hidden`
```css
.father {
    overflow: hidden;
}
```

## 5、 [BFC](https://blog.csdn.net/qq_40282732/article/details/88058145)
前面的 `overflow` 方法已经使用了这个思想， BFC（Block Formatting Context） 块级格式上下文。 BFC 就好像一个城池的围墙，如果给父元素加上一个围墙（BFC），那么就能够让里面的元素无法逃脱父元素的区域，在表现形式上就可以达到清除浮动的效果。  

>注意： 这种方法相当于让 `float` 失效了，并不是真正了解决父元素高度塌陷的问题。  

