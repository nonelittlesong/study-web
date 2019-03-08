# 一、 Object
### 1. [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
语法：  
Object.keys(obj);  
obj: 要返回其枚举自身属性的对象。  
返回值： 一个表示给定对象的所有可枚举属性的字符串数组。  

### 2. [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)  
以**任意顺序**遍历一个对象的可枚举属性。  


# 二、 window
### 1. [setTimeout()](http://www.runoob.com/w3cnote/javascript-settimeout-usage.html)
语法：  
setTimeout(要执行的代码, 等待时间);  
setTimeout(函数, 等待时间);  
返回值：  
返回的ID值可作为clearTimeout()的参数。  
```js
function show_message(msg, t) {
  if (_via_message_clear_timer) {
    clearTimeout(_via_message_clear_timer);
  }
  var timeout = t;
  if (typeof t === 'undefined') {
    timeout = VIA_THEME_MESSAGE_TIMEOUT_MS;
  }
  _via_message_clear_timer = setTimeout(function() {
    document.getElementById('message_panel').innerHTML = ' ';
  }, timeout);
}
```

# 三、 HTMLCanvasElement
### 1. [toDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)
语法：  
```js
canvas.toDataURL(type, encoderOptions);
```
参数：  
* *type* 可选。图片格式。默认是image/png。  
* *encoderOptions* 可选。在指定图片是image/ipeg或image/webp的情况下，可以从0到1的区间内选择图片的质量。如果超出取值范围，取默认值0.92。  

返回值：  
包含dataURI的DOMString。  

# 四、 Image
### 1. [原始宽高](https://www.cnblogs.com/snandy/p/3704218.html)
* naturalWidth
* naturalHeight
