http://stuk.github.io/jszip/  

Examples：  
https://blog.csdn.net/sujun10/article/details/76038886  
# 基本操作
创建一个JSZip的实例：
```js
var zip = new JSZip();
```
在这个实例上，我们可以使用.file(name, content)和.folder(name)来添加（更新）文件和文件夹。他们返回当前的JSZip实例，以便您可以链接调用。  
```js
// create a file
zip.file("Hello.txt", "Helloafasfasgd");
// oops, cat on keyboard. Fixing!
zip.file("Hello.txt", "Hello World\n");
// create a file and a folder
zip.file("nested/hello.txt", "Hello World\n");
// same as
zip.folder("nested").file("hello.txt", "Hello World\n");
```
使用.folder(name)，返回的对象具有不同的根： 如果在此对象上添加文件，则将他们放在创建的子文件夹中。  

可以使用.file(name)访问文件内容：  
```js
zip.file("hello.txt").async("string").then(function(data){
  // data is "Hello World\n"
});

if (JSZip.support.uint8array) {
  zip.file("hello.txt").async("uint8array").then(function(data){
    // data is Uint8Array{0=72,1=101,2=108,more...}
  });
}
```

.remove(name)删除文件或文件夹：  
```js
zip.remove("photos/README");
zip.remove("photos");
// same as
zip.remove("photos"); // 删除文件夹包括其内容
```

# 生成一个zip文件
使用.generateAsync(options)或.generateNodeStream(options)可以生成一个zip文件（不是一个真实的文件，存在内存中）。  
```js
var promise = null;
if (JSZip.support.uint8array) {
  promise = zip.generateAsync({type: "uint8array"});
} else {
  promise = zip.generateAsync({type: "string"});
}
```

# 读zip文件
使用.loadAsync(data)可以加载zip文件。  
```js
var new_zip = new JSZip();
new_zip.loadAsync(content).then(function(zip) {
  // you now have every files contained in loaded zip
  new_zip.file("hello.txt").async("string");
});
```

# forEach(callback)
Call a callback function for each entry at this folder level.  
回调函数签名：`function (relativePath, file) {...}`  

| 参数名 | 类型 | 描述 |
| --- | --- | --- |
| relativePath | string | 带路径的文件名，相对于当前文件夹 |
| file | ZipObject | 当前文件 |

例子：  
```js
var zip = new JSZip();
zip.file("package.json", "...");
zip.file("lib/index.js", "...");
zip.file("test/index.html", "...");
zip.file("test/asserts/file.js", "...");
zip.file("test/asserts/generate.js", "...");

zip.folder("test").forEach(function (relativePath, file){
    console.log("iterating over", relativePath);
});

// will display:
// iterating over index.html
// iterating over asserts/
// iterating over asserts/file.js
// iterating over asserts/generate.js
```
