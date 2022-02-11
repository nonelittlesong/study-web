# 转换原点

## 语法

单个值，必须是 `<length>`、`<percentage>` 或 `left`、`center`、`right`、`top`、`bottom` 中的一个：

```css
/* x 轴偏移 | y 轴中心 */
transform-origin: 2px;
/* x 轴中心 | y 轴 bottom */
transform-origin: bottom;
```

两个值:

- 其中一个必须是 `<length>`、`<percentage>` 或 `center`、`left`、`right` 中的一个
- 另一个则必须是 `<length>`、`<percentage>` 或 `center`、`top`、`bottom` 中的一个

```css
/* x-offset | y-offset */
transform-origin: 3cm 2px;

/* x-offset-keyword | y-offset */
transform-origin: left 2px;

/* x-offset-keyword | y-offset-keyword */
transform-origin: right top;

/* y-offset-keyword | x-offset-keyword */
transform-origin: top right;
```

三个值：

- 前两个值和只有两个值时的用法相同
- 第三个值必须是 `<length>`，它始终代表Z轴偏移量

```css
/* x-offset | y-offset | z-offset */
transform-origin: 2px 30% 10px;

/* x-offset-keyword | y-offset | z-offset */
transform-origin: left 5px -3px;

/* x-offset-keyword | y-offset-keyword | z-offset */
transform-origin: right bottom 2cm;

/* y-offset-keyword | x-offset-keyword | z-offset */
transform-origin: bottom right 2cm;
```
