什么是[callbacks](https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/)  

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
