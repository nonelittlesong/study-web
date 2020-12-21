// 获取 this 上的方法

function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

var obj = {};
var f = F.call(obj);

console.log(f.next()); // { value: 2, done: false }
console.log(f.next()); // { value: 3, done: false }
console.log(f.next()); // { value: undefined, done: true }

console.log(obj.a); // 1
console.log(obj.b); // 2
console.log(obj.c); // 3

// 统一

function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F2() {
  return gen.call(gen.prototype);
}

var f2 = new F2();

console.log(f2.next());
console.log(f2.next());
console.log(f2.next());

console.log(f2.a);
console.log(f2.b);
console.log(f2.c);
