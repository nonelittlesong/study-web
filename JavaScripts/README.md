
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
```
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
