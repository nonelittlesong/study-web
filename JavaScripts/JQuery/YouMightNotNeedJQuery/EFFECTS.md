alternatives  
- [animate.css](https://animate.style/)  
- [move.js](https://github.com/visionmedia/move.js)  
- [velocity.js](http://velocityjs.org/)  

## Fade in
jquery  
```js
$(el).fadeIn();
```

IE10+  
```js
el.classList.add('show');
el.classList.remove('hide');
```
```css
.show {
  transition: opacity 400ms;
}
.hide {
  opacity: 0;
}
```

## Fade Out
jquery  
```js
$(el).fadeOut();
```

IE10+  
```js
el.classList.add('hide');
el.classList.remove('show');
```
```css
.show {
  opacity: 1;
}
.hide {
  opacity: 0;
  transition: opacity 400ms;
}
```

## Hide
jquery  
```js
$(el).hide();
```

IE8+  
```js
el.style.display = 'none';
```

## Show
jquery  
```js
$(el).show();
```

IE8+  
```js
el.style.display = ''; // 无效试试 el.style.display = 'block';
```

