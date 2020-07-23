alternatives  
- [bonzo](https://github.com/ded/bonzo)  
- [$dom](https://github.com/julienw/dollardom)  

## Add & Has Class
jquery
```js
$(el).addClass(className);
$(el).hasClass(className);
```

IE10+  
```js
el.classList.add(className);
el.classList.contains(className);
```

## After
位置命名的可视化展示  
```html
<!-- beforebegin -->
<p>
<!-- afterbegin -->
foo
<!-- beforeend -->
</p>
<!-- afterend -->
```

jquery  
```js
$(target).after(element);
```

IE8+  
```js
target.insertAdjacentElement('afterend', element);
```

## Before
jquery  
```js
$(target).before(element);
```

IE8+  
```js
target.insertAdjacentElement('beforebegin', element);
```

## Append
jquery  
```js
$(parent).append(el);
```

IE8+  
```js
parent.appendChild(el);
```

## Children & Parent
jquery  
```js
$(el).children();
$(el).parent();
```

IE9+  
```js
el.children;
el.parentNode;
```

## Clone
jquery  
```js
$(el).clone();
```

IE8+  
```js
el.cloneNode(true);
```

## Contains
jquery  
```js
$.contains(el, child);
```

IE8+  
```js
el !== child && el.contains(child);
```

## Contains Selector
jquery  
```js
$(el).find(selector).length;
```

IE8+  
```js
!!el.querySelector(selector);
```

## Each
jquery  
```js
$(selector).each(function(i, el) {

});
```

IE9+  
```js
var elements = document.querySelectorAll(selector);
Array.prototype.forEach.call(elements, function(el, i) {

});
```

## Empty
jquery  
```js
$(el).empty()
```

IE8+  
```js
while(el.firstChild)
  el.removeChild(el.firstChild);
```

## Filter
jquery  
```js
$(selector).filter(filterFn);
```

IE9+  
```js
Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);
```

## Find Children
jquery  
```js
$(el).find(selector);
```

IE8+  
```js
el.querySelectorAll(selector);
```

## Find Elements
alternatives  
- [qwery](https://github.com/ded/qwery)  
- [sizzle](https://github.com/jquery/sizzle/wiki)  

jquery  
```js
$('.my #awesome selector');
```

IE8+  
```js
document.querySelectorAll('.my #awesome selector');
```

## Get Attributes
jquery  
```js
$(el).attr('tabindex');
```

IE8+  
```js
el.getAttribute('tabindex');
```

## Get Height & Width
jquery  
```js
$(el).height();
$(el).width();
```

IE9+  
```js
parseFloat(getComputedStyle(el, null).height.replace('px', ''));
parseFloat(getComputedStyle(el, null).width.replace('px', ''));
```

## Get HTML
#### innerHTML
jquery  
```js
$(el).html();
```

IE8+  
```js
el.innerHTML;
```

#### outerHTML
jquery  
```js
$(el).prop('outerHTML');
```

IE8+  
```js
el.outerHTML;
```


## Get Style
jquery  
```js
$(el).css(ruleName);
```

IE9+  
```js
getComputedStyle(el)[ruleName];
```


## GetText
jquery  
```js
$(el).text();
```

IE9+  
```js
el.textContent;
```


## Index
jquery  
```js
$(el).index();
```

IE9+  
```js
function index(el) {
  if (!el) return -1;
  var i = 0;
  do {
    i++;
  } while (el = el.previousElementSibling);
  return i;
}
```


## Matches
jquery  
```js
$(el).is($(otherEl));
```

IE8+  
```js
el === otherEl
```


## Matches Selector
jquery  
```js
$(el).is('.my-class');
```

IE9+  
```js
var matches = function(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};

matches(el, '.my-class');
```


## Next & Prev
jquery  
```js
$(el).next();
```

IE9+  
```js
el.nextElementSibling;
```


## Offset
jquery  
```js
$(el).offset();
```

IE8+  
```js
var rect = el.getBoundingClientRect();

{
  top: rect.top + document.body.scrollTop,
  left: rect.left + document.body.scrollLeft
}
```


## Offset Parent
jquery  
```js
$(el).offsetParent();
```

IE8+  
```js
el.offsetParent || el
```


## Outer Height & Width
jquery  
```js
$(el).outerHeight();
$(el).outerWidth();
```

IE8+  
```js
el.offsetHeight;
el.offsetWidth;
```


## Outer Height & Width with Margin
jquery  
```js
$(el).outerHeight(true);
$(el).outerWidth(true);
```

IE9+  
```js
function outerHeight(el) {
  var height = el.offsetHeight;
  var style = getComputedStyle(el);
  
  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
}
outerHeight(el);

function outerWidth(el) {
  var width = el.offsetWidth;
  var style = getComputedStyle(el);
  
  width += parseInt(style.marginLeft) + parseInt(style.marginBottom);
  return width;
}
outerWidth(el);
```



  

