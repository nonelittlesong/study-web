# join 与 resolve 的区别
## 1、 连接路径： `path.join([path1][, path2][, ...])`
`path.join()` 方法可以连接任意多个路径字符串。  
`path.join()` 方法在接边路径的同时也会对路径进行规范化。例如：  
```js
var path = require('path');
//合法的字符串连接
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// 连接后
'/foo/bar/baz/asdf'

//不合法的字符串将抛出异常
path.join('foo', {}, 'bar')
// 抛出的异常
TypeError: Arguments to path.join must be strings'
```

## 2、 路径解析： `path.resolve([from ...], to);
`path.resolve()` 方法可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在（resolve()方法不会利用底层的文件系统判断路径是否存在，而只是进行路径字符串操作）。例如：  
```js
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
```
相当于  
```
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd
```
例子：  
```js
path.resolve('/foo/bar', './baz')
// 输出结果为
'/foo/bar/baz'
path.resolve('/foo/bar', '/tmp/file/')
// 输出结果为
'/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// 当前的工作路径是 /home/itbilu/node，则输出结果为
'/home/itbilu/node/wwwroot/static_files/gif/image.gif'
```

## 3、 对比
```js
const path = require('path');
let myPath = path.join(__dirname,'/img/so');
let myPath2 = path.join(__dirname,'./img/so');
let myPath3 = path.resolve(__dirname,'/img/so');
let myPath4 = path.resolve(__dirname,'./img/so');
console.log(__dirname);           //D:\myProgram\test
console.log(myPath);     //D:\myProgram\test\img\so
console.log(myPath2);   //D:\myProgram\test\img\so
console.log(myPath3);   //D:\img\so
console.log(myPath4);   //D:\myProgram\test\img\so
```
