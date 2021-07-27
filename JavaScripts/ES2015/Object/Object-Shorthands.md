# 对象字面量简写

## 属性

属性的 value 名与 key 相同，可以将 key 省略：

```js
const foo = {
  x: x,
  y: y,
  z: z
};
// 可简写为
const foo = {
  x,
  y,
  z
};
```

## 方法

```js
const foo = {
  a: function() {},
  b: function() {}
};
// 可简写为
const foo = {
  a() {},
  b() {}
};
```

## ESLint
[Require Object Literal Shorthand Syntax (object-shorthand)](https://eslint.org/docs/rules/object-shorthand)  
