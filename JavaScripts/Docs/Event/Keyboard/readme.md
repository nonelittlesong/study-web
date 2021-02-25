# [按键事件](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

>只有获得焦点的元素，才可监听到 `KeyboardEvent`？

## 1. [focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus)

`HTMLElement.focus()` 给**能够获得焦点的元素**设置焦点。  
获得焦点的元素默认可以捕获 keyboard 事件。

### 1.1. 语法

```js
elements.focus(options);
```

参数：

- options — 可选
  - preventScroll — 可选，Boolean。是否将焦点元素滚动到可视范围。

### 1.2. Notes

- 如果在 mousedown 事件处理器中调用 HTMLElement.focus()，必须使用 event.preventDefault() 避免焦点离开 HTMLElement。
- focus 的表现也和 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-tabindex) 和 [shadow dom](https://developer.mozilla.org/en-US/docs/Glossary/shadow_tree) 有关。

### 1.3. 另见

- [blur()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/blur) — 移除焦点。
- [document.activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement) — 获得当前的焦点元素。
