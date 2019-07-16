什么是[callbacks](https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/)  
给定任务完成后执行的函数。  
```js
function asyncOperation ( a, b, c, callback ) {
  // ... lots of hard work ...
  if ( /* an error occurs */ ) {
    return callback(new Error("An error has occurred"));
  }
  // ... more work ...
  callback(null, d, e, f);
}

asyncOperation ( params.., function ( err, returnValues.. ) {
   //This code gets run after the async operation gets run
});
```
按照惯例，回调函数的第一个参数是 `error`。  



>"I/O" refers primarily to interaction with the system's disk and network supported by [libuv](http://libuv.org/).  
libuv is a multi-platform support library with a focus on asynchronous I/O.  

```js
const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
    if (readFileErr) throw readFileErr;
    console.log(data);
    fs.unlink('/file.md', (unlinkErr) => {
        if (unlinkErr) throw unlinkErr;
    });
});
```
