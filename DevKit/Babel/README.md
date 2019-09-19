* https://blog.zfanw.com/babel-js  
* [babel docs](https://babeljs.io/docs/en/configuration)

# 配置
## 1、 .babelrc
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
    }]
  ]
}
```
