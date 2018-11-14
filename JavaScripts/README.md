
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
### 1. Object
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
