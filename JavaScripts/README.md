# 一、 Object
### 1. [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
语法：  
Object.keys(obj);  
obj: 要返回其枚举自身属性的对象。  
返回值： 一个表示给定对象的所有可枚举属性的字符串数组。  

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
