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

// 为具名函数传递参数
// https://blog.csdn.net/weixin_34128534/article/details/91382233?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.channel_param
