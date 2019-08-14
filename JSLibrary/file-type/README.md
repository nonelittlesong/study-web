参考：  
* https://www.npmjs.com/package/file-type


# Install
```
npm i file-type
```

# 使用
Node.js:  
```
const readChunk = require('read-chunk');
const fileType = require('file-type');
 
const buffer = readChunk.sync('unicorn.png', 0, fileType.minimumBytes);
 
fileType(buffer);
//=> {ext: 'png', mime: 'image/png'}
```
