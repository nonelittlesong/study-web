# 基本概念

## 1. 语法

## 1.1. 标识符

- 第一个字符必须是字母、下划线或美元符号。
- 其他字符可以是字母、下划线、美元符号或数字。
- 用 RegExp 表示 ``。

标识符中的字母也可以包含扩展的 ASCII 或 Unicode 字母字符。

## 1.2. 严格模式

```js
"use strict"; // 编译指示 pragma

// 可以指定函数在严格模式下执行
function doSomething() {
  "use strict";
}
```

## 2. 关键字和保留字

待补充···

## 3. 变量

- 永远不要在局部作用域中省略 var 定义全局变量。
- 给未经申明的变量赋值，严格模式下抛出 ReferenceError 错误。

## 4. 数据类型

基本：

- ES5 — undefined, null, boolean, number, string
- ES6 — symbol, bigint

## 4.1. typeof

- 'undefined' - 如果值未定义
- 'boolean' - 布尔值
- 'string' - 字符串
- 'number' - 数字
- 'object' - 对象或 null
- 'function' - 函数

## 4.2. Undefined

Undefiend 只有一个值： `undefined`。

包含 undefined 值的变量和未定义的变量是不一样的：

```js
var message;

alert(message); // 'undefined'
alert(age);     // ReferenceError
```

**显式地给变量初始化一个非 `undefined` 的值，是一个明智的选择。**

## 4.3. Null

Null 类型只有一个值： `null`。

**意在保存对象的变量还没真正保存变量时，应赋予 null 值。**

## 4.4. Boolean

两个字面值： `true` 和 `false`。

转换： `Boolean()`。  

## 4.5 Number

待补充···