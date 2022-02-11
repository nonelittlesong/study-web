# Flex 布局

参考：

- [A Complete Guide to Flexbox | CSS-Trick](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [控制 flex 子元素在主轴上的比例 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)  

>注意：
>
>1. `display` 设为 `flex` 后，子元素的 `float`、`clear`、`vertical-align` 属性将失效，容器的 `columns` 属性无效。

## 1. 属性

### 1.1. 父属性

#### `display`

定义一个 flex 容器，可以是 block 或 inline 类型：

```css
.container {
  display: flex; /* 或 inline-flex */
}
```

#### `flex-direction`

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

#### `flex-wrap`

```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

#### `flex-flow`

flex-flow = flex-direction + flex-wrap

#### `justify-content`

定义主轴的对齐方式。

### 1.2. 子属性

#### `order`

定义 items 的顺序：

```css
.item {
  order: 5; /* 默认是 0 */
}
```

#### `flex-grow`

定义一个 flex 元素扩大的能力，接受一个无单位的值作为比例。

```css
.item {
  flex-grow: 4; /* 默认是 0 */
}
```

不能是负值。

#### `flex-shrink`

定义一个 flex 元素扩大的能力，接受一个无单位的值作为比例。

```css
.item {
  flex-shrink: 3; /* 默认是 1 */
}
```

不能是负值。

#### `flex-basis`

- 0
- auto

#### `flex`

简写，flex = flex-grow + flex-shrink + flex-basis

- 三个值都没设置时，默认值是 0 1 auto
- 当设置了一个值如 `flex: 5` 时，`flex-basis` 的值则为 `0%`

**推荐使用简写**

#### `align-self`

允许子元素覆盖默认的或容器的 `align-items` 属性：

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

## 2. 前缀

不同浏览器，flex 不仅前缀不同，可能名字也不同。

为了处理前缀，可以使用后处理器。

Sass 可以使用 `@mixin` 帮助处理前缀：

```scss
@mixin flexbox() {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

@mixin flex($values) {
  -webkit-box-flex: $values;
  -moz-box-flex:  $values;
  -webkit-flex:  $values;
  -ms-flex:  $values;
  flex:  $values;
}

@mixin order($val) {
  -webkit-box-ordinal-group: $val;  
  -moz-box-ordinal-group: $val;     
  -ms-flex-order: $val;     
  -webkit-order: $val;  
  order: $val;
}

.wrapper {
  @include flexbox();
}

.item {
  @include flex(1 200px);
  @include order(2);
}
```
