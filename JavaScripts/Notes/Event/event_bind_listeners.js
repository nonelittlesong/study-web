// addEventListener 可同时绑定多个监听对象
// onXXX 同一时刻只能指向唯一一个对象

let a = 5;
window.addEventListener('keydown', (ev) => {
  let b = a;
  if (ev.which === 13) {
    console.log(b);
  }
});

a = 6;
window.addEventListener('keydown', (ev) => {
  let b = a;
  if (ev.which === 13) {
    console.log(b);
  }
});

// 输出
// 6
// 6
