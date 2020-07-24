
## Delegate
jquery  
```js
$(document).on(eventName, elementSelector, handler);
```

IE8+  
```js
document.addEventListener(eventName, function (e) {
  // loop parent nodes from the target to the delegation node
  for (var target = e.target; target && target != this; target = target.parentNode)
    if (target.matches(elementSelector)) {
      handler.call(target, e);
      break;
    }
  }
}, false);
```


## Off & On
jquery  
```js
$(el).off(eventName, eventHandler);
$(el).on(eventName, eventHandler);
```

IE9+  
```js
el.removeEventListener(eventName, eventHandler);
el.addEventListener(eventName, eventHandler);
```


## Ready
jquery  
```js
$(document).ready(function() {

});
```

IE9+  
```js
function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
```


## Trigger
alternatives  
- [EventEmitter](https://github.com/Olical/EventEmitter)  
- [Vine](https://github.com/arextar/Vine)  
- [microevent](https://github.com/jeromeetienne/microevent.js)  

jquery  
```js
// custom
$(el).trigger('my-event', {some: 'data'});
// native
$(el).trigger('change');
```

IE9+  
```js
if (window.CustomEvent && typeof window.CustomEvent === 'function') {
  var event = new CustomEvent('my-event', {detail: {some: 'data'}});
} else {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('my-event', true, true, {some: 'data'});
}
el.dispatchEvent(event);
```
