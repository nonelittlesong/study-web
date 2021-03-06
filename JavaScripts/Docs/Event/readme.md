# Event

JS 事件的触发和处理。

<details>
<summary>Table of Contents</summary>

| 标题 | 内容 |
| --- | --- |
| [_via_event.js](https://github.com/nonelittlesong/study-web/blob/master/JavaScripts/Docs/Event/_via_event.js) — 牛津大佬的自定义事件 | |

</details>

## 1. Troubleshootings

### 1.1. change 事件

事件会在元素的内容发生改变时发生。  
事件也可以用于单选框和复选框改变后触发的事件。  

`onchange` 属性可用于 input, select 和 textarea。  

## 2. 事件流

1. 事件捕获阶段 — 不涉及事件目标
2. 处于目标阶段
3. 事件冒泡阶段

## 3. 事件处理程序

### 3.1. DOM2 级事件处理程序

`addEventListener()` 和 `removeEventListener()`

接受3个参数：

1. 事件名
2. 函数 — 事件处理程序
3. `true` 表示在捕获阶段调用函数，`false` 表示在冒泡阶段处理函数。

**优点**

- 可以添加多个事件处理程序，按照添加顺序执行。

通过 `addEventListener()` 添加的事件处理程序只能通过 `removeEventListener()` 移除。  
这意味着「匿名函数」不能被移除。

### 3.2. HTML事件处理程序（不建议用）

通过 HTML 元素的 `onxxxx` 属性绑定事件处理函数。

**缺点**

1. 可能在**元素未加载完全**时触发事件。
2. 扩展事件处理程序的作用域链在不同浏览器中有不同的结果。

```
<input type="button" value="Click Me" onclick="alert('Clicked')" />
```

`event`:

```
<input type="button" value="Click Me" onclick="alert(event.type)" />
```

`this`:

```
<input type="button" value="Click Me" onclick="alert(this.value)" />
```

#### 原理

关于这个动态创建的 onclick 函数，另一个有意思的地方是它扩展作用域的方式。在这个函数内部，可以像访问局部变量一样访问 document 及该元素本身的成员。  

这个函数使用 with 像下面这样扩展作用域：

```js
function() {
  with(document) {
    with(this) {
      // 元素属性值
    }
  }
}
```

因此，可以省略 `this`： `onclick="alert(value)"`。

&nbsp;  
如果是表单元素，有：

```js
function() {
  with(document) {
    with(this.form) {
      with(this) {
        // 元素属性值
      }
    }
  }
}
```
```html
<form method="post>
  <input type="text" name="username" value=""/>
  <input type="button" value="Echo Username" onclick="alert(username.value)" />
</form>
```

### 3.3. DOM0 事件处理程序

调用 DOM 对象的 `onxxxx` 方法。

#### 绑定事件

```js
var btn = document.getElementById("myBtn");
btn.onclick = function() {
  alert(this.id);
}
```

#### 解绑

```js
btn.onclick = null;
```

:warning: 这种方式也会将 HTML 事件处理程序解绑！

### 3.4. IE 事件处理程序

`attachEvent()` 和 `detachEvent()`。

接受两个参数：

- 事件名
- 事件处理函数

click 事件中，`attachEvent()` 的第一个参数是 `onclick`，而非 DOM 的 `addEventListener()` 中的 `click`。  
`attachEvent()` 的作用域是全局作用域，而 DOM0 是其所属元素。  
`attachEvent()` 也可以添加多个事件处理程序，调用顺序与添加顺序相反。  

### 3.5. 跨浏览器的事件处理程序

`addhandler()`

## 4. 事件对象

### 4.1. DOM 中的事件对象

event:

| 属性/方法 | 类型 | 读/写 | 说明 |
| --- | --- | --- | --- |
| bubbles | Bollean | 只读 | 说明事件是否冒泡 |
| cancelable | Bollean | 只读 | 表明是否可以取消事件的默认行为 |
| currentTarget | Element | 只读 | 其事件处理程序当前正在处理事件的那个元素 |
| defaultPrevented | Boolean | 只读 | 为true表示已经调用了preventDefault() |
| detail | Integer | 只读 | 与事件相关的细节信息 |
| eventPhase | Integer | 只读 | 调用时间处理程序的阶段：1表示捕获阶段，2表示处于目标，3表示冒泡阶段 |
| preventDefault() | Function | 只读 | 取消事件的默认行为。如果cancelable是true，则可以使用这个方法 |
| stopImmediatePropagation() | Function | 只读 | 取消时间的进一步捕获或冒泡，同时阻止任何事件处理程序被调用 |
| stopPropagation() | Function | 只读 | 取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法 |
| target | Element | 只读 | 事件的目标 |
| trusted | Boolean | 只读 | 为true表示事件是浏览器生成的。为false表示事件是由开发人员通过JavaScriptv创建的 |
| type | String | 只读 | 被v触发的事件类型 |
| view | AbstractView | 只读 | 与事件关联的抽象视图。等同于发生事件的window对象 |

this, currentTarget 和 target：

```js
// 如果直接将事件处理程序给了目标元素，则this，currentTarget和target包含相同的值
var btn = document.getElementById("myBtn");
btn.onclick = function(event) {
  alert(event.currentTarget === this); // true
  alert(event.target === this);        // true
}
// 如果事件处理程序在目标的父节点(如document.body)，则不同
document.body.onclick = function(event) {
  alert(event.currentTarget === document.body);  // true
  alert(this === document.body);                 // true
  alert(event.target === document.getElementById("myBtn")); //true
}
```

### 4.2. IE 中的事件对象

| 属性/方法 | 类型 | 读/写 | 说明 |
| --- | --- | --- | --- |
| cancelBubble | Boolean | 读/写 | 默认值为fasle，但将其设置为true就可以取消事件冒泡（与DOM中的stopPropagation()方法的作用相同） |
| returnValue | Boolean | 读/写 | 默认值为ture，但将其设置为false就可以取消事件的默认行为（与DOM中的preventDefault()方法的作用相同 |
| srcElement | Element | 只读 | 事件的目标（与DOM中的target属性相同） |
| type | String | 只读 | 被触发的事件类型 |

### 4.3. 跨浏览器的事件对象

## 5. [事件类型](https://developer.mozilla.org/en-US/docs/Web/Events)

* UI 事件
* 焦点事件
* 鼠标事件
* 滚轮事件
* 文本事件
* 键盘事件
* 合成事件，当为IME输入字符时触发
* 变动事件，当底层DOM结构发生变化时触发

### 5.1. UI事件

* load
* unload
* abort
* error
* select: 当用户选择文本框中的一个或多个字符时触发。
* resize: 当窗口或框架的大小发生变化时在window或框架上面触发。
* scroll

### 5.2. 焦点事件

* blur
* focus
* focusin
* focusout

### 5.3. 鼠标与滚轮事件

## 6. 内存和性能

### 6.1. 事件委托

只在 DOM 树的最高曾添加一个事件处理程序：

```js
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  
  switch(target.id) {
    case "doSomething":
      document.title = "I changed the document's title";
      break;
    case "goSomewhere":
      location.href = "http://www.wrox.com";
      break;
    case "sayHi":
      alert("hi");
      break;
  }
});
```

### 6.2. 移除事件处理程序

dangling event handler:

* 从文档中移除带有事件处理程序的元素时

```
<html>
  <div id = "myDiv">
    <input type="button" value="Click Me" id = "myBtn">
  </div>
  <script type="text/javascript>
    var btn = document.getElementById("myBtn");
    btn.onclick = function() {
      // 先执行某些操作
      btn.onclick = null; // 移除事件处理程序
      document.getElementById("myDiv").innerHTML = "Processing...";
    };
  </script>
</html>
```

* 卸载页面时

## 7. 模拟事件

### 7.1. DOM中的事件模拟

createEvent():

* UIEvents
* MouseEvents
* MutationEvents
* HTMLEvents

#### 7.1.1. 模拟鼠标事件

```js
var btn = document.getElementById("myBtn");
// 创建事件对象
var event = document.createEvent("MouseEvents");
// 初始化事件对象
event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
// 触发事件
btn.dispatchEvent(event);
```

#### 7.1.2 模拟键盘事件

```js
var textbox = document.getElementById("myTextbox"), event;

// 以DOM3级方式创建事件对象
if (document.implementation.hasFeature("KeyboardEvent", "3.0")) {
  event = createEvent("KeyboardEvent");
  // 初始化事件对象
  event.initKeyboardEvent("keydown", true, true, document.defaultView, "a", 0, "Shift", 0);
}
// 触发事件
textbox.dispatchEvent(event);
```

#### 7.1.3 模拟其他事件

待补充···

#### 7.1.4 自定义DOM事件

`createEvent("CustomEvent")`

返回的对象有个 `initCustomEvent()` 方法，接收如下4个参数：

* type
* bubbles
* cancelable
* detail

### 7.2. IE中的事件模拟

待补充···

## 8. preventDefault()

阻止事件的默认动作，但事件还会继续传播。  
如果要阻止事件继续传播，要调用 [stopPropagation()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation) 或 [stopImmediatePropagation()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation)。  
