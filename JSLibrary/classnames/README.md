
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
