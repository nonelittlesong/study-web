# Node

## 属性

### [Node.parentNode & Node.parentElement](https://stackoverflow.com/questions/8685739/difference-between-dom-parentnode-and-parentelement)
用 `parentNode` ！！
```js
document.body.parentNode; // the <html> element
document.body.parentElement; // the <html> element

document.documentElement.parentNode; // the document node
document.documentElement.parentElement; // null

(document.documentElement.parentNode === document);  // true
(document.documentElement.parentElement === document);  // false
```

### Node.textContent
表示一个节点及其后代的文本内容。  
#### 语法
```js
let text = someNode.textContent;
someOtherNode.textContent = string;
```
**返回值**: 一个字符串或 `null`。  

#### 与 innerText 的区别
- `textContent` 会获取所有元素的内容，包括 `<script>` 和 `<style>` 元素，然而 `innerText` 只展示给人看的元素。  
- `textContent` 会返回节点中的每一个元素。相反，`innerText` 受 CSS 样式的影响，并且不会返回隐藏元素的文本。  
  - 此外，由于 `innerText` 受 CSS 样式的影响，它会触发回流（ reflow ）去确保是最新的计算样式。（回流在计算上可能会非常昂贵，因此应尽可能避免。）  

#### 与 innerHTML 的区别
正如其名称，`Element.innerHTML` 返回 `HTML`。通常，为了在元素中检索或写入文本，人们使用 `innerHTML`。但是，`textContent` 通常具有更好的性能，因为文本不会被解析为 `HTML`。

此外，使用 `textContent` 可以防止 `XSS` 攻击。  
