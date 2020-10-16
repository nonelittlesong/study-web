# 整数补零

参考：  
- [JS 整数补零 - CSDN](https://blog.csdn.net/Bule_daze/article/details/106418498)  

## [padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)  
`padStart()` 用另一个字符串填充当前字符串，以达到指定长度。  

```js
const str1 = '5';

console.log(str1.padStart(2, '0'));
// expected output: "05"

const fullNumber = '203439902125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

console.log(maskedNumber);
// expected output: "************5581"
```

语法：  
```js
str.padStart(targetLength[, padString])
```

参数：  
- `targetLength` - 如果长度小于字符串本身，则返回原来的字符串。  
- `padString` - 填充字符串，默认 " "（U+0020)。如果字符串太长，使填充后的字符串超过了目标长度，则只保留最左侧的部分，其他部分会截断。  

### 示例
```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

## [padEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
末尾填充。  

### 示例
```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

## Ployfill
如果原生环境不支持该方法，在其他代码之前先运行下面的代码，将创建  
`String.prototype.padStart()` 和 `String.prototype.padEnd()` 方法。  
```js
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString: ''));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0,targetLength);
        }
    };
}
```
