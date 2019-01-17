
# 一、 JQuery事件
### 1. [ready() 方法](http://www.w3school.com.cn/jquery/event_ready.asp)
在文档加载后激活函数：  
* $(document).ready(function)
* $().ready(function)
* $(function)

当DOM已经加载，并且页面（包括图像）已经完全呈现时，会发生ready事件。  
由于该事件在文档就绪后发生，因此把所有其他的jQuery事件和函数置于该事件中是非常好的做法。  
提示： **ready()函数不能与\<body onload="">一起使用.**

