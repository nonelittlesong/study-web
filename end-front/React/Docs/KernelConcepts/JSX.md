# [JSX](https://zh-hans.reactjs.org/docs/introducing-jsx.html)

为什么使用 JSX？

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合。

React 并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现「关注点分离」。

## JSX 特定属性

因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。

例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。

## JSX 防止注入攻击

React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

## JSX 表示对象

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

等效于

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

```js
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```