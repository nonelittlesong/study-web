* [webpack 官网](https://www.webpackjs.com/)
* [webpack github](https://github.com/webpack/webpack)
* [深入浅出 webpack](http://webpack.wuhaolin.cn/)

## 概念

四个核心概念：  

- 入口（entry） - 默认值是 `./src`。  
- 输出（output） - 默认值是 `./dist`。  
- loader - 
- 插件（plugins）  

### 模式
```js
module.exports = {
  mode: 'production'
};
```

## 入口

### 单个入口（简写）语法
用法： `entry: string|Array<string>`  

### 对象语法
用法： `entry: {[entryChunkName: string]: string|Array<string>}`  

## 输出

最低要求：  

- `filename` - 输出文件名
- `path` - 输出的绝对路径



## 插件
### 1、 DllPugin
* https://juejin.im/post/5c665c6151882562986ce988
