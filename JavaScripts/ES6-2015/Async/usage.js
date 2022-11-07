console.log('------------------------------- 定时器')

// 方法 1
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 1000);

// 方法 2
async function timeout2(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint2(value, ms) {
  await timeout2(ms);
  console.log(value);
}

asyncPrint2('hello world 2', 500);

console.log('------------------------------- 使用形式');

// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 箭头函数
const foo2 = async () => {};

// 对象方法
let obj = {
  async foo() {
    // ···
  }
};
obj.foo().then(
  function () {
    // ···
  }
);

// Class 方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}
const storage = new Storage();
storage.getAvatar('jake').then(function (value) {
  console.log(value);
});
