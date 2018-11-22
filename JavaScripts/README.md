
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
* splice
