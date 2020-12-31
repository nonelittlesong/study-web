# [类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

## 1. Class 的基本语法

与传统构造函数的不同点：

- ES6 Class 中定义的方法都是「不可枚举」的。
- ES6 Class 必须用 `new` 调用。
- ES6 Class 不存在「变量提升」。这种规定与类的继承有关，必须保证子类在父类之后定义。
- ES6 Class 不能使用 `const/let` 修饰属性和方法。

## 2. this


