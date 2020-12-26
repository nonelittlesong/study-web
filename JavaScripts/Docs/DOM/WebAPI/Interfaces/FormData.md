构建一系列键值对，可以被 [`XMLHttpRequest.send()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) 发送。编码为 `multipart/form-data`。  

如果想构建一个简单的 GET 请求，可直接传递给 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)。  

实现了 `FormData` 的对象可以直接用 `for...of`，不需要 [`entries()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries):  
`for (var p of myFormData)` 和 `for (var p of myFormData.entries())` 的效果一样。  

## 方法
### FormData.append()
```js
formData.append(name, value);
formData.append(name, value, filename);
```

- `name` - 域名。它的数据保存在 `value` 中。
- `value` - 域的值。可以是 `USVString` 或 [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/append)（包括子类 [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File)）。
- `filename`
  - 当第二个参数是 `Blob`，默认是 "blob"。
  - 当第二个参数是 `File`，默认是文件名。
  
>**注：** 如果给 `FormData` 添加 `Blob` 数据，文件名会被放在请求头 "Content-Disposition" 中（不同浏览器有差异）。  

## 例子

### 1、 append
和常规表单数据一样，可以同一个 `name` 多个 `value`。  
```js
// 为了和 PHP 命名习惯一致，名称中加了[]
formData.append('userpic[]', myFileInput1.files[0], 'chris1.jpg');
formData.append('userpic[]', myFileInput2.files[0], 'chris2.jpg');
```

### 2、 上传图片
参考：  
- [FormData 实现图片上传](https://www.cnblogs.com/shapeY/p/7903414.html) by Shapeying

构造 formData:  
```js
//1
var formData = new FormData(formDOM);


//2
var formData = new FormData();
formData.append(name , value , fileName)
```

创建 input 的 formData 对象：  
```js
var fileInput = document.querySelector('.input-file');
var files = fileInput.files

var formData = new FormData(); //创建formData对象

//判断数据 若有 则添加数据
if(files.length > 0){
  [].slice.call(files).forEach(function(value,index){
    formData.append('img' + index,value,value.name) //遍历添加数据
  })
}else {
  alert('请先选择图片');
  return false;
}
```

>**注：** 查看 FormData 对象数据要用 `get()` 或 `getAll()` 方法，直接打印是 {}。  

后端：  
```js
formidable = require('formidable'); //载入formidable
var express = require('express');
var app = express();

app.use(express.static('src',{   // 静态资源中间件
  setHeaders : function(res,path,stat){
    res.setHeader('Cache-Control', 'max-age=' + 6000);
  }
}));

app.post('/upload',function(req,res){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = './src/images';
  form.keepExtensions = true;

  form.parse(req,function(err,field,files){
    console.log(files);
  });
  res.send({
    'msg':'upload file'
  });
});

var server = app.listen(8081, function(){
  console.log('服务器已启动!');
});
```

原生上传：  
```js
var httpDemo = new XMLHttpRequest(); //创建httprequest对象
      
httpDemo.open('post','/upload',true); //初始化请求  post方式  接口  异步
httpDemo.onload = function(e){
  console.log(e);
}
      
httpDemo.send(formData);  //发送请求
```

`$.ajax()` 上传：  
```js
$.ajax({
  url : '/upload',
  type:'POST',
  data: formData,
  processData:false,
  contentType:false,
  success:function(data,textStatus,jqXHR){

  },
  error:function(jqXHR,textStatus,error){

  }
})
```
>**注意：**  
>`processData` 会默认将 data 转化为字符串，所以需要配置为 `false`，不进行处理。  
>`contentType` 默认值为 `'application/x-www-form-urlencoded; charset=UTF-8'`。上传文件时， Content-Type 应该为 multipart/form-data。但是设置为 multipart/form-data 也还是会失败。只有设置为 false 才可以。  

`axios` 上传：  
```js
// 设置好 header 即可
headers: {
  'Content-Type': 'multipart/form-data'
},
```
