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
