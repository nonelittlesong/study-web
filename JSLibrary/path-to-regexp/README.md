将路径字符串（如 /user/:name）转化为正则表达式。  

- [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)

## 安装
```
yarn add path-to-regexp
```

## 使用
```js
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");
 
// pathToRegexp(path, keys?, options?)
// match(path)
// parse(path)
// compile(path)
```
- path - 字符串，字符串数组，或正则表达式。  
- keys - 
