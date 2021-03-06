
# 一、 File API
https://developer.mozilla.org/zh-CN/docs/Web/API/File/Using_files_from_web_applications  
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
* readAsDataURL(file): 读取文件并将文件以数据URI的形式保存在result属性中。
* readAsText(file, encoding): 以纯文本形式读取文件，将读取到的文本保存在result属性中。第二个参数指定编码形式，可选。
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



# 同步问题
input上传文件是异步的,解决方案：  
```js
var chkImportReadyFlag = function(){
    var not_irdy = false;

    for(var key in import_ready_flag){
        console.log("Check import_ready_flag with key: " + key + ", value: " + import_ready_flag[key]);
        if(!import_ready_flag[key]){
            not_irdy = true;   
        }
    }

    if(!not_irdy){
        console.log("ALL JSON files is imported !!");
        console.log("Unblock UI !!");
        //UnblockUI
        $.unblockUI();
    }else{
        //Not Ready call again after 5.0 sec
        setTimeout(chkImportReadyFlag, 5000);
    }
}
```

# 读取文件
### 1. [input file 读取文件内容](https://blog.csdn.net/qq_15253407/article/details/51836782)
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <script src="js/jquery.min.js" type="text/javascript"></script>  
    <script type="text/javascript">        
        if(typeof FileReader == "undified") {
            alert("您老的浏览器不行了！");
        }
        function showDataByURL() {
            var resultFile = document.getElementById("fileDemo").files[0];
            if (resultFile) {
                var reader = new FileReader();                
                
                reader.onload = function (e) {
                    var urlData = this.result;
                    document.getElementById("result").innerHTML += "<img src='" + urlData + "' alt='" + resultFile.name + "' />";
                }; 
                reader.readAsDataURL(resultFile);

            }

        } 
        function showDataByBinaryString() {
              var resultFile = document.getElementById("fileDemo").files[0];
            if (resultFile) {
                var reader = new FileReader();
                //异步方式，不会影响主线程
                
                reader.onload = function(e) {
                    var urlData = this.result;
                    document.getElementById("result").innerHTML += urlData;
                };
                reader.readAsBinaryString(resultFile);

            }
        }
        function showDataByText() {
            var resultFile = document.getElementById("fileDemo").files[0];
            if (resultFile) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var urlData = this.result;
                    document.getElementById("result").innerHTML += urlData;
                };
                reader.readAsText(resultFile,'UTF-8');
            }
        }
    </script>
</head>
<body>
    <input type="file" name="fileDemo" id="fileDemo" multep/>
    <input type="button" value="readAsDataURL" id="readAsDataURL" onclick="showDataByURL();"/>
    <input type="button" value="readAsBinaryString"  id="readAsBinaryString" onclick="showDataByBinaryString();"/>
    <input type="button" value="readAsText"  id="readAsText" onclick="showDataByText();"/>
    <div id="result">

    </div>

</body>
</html>
```

### 2. [获取文件名](https://blog.csdn.net/qq_34845394/article/details/78924183)
html代码：  
```html
<input type="file" id="fileid" onchange="getfilename();"></input>
```
js代码：  
```js
function getfilename() {
  // 方法一
  var file = $("#fileid").val();
  var pos = file.lastIndexOf("\\");
  var aaa = file.substring(pos+1);
  // 扩展名
  var pos2 = aaa.lastIndexOf(".");
  var ccc = aaa.substring(pos2+1);
  
  // 方法二
  var strFileName = file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1"); // 正则表达式获取文件名，不带后缀
  var FileExt = file.replace(/.+\./,""); // 正则表达式获取后缀
  
  // 方法三
  var img = document.getElementById("fileid");
  var imgName = img.files[0].name;
}
```
       
       
# 保存文件
### 1. 通过\<a\>下载文件
```js
function save_data_to_local_file(data, filename) {
  var a = document.createElement('a');
  a.href = URL.createObjectURL(data);
  a.target = '_blank';
  a.download = filename;
  
  // simulate a mouse click event
  var event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  
  a.dispatchEvent(event);
}
```

### 2. [将字符串转化为文本文件，下载到本地](https://www.cnblogs.com/hill-foryou/p/js.html)  
```js
exportRaw('name.txt', 'content...');
function fakeClick(obj) {
  var ev = document.createEvent("MouseEvents");
  ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  obj.dispatchEvent(ev);
}
function exportRaw(name, data) {
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  fakeClick(save_link);
}
```

# Blob

### convert base64/URLEncoded data component to raw binary data held in a string
```js
function dataURItoBlob(dataURI) {
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }
  
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
  // write the bytes of the string to a typed array;
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byeString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ia], {type:mimeString});
}
```

二进制大对象  
https://developer.mozilla.org/zh-CN/docs/Web/API/Blob  
https://www.cnblogs.com/wangfajing/p/7202139.html?utm_source=itdadao&utm_medium=referral  
### 1. 构造函数
Blob(blobParts\[, options])  
返回一个新创建的Blob对象，其内容由参数中给定的数组串联组成。  
### 2. 属性
**Blob.size**  
只读。Blob对象中包含数据的大小（字节）。  
**Blob.type**  
只读。一个字符串，表明该Blob对象包含数据的MIME类型。如果类型未知，则该值为空字符串。  

### 3. 方法
**Blob.slice(\[start\[, end\[, contentType]]])**  
返回一个新的Blob对象，包含了源Blob对象中指定范围的数据。  

### 4. 示例
Blob()构造函数允许用其他对象创建Blob对象。比如，用字符串创建一个blob:  
```js
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)],
                    {type: 'applicaion/json'});
