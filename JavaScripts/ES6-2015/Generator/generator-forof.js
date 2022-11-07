function Obj() {
  this.a = 'a';
  this.b = 'b';
  this.c = 'c';
}

const myObj = new Obj();

// for (let el of myObj) { // TypeError: myObj is not iterable
//   console.log(el);
// }

for (let el in myObj) { // 遍历原生对象的可枚举属性用 for..in
  console.log(el);
}

console.log('------------------------------- fibonacci')

function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

console.log('------------------------------- Iterator 接口');

function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}

// 方案 2
function* objectEntries2() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let june = { first: 'June', last: 'Doe' };

june[Symbol.iterator] = objectEntries2;

for (let [key, value] of june) {
  console.log(`${key}: ${value}`);
}

for (let [key, value] of june) {
  console.log(`${key}: ${value}`);
}