# input 元素

## 1. file 类型

选择一个或多个文件

### 1.1. value

- 一个代表选择文件路径的 [DOMString](https://developer.mozilla.org/en-US/docs/Web/API/DOMString)。  
  - 当选择多个文件时， `value` 代表第一个文件。  
  - 当没有选择文件时， `value` 为 ""。  
- 其他文件保存在 `HTMLInputElement.files` 属性中。

### 1.2. accept

设置可上传文件的后缀

## 2. text 类型

### 2.1. list 属性

使用 list 属性，配合 `datalist` 元素，可以生成一个选择栏组件：

```html
<input type="text" list="auto-complete">
<datalist id="auto-complete">
  <option value="Airplane"></option>
  <option value="Cars"></option>
  <option value="Motorcycle"></option>
  <option value="Bikes"></option>
  <option value="Taxi"></option>
  <option value="Bus"></option>
  <option value="Van"></option>
</datalist>
```

