* [The Modern JavaScript Tutorial](https://github.com/nonelittlesong/study-web/edit/master/JavaScripts/README.md)
* [MDN Web API](https://developer.mozilla.org/zh-CN/docs/Web/API)

# [document](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)
## 2、 方法
### [querySelector(selectors)]
- 返回值 >> 匹配的第一个Element对象。



# Event
### 1、 stopPropagation()
阻止捕获和冒泡阶段当前事件的进一步传播。  
### 2、 currentTarget
事件的当前目标。  


# HTMLCanvasElement
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

# [HTMLElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement)
## 1、 demensions
都是只读！  

demensions-client:  
![demensions-client.png](https://github.com/nonelittlesong/study-resources/blob/master/images/JS/Dimensions-client.png)  

demensions-offset:  
![demensions-offset.png](https://github.com/nonelittlesong/study-resources/blob/master/images/JS/Dimensions-offset.png)

- clientLeft & clientTop  
  表示元素左边框和上边框的宽度。  
- offsetLeft & offsetTop  
  左上角相对于 `HTMLElement.offsetParent` 的偏移量。 `transform` 不会影响这个值。  
  
# Image
### 1. [原始宽高](https://www.cnblogs.com/snandy/p/3704218.html)
* naturalWidth
* naturalHeight


# Object
### 1. [Object.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
语法：  
Object.keys(obj);  
obj: 要返回其枚举自身属性的对象。  
返回值： 一个表示给定对象的所有可枚举属性的字符串数组。  

### 2. [for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)  
以**任意顺序**遍历一个对象的可枚举属性。  


# window
### 1. [setTimeout()](http://www.runoob.com/w3cnote/javascript-settimeout-usage.html) & [setInterval()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval)
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
  


