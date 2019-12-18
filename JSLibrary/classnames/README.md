
- [classnames npm](https://www.npmjs.com/package/classnames)  

## 安装
```
yarn add classnames
```

## 使用
```
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// 各种不同类型的参数
classNames('foo', { bar: true, duck: false}, 'baz', { quux: true }); // => 'foo bar baz quux'

// 其他否定类型
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

### ES2015 动态 class 名
```
const buttonType = 'primary'
classNames({ [`btn-${buttonType}`]: true });
```

### 应用于 React
```jsx
var classNames = require('classnames');

var Button = React.createClass({
  // ...
  render () {
    var btnClass = classNames({
      btn: true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```

