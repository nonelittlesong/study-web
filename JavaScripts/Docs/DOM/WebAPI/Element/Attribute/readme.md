# Attribute

元素的属性。

<details>
<summary>References</summary>

- [Attribute | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
- [CreateElement | repl](https://repl.it/@nonelittlesong/CreateElement#script.js) — 测试元素属性
- [Reflecting content attributes in IDL attributes | HTML Standard](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes)

</details>

## 1. Content vs IDL

在 HTML 中，大多数的属性有两个面：「内容属性」和「IDL 属性」(Interface Definition Language)。

- 内容属性 — 通过 `el.setAttribute()` 和 `el.getAttribute()` 设置/获取的属性。  
  总是字符串类型！
- IDL 属性 — 如同 JS 属性 `el.foo`。

### 1.1. IDL 属性返回真实使用的值

```js
$input = document.querySelector('input');
$input.type = 'foobar'
console.log(`$input.type: ${$input.type}`);                                 // text
console.log(`$input.getAttribute('type'): ${$input.getAttribute('type')}`); // foobar

$input.type = 'button'
console.log(`$input.type: ${$input.type}`);                                 // button
console.log(`$input.getAttribute('type'): ${$input.getAttribute('type')}`); // button
```

input 元素的默认类型是 text，由于不存在 foobar 类型，所以  
IDL 属性依旧为 text，但内容属性为 foobar。

&nbsp;  
**修改 IDL 属性，不一定会改变内容属性：**

```js
$input.value = 'I am value';
console.log(`$input.value: ${$input.value}`);                                 // I am value
console.log(`$input.getAttribute('value'): ${$input.getAttribute('value')}`); // null
```
