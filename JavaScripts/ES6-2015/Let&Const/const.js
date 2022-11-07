// 彻底冻结对象
const constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  });
}

// 变量声明的 6 中方法
// var function
// let const import class