# [Element](https://developer.mozilla.org/zh-CN/docs/Web/API/element)
>**注意：**  
>`textCotent` 不是 `Element` 的属性，而是 `Node` 的属性。  

## 属性

### Element.innerHTML
设置或获取 HTML 语法（string 类型）表示的元素后代。  

如果要插入一段 HTML，使用 [insertAdjacentHTML()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML)。  

使用 `trim()` 去掉字符串前后空格。  

## 方法

### [insertAdjacentElement()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentElement)  
>**注意：**  
>1. 多个节点使用该方法插入**同一个元素**，只有最后一个生效。  

```js
const htmlPlaceholer = '<span class="ant-select-selection-placeholder">Please select dataset</span>';
const $placeHolder = parseHTML(htmlPlaceholer)[0];
console.log($placeHolder);
$datasetSelection.insertAdjacentElement('afterend', $placeHolder);
$placeHolder.parentNode.removeChild($placeHolder);
console.log($placeHolder);            // <span class="ant-select-selection-placeholder">Please select dataset</span>
console.log($placeHolder.parentNode); // null
```
