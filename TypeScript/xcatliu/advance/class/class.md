# TypeScript 类

## 1. ES6

### 1.1. 属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数

```ts
class Animal {
  public name;
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}
let a = new Animal('Jack');
console.log(a.sayHi());
```

