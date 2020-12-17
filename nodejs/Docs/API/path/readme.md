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

## 3. 文件名、路径名、后缀

### 3.1 path.basename(path\[, ext])

参数：

- path `<string>` 文件的完整路径
- ext `<string>`  (可选)要去掉的文件后缀

返回值：`<string>` 路径的最后一部分，类似于 Unix 的 `basename`。末尾的分隔符忽略。
