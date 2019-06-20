# Float 属性引起的父元素塌陷问题
父元素是一个没有样式的 div/ul 等其它类block元素，子元素里面设置浮动，父元素就会发生塌陷问题。 

# 解决方案

## 1. `::after` 伪类
```htm
<div class="father">
    <div class="son">我是浮动的子元素</div>
</div>
```
```css
.son {
    float: left;
}

.son::after {
    content: "";
    clear: both;
    display: block;
}
```
