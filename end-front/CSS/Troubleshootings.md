# margin
margin的%是父元素宽度的%。  
所以，应使用vh/vw替代%。  

# 去掉div与body间的留白
```css
html, body {
  width: 100vw;
  height: 100vh;
  background-color: #1B1D21;
  margin: 0;
  padding: 0;
}
```
