原因：  
这是因为 blur 事件比 click 事件先触发，而 javascript 为单线程，同一时间只能执行处理一个事件，所以当 blur 处理程序时，导致其后续 click 事件并不会执行。  

解决方案1：  
给 blur 事件延迟触发
```js
var timer;
input.onblur = function() {
  timer = setTimeout(function() {
    console.warn('onblur');
    error.style.display = 'block';
  }, 100);
}
btn.onclick = function() {
  console.warn('onclick');
  clearTimeout(timer);
  error.style.display = 'none';
  popover.style.display = 'none';
 }
```

解决方案2：  
将 click 事件改为 mousedown 事件，让其优先于 blur 事件执行。  
```js
input.onblur = function() {
  console.warn('onblur');
  error.style.display = 'block';
}
 btn.onmousedown = function() {
  console.warn('onmousedown');
  error.style.display = 'none';
  popover.style.display = 'none';
}
```

解决方案3：  
给按钮添加一个 mousedown 事件，在其中执行 event.preventDefault() 阻止浏览器默认事件，这样点击按钮时输入框就不会失去焦点了。  
```js
input.onblur = function() {
  console.warn('onblur');
  error.style.display = 'block';
}
btn.onmousedown = function(e) {
  console.warn('onmousedown');
  e.preventDefault();
}
btn.onclick = function() {
  console.warn('onclick');
  error.style.display = 'none';
  popover.style.display = 'none';
}
```
