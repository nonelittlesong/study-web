# Destructuring

```js
// 列表匹配
var [a, , b] = [1, 2, 3];

// 对象匹配
var { op: a, lhs: { op: b }, rhs: c } = getASTNode()

// 缩写
var { op, lhs, rhs } = getASTNode()

// 可以用作参数
function g({ name: x }) {
    console.log(x);
}

// 故障弱化： 不匹配时默认赋 undefined
var [a] = []; // a === undefined;

// 故障弱化： 设置不匹配时的默认值
var [a = 1] = []; // a === 1;
```

More info: [MDN Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)  

## 1. 使用 Destructuring 语法将两个变量交换

```js
let a = 5, b = 8;
[b, a] = [a, b]
```

## 2. 使用 Destructuring 和 Rest 参数给数组赋值

```js
const source = [1,2,3,4,5,6,7,8,9,10];
function removeFirstTwo(list) {
  const [a, b, ...arr] = list;
  return arr;
}
const arr = removeFirstTwo(source);
```

## 3. 使用 Destructuring 传递 Object 参数

```js
const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

const half = ({ max, min }) => (max + min) / 2.0; 
```
