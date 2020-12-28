#  Array

## 1. 创建数组

### 1.1. 构造函数

```js
var colors = new Array();
var colors = new Array(20); // 创建有20个项的数组
var colors = new Array("red", "blue");
```

### 1.2. 数组字面量

```js
var colors = [];
var colors = ["red", "bule"];

// 访问和设置数组
// 索引小于数组长度会修改， 大于会新增
colors[2] = "yellow" // 新增第3项

// 数组长度
colors.length // 可写
```

## 2. 判断某个变量是否为 Array

```js
value instanceof Array;
Array.isArray(value);
```

## 3. 转字符串

```
var colors = ["red", "blue"];
alert(colors.toString()); // red,blue
alert(colors.valueOf()); // red,blue
alert(colors); // red,blue 后台会调用toString()
```

- `toLocaleString()` — 调用每一项的 `toLocaleString()`, 然后用 `,` 拼接。
- `toString()` — 调用每一项的 `toString()`，然后用 `,` 拼接。
- `colors.join("×××")` — 可替换拼接符号。

## 4. 栈方法

>:warning: 会修改原数组

- `push(...)` — 输入任意项参数，返回「更新后元素的个数」。
- `pop()` — 删除并返回栈顶元素。

`push()` 是「浅复制」：

```js
let a = {b: 2};
let c = new Array();
c.push(a);
a.b = 3;
console.log(c[0].b); // 3
```

## 5. 队列方法

>:warning: 会修改原数组

- `shift()` — 删除并返回队首元素。
* `unshift(...)` — 队首添加任意项，返回新数组长度。

>**正确使用栈和队列：**  
>
>1. push + pop = 栈
>2. push + shift = 队列
>3. unshift + pop = 反向队列
>4. unshift + shift = 反向栈

## 6. 排序方法

>:warning: 会修改原数组

- `reverse()` — 反转。  
- `sort()` — 排序。

```js
// sort()可以接受一个比较函数
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    }
    else if (value1 > value2) {
        return 1;
    }
    else {
        return 0;
    }
}
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); // 0,1,5,10,15
```

## 7. 操作方法

「不」修改原数组

- concat(...) 基于当前数组，在末尾添加n项，形成一个新数组。（非变异）  
- slice() 接受0/1/2个参数。（非变异）  
  0个参数： 返回原数组的副本
  1个参数： 基于起始位置到数组末尾，创建一个新数组  
  2个参数： 基于起始位置到结束位置（不包括结束位置），创建一个新的数组  
  **参数为负数： 正参数=负参数+数组长度**  
  起始位置大于结束位置： 返回空数组  

修改原数组：  

* splice(起始位, 删除数, 添加项) —— 返回由删除项组成的数组
  * 删除 - (起始位, 删除数)
  * 插入 - (起始位, 0, 添加项...)
  * 替换 - (起始位, 删除数, 添加项...)

## 8. 位置方法 

indexOf(目标, 起始位\~可选), lastIndexOf(目标, 起始位\~可选)  
通过===查找  

## 9. 迭代方法

「不」修改原数组

| 方法名 | 作用 |
| ------ | ------ |
| every() | 对数组的每一项给定函数，如果该函数对每一项都返回true，则返回true。 |
| [filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | 对数组的每一项运行给定函数，该函数返回true的项组成的数组。 |
| forEach（） | 对数组的每一项运行给定函数，该函数没有返回值。 |
| map() | 对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组。 |
| some() | 对数组的每一项运行给定函数，如果该函数对任一项返回true，则返回true。 |

每个方法都接受两个参数：

- `function` —— 要在每一项上运行的函数。参数： value, index, array。  
- `this` —— 运行该函数的作用域对象---影响 this 的值。  


## 10. 缩小方法

[reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 和 reduceRight()  

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

- initialValue - 作为第一次调用 `callback` 函数时的第一个参数的值。
  如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

```
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array) {
    return prev + cur;
});
alert(sum); // 15
```