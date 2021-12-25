## margin

`margin` 的 % 是父元素【宽度】的 %，应使用 `vh/vw` 替代 %。

## 去掉 div 与 body 间的空白

```css
html, body {
  width: 100vw;
  height: 100vh;
  background-color: #1B1D21;
  margin: 0;
  padding: 0;
}
```
