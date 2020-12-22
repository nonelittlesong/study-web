# [NodeJS 文件系统](http://nodejs.cn/api/fs.html)

<details>
<summary>Table of Contents</summary>

- [readdir](https://github.com/nonelittlesong/study-web/tree/master/nodejs/Docs/API/fs/readdir) — 获得指定目录的子文件(夹)
- [async readdir](https://gist.github.com/nonelittlesong/85bda4645c12c3a7f32ca4681f1d772d)

</details>

## 1. 例子
### 1.1. 是否存在

```js
// fs.exists(path, callback) 已弃用
// 不建议在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查文件的存在性。
// 不要在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查文件的可访问性。
// 这样做会引入竞态条件，因为其他进程可能会在两个调用之间更改文件的状态。

if (!fs.existsSync('文件')) {
  console.log('文件夹不存在');
  return;
}
const stats = fs.statSync('文件');
if (!stats.isDirectory()) {
  console.log('不是一个文件夹');
  return;
}
```

### 1.2. 文件信息

stat 可以获得的信息：

待补充···

```js
const fs = require("fs"); //Load the filesystem module
const stats = fs.statSync("myfile.txt");
const fileSizeInBytes = stats.size;
//Convert the file size to megabytes (optional)
const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
```

### 1.3. 写文件

参考：

- [JS String 对象](https://www.w3school.com.cn/jsref/jsref_obj_string.asp)  
- [fs.writeFileSync()](http://nodejs.cn/api/fs.html#fs_fs_writefilesync_file_data_options)
- [fs.existsSync(path)](http://nodejs.cn/api/fs.html#fs_fs_existssync_path)
- [字符串去空格](http://www.hangge.com/blog/cache/detail_1771.html)
- Stream

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

### 1.4. 删除文件

- [fs.unlinkSync(path)](http://nodejs.cn/api/fs.html#fs_fs_unlinksync_path) - 同步地删除文件或符号链接。

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