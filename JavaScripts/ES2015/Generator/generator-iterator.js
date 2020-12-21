console.log('------------------------------- Symbol.iterator');

const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
  return 4;
};

console.log([...myIterable]); // [ 1, 2, 3 ]

myIterable[Symbol.iterator] = function* () {
  yield 'a';
  yield 'b';
  yield 'c';
};

console.log([...myIterable]); // [ 'a', 'b', 'c' ]

console.log('------------------------------- Generator 函数的 Symbol.iterator 属性');

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

const g = gen();
console.log(g[Symbol.iterator]() === g); // true
console.log([...g]);                     // [ 1, 2, 3 ]