# [ESlint](https://eslint.org/)

和 JSLint、JSHint 的区别：

1. ESlint 使用 [Espree](https://github.com/eslint/espree) 解析 JS 代码。
2. ESLint uses an AST to evaluate patterns in code.
3. 插件化，每个规则都是一个插件，可在运行时添加。

## 1. 安装和使用

```
$ npm install eslint --save-dev
# or
$ yarn add eslint --dev
```

然后，创建配置文件

```
$ npx eslint --init
# or
$ yarn run eslint --init
```

>Notes: 在使用 `--init` 前，确保已经有 `package.json` 文件。

之后，可以对任何文件执行 ESLint，如：

```
$ npx eslint yourfile.js
# or
$ yarn run eslint yourfile.js
```

不推荐全局安装 eslint！！

## 2. 配置

- [查看详细配置信息](https://eslint.org/docs/user-guide/configuring/)

运行 `eslint --init` 之后，在你的目录中会创建一个 `.eslintrc.{js,yml,json}` 文件，如

```json
{
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

第一个值代表错误等级：

- `"off"` 或 `0` — 关闭规则
- `"warn"` 或 `1` — 警告（不影响 exit code）
- `"error"` 或 `2` — 错误（exit code 为 1）

可以在配置中加入扩展：

```json
{
  "extends": "eslint:recommended"
}
```

在 [npmjs.com](https://www.npmjs.com/search?q=eslint-config) 中搜索 `eslint-config`，添加第三方扩展。

## 3. 下一步

- 学习[进一步的配置](https://eslint.org/docs/user-guide/configuring/)
- 熟悉[命令行选项](https://eslint.org/docs/user-guide/command-line-interface)
- [集成的 ESlint](https://eslint.org/docs/user-guide/integrations)
- [自定义规则](https://eslint.org/docs/developer-guide/working-with-rules)
- [贡献 ESLint](https://eslint.org/docs/developer-guide/contributing/)

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
