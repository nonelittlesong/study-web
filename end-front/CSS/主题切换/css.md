# CSS 主题切换

```css
/* 默认亮色主题 */
:root {
  --text-color: #333;
  --bg1: #c7ffdd;
  --bg2: #fbd988;
}

/* 暗色主题 */
html[data-theme='dark'] {
  --text-color: #fff;
  --bg1: hsl(198, 44%, 11%);
  --bg2: hsl(198, 39%, 29%);
}
```
