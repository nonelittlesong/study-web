
# [css-loader](https://www.html.cn/doc/webpack2/loaders/css-loader/)

## 安装

```
$ npm install --save-dev css-loader
# 或
$ yarn add -D css-loader
```

## 选项

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| root | `/` | 解析 URLs 路径，URLs 以 `/` 开头将不会被翻译 |
| modules | false | 启用/禁用 css-modules 模式 |
| import | true | 启用/禁用 @import 处理 |
| url | true | 启用/禁用 url() 处理 |
| minimize | true | 启用/禁用 压缩 |
| sourceMap | false | 启用/禁用 Sourcemaps |
| camelCase | false | 导出以驼峰化命名的类名 |
| importLoaders | 0 | 在 css-loader 前应用的 loader 的数 |

## CSS 作用域

默认情况下，CSS 将所有的类暴露到全局的选择器作用域中。

- `:local(.className)` 可以被用来在局部作用域中声明 className。局部的作用域标识符会以模块的形式暴露出去。
- `:local`（无括号）可以为此选择器启用局部模式。
- `:global(.className)` 可以用来声明一个明确的全局选择器。
- `:global`（无括号）可以为此选择器打开全局模式。
