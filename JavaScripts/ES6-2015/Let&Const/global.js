// 获取顶层对象的两种方法
// 方法 1
(typeof window !== 'undefined'
  ? window
  : (typeof process === 'object' &&
     typeof require === 'function' &&
     typeof global === 'object')
    ? global
    : this);
// 方法 2
var getGlobal = function() {
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('unable to locale global object');
}

// see github.com/ljharb/System.global

// 使各个环境中 global 对象都是存在的
// CommonJS
require('system.global/shim')();
// ES6
import shim from 'system.global/shim';
shim()

// 将顶层对象放入变量 global 中
// CommonJS
var global = require('system.global')();
// ES6
import getGlobalES6 from 'system.global';
const globalES6 = getGlobalES6();
