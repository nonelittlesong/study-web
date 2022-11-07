* [ECMAScript 2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/)
* [ECMAScript 6 Features Github](https://github.com/lukehoban/es6features#readme)
* [The Modern JavaScript Tutorial](https://javascript.info/)

## 一、 let、 const和块级作用域

### 1、 let

| | let | var |
| --- | --- | --- |
| 定义变量 | 是 | 是 |
| 可被释放 | 是 | 是 |
| 可被提升（Hoist） | 否 | 是 |
| 重复定义检查 | 是 | 否 |
| 可被用于块级作用域 | 是 | 否 |

#### \# 重复定义检查
当同一个变量在同一个作用域被定义第二次时，会抛出错误。  

#### \# 块级作用域
```js
const arr1 = [];
for (var i = 0; i < 3; ++i) {
  arr1.push(() => i)
}
const arr2 = arr1.map(x => x());

const arr3 = [];
for (let i = 0; i < 3; ++i) {
  arr3.push(() => i);
}
const arr4 = arr3.map(x => x());

console.log('var: ' + arr2.join(', ')); // var: 3, 3, 3
console.log('let: ' + arr4.join(', ')); // let: 0, 1, 2
```

### 2、 [const](https://www.w3school.com.cn/js/js_const.asp)
#### \# 常量对象
* 可以修改常量对象的属性。  
* 不可以对常量对象重新赋值。



## 二、 箭头函数
### 1、 单参数的单行
`arg => statement`  

### 2、 多参数单行
`(arg1, arg2) => statement`  

### 3、 多行
`arg => { ... }`  
`(arg1, arg2) => { ... }`  

### 4、 无参
`() => statement`  


