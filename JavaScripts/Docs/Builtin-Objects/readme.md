# 引用类型

<details>
<summary>Table of Contents</summary>

- Flatten | 扁平化数组

</details>

## 1. 概览

### 1.1. [基本数据类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)

- undefined
- null
- boolean
- number
- string
- object
- [symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [bigint](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)  

### 1.2. 字符串

1. 转数字：  
   Number(), parseInt(), parseFloat()  
2. 转字符串：  
   toString(), String()  
3. 长度：  
   .length  
4. 子串  
   .substring(start, end) - 不会改变原字符串。  

### 1.3. 赋值

利用逻辑或的特性，在变量赋值时提供备用值，避免将 null 或 undefined 赋值给变量：

```js
let myObject = preferredObject || backupObject
```

## 2. Object

### 2.1. 创建 Object 实例有两种方式

第一种：

```js
var person = new Object();
person.name = "Nico";
person.age = 29;
```

第二种：

```js
// 不会调用 Object 的构造函数
var person = {
  name : "Nico",
  age : 29,
  5: true
}
// 可以用对象字面量封装可选参数
```

### 2.2. 访问对象属性的两种方式

1. `person["name"]`
2. `person.name`

方括号方法的优点是可以使用变量访问属性：

```js
var propertyName = "name";
person[propertyName];
```

### 2.3. [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

将所有「可枚举属性」的值从一个或多个源对象复制到目标对象。它将返回目标对象。

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

## 3. Array

### 3.1. 创建数组

```js
// 方式1
var colors = new Array();
var colors = new Array(20); // 创建有20个项的数组
var colors = new Array("red", "blue");

// 方式2 不会调用构造函数
var colors = [];
var colors = ["red", "bule"];

// 访问和设置数组
// 索引小于数组长度会修改， 大于会新增
colors[2] = "yellow" // 新增第3项

// 数组长度
colors.length // 可写
```

### 3.2. 判断某个变量是否为 Array

```js
value instanceof Array;
Array.isArray(value);
```

### 3.3. 转换方法

```js
var colors = ["red", "blue"];
alert(colors.toString()); // red,blue
alert(colors.valueOf()); // red,blue
alert(colors); // red,blue 后台会调用toString()
```

- `toLocaleString()` — 调用每一项的 `toLocaleString()`, 然后用 `,` 拼接。
- `toString()` — 调用每一项的 `toString()`，然后用 `,` 拼接。
- `colors.join("×××")` — 可替换拼接符号。

### 3.4. 栈方法

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

### 3.5. 队列方法

>:warning: 会修改原数组

- `shift()` — 删除并返回队首元素。
- `unshift(...)` — 队首添加任意项，返回新数组长度。

>**正确使用栈和队列：**  
>
>1. push + pop = 栈
>2. push + shift = 队列
>3. unshift + pop = 反向队列
>4. unshift + shift = 反向栈

### 3.6. 重排序方法

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

### 3.7. 操作方法

不修改原数组：

- concat(...) 基于当前数组，在末尾添加n项，形成一个新数组。（非变异）  
- slice() 接受0/1/2个参数。（非变异）  
  0个参数： 返回原数组的副本  
  1个参数： 基于起始位置到数组末尾，创建一个新数组  
  2个参数： 基于起始位置到结束位置（不包括结束位置），创建一个新的数组  
  **参数为负数： 正参数=负参数+数组长度**  
  起始位置大于结束位置： 返回空数组  
  
修改原数组：

* splice(起始位, 删除数, 添加项)  
  * 删除 - (起始位, 删除数)
  * 插入 - (起始位, 0, 添加项...)
  * 替换 - (起始位, 删除数, 添加项...)


**位置方法**  
indexOf(目标, 起始位\~可选), lastIndexOf(目标, 起始位\~可选)  
通过===查找  

**迭代方法**  

| 方法名 | 作用 |
| ------ | ------ |
| every() | 对数组的每一项给定函数，如果该函数对每一项都返回true，则返回true。 |
| [filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | 对数组的每一项运行给定函数，该函数返回true的项组成的数组。 |
| forEach（） | 对数组的每一项运行给定函数，该函数没有返回值。 |
| map() | 对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组。 |
| some() | 对数组的每一项运行给定函数，如果该函数对任一项返回true，则返回true。 |

**以上方法都不会修改数组中的值。**  

每个方法都接受两个参数：  
- 要在每一项上运行的函数。参数： value, index, array。  
- 运行该函数的作用域对象---影响this的值。  


**缩小方法**  
[reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 和 reduceRight()  
```
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```
- initialValue - 作为第一次调用 `callback` 函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。  

```
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array) {
    return prev + cur;
});
alert(sum); // 15
```

## 4. [Date类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

定义：

```js
var now = new Date();

/**
 * Date.parse()
 * 支持的日期格式：
 * 
 * 6/13/2004
 * January 12, 2004
 * Tue May 25 2004 00:00:00 GMT-0700
 * 2004-05-25T00:00:00
 *
 * 格式错误， 返回NaN
 */
var someDate = new Date(Date.parse("May 25, 2004"));
var someDate = new Date("May 25, 2004"); // 与上一句等价

/**
 * Date.UTC()
 * @param year 年份(必需)
 * @param month 基于0的月份(必需)
 * @param day 月份中的哪一天（1到31)
 * @param hour 小时(以下参数默认为0)
 * @param minute 分钟
 * @param second 秒
 * @param ms 毫秒
 */
var y2k = new Date(Date.UTC(2000, 0));
var y2k = new Date(2000, 0); // 基于系统的本地时区

// 使用+把Date转为String
var start = +new Date();
```

### 4.1. 继承的方法
toLocaleString(), toString(), valueOf()  
valueOf()返回Date的毫秒值，可用来比较Date大小。  

### 4.2. 日期格式化方法
toDateString(), toTimeString(), toLocaleDateString(), toLocaleTimeString(), 
toUTCString()  

### 4.3. 日期/时间组件方法
直接取得和设Date中的待定部分。  

## 5. RegExp

*定义：*

```js
let expression = /pattern/flags;
```

*flags：*

1. `g` 全局模式（global），即模式将被应用于所有的字符串，而非在发现第一个匹配项时立即停止。
2. `i` 不区分大小写（case-insensitive）。
3. `m` 多行模式（multiline），即达到一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。

*元字符：*

- `()` - 组，`\数字` 代表第n个组。
- `[]`
- `{}` — 设计匹配字符个数的范围
  - `{a,b}`
  - `{a,}`
  - `{a}`
- `^` — 开头，在 `[]` 中使用表示【非】。
- `$`
- `|`
- `.`
- `+`
- `*` — 左边的字符出现任意次
- `?` — 没有或全部。match 时，Lazy，最短优先。
- `(?=...)` — positive lookahead
- `(?!...)` — negative lookahead

*缩写：*

- `\w` — `[A-Za-z0-9_]`
- `\W` — `[^A-Za-z0-9_]`
- `\d` — `[0-9]`
- `\D` — `[^0-9]`
- `\s` — 匹配空白字符，类似于 `[\r\t\f\n\v]`
- `\S` — 匹配非空白字符

使用 RegExp 构造函数创建正则表达式：

```js
var pattern1 = /[bc]at/i;
var pattern2 = new RegExp("[bc]at", "i");
```

ECMAScript5 明确规定，使用正则表达式字面量必须像直接调用 RegExp 构造函数一样，每次都创建新的 RegExp 实例。  

### 5.1. RegExp 实例属性

1. `global` — 布尔值，是否设置了g
1. `ignoreCase` — 布尔值，是否设置了i
1. `multiline` — 布尔值，是否设置了m
1. `lastIndex` — 整数，表示开始搜索下一个匹配项的字符位置，从 0 开始算起。
1. `source` — 正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。

### 5.2. RegExp 实例方法

#### 5.2.1. `exec()`

`exec()` 接受一个参数，及要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回 null。

返回的数组虽然是 Array 的实例，但额外包含两个属性，`index` 和 `input`：

- index — 匹配项在字符串中的位置
- input — 应用正则表达式的字符串

在数组中，第一项是与整个模式匹配的字符串，其他项是与模式中捕获组匹配的字符串：

```js
var text = "mom and dad and baby";
var pattern = /mom( and dady (and baby)?)?/gi;
var matches = pattern.exec(text);
alert(matches.index); // 0
alert(matches.input); // "mom and dad and baby"
alert(matches[0]); // "mom and dad and baby
alert(matches[1]); // " and dad and baby"
alert(matches[2]); // " and baby"
```

对于 `exec()` 而言，即使模式中设置了 `g`，每次也只返回一个匹配项：

- 不设置 `g` — 在同一个字符串多次调用 `exec()`，始终返回地一个匹配信息。
- 设置了 `g` — 每次调用都会在字符串中查找新的匹配项。

#### 5.2.2. `test()`

- return — boolean

```js
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)) {
    alert("The pattern was matched.");
}
```

正则表达式的 valueOf() 返回正则表达式本身。

### 5.3. RegExp 构造函数属性

相当于静态属性。

| 长属性名 | 短属性名 | 说明 |
| ------ | ------ | ------ |
| input | $_ | 最近一次要匹配的字符串 |
| lastMatch | $& | 最近一次的匹配项 |
| lastParen | $+ | 最近一次匹配的捕获组 |
| leftContext | $\` | input 字符串中 lastMatch 之前的文本 |
| multiline | $* | 布尔值，表示是否所有的表达式都使用多行模式。 |
| rightContext | $' | Input 字符串中 lastMatch 之后的文本 |

### 5.4. 访问捕获组

```js
"Code Camp".replace(/(\w+)\s(\w+)/, '$2 $1');
// 返回 Camp Code
```


## 6. Function

**没有重载**  
函数名相当于指针，“重载”会使函数名指向新的函数。  

**函数申明与函数表达式**  
函数声明优先解析。函数表达式必须等到解析器解析到其所在行。  

### 6.1. 作为值的函数

函数名作参数：

```js
function callSomeFunction(someFunction, someArgument) {
  return someFunction(someArgument);
}
function add10(num) {
  return num + 10;
}
var result1 = callSomeFunction(add10, 10);
alert(result); // 20
```

函数作为返回值：

```js
function createComparisonFunction(propertyName) {
  return function(object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}
```

### 6.2. 函数内部属性

*arguments*

```js
// 阶乘
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
```

*this*

```js
window.color = "red";
var o = {color: "blue"};
function sayColor() {
    alert(this.color);
}
sayColor();
o.sayColor = sayColor;
o.sayColor();
```

*caller*

这个属性中保存着调用当前函数的函数的引用。 

### 6.3. 函数属性和方法

#### 6.3.1. 属性

1. `length` — 函数希望接收的【命名参数】的个数。
2. `prototype` — 保存实例方法。不可枚举，使用 `for-in` 无法发现。

#### 6.3.2. 非继承的方法

1. `apply()`  
   `apply()` 方法接受两个参数：作用域和参数数组。  
   ```js
   function sum(num1, num2) {
       return num1 + num2;
   }
   function callSum1(num1, num2) {
       return sum.apply(this, arguments);
   }
   function callSum2(num1, num2) {
       return sum.apply(this, [num1, num2]);
   }
   ```
2. `call()`  
   与 `apply` 类似，只是参数不同。  
   ```js
   function callSum(num1, num2) {
       return sum.call(this, sum1, sum2);
   }
   ```
3. `bind()`  
   函数实例与 this 值绑定：  
   ```js
   window.color = "red";
   var o = {color: "blue"};
   function sayColor() {
       alert(this.color);
   }
   var objectSayColor = sayColor.bind(o);
   objectSayColor();
   ```

#### 6.3.3. 继承的方法

- toLocaleString()
- toString()
- valueOf()

## 7. 基本包装类型

不建议显式地创建基本包装类型的对象。

### 7.1. Boolean

永远不要使用 Boolean 对象。

### 7.2. Number

格式化方法：

1. `toFixed()` — 小数位  
   ```js
   var num = 10;
   alert(num.toFixed(2)); //"10.00"
   ```
2. `toExponential()` — 指数  
   ```js
   num.toExponential(1); // "1.0e+1"
   ```
3. `toPrecision()` — 精确度  
   `toPrecision()` 方法可以表现 1 到 21 位小数。  
   
### 7.3. String

#### 属性

- `length` — 即使字符串中包含双字节字符，也算一个字符。

#### 字符方法

1. `charAt() / charCodeAt() / []`
   ```js
   var stringValue = "hello world";
   alert(stringValue.charAt(1));     //"e"
   alert(stringValue.charCodeAt(1)); //"101"
   alert(stringValue[1]);            //"e"
   ```

#### 字符串位置方法

1. `indexOf() / lastIndexOf()`  
   `lastIndexOf()` 是从后向前搜索。

#### 字符串操作方法

1. `concat()` — 将一个或多个字符串拼接起来。  
   原字符串不变。  
2. `slice() / substr() / substring()`  
   不会修改字符串本身。

#### trim()

不修改原字符串。

#### 字符串大小写转换方法

toLowerCase(), toUpperCase()  

#### 字符串的模式匹配方法

1. `match()`
2. `search()`
3. `replace()`
4. `split()`  
   语法： `stringObject.split(separator, howmany)`  
   如果吧空字符串 `''` 作为 `separator`，那么 `stringObject` 的每个字符之间都会分割。  
   `String.split()` 执行的操作与 `Array.join()` 的操作是相反的。  
   - `separator` 必须为，字符串或正则表达式。  
   - `howmany` (可选)返回的数组的最大长度。  

#### localeCompare()

比较字符串大小。

#### fromCharCode()

String 构造函数本身的一个静态方法。

```js
alert(String.fromCharCode(104,101,108,108,111)); // "hello"
```

### 7.4. 单体内置对象

#### 7.4.1. Global

isNaN(), isFinite(), parseInt(), parseFloat() 都是 Global 的方法。

1. URI编码方法  
   `encodeURI()` 和 `ehcodeURIComponent()` 
2. `eval()` 方法  
   `eval()` 方法就像一个完整的ECMAScript解析器。  
3. Global 对象的属性  
4. window 对象  

#### 7.4.2. Math

与我们直接编写的计算功能相比，Math对象提供的计算功能执行起来要快很多。

#### 属性

| 属性 | 说明 |
| ------ | ------ |
| Math.E | e的值 |
| Math.LN10 | ln(10) |
| Math.LN2 | ln(2) |
| Math.LOG2E | log2(e) |
| Math.LOG10E | log(e) |
| Math.PI | 元周率 |
| Math.SQRT1_2 | 1/2的平方根 |
| Math.SQRT2 | 2的平方根 |

#### 方法

1. `min()` 和 `max()`  
   ```js
   var values = [1, 2, 3, 4, 5];
   var max = Math.max.apply(Math, values);
   ```
2. 舍入方法 — `Math.ceil()`, `Math.floor()`, `Math.round()`
3. `random()` — 返回介于 0 到 1 之间的随机数，不包括 0 和 1。 
4. 其他方法

   | 方法 | 说明 |
   | ------ | ------ |
   | Math.abs(num) | num的绝对值 |
   | Math.exp(num) | 返回Math.E的num次幂 |
   | Math.log(num) | 返回num的自然对数 |
   | Math.pow(num, power) | 返回num的power次幂 |
   | Math.sqrt(num) | 返回num的平方根 |
   | Math.acos(x) | 返回x的反余弦值 |
   | Math.asin(x) | 返回x的反正弦值 |
   | Math.atan(x) | 返回x的反正切值 |
   | Math.atan2(y, x) | 返回y/x的反正切值 |
   | Math.cos(x) | 返回x的余弦值 |
   | Math.sin(x) | 返回x的正弦值 |
   | Math.tan(x) | 返回x的正切值 |
