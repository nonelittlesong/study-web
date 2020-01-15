
- [eslint.org](https://eslint.org/)  

## 1、 package.json
```
"eslint": "^5.0.0"
"eslint-config-airbnb": "^17.0.0"
"eslint-plugin-import": "^2.11.0"
"eslint-plugin-jsx-a11y": "^6.0.3"
"eslint-plugin-react": "^7.7.0"
```
## 2、 .eslintrc.json
```json
{
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off"
  }
}
```

## 常见配置
- 不要使用 `++` 和 `--`。
- [react/forbid-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md) - [React PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes)
- no-restricted-globals  
  - `isNaN()` - `Number.isNaN()`
- `no-nested-ternary` - 不推荐使用嵌套的三元符，会导致代码难读。  

### `no-case-declarations`
声明的变量可在整个 `switch` 块中被访问。  
因此，要用花括号将整个 `case` 括起来。  

### react

#### react/jsx-props-no-spreading
JSX 的属性强制不使用扩展语法。  
提高可读性，避免传递不必要的属性，在传递错误属性时可以发出警告。  

#### react/prop-types
React 需要对属性的类型定义。  

