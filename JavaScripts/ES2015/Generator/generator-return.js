function* numbers() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}

const g = numbers();
console.log(g.next());    // { value: 1, done: fasle }
console.log(g.next());    // { value: 2, done: fasle }
console.log(g.return(7)); // { value: 4, done: fasle }
console.log(g.next());    // { value: 5, done: fasle }
console.log(g.next());    // { value: 7, done: true }