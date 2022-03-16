
## Numeric Separators

数字分隔符，增加数字的可读性

```js
let myNumber = 1_000_000;
console.log(myNumber); // output: 1000000
let num = 0.000_0002;
console.log(num);      // output: 2e-7
```

## Replace All

替换字符串中的字符，不需使用 regex

```js
let myStr = 'Prograssing';
console.log(myStr.replaceAll('s', 'm')); // output: Programming
```

## Weak Reference

```js
const myObject = new WeakRef({
  name: 'John',
  age: 25
});
// Read the object.
console.log(myObject.deref());      // output: {name: 'John', age: 25}
// Access name.
console.log(myObject.deref().name); // output: John
```

## Promise Any

返回第一个 resolved 的 promise 的值。如果所有 promise 都 rejected，则异常 AggregateError

```js
const promise1 = new Promise((resolve, reject) => {
  resolve('promise1 was resolved.');
});
const promise2 = new Promise((resolve, reject) => {
  resolve('promise2 was resolved.');
});
const promise3 = new Promise((resolve, reject) => {
  resolve('promise3 was resolved.');
});
let result = Promise.any([promise1, promise2, promise3]);
console.log(result); // output: promise1 was resolved.
```

## Logical Assignment Operators

逻辑赋值运算符：

- `&&=` — 如果左侧操作数为 `truthy`，则将右侧操作数赋值给左侧操作数
- `||=` — 如果左侧操作数为 `falsy`，则将右侧操作数赋值给左侧操作数
- `??=` — 如果左侧操作数为 `nullish`，则将右侧操作数赋值给左侧操作数