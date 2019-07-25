
# 单入口语法

用法：  
```
entry: string | Array<string>
```

```js
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};

module.exports = config;
```
简写：  
```js
const config = {
  entry: './path/to/myentry/file.js'
};

module.exports = config;
```

>**当你向 `entry` 传入一个数组时会发生什么？** 向 `entry` 属性传入「文件路径数组」将创建多个主入口。在你想要多个依赖文件一起注入，并且将他们的依赖导向到一个 chunk 时，传入数组的方式就很有用。  



# 对象语法
用法： `entry: {[entryChunkName: string]: string|Array<string>}`  
```js
module.exports = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```
# 常见场景
## 1、 分离应用程序（app）和第三方库（vendor）入口
