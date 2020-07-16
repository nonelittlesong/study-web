- [在 electron 中使用 bootstrap](https://github.com/nonelittlesong/bootstrap-example)  
- [How to install popper.js with Bootstrap 4? - stackoverflow](https://stackoverflow.com/questions/47039812/how-to-install-popper-js-with-bootstrap-4?r=SearchResults)  

```
yarn add popper.js # 不是 popper
```

```js
window.$ = window.jQuery = require('jquery');
window.Popper = require('popper');
require('bootstrap');
```
