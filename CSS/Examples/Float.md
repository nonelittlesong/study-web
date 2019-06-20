# Float 属性引起的父元素塌陷问题
父元素是一个没有样式的 div/ul 等其它类block元素，子元素里面设置浮动，父元素就会发生塌陷问题。  

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
>注意： 是son2不是son1。  

## 2、 `clear`属性
```htm
<div class="father">
    <div class="son1" style="float:left">我是浮动的子元素</div>
    <div class="son2">我是非浮动子元素</div>
</div>
