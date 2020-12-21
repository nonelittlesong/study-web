// 函数变量和循环变量有各自单独的作用域

for (let i = 0; i < 5; i++) {
  let i = 5;
  console.log(i); // 5 5 5 5 5
}

console.log('------------------------------- Temporal Dead Zone');

let tmp = 123;

{
  // tmp = 'abc'; // ReferenceError: Cannot access 'tmp' before initialization
  let tmp;
}

// typeof 不再安全
// typeof tdz_x; // ReferenceError: Cannot access 'tdz_x' before initialization
// let tdz_x;

// 参数死区
function tdz_bar(x = y, y = 2) {
  return [x, y];
}
tdz_bar();
