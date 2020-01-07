返回一个删除指定 key 的对象。  

## 用法
```js
import omit from 'omit.js';
const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
<Input {...customprops} {...inputProps} />
```
替代方法：  
```js
const {onGetCaptcha, countDown,  ...rest} = otherProps;
<Input {...customprops} {...inputProps} />

const abc = {a:12,b:23,c:34};
const {c,...rest} = abc;
console.log(abc);
console.log(rest);
```

## 源码
```js
import _extends from "babel-runtime/helpers/extends";
function omit(obj, fields) {
  var shallowCopy = _extends({}, obj);
  for (var i = 0; i < fields.length; i++) {
    var key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}
export default omit;
```