```
使用Blob创建一个指向类型化数组的URL：  
```js
var typedArray = GetTheTypedArraySomehow();
var blob = new Blob([typedArray], {type: "application/octet-binary"});
var url = URL.createObjectURL(blob);
```
从Blob中读取内容的唯一方法是使用FileReader：  
```js
var reader = new FileReader();
reader.addEventListener("loadend", function() {
  // reader.result 包含转化为类型数组的blob
});
reader.readAsArrayBuffer(blob);
```

# 读取图片文件
### 方法一：利用input元素
```js
// 选择图片
function sel_local_images() {
  if (invisible_file_input) {
    invisible_file_input.accept = '.jpg,.jpeg,.png,.bpm';
    invisible_file_input.onchange = store_local_img_ref; // 对选择的图片进行处理
    invisible_file_input.click();
  }
}

// 对选择的图片进行处理
function store_local_img_ref(event) {
  var user_selected_images = event.target.files; // 选取的若干张图片
  var original_image_count = _via_img_count; // 已经的图片数
  
  // 如果图片数原来为0，清空缓存
  if (original_image_count === 0) {
    localStorage.clear();
  }
  
  var discarded_file_count = 0; // 丢弃的图片数
  for (var i = 0; i < user_selected_images.length; ++i) {
    var filetype = user_selected_images[i].type.substr(0, 5); // 文件类型
    if (filetype === 'image') { // 图片
      var filename = user_selected_images[i].name;
      var size     = user_selected_images[i].size;
      var img_id   = _via_get_image_id(filename, size); // 计算图片ID
      
      if (_via_img_metadata.hasOwnProperty(img_id)) {
        // 导入了重复的图片
        if (_via_img_metadata[img_id].fileref) {
          show_message('Image ' + filename + ' already loaded. Skipping!');
        } else {
          _via_img_metadata[img_id].fileref = user_selected_images[i];
          show_message('Regions already exist for file ' + filename + ' !');
        }
      } else {
        _via_img_detadata[img_id] = new ImageMetadata(user_selected_images[i],
                                                      filename,
                                                      size);
        _via_image_id_list.push(img_id);
        _via_img_count += 1;
        _via_reload_img_table = ture;
      }
    } else {
      discarded_file_count += 1;
    }
  }
  
  if (_via_img_metadata) {
    // 显示加载了的图片数
    var status_msg = 'Loaded ' + (_via_img_count - original_image_count) + ' images.';
    // 非图片文件数
    if (discarded_file_count) {
      status_msg += ' (Discarded ' + discarded_file_count + ' non-image files!)';
    }
    show_message(status_msg);
    
    // 显示图片
    if (_via_image_index === -1) {
      show_image(0);
    } else {
      show_image(original_image_count);
    }
    
    // 显示图片列表
    if (!_via_is_loaded_img_list_visible) {
      toggle_img_list();
    }
    
  } else {
    show_message("Please upload some image files!");
  }
}

