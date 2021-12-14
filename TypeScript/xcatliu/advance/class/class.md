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

### 1.2. 继承

```ts
class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi();
  }
}
let c = new Cat('Tom');
console.log(c.sayHi());
```

### 1.3. 存取器

使用 `getter` 和 `setter` 可以改变属性的赋值和读取的行为：

```ts
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom';              // setter: Tom
console.log(a.name);         // Jack
```

### 1.4. 静态方法

使用 static 方法不需要实例化，直接通过类来调用：

```ts
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a);      // TypeError: a.isAnimal is not a function
```


## 2. ES7

### 2.1. 实例属性

ES6 中实例的属性只能通过构造函数 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

```ts
class Animal {
  name = 'Jack';
  constructor() {}
}

let a = new Animal();
console.log(a.name);
```

### 2.2. 静态属性

ES7 提案中，可以使用 `static` 定义一个静态属性：

```ts
class Animal {
  static num = 42;
  constructor() {}
}

console.log(Animal.num);
```

## 3. TypeScript

### 3.1. `public`, `private` & `protected`

很多时候，我们希望有的属性不能直接存取，这时候要用 `private`：

```ts
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';

// error TS2341: Property 'name' is private and only accessible within class 'Animal'.

// 编译后的代码是
var Animal = (function () {
  function Animal(name) {
    this.name = name;
  }
  return Animal;
})();
var a = new Animal('Jack');
console.log(a.name);
a.name = 'Tom';
```

当构造函数修饰为 `protected` 时，该类只允许被继承：

```ts
class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal('Jack');
// TS2674: Constructor of class 'Animal' is protected and only accessible within the class declaration.
```

### 3.2. 参数属性

访问修饰符和 readonly 还可以使用在构造函数参数，等同于类中定义属性同时给该属性赋值，使代码更加简洁：

```ts
class Animal {
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}
```

### 3.3. readonly

只读属性关键字，只允许出现在属性声明，索引签名或构造函数中。

```ts
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
// TS2540: Cannot assign to 'name' because it is a read-only property.
```

注意，如果 `readonly` 和其他访问修饰符同时存在，必须写在后面：

```ts
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```

### 3.4. 抽象类

抽象类不允许实例化：

```ts
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

let a = new Animal('Jack');
// error TS2511: Cannot create an instance of the abstract class 'Animal'.
```

抽象方法必须被子类实现：

```ts
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating.`);
  }
}

let cat = new Cat('Tom');
// error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
```

