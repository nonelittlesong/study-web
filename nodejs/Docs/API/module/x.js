// 错误案例，不能延时给 `module.exports` 赋值
setTimeout(() => {
  module.exports = { a: 'hello' };
}, 0);