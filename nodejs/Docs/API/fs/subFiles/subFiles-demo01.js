// https://blog.csdn.net/liyazhen2011/article/details/87342769

// ---------------------------------------------- 获取所有文件

/**
 * 异步
 */

var path = require("path");
var fs = require("fs");
var dirs = [];
var pathName = "E:/test";

// 错误示范，注意异步函数
fs.readdir(pathName, function(err, files){
  for (var i=0; i<files.length; i++) // 注意！循环内调用异步函数
  {
    fs.stat(path.join(pathName, files[i]), function(err, data){     
      if(data.isFile())
      {               
        dirs.push(files[i]);
      }
    });
  } 
console.log(dirs);  
});

// 修改后的代码
fs.readdir(pathName, function(err, files){
  var dirs = [];
  (function iterator(i){ // 利用递归
    if(i == files.length) {
      console.log(dirs);
      return ;
    }
    fs.stat(path.join(pathName, files[i]), function(err, data){     
      if(data.isFile()){               
        dirs.push(files[i]);
      }
      iterator(i+1);
    });   
  })(0);
});

// ---------------------------------------------- 获取所有文件夹