// 显示图片
function show_image(image_index) {
  if (_via_is_loading_current_image) {
    return;
  }
  
  var img_id = _via_image_id_list[image_index];
  if (!_via_img_metadata.hasOwnProperty(img_id)) {
    return;
  }
  
  via img_filename = _via_img_metadata[img_id].filename;
  var img_reader = new FileReader();
  _via_is_loading_current_image = true; // 正在加载图片
  
  img_reader.addEventListener("loadstart", function(e) {
    img_loading_spinbar(true);
  }, false);
  
  img_reader.addEventListener("progress", function(e) {
  }, false);
  
  img_reader.addEventListener("error", function() {
    _via_is_loading_current_image = false;
    img_loading_spinbar(false);
    show_message("Error loading image " + img_filename + " !");
  }, false);
  
  img_reader.addEventListener("abort", function() {
    _via_is_loading_current_image = false;
    img_loading_spinbar(false);
    show_message("Aborted loading image " + img_filename + " !");
  }, false);
  
  img_reader.addEventListener("load", function() {
    _via_current_image = new Image();
    
    _via_current_image.addEventListener("error", function() {
      _via_is_loading_current_image = false;
      img_loading_spinbar(false);
      show_message("Error loading image " + img_filename + " !");
    }, false);
    
    _via_current_image.addEventListener("abort", function() {
      _via_is_loading_current_image = false;
      img_loading_spinbar(false);
      show_message("Aborted loading image " + img_filename + " !");
    }, false);
    
    // 加载图片
    _via_current_image.addEventListener("load", function() {
      // 更新当前应用的状态
      _via_image_id = img_id;
      _via_image_index = image_index;
      _via_current_image_filename = img_filename;
      _via_current_image_loaded = true;
      _via_is_loading_current_image = false;
      _via_click_x0 = 0; _via_click_y0 = 0;
      _via_click_x1 = 0; _via_click_y1 = 0;
      _via_is_user_drawing_region = false;
      _via_is_window_resized = false;
      _via_is_user_resizing_region = false;
      _via_is_user_moving_region = false;
      _via_is_user_drawing_polygon = false;
      _via_is_region_selected = false;
      _via_user_sel_region_id = -1;
      _via_current_image_width = _via_current_image.naturalWidth;
      _via_current_image_height = _via_current_image.naturalHeight;
      
      // 设置canvas的大小
      var de = document.documentElement;
      canvas_panel_width = de.clientWidth - 230;
      canvas_panel_height = de.clientHeight - 2 * ui_top_panel.offsetHeight;
      _via_canvas_width = _via_current_image_width;
      _via_canvas_height = _via_current_iamge_height;
      var scale_width, scale_height;
      if (_via_canvas_width > canvas_panel_width) {
        // 更改图片大小
        var scale_width = canvas_panel_width / _via_current_image.naturalWidth;
        _via_canvas_width = canvas_panel_width;
        _via_canvas_height = _via_current_image.naturalHeight * scale_width;
      }
      if (_via_canvas_height > canvas_panel_height) {
        var scale_height = canvas_panel_height / _via_canvas_height;
        _via_canvas_height = canvas_panel_height;
        _via_canvas_width = _via_canvas_width * scale_height;
      }
      _via_canvas_width = Math.round(_via_canvas_width);
      _via_canvas_height = Math.round(_via_canvas_height);
      _via_canvas_scale = _via_current_image.naturalWidth / _via_canvas_width;
      _via_canvas_scale_without_zoom = _via_canvas_scale;
      
      // 设置合适的panel大小
      set_all_canvas_size(_via_canvas_width, _via_canvas_height);
      
      // 保证所有的canvas可见
      clear_image_display_area();
      show_all_canvas();
      
      // 在canvas上绘制图片
      _via_img_ctx.clearRect(0, 0, _via_canvas_width, _via_canvas_height);
      _via_img_ctx.drawImage(_via_current_image, 0, 0, _via_canvas_width, _via_canvas_height);
      
      // 刷新panel属性
      update_attributes_panel();
      
      _via_load_canvas_regions(); // 加载框
      _via_redraw_reg_canvas();
      _via_reg_canvas.focus();
      
      img_loading_spinbar(false);
      
      // 更新UI
      _via_reload_img_table = true;
      var img_list_height = document.documentElement.clientHeight/3 + 'px';
      img_lsit_panel.setAttribute('style', 'height: ' + img_list_height);
      if (_via_is_loading_img_list_visible) {
        show_img_list();
      }
    });
    _via_current_image.src = img_reader.result;
  }, false);
  
  if (_via_img_metadata[img_id].base64_img_data === '') {
    // load image from file
    img_reader.readAsDataURL(_via_img_metadata[img_id].fileref);
  } else {
    // load image from base64 data or URL
    img_reader.readAsText(new Blob([_via_image_metadata[img_id].base64_img_data]));
  }
}
```
