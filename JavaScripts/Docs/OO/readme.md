# Template
```js
function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

/**
 * SuperType
 */
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

// 方法定义在原型中
SuperType.prototype = {
    sayName: function() {
        alert(this.name);
    }
}

// 将 `constructor` 重新指向 `Person`。
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person
});

/**
 * SubType
 */
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(SubType, SuperType); // 继承原型

SubType.prototype.sayAge = function() {
    alert(this.age);
};
```


# 一、 描述符
## 1. 属性类型
ECMAScript中有两种属性： 数据属性和访问器属性。  
### （1） 数据属性
特性：  
* \[\[Configuraable]]: 表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。默认 ture。
* \[\[Enumerable]]: 表示能否通过for-in循环返回属性。默认 true。
* \[\[Writable]]： 表示能否修改属性的值。 默认 true。
* \[\[Value]]: 包含这个属性的数据值。默认 undefined。

#### 定义属性特性： 
Object.defineProperty()接收三个参数：对象名， 属性名， 特性对象。  
```js
var person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Nicholas"
});
alert(person.name); // "Nicholas"
person.name = "Greg"; // 在非严格模式下，赋值操作将被忽略;在严格模式下，会抛出错误
alert(person.name); // "Nicholas‘
```
把configurable设置为false,表示不能删除属性，如果对这个属性调用delete，在非严格模式下，会忽略删除操作;在严格模式下，会抛出异常。  
一旦把属性定义为不可配置的，就不能再把它改为可配置的。此时，再调用Objetc.defineProperty()方法修改除writable之外的特性，都会抛出异常。 
直接在对象上定义的数据属性，这些特性默认为true; **使用Objetc.defineProperty()，这些特性默认为false**。  

~能否自定义特性？我在node上定义自定义特性时没有报错。~  

### （2） 访问器属性
**访问器属性不能直接定义， 必须使用Object.defineProperty()。**   
访问器属性有以下四个特性：  
* \[\[Configuration]]: 能否delete，能否修改特性，能否把属性修改为数据属性。默认 false。
* \[\[Enumerable]]: 能否通过for-in访问属性。默认 false。
* \[\[Get]]: 在读取属性时调用的函数。默认值为undefined。
* \[\[Set]]: 在写入属性时调用的函数。默认值为undefined。

```js
var book = {
  _year: 2004,
  edition: 1
}
Object.defineProperty(book, "year", {
  get: function() {
    return this._year;
  }
  set: function(newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
});

/**
 * 修改year或_year，会同时影响二者的值
 */
book.year = 2005;
console.log(book._year); // 2005
console.log(book.year);  // 2005
book._year = 2006;
console.log(book._year); // 2006
console.log(book.year);  // 2006

alert(book.edition);
```

## 2. 定义多个属性 `defineProperties`
`configurable`， `enumerable` 和 `writable` 默认为 `false`。  
```js
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get: function() {
      return this._year;
    }
    set: function(newValue) {
      if (newValue>2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
});
```

## 3. 读取属性的特性 `getOwnPropertyDescriptor()`
```js
var book = {};
Object.defineProperties(book, {
  _year: {
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get: function() {
      return this._year;
    },
    set: function(newValue) {
      if (newValue>2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
});
var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
alert(descriptor.value); // 2004
alert(descriptor.configurable); // false
alert(typeof descriptor.get); // "undefined"
var descriptor = Object.getOwnPropertyDescriptor(book, "year");
alert(descritpor.value); // undefined
alert(descriptor.enumerable); // false
alert(typeof descriptor.get); // function
```

# 二、 创建对象
### 1. 工厂模式
用函数来封装创建对象的细节，并返回创建的对象。  

缺点：  
无法知道一个对象的类型。  

### 2. 构造函数模式
```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    alert(this.name);
  };
}
```
要创建Person新实例，必须使用new操作符。以这种方式调用构造函数实际上会经历以下4个步骤：  
1. 创建一个新对象;
2. 将构造函数的作用域赋给新对象（因此this就指向了新对象）;
3. 执行构造函数中的代码（为这个新对象添加属性）;
4. 返回新对象。

**每个对象(包括对象字面量)都有一个constructor属性（共享自prototype），该属性指向构造函数。**  
```js
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
console.log(person1.constructor == Person); // true
console.log(person2.constructor == Person); // true
```

#### （1） 将构造函数当作函数
构造函数和普通函数没有任何语法上的差异：  
* 构造函数不加 `new` 会当作普通函数来执行。
* 普通函数加 `new` 会当作构造函数执行。

```js
// 当作构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName();
// 当作普通函数使用
Person("Greg", 27, "Doctor");
window.sayName();
// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName();
```

#### （2） 缺点
函数的重复实例。  

### 3. 原型模式
* 通过同一个函数创建的实例对象，共享原型对象中的属性和方法。
* 可以用`Object.defineProperty()`定义原型对象的属性。
* `enumerable` 不等于可访问。


