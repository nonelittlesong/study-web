## Array Each
jquery  
```js
$.each(array, function(i, item) {

});
```

IE9+  
```js
array.forEach(function(item, i) {

});
```

## Bind
[bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数作为新函数的参数。供调用时使用。  

jquery  
```js
$.proxy(fn, context);
```

IE9+  
```js
fn.bind(context);
```


## Extend & Deep Extend
- [lodash](https://lodash.com/docs#assign)  
- [underscore](http://underscorejs.org/#extend)  
- ECMA6  
jquery  
```js
$.extend({}, objA, objB);
// deep extend
$.extend(true, {}, objA, objB);
```

IE8+  
```js
var extend = function(out) {
  out = out || {};
  
  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;
    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }
  return out;
};

extend({}, objA, objB);

// deep extend
var deepExtend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object'){
          if(obj[key] instanceof Array == true)
            out[key] = obj[key].slice(0);
          else
            out[key] = deepExtend(out[key], obj[key]);
        }
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
};

deepExtend({}, objA, objB);
```


## Index of
jquery  
```js
$.inArray(item, array);
```

IE9+  
```js
array.indexOf(item);
```


## is Array
jquery  
```js
$.isArray(arr);
```

IE9+  
```js
Array.isArray(arr);
```


## Map
jquery  
```js
$.map(array, function(value, index) {

});
```

IE9+  
```js
array.map(function(value, index) {

});
```


## Now
jquery  
```js
$.now();
```

IE9+  
```js
Date.now();
```


## Parse HTML
jquery  
```js
$.parseHTML(htmlString);
```

IE9+  
```js
var parseHTML = function (str) {
  var tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = str;
  return tmp.body.children;
};

parseHTML(htmlString);
```


## Parse JSON
jquery  
```js
$.parseJSON(string);
```

IE8+  
```js
JSON.parse(string);
```


## Slice
jquery  
```js
$(els).slice(begin, end);
```

IE9+  
```js
els.slice(begin, end);
```


## Trim
jquery  
```js
$.trim(string);
```

IE9+  
```js
string.trim();
```


## Type
jquery  
```js
$.type(obj);
```

IE8+  
```js
Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
```


