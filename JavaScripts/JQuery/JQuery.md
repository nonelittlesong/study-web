
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