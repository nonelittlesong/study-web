* http://nodejs.cn/api/fs.html

# 例子
## 1、 文件信息
```js
const fs = require("fs"); //Load the filesystem module
const stats = fs.statSync("myfile.txt");
const fileSizeInBytes = stats.size;
//Convert the file size to megabytes (optional)
const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
```

## 2、 写文件
参考：  
* [JS String 对象](https://www.w3school.com.cn/jsref/jsref_obj_string.asp)  
* [fs.writeFileSync()](http://nodejs.cn/api/fs.html#fs_fs_writefilesync_file_data_options)
* [fs.existsSync(path)](http://nodejs.cn/api/fs.html#fs_fs_existssync_path)

同步：  
```js
"use strict";

let fs = require('fs');

//let xmlPath = imgPath.substring(0, lastIndexOf('.')) + '.xml';
let xmldoc = new DOMParser().parseFromString(data, 'text/xml');
let pathElements = xmldoc.getElementsByTagName('path');
let xmlPath = pathElements[0].firstChild.nodeValue;

fs.writeFileSync(xmlPath, data); // 文件不存在会创建文件
```
