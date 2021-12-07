# TypeScript 内置对象

## 1. ECMAScript 内置对象

- `Boolean`
- `Error`
- `Date`
- `RegExp`
- ...

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

参考：

- [内置对象 | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

## 2. DOM 和 BOM 内置对象

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function (e: MouseEvent) {
  // Do something
});
```

## 3. Node.js

需要引入第三方声明文件：

```
npm install @types/node --save-dev
```
