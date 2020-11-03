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
* [字符串去空格](http://www.hangge.com/blog/cache/detail_1771.html)

```js
"use strict";

let fs = require('fs');

//console.log(xmlitem);
const xmldoc = new DOMParser().parseFromString(xmlitem, 'text/xml');
const pathElements = xmldoc.getElementsByTagName('path');
const imgPath = pathElements[0].firstChild.nodeValue;
const xmlPath = imgPath.substring(0, imgPath.lastIndexOf('.')) + '.xml';
const pathstr = xmlPath.replace(/\r\n/g, "") // 不会修改原字符串
                       .replace(/\n/g, "")
                       .replace(/(^\s*)|(\s*$)/g, "");
//console.log(xmlPath);
// 异步
fs.writeFile(pathstr, xmlitem, (err) => { // 文件不存在会创建
  if (err) console.log(err);
});
// 同步
fs.writeFileSync(xmlPath, xmlitem); // 文件不存在会创建
```

## 3、 删除文件
* [fs.unlinkSync(path)](http://nodejs.cn/api/fs.html#fs_fs_unlinksync_path) - 同步地删除文件或符号链接。
```js
"use strict";

const fs = require('fs');

try {
  fs.unlinkSync(path);
} catch(err) {
  console.log(err);
  //return;/break;/continue;
  throw err;
}

...
```
