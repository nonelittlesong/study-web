function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

const hw = helloWorldGenerator();

console.log(hw.next()); // { value: 'hello', done: false }
console.log(hw.next()); // { value: 'world', done: false }
console.log(hw.next()); // { value: 'ending', done: true }
console.log(hw.next()); // { value: undefined, done: true }

console.log('------------------------------- next 的 参数');

function* f() {
  for (let i = 0; true; ++i) {
    let reset = yield i;
    if (reset) { i = -1; }
  }
}

const g = f();

console.log(g.next(1));     // { value: 0, done: false } // 第一次输入的值会被忽略
console.log(g.next());      // { value: 1, done: false }
console.log(g.next(true));  // { value: 0, done: false }

console.log('------------------------------- 封装 Generator');

function wrapper(generatorFunction) {
  return function(...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!');