# TypeScript ESLint

## 1. 安装 ESLint

```sh
npm install --save-dev eslint
```

由于 ESLint 默认使用 [Espree](https://github.com/eslint/espree) 进行语法解析，无法识别 TypeScript 的一些语法，需要安装 [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser)，代替原来的解析器：

```sh
npm install --save-dev typescript @typescript-eslint/parser
```

接下来，安装对应的插件 [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin)，补充语法规则：

```sh
npm install --save-dev @typescript-eslint/eslint-plugin
```

## 2. 创建配置文件

配置文件的名称一般是 .eslintrc.js 或 .eslintrc.json：

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // 禁止使用 var
    ‘no-var': 'error',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions: [
      'error',
      'interface'
    ]
  }
}
```

## 3. 检查 ts 文件

```json
{
  "scripts": {
    "eslint": "eslint src --ext .ts"
  }
}
```

## 4. VSCode 集成 ESLint

安装插件，并进行设置：

```json
{
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 5. Prettier

安装：

```sh
npm install --save-dev prettier
```

配置 `prettier.config.js`：

```js
// prettier.config.js or .prettierrc.js
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
};
```

VSCode 安装 Prettier 插件，配置 `.vscode/settings.json`：

```json
{
    "files.eol": "
",
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "typescript",
            "autoFix": true
        }
    ],
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

把 ESLint 中代码格式相关的规则禁用掉，避免冲突。

## 6. AlloyTeam

AlloyTeam 提供了一套完善的配置规则。

安装：

```sh
npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
```

配置 `.eslintrc.js`：

```js
module.exports = {
  extends: [
    'alloy',
    'alloy/typescript',
  ],
  env: {
    // 您的环境变量（包含多个预定义的全局变量）
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 您的全局变量（设置为 false 表示它不允许被重新赋值）
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // 自定义您的规则
    // Customize your rules
  }
};
```

## 7. TSX

安装 `eslint-plugin-react`：

```sh
npm install --save-dev eslint-plugin-react
```

添加对 `.tsx` 文件的检查：

```json
{
  "scripts": {
    "eslint": "eslint src --ext .ts,.tsx"
  }
}
```

VSCode 的配置中新增 `typescriptreact` 检查：

```json
{
  "files.eol": "\n",
  "editor.tabSize": 4,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

[AlloyTeam ESLint 规则中的 TypeScript React 版本](https://github.com/AlloyTeam/eslint-config-alloy#typescript-react)


## 8. Troubleshootings

1、

已经弃用

```json
"editor.formatOnSave"
```

使用

```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
