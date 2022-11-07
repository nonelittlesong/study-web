// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms, 'done');
//   });
// }
//
// timeout(5000).then((value) => {
//   console.log(value);
// });

console.log('------------------------------- 任何时候都能访问状态');

let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
}); // 立即执行

promise.then(function () {
  console.log('Resolced.');
});

console.log('Hi!');

promise.then(function () {
  console.log('第二次访问 Promise 状态');
});


console.log('------------------------------- 参数函数');

let promise2 = new Promise(function (resolve, reject) {
  resolve(1);
  resolve(2);                              // 无效
  reject(new Error('resolve 后的 reject')); // 无效
  console.log(3);
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log('Catch', err);
});

console.log('参数函数中有多个 resolve');

// 输出
// 3
// 参数函数中有多个 resolve
// 1


console.log('------------------------------- reslove 传递的值');

let promise3 = new Promise(function (resolve, reject) {
  // return 'promise3 传递的值';
  resolve('promise3 传递的值')
}).then(
  value => console.log('promise3.then', value)
).catch(
  err => console.log('promise3.catch', err)
);

console.log('------------------------------- 状态')

let promise4 = new Promise(function (resolve, reject) {
  console.log('promise4 pending');
  throw(new Error());
  return 0;
}).then(
  () => console.log('promise4 resolved')
).catch(
  () => console.log('promise4 rejected')
);

console.log('------------------------------- 未 catch 的错误');

let promise5 = function () {
  return new Promise(function (resolve, reject) {
    // resolve('ok');
    // throw new Error('test'); // ok
    setTimeout(function () {throw new Error('test')}, 0); // Error，会终止程序
  });
};

promise5().then(
  value => console.log('promise5', value)
).catch(
  err => console.log('promise5', err)
);