#### （1） 理解原型对象
![prototype.png](https://github.com/nonelittlesong/study-resources/blob/master/images/JS/prototype.png)

* `Object.prototype` -> `Object { ... }`
* `object1.__proto__` -> `Object { ... }`
* `Object.prototype.constructor` -> `Object`

和原型相关的方法：  
```js
// isPrototype
alert(Person.prototype.isPrototype(person1)); // true
alert(Person.prototype.isPrototype(person2)); // true
// getPrototypeOf
alert(Object.getPrototypeOf(person1) == Person.protptype); // true
alert(Object.getPrototypeOf(person1).name); // "Nicholas"
// hasOwnProperty
person1.name = "shit";
person1.hasOwnProperty("name"); // true
```
**如果在实例中添加了一个属性，而该属性与实例原型中的一个属性同名。那么我们就会在实例中创建该属性，并屏蔽原型中的那个属性。**  
**使用delete操作符可以删除实例属性，是我们可以重新访问原型属性。**  

>**注：** 对实例调用 `Object.getOwnPropertyDescriptor()` 方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型上调用。  

#### （2） 原型与in操作符
1. in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例还是原型中（包括不可枚举）。  
2. for-in返回的是所有能够通过对象访问、可枚举的属性（包括实例和原型）。
3. Object.keys()取得对象上所有可枚举的实例属性。
4. getOwnPropertyNames()取得所有实例属性（包括不可枚举）。

```js
// Object.keys()
var keys = Object.keys(Person.prototype);
alert(keys); // "name,age,job,sayName"
var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1Keys = Object.keys(p1);
alert(p1Keys); // "name,age"

// Object.getOwnPropertyNames()
var keys = Object.getOwnPropertyNames(Person.prototype);
alert(keys); // "constructor,name,age,job,sayName"
```

#### （3） 更简单的原型语法
```js
function Person() {
}

Person.prototype = {
  constructor: Person, // constructor变成可枚举
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName: function() {
    alert(this.name);
  }
};

// 重设构造函数，不可枚举
function Person() {
}
Person.prototype = { // 本质上重写了 `prototype`， `constructor` 属性指向 `Object`。
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName: function() {
    alert(this.name);
  }
};
Object.defineProperty(Person.prototype, "constructor", { // 将 `constructor` 重新指向 `Person`。
  enumerable: false,
  value: Person
});
```

#### （4） 原型的动态性
* 可以随时为原型添加属性和方法，并且修改能够立即在所有的对象实例中反映出来。
* 重写构造函数指向的原型，对象实例指向的原型不变。

#### （5） 原生对象的原型
不建议修改原生对象的原型。  

#### （6） 原型的问题
原型中的**引用类型属性** 类似于 Java和C中的静态变量。  

### 4. 组合使用构造函数模式和原型模式
最常用。  
构造函数定义实例属性，原型定义共享属性和方法。  

### 5. 动态原型模式
```js
function Person(name, age, job) {
  // 属性
  this.name = name;
  this.age = age;
  this.job = job;
  // 方法
  if (typeof this.sayName != "function") { // 避免重复调用
    Person.prototype.sayName = function() {
      alert(this.name);
    }
  }
}
```
不必用一大堆 `if` 语句检查每个属性和方法;只要检查其中一个即可。  

### 6. 寄生构造函数模式
构造函数在不返回值的情况下，默认会返回新对象实例。  
而**通过在构造函数的末尾添加一个return语句，可以重写调用构造函数时返回的值**。  
```js
function SpecialArray() {
  // 创建数组
  var values = new Array();
  // 添加值
  values.push.apply(values, arguments);
  // 添加方法
  values.toPipedString = function() {
    return this.join(" | ");
  }
  // 返回数组
  return values;
}
var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); // "red|blue|green"
```
有点继承的意味。  

### 7. 稳妥构造函数模式
1. 新创建对象的实例方法不引用this;
2. 不使用new操作符调用构造函数。
```js
function Person(name, age, job) {
  // 创建要返回的对象
  var o = new Object();
  // 可以在这里定义私有变量和函数
  // 添加方法
  o.sayName = function() {
    alert(name);
  };
  // 返回对象
  return o;
}

var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName(); // "Nicholas"
```

# 三、 继承
```
object instanceof constructor
```
检查 `constructor.prototype` 是否存在于 `object` 的原型链上。  

## 1、 原型链
![prototypeChain.png](https://github.com/nonelittlesong/study-resources/blob/master/images/JS/prototypeChain.png)
### \# 原型和实例相关函数
* instanceof
* isPrototypeOf()
### \# 缺点
* 父类的实例属性 成为了 子类的原型属性。
* 没有办法在不影响所有对象实例的情况下，给超类的构造函数传递参数。

## 2、 借用构造函数
为了确保 SuperType 构造函数不会重写子类型的属性，可以在调用超类型构造函数后，再添加应该在子类型中定义的属性。  
### \# 缺点
无法复用，不符合继承的核心价值观。  

## 3、 组合继承

```js
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
    alert(this.name);
};

function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function() {
    alert(this.age);
};
```

### \# 缺点
调用了两次构造函数。  

## 4、 原型式继承
```js
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
```
ES5通过 `Object.create()` 方法规范了原型式继承：  
```js
var person = {
    name: "Nicholas",
    friends: ["Shelly", "Court", "Van"]
}

var anotherPerson = Object.create(person, {
    name: {
        value: "Greg"
    }
});
```
和原型模式一样会共享引用类型属性。  

## 5. 寄生式继承

## 6. 寄生组合式继承
最有效！！

```js
function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
    alert(this.name);
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
    alert(this.age);
};
```
