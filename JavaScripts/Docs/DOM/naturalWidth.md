# HTML5 新属性
`naturalWidth/naturalHeight`:  
```js
function getImgNaturalDimensions(img) {
  var nWidth, nHeight;
  if (img.naturalWidth) {
    nWidth = img.naturalWidth;
    nHeight = img.naturalHeight;
  } else {
    var image = new Image();
    image.src = img.src;
    image.onload = function() {
      nWidth = image.width;
      nHeight = image.height;
    }
  }
}
```
