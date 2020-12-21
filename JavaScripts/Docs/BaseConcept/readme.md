# 一、 语法
## 1、 区分大小写
## 2、 标识符
* 第一个字符必须是字母、下划线或美元符号。
* 其他字符可以是字母、下划线、美元符号或数字。

标识符中的字母也可以包含扩展的ASCII或Unicode字母字符。  

## 3、 注释
```js
// 单行注释

/**
 * 多行注释
 */
```

## 4、 严格模式
```js
"use strict"; // 编译指示 pragma

// 可以指定函数在严格模式下执行
function doSomething() {
    "use strict";
}
```

## 5、 语句
* 语句以分号结尾，如果省略分号，则由解析器判断语句结尾。
* 用花括号将多行代码组合到一个代码块。

# 二、 关键字和保留字

# 三、 变量
* 永远不要在局部作用域中省略var定义全局变量。  
* 给未经申明的变量赋值，严格模式下抛出 ReferenceError 错误。

# 四、 数据类型
基本： undefined, null, boolean, number, string
复杂： object

## 4.1 typeof
* 'undefined' - 如果值未定义
* 'boolean' - 布尔值
* 'string' - 字符串
* 'number' - 数字
* 'object' - 对象或null
* 'function' - 函数

## 4.2 Undefined
Undefiend只有一个值： `undefined`。  

包含undefined值的变量和未定义的变量是不一样的：  
```js
var message;

alert(message); // 'undefined'
alert(age);     // ReferenceError
```

**显式地给变量初始化一个非`undefined`的值，是一个明智的选择。**  

## 4.3 Null
Null类型只有一个值： `null`。  

**意在保存对象的变量还没真正保存变量时，应赋予null值。**  

## 4.4 Boolean
两个字面值： `true` 和 `false`。  

转换： `Boolean()`。  


## 4.5 Number