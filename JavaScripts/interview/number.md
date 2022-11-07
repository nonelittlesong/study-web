# Number

## 为什么 Number.MAX_SAFE_INTEGER = 9007199254740991

JS 的 Number 为浮点数，因为[双精度浮点数](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)的尾数部分只有52位，所以能够安全表示的整数范围为：  
-(2<sup>53</sup> - 1) 到 2<sup>53</sup> - 1

参考：

- [Number.MAX_SAFE_INTEGER | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)

