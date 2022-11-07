// Promise
function chainAnimationsPromise(elem, animations) {
  // 变量 ret 用来保存上一个动画的返回值
  var ret = null;

  // 新建一个空的 Promise
  var p = Promise.resolve();

  // 使用 then() 方法，添加所有动画
  for (var anim of animations) {
    p = p.then(function (val) {
      ret = val;
      return anim(elem);
    });
  }

  // 返回一个部署了错误捕获机制的 Promise
  return p.catch(function (e) {
    // 忽略错误，继续执行
  }).then(function () {
    return ret;
  })
}

// Generator
function chainAnimationsGenerator(elem, animations) {
  return spawn(function* () { // spawn 自动执行器
    var ret = null;
    try {
      for (var anim of animations) {
        ret = yield anim(elem);
      }
    } catch (e) {
      // 或略错误，继续执行
    }
    return ret;
  });
}

// Async
async function chainAnimationsAsync(elem, animations) {
  var ret = null;
  try {
    for (var anim of animations) {
      ret = await anim(elem);
    }
  } catch (e) {
    // 忽略错误，继续执行
  }
  return ret;
}
