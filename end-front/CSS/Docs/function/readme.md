# [CSS 函数](https://www.runoob.com/cssref/css-functions.html)

## [attr()](https://developer.mozilla.org/en-US/docs/Web/CSS/attr())

用于在 CSS 中，获取所选元素的属性值。

## [calc()](https://www.runoob.com/cssref/func-calc.html)
* [MDN calc](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)

## [url()](https://developer.mozilla.org/en-US/docs/Web/CSS/url())

参数：

- 绝对路径的 URL
- 相对路径的 URL
- 数据 URI

>现在，CSS3 中 `url()` 只表示真实的 `<url>`！  
>如果使用相对路径，是相对于样式表，而不是网页。  

使用：

```css
/* Simple usage */
url(https://example.com/images/myImg.jpg);
url(data:image/png;base64,iRxVB0…);
url(myFont.woff);
url(#IDofSVGpath);

/* associated properties */
background-image: url("https://mdn.mozillademos.org/files/16761/star.gif");
list-style-image: url('../images/bullet.jpg');
content: url("pdficon.jpg");
cursor: url(mycursor.cur);
border-image-source: url(/media/diamonds.png);
src: url('fantasticfont.woff');
offset-path: url(#path);
mask-image: url("masks.svg#mask1");

/* Properties with fallbacks */
cursor: url(pointer.cur), pointer;

/* Associated short-hand properties */
background: url('https://mdn.mozillademos.org/files/16761/star.gif') bottom right repeat-x blue;
border-image: url("/media/diamonds.png") 30 fill / 30px / 30px space;

/* As a parameter in another CSS function */
background-image: cross-fade(20% url(first.png), url(second.png));
mask-image: image(url(mask.png), skyblue, linear-gradient(rgba(0, 0, 0, 1.0), transparent);

/* as part of a non-shorthand multiple value */
content: url(star.svg) url(star.svg) url(star.svg) url(star.svg) url(star.svg);

/* at-rules */
@document url("https://www.example.com/") { ... } 
    This is an experimental API that should not be used in production code.
    

@import url("https://www.example.com/style.css");
@namespace url(http://www.w3.org/1999/xhtml);
```


