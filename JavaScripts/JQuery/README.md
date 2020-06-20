- [jQuery官网](https://api.jquery.com/)
- [RunNoob](https://www.runoob.com/jquery/jquery-tutorial.html)

# 一、 JQuery事件
### 1. [ready() 方法](http://www.w3school.com.cn/jquery/event_ready.asp)
在文档加载后激活函数：  
* $(document).ready(function)
* $().ready(function)
* $(function)

当DOM已经加载，并且页面（包括图像）已经完全呈现时，会发生ready事件。  
由于该事件在文档就绪后发生，因此把所有其他的jQuery事件和函数置于该事件中是非常好的做法。  
提示： **ready()函数不能与\<body onload="">一起使用.**

### 2. [click() 方法](http://www.w3school.com.cn/jquery/event_click.asp)
$(selector).click()  

# 二、 JQuery属性操作
### 1. [val() 方法](http://www.w3school.com.cn/jquery/attributes_val.asp)
val()方法返回或设置被选元素的值。  
* $(selector).val() 返回selector的值。
* $(selector).val(value) 设置selector的值。
* $(selector).val(function(index,oldvalue)) 使用函数设置value属性的值。

```
<html>
<head>
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $("button").click(function(){
    $("input:text").val(function(n,c){
      return c + " Gates";
    });
  });
});
</script>
</head>

<body>
<p>Name: <input type="text" name="user" value="Bill" /></p>
<button>设置文本域的值</button>
</body>
</html>
```

# 三、 [Ajax](https://api.jquery.com/category/ajax/)
## 1、 JQuery.ajax()
语法：  
* `jQuery.ajax(url\[, settings])`
* `jQuery.ajax(\[settings])`

参数：
* url - String类型，发送request的目标。
* settings - PlainObject类型。可以通过`$.ajaxSetup()`设置默认值。
### 参数settings
#### type(default: 'GET')
请求方式。  
#### async(default: true)
发送异步的请求。  
#### url(default: The current page)
发送请求的目标。
#### data
Type: PlainObject, String, Array。  
发送给服务器的数据
#### dataType(default: Intelligent Guess(xml, json, script or html))
Type:String。  
从服务器中返回的数据[MIME](http://www.w3school.com.cn/media/media_mimeref.asp)。  
#### success
Type: Function(Anything data, String textStatus, jqXHR jqXHR)。  

### 例子：
* [echarts+php+mysql实现前后端数据可视化](https://www.jianshu.com/p/29895d280624)

