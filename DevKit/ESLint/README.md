
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

## 3、 常见错误
- 不要使用 `++` 和 `--`。
- [react/forbid-prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md) - [React PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes)
- no-restricted-globals  
  - `isNaN()` - `Number.isNaN()`