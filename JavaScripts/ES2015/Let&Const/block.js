// IIFE
(function () {
  var tmp = '···';
  console.log(tmp);
}());

// 块级作用域
{
  let tmp = '···';
  console.log(tmp);
}

// 提案
// let x = do {
//   let t = 1;
//   t * t + 1;
// };
