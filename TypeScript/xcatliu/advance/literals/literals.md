# TypeScript 字符串字面量类型

和 union 类似，但约束是具体的字符串：

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll');
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
```
