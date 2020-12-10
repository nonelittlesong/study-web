# [path](https://nodejs.org/dist/latest-v14.x/docs/api/path.html)

## 1. 路径拼接

### 1.1 path.join(\[...paths])
参数为空或空字符串会返回 `'.'`。  
```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// Throws 'TypeError: Path must be a string. Received {}'
```

## 2. 属性

### 2.1 分隔符 path.sep
- windows 系统 `'\'`  
- POSIX 系统 `'/'`
