
/**
 * slice() reference
 * 
 * slice() 引用
 */

var slice = Array.prototype.slice;

/**
* Expose `co`
*
* 暴露 `co`
*/

module.exports = co['default'] = co.co = co;


/**
 * Wrap the given generator `fn` into a
 * function that return a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 * 
 * 把 generator 函数 `fn` 封装进
 * 一个返回 promise 的函数中。
 * 
 */

 co.wrap = function (fn) {
   createPromise.__generatorFunction__ = fn;
   return createPromise;
   function createPromise() {
     return co.call(this, fn.apply(this, arguments));
   }
 }

 /**
  * Execute the generator function or a generator
  * and return a promise.
  * 
  * @param {Function} fn
  * @return {Promise}
  * @api public
  */

  function co(gen) {
    var ctc = this;
    var args = slice.call(arguments, 1); // 去掉第一个参数

  }