
## 基本数据类型
基本： undefined, null, boolean, number, string  
复杂： object  
## 字符串
1. 转数字：  
   Number(), parseInt(), parseFloat()  
2. 转字符串：  
   toString(), String()  
3. 长度：  
   .length  
## 赋值
```js
var myObject = preferredObject || backupObject
```
利用逻辑或的特性，在变量赋值时提供备用值，避免将null或undefined赋值给变量。  

## 引用类型
### 1. Object类型
**创建Object实例有两种方式:**  
第一种：
```js
var person = new Object();
person.name = "Nico";
person.age = 29;
```
第二种：
```js
// 不会调用Object的构造函数
var person = {
  name : "Nico",
  age : 29
}
// 可以用对象字面量封装可选参数
```
**访问对象属性的两种方式：**
```
person["name"];
person.name;
// 方括号方法的优点是可以使用变量访问属性
var propertyName = "name";
person[propertyName];
```
### 2. Array类型
**创建数组：**  
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
colors\[2] = "yellow" // 新增第3项
// 数组长度
colors.length // 可写
```
**检测数组：**  
```js
value instanceof Array;
Array.isArray(value);
```
**内置转换方法**  
```
var colors = ["red", "blue"];
alert(colors.toString()); // red,blue
alert(colors.valueOf()); // red,blue
alert(colors); // red,blue 后台会调用toString()
```
* toLocaleString()调用每一项的toLocaleString(), 然后用“,“拼接。  
* toString（）调用每一项的toString()。  
* colors.join("×××"), 替换拼接符号。  

**栈方法**  
* push(...) 输入任意项参数，返回元素的个数。  
* pop() 返回栈顶元素。  
* 可以与其他数组方法混合使用。  

**队列方法**  
* shift() 返回队首元素。  
* unshift(...) 添加任意项，返回新数组长度。  

**重排序方法**  
* reverse() 反转。  
* sort() 升序排列。根据toString()比较字符串大小。  

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
**操作方法**  
* concat(...) 基于当前数组，在末尾添加n项，形成一个新数组。  
* slice() 接受1/2个参数  
  1个参数： 基于起始位置到数组末尾，创建一个新数组  
  2个参数： 基于起始位置到结束位置（不包括结束位置），创建一个新的数组  
  参数为负数： 参数+=参数+数组长度  
  起始位置大于结束位置： 返回空数组  
* splice(起始位, 删除数, 添加项)  

**位置方法**  
indexOf(目标, 起始位~可选), lastIndexOf(目标, 起始位~可选)  
通过===查找  
**迭代方法**  

| 方法名 | 作用 |
| ------ | ------ |
| every() | 对数组的每一项给定函数，如果该函数对每一项都返回true，则返回true。 |
| filter() | 对数组的每一项运行给定函数，该函数返回true的项组成的数组。 |
| forEach（） | 对数组的每一项运行给定函数，该函数没有返回值。 |
| map() | 对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组。 |
| some() | 对数组的每一项运行给定函数，如果该函数对任一项返回true，则返回true。 |

以上方法都不会修改数组中的值。  
每个方法都接受两个参数：  
* 要在每一项上运行的函数。  
* 运行该函数的作用域对象---影响this的值。  

传入这些方法中的函数会接受三个参数：  
1. 数组每一项的值。  
2. 该项在数组中的位置。  
3. 数组对象本身。  

**缩小方法**  
reduce() 和 reduceRught()  
```
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array) {
    return prev + cur;
});
alert(sum); // 15
```

### 3. Date类型
定义：  
```js
var now = new Date();  
/**
 * Date.parse()
 * 支持的日期格式：
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
**继承的方法**  
toLocaleString(), toString(), valueOf()  
valueOf()返回Date的毫秒值，可用来比较Date大小。  

**日期格式化方法**  
toDateString(), toTimeString(), toLocaleDateString(), toLocaleTimeString(), 
toUTCString()  

**日期/时间组件方法**  
直接取得和设Date中的待定部分。  

### 4. RegExp类型
定义：  
```js

var expression = / pattern / flags ;
```
flags:  
1. g 全局模式（global），即模式将被应用于所有的字符串，而非在发现第一个匹配项时立即停止。
2. i 不区分大小写（case-insensitive）。
3. m 多行模式（multiline），即达到一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。

元字符：  
( \[ { \ ^ | ) ? * + . ] }  

使用RegExp构造函数创建正则表达式：  
```js
var pattern1 = /[bc]at/i;
var pattern2 = new RegExp("[bc]at", "i");
```

ECMAScript5明确规定，使用正则表达式字面量必须像直接调用RegExp构造函数一样，每次都创建新的RegExp实例。  

**RegExp实例属性**  
1. global 布尔值，是否设置了g
1. ignoreCase 布尔值，是否设置了i
1. multiline 布尔值，是否设置了m
1. lastIndex 整数，表示开始搜索下一个匹配项的字符位置，从0开始算起。
1. source 正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。

**RegExp实例方法**  
*exec()*  
exec()接受一个参数，及要应用模式的字符串，然后返回包含第一个匹配项信息的数组;或者在没有匹配项的情况下返回null。  
返回的数组虽然是Array的实例，但额外包含两个属性：index和input：  
* index: 表示匹配项在字符串中的位置。
* input: 表示应用正则表达式的字符串。  

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
对于exec()而言，即使模式中设置了g，每次也只返回一个匹配项。  
在不设置g时，在同一个字符串多次调用exec(),始终返回地一个匹配信息。  
设置了g， 每次调用都会在字符串中查找新的匹配项。  

*test*  
```js
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)) {
    alert("The pattern was matched.");
}
```
正则表达式的valueOf()返回正则表达式本身。  

**RegExp构造函数属性**  
相当于静态属性。  
| 长属性名 | 短属性名 | 说明 |
| ------ | ------ | ------ |
| input | $_ | 最近一次要匹配的字符串 |
| lastMatch | $& | 最近一次的匹配项 |
| lastParen | $+ | 最近一次匹配的捕获组 |
| leftContext | $\` | input字符串中lastMatch之前的文本 |
| multiline | $* | 布尔值，表示是否所有的表达式都使用多行模式。 |
| rightContext | $' | Input字符串中lastMatch之后的文本 |
