# document vs window

document.addEventListner 和 window.addEventListner 的区别。

References:

- [Difference between document.addEventListener and window.addEventListener? | stackoverflow](https://stackoverflow.com/questions/12045440/difference-between-document-addeventlistener-and-window-addeventlistener)

## 比较

- 只存在于 `document` 中的事件：
  - `DOMContentLoaded`
- 只存在于 `window` 中的事件：
  - `resize`

## 可传播事件

如果你在监听「可传播事件」（如，click），那么 `document` 和 `window` 都可以使用。

主要的区别是到达的时间不一样，事件先到达 `document`。
