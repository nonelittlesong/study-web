参考：  
- [重新加载JS](https://blog.csdn.net/u011140030/article/details/77980364)  
- [jQuery.getScript()](https://www.jquery123.com/jQuery.getScript/)  

## 重新加载js文件
```js
function loadJs(file)
{
    var head = $("head").remove("script[role='reload']");
    $("<scri"+"pt>"+"</scr"+"ipt>").attr({ 
    role:'reload',src:file,type:'text/javascript'}).appendTo(head);
}
```

## 通过添加id
```js
function reloadAbleJSFn(id,newJS)
{
    var oldjs = null; 
    var t = null; 
    var oldjs = document.getElementById(id); 
    if(oldjs) oldjs.parentNode.removeChild(oldjs); 
    var scriptObj = document.createElement("script"); 
    scriptObj.src = newJS; 
    scriptObj.type = "text/javascript"; 
    scriptObj.id = id; 
    document.getElementsByTagName("head")[0].appendChild(scriptObj);
}
```

## jquery 实现
```js
<head>
    <script type="text/javascript" src="../jquery.js"></script> 
    <script type="text/javascript"> 
    $(function()
    {
        $('#loadButton').click(function(){
            $.getScript('new.js',function(){
                newFun('"Checking new script"');//这个函数是在new.js里面的，当点击click后运行这个函数
            });
        });
    }
    </script> 
</head> 
<body> 
    <button type="button" id="loadButton">Load</button>
</body>
```
