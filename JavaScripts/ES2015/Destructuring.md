fail-soft: 故障弱化。  

```js
// 列表匹配
var [a, , b] = [1, 2, 3];

// 对象匹配
var {op: a, lhs: { op: b }, rhs: c }
    = getASTNode()
    
// 缩写
var {op, lhs, rhs} = getASTNode()

// 可以用作参数
function g({name: x}) {
    console.log(x);
}

// 故障弱化： 不匹配时默认赋 undefined
var [a] = [];
a === undefined;

// 故障弱化： 设置不匹配时的默认值
var [a = 1] = [];
a === 1;
```

More info: [MDN Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)  
