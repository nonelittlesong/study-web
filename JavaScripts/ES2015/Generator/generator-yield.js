// // 不能在非 Generator 中使用 yield
//
// // 例 1
// (function () {
//   yield 1; // SyntaxError: Unexpected number
// })();
//
// // 例 2
// var arr = [1, [[2, 3], 4], [5, 6]];
// var flat = function* (a) {
//   a.forEach(item => { // forEach 内的回调函数是一个普通函数，不能使用 yield！
//     if (typeof item !== 'number') {
//       yield* flat(item);
//     } else {
//       yield item; // SyntaxError: Unexpected identifier
//     }
//   });
// };
//
// for (var f of flat(arr)) {
//   console.log(f);
// }
// 改进
const arr = [1, [[2, 3], 4], [5, 6]];

const flat = function* (a) {
  const length = a.length;
  for (let i = 0; i < length; ++i) {
    let item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (let f of flat(arr)) {
  console.log(f); // 1 2 3 4 5 6
}

// 放在其他表达式中。必须加圆括号！
function* demo() {
  // console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + (yield));
  console.log('Hello' + (yield 123));
}

console.log(demo().next()); // { value: undefined, done: false } // 而且不会输出 Helloundefined
console.log(demo().next()); // { value: undefined, done: false }
console.log(demo().next()); // { value: undefined, done: false }

console.log('demo_1');
const demo_1 = demo();
console.log(demo_1.next()); // { value: undefined, done: false }
                           // Helloundefiend
console.log(demo_1.next()); // { value: 123, done: false }
                           // Helloundefined
console.log(demo_1.next()); // { value: undefiend, done: true }

console.log('demo_2');
const demo_2 = demo(); // 输出结果和 demo1 一样
console.log(demo_2.next());
console.log(demo_2.next());
console.log(demo_2.next());

console.log('------------------------------- demo2');

function* demo2() {
  console.log('Hello');
  console.log('Hello' + (yield 1));
  console.log('Hello' + (yield 2));
}

console.log(demo2().next());
// Hello
// { value: 1, done: false }
console.log(demo2()); // Object [Generator] {}
demo2(); // 不会输出 Hello