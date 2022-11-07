let methodName = 'getArea';
let propertyName = 'Z';

class Point {
  [propertyName] = 'Z';

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

  getX() {
    return this.x;
  }

  [methodName]() {
    return '类的属性名可以使用表达式';
  }
}

console.log(`typeof Point: ${typeof Point}`);
console.log(`Point === Point.prototype.constructor: ${Point === Point.prototype.constructor}`);

// Class 中定义的方法都是不可枚举的
let point1 = new Point(1, 2);

console.log(`Object.keys(point1): ${Object.keys(point1)}`);                   // x,y
console.log(`Object.keys(Point): ${Object.keys(Point)}`);                     //
console.log(`Object.keys(Point.prototype): ${Object.keys(Point.prototype)}`); //

console.log(`Object.getOwnPropertyNames(point1): ${Object.getOwnPropertyNames(point1)}`);                   // x,y
console.log(`Object.getOwnPropertyNames(Point): ${Object.getOwnPropertyNames(Point)}`);                     // length,prototype,name
console.log(`Object.getOwnPropertyNames(Point.prototype): ${Object.getOwnPropertyNames(Point.prototype)}`); // constructor,toString

// Class 直接调用实例属性
console.log(Point.prototype.getX()); // undefined
// console.log(Point.getX());        // Point.getX is not a function

// Class 属性名采用表达式
console.log(Point.prototype.getArea()) // '类的属性名可以使用表达式'
console.log(point1.Z);                 // 'Z'

// Class 必须用 new 调用
// Point(); // TypeError: Class constructor Point cannot be invoked without 'new'


console.log('------------------------------- Class 表达式');

const MyClass = class Me {
  getClassName() {
    return Me.name;
  }

  getClassLength() {
    return Me.length;
  }
}

let inst = new MyClass();
console.log(`inst.getClassName(): ${inst.getClassName()}`);     // Me
// console.log(`Me.name: ${Me.name}`); // ReferenceError: Me is not defined
console.log(`MyClass.name: ${MyClass.name}`);                   // Me

// Me 只能在 Class 内部使用
// 如果 Class 内没有用到 Me，可以省略 Me
// const MyClass = class { /* ··· */};

// 立即执行的 Class
let person = new class He { // class 内没用到 He，可以省略 He
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }

  sayClassName() {
    console.log(He.name);
  }
}('张三');

person.sayName();      // 张三
person.sayClassName(); // He

console.log('------------------------------- 私有方法');

// @todo

console.log('------------------------------- this');

class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`); // this 指向方法运行时所在的环境
    // 必须加 this
    // print(`Hello ${name}`);   // ReferenceError: print is not defined
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName, printName2 } = logger;

logger.printName(); // Hello there
// printName();     // TypeError: Cannot read property 'print' of undefined

// 解决方案 1，构造函数中使用 bind 绑定 this
// 解决方案 2，构造函数中使用箭头函数
// 解决方案 3，使用 Proxy

function selfish(target) {
  const cache = new WeakMap();
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());