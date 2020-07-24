alternatives  
- [bonzo](https://github.com/ded/bonzo)  
- [$dom](https://github.com/julienw/dollardom)  

## Add & Has & Remove & toggle Class
jquery
```js
$(el).addClass(className);
$(el).hasClass(className);
$(el).removeClass(className);
$(el).toggleClass(className);
```

IE10+  
```js
el.classList.add(className);
el.classList.contains(className);
el.classList.remove(className);
el.classList.toggle(className);
```

## After & Before
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
$(target).before(element);
```

IE8+  
```js
target.insertAdjacentElement('afterend', element);
target.insertAdjacentElement('beforebegin', element);
```


## Append & Prepend
jquery  
```js
$(parent).append(el);
$(parent).prepend(el);
```

IE8+  
```js
parent.appendChild(el);
parent.insertBefore(el, parent.firstChild);
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

## Get & Remove & Set Attributes
jquery  
```js
$(el).attr('tabindex');
$(el).removeAttr('tabindex');
$(el).attr('tabindex', 3);
```

IE8+  
```js
el.getAttribute('tabindex');
el.removeAttribute('tabindex');
el.setAttribute('tabindex', 3);
```

## Get & Set Height & Width
jquery  
```js
$(el).height();
$(el).width();
// set
$(el).height(val);
$(el).width(val);
```

IE9+  
```js
parseFloat(getComputedStyle(el, null).height.replace('px', ''));
parseFloat(getComputedStyle(el, null).width.replace('px', ''));
// set
function setHeight(el, val) {
    if (typeof val === "function") val = val();
    if (typeof val === "string") el.style.height = val;
    else el.style.height = val + "px";
}
setHeight(el, val);
function setWidth(el, val) {
    if (typeof val === "function") val = val();
    if (typeof val === "string") el.style.width = val;
    else el.style.width = val + "px";
}
setWidth(el, val);

```

## Get & Set HTML
#### innerHTML
jquery  
```js
$(el).html();
$(el).html(string);
```

IE8+  
```js
el.innerHTML;
el.innerHTML = string;
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


## Get & Set Style
jquery  
```js
$(el).css(ruleName);
$(el).css('border-width', '20px');
```

IE9+  
```js
getComputedStyle(el)[ruleName];
el.style.borderWidth = '20px';
```


## Get & Set Text
jquery  
```js
$(el).text();
$(el).text(string);
```

IE9+  
```js
el.textContent;
el.textContent = string;
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


## Next & Prev & Siblings
jquery  
```js
$(el).next();
$(el).prev();
$(el).siblings();
```

IE9+  
```js
el.nextElementSibling;
el.previousElementSibling;
Array.prototype.filter.call(el.parentNode.children, function (child) {
  return child !== el;
});
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
// with margin
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


## Position
jquery  
```js
// 相对于 offsetParent 的位置
$(el).position();
// 相对于视口的位置
var offset = el.offset();
{
  top: offset.top - document.body.scrollTop,
  left: offset.left - document.body.scrollLeft
}
```

IE8+  
```js
// 相对于 offsetParent 的位置
{
  left: el.offsetLeft,
  top: el.offsetTop
}
// 相对于视口的位置
el.getBoundingClientRect();
```


## Remove
jquery  
```js
$(el).remove();
```

IE8+  
```js
el.parentNode.removeChild(el);
```

## Replace from HTML
jquery  
```js
$(el).replaceWith(string);
```

IE8+  
```js
el.outerHTML = string;
```




