
## 1. CSDN 禁止复制

简单地通过 `userSelect` 样式开启：

```js
const $codes = document.querySelectorAll('code');
for ($code of $codes) {
  $code.style.userSelect = 'text';
  // $code.style.setProperty('user-select', 'text');
}
```
