# 一、 [yield](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)
`yield` 关键字用来暂停和恢复一个生成器函数（[function*](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)或[遗留的生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/Legacy_generator_function))。  
## 1、 语法
```
[rv] = yield [expression]
```
**`expression`**  
定义通过[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)从生成器函数返回的值。如果省略，则返回`undefined`。  
**`rv`**  
返回传递给生成器的`next()`方法的可选值，以恢复其执行。  

## 2、 描述
`yield` 关键字使生成器函数执行暂停， `yield` 关键字后面的表达式的值返回给生成器的调用者。它可以被认为是一个基于生成器的 `return` 关键字。  

`yield` 关键字返回一个 `IteratorResult` 对象，它有两个属性：  
* `value` - 对 `yield` 表达式求值的结果。
* `done` - 生成器函数是否执行完毕。

一旦遇到 `yield` 表达式，生成器的代码将被暂停执行，直到生成器的 `next()` 方法被调用。  
每次调用生成器的 `next()` 方法时，生成器都会恢复执行，直到达到以下某个值：  
* `yield`，导致生成器再次暂停并返回生成器的新值。下次调用`next()`时，在`yield`之后的语句继续执行。
* [`throw`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/throw)用于从生成器中抛出异常。这让生成器完全停止执行。
* 达到生成器函数结尾。IteratorResult返回value为undefined，并且done为true。
* 达到return语句。IteratorResult返回给调用者，value有return指定，并且done为true。

**如果将参数传递给生成器的 `next()` 方法，则该值将成为生成器当前 `yield` 操作返回的值。**  
```js
function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}

var gen = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
gen.next();             // 0
gen.next('pretzel');    // 1 pretzel
gen.next('california'); // 2 california
gen.next('mayonnaise'); // 3 mayonnaise
```

**Generators 不可构造：**  
```js
function* f() {}
var obj = new f; // throws "TypeError: f is not a constructor
```


## 3、 例子
### \# yield*
```js
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```

### \# Generators 的 return 语句
```js
function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

### \# Generators 作为对象的属性
```js
const someObj = {
  *generator () {
    yield 'a';
    yield 'b';
  }
}

const gen = someObj.generator()

console.log(gen.next()); // { value: 'a', done: false }
console.log(gen.next()); // { value: 'b', done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### \# [Generator as a computed property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*#Generator_as_a_computed_property)
```js
class Foo {
  *[Symbol.iterator] () {
    yield 1;
    yield 2;
  }
}

const SomeObj = {
  *[Symbol.iterator] () {
    yield 'a';
    yield 'b';
  }
}

console.log(Array.from(new Foo)); // [ 1, 2 ]
console.log(Array.from(SomeObj)); // [ 'a', 'b' ]
```

