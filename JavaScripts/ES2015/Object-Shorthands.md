# 对象字面量的属性简写

## properties
属性的 value 名与 key 相同，可以将 key 省略：  
```js
var foo = {
  x: x,
  y: y,
  z: z
};

var foo = {
  x,
  y,
  z
};
```

## methods
属性的 value 是匿名函数：  
```js
var foo = {
  a: function() {},
  b: function() {}
};

var foo = {
  a() {},
  b() {}
};
```

## ESLint
[Require Object Literal Shorthand Syntax (object-shorthand)](https://eslint.org/docs/rules/object-shorthand)  
