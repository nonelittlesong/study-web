
- [caojianfei/ant-design-pro](https://github.com/caojianfei/ant-design-pro)  

## 一、 配置
```
yarn add antd
yarn add babel-plugin-import
```
```
// .babelrc or babel-loader option
{
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css" // `style: true` 会加载 less 文件
    }]
  ]
}
```
```js
// babel-plugin-import 会帮助你加载 JS 和 CSS
import { DatePicker } from 'antd';
```
