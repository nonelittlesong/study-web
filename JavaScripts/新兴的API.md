# 一、 File API
HTML5在DOM中添加了files集合。每个File对象都有下列只读属性：  
* name
* size
* type
* lastModifiedDate

```js
var fliesList = document.getElementById("files-list");
EventUtil.addHandler(filesList, "change", function(event) {
  var files = EventUtil.getTarget(event).files,
      i = 0,
      len = files.length;
  while (i < len) {
    console.log(files[i].name + " (" + files[i].type + ", " + files[i].size + " bytes) ");
    i++;
  }
});
```

### 1. FileReader类型
FileReader类型实现的是一种异步文件读取机制。  
读取文件的方法：  
* readAsText(file, encoding): 以纯文本形式读取文件，将读取到的文本保存在result属性中。第二个参数指定编码形式，可选。
* readAsDataURL(file): 读取文件并将文件以数据URI的形式保存在result属性中。
* readAsBinaryString(file): 读取文件并将一个字符串保存在result属性中，字符串中的每个字符表示一个字节。
* readAsArrayBuffer(file): 读取文件并将一个包含文件内容的ArrayBuffer保存在result属性中。

事件：  
* progress: 每过50ms左右，会触发一次progress事件，通过事件对象可以获得与XHR的progress事件相同的信息（属性）：lengthComputable、loaded和total。另外，尽管可能没有包含全部数据，但每次progress事件都可以通过FileReader的result属性读取到文件内容。  
* error: 由于种种原因无法读取文件，会触发error事件。触发error事件时，相关的信息将保存到FileReader的error属性中。这个属性中将保存一个对象，该对象只有一个属性code：  
  * 1 问找到文件
  * 2 安全性错误
  * 3 读取中断
  * 4 文件不可读
  * 5 编码错误
* load: 文件加载成功后会触发load事件。  
* abort: 如果想中断读取过程，可以调用abort()方法，这样就会出发abort事件。  
* loadend: 在出发load、error或abort事件后，会触发另一个事件loadend。  

### 2. 读取部分内容
slice():  
```js
function blobSlice(blob, startByte, length) {
  if (blob.slice) {
    return blob.slice(startByte, length);
  } else if (blob.webkitSlice) {
    return blob.webkitSlice(startByte, length);
  } else if (blob.mozSlice) {
    return blob.mozSlice(startByte, length);
  } else {
    return null;
  }
}
```
Blob: 两个属性size和type。  

### 3. 对象URL
创建：  
```js
function createObjectURL(blob) {
  if (window.URL) {
    return window.URL.createObjectURL(blob);
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(blob);
  } else {
    return null;
  }
}
```
显示图像：  
```js
var filesList = document.getElementById("files-list");
EventUtil.addHandler(filesList, "change", function(event) {
  var info = "",
      output = document.getElementBuId("output");
      progress = document.getElementById("progress");
      files = EventUtil.getTarget(event).files,
      reader = new FIleReader(),
      url = createObjectURL(files[0]);
  if (url) {
    if (/image/.test(files[0].type)) {
      output.innerHTML = "<img src=\"" + url + "\">";
    } else {
      output.innerHTML = "Not an images. ";
    }
  } else {
    output.innerHTML = "Your browser doesn't support object URLs. ";
  }
});
```
释放：  
```js
function revokeObjectURL(url) {
  if (window.URL) {
    window.URL.revokeObjectURL(url);
  } else if (window.webkitURL) {
    window.webkitURL.revokeObjectURL(url);
  }
}
```

### 4. 读取拖放的文件
```js
var droptarget = document.getElementById("droptarget");
function handleEvent(event) {
  var info = "",
      output = document.getElementById("output"),
      files, i, len;
  
  EventUtil.preventDefault(event);
  
  if (event.type == "drop") {
    files = event.dataTransfer.files;
    i = 0;
    len = files.length;
    
    while (i < len) {
      info += files[i].name + " (" + files[i].type + ", " + files[i].size + " bytes)<br>";
      i++;
    }
    
    output.innerHTML = info;
  }
}

EventUtil.addHandler(droptarget, "dragenter", handleEvent);
EventUtil.addHandler(droptarget, "dragover", handleEvent);
Event.addHandler(droptarget, "drop", handleEvent);
```

### 5. 使用XHR上传文件
FromData:  
```js
var droptarget = document.getElementById("droptarget");

function handleEvent(event) {
  var info = "",
      output = document.getElementById("output"),
      data, xhr,
      files, i, len;
      
  EventUtil.preventDefault(event);
  if (event.type == "drop") {
    data = new FormData();
    files = event.dataTransfer.files;
    i = 0;
    len = files.length;
    
    while (i < len) {
      data.append("file" + i, files[i]);
      i++;
    }
    
    xhr = new XMLHttpRequest();
    xhr.open("post", "FileAPIExample06Upload.php", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        alert(xhr.responseText);
      }
    };
    xhr.send(data);
  }
}

EventUtil.addHandler(droptarget, "dragenter", handleEvent);
EventUtil.addHandler(droptarget, "dragover", handleEvent);
Event.addHandler(droptarget, "drop", handleEvent);
```
