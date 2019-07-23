# 初始化
```
npm init
touch app.js
```

# webpack
```
npm install --save webpack
npm install -D webpack-cli
```
配置：  
```js
const path = require('path');

module.exports = {
  entry: './app.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 定义输出目录
    filename: 'my-first-webpack.bundle.js'  // 定义输出文件名称
  }
};
```

更新 package.json, 在 scripts 中添加 webpack 执行命令：  
```js
"scripts": {
  "dev": "./node_modules/.bin/webpack --config webpack.config.js"
}
```

# React
```
npm install --save react react-dom
```
app.js:  
```js
import React from 'react
import ReactDom from 'react-dom';
import App from './src/views/App';

ReactDom.render(<App />, document.getElementById('root'));
```
src/views/App/index.js:  
```js
import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>App Container</div>);
    }
}
export default App;
```
index.html:  
```js
<!DOCTYPE html>
<html>
<head>
    <title>index</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

# Babel
```
npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
```
更新 webpack.config.js:  
```js
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配.js文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
```
创建并配置 .babelrc:  
```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

# HtmlWebPackPlugin
这个插件最主要的作用是将js代码通过\<script>标签注入到HTML文件中。  
```
npm install -D html-webpack-plugin
```
更新 webpack.config.js：  
```js
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: path.resolve(__dirname, 'dist/index.html')
    })
  ]
};
```


# webpack-dev-server
```
npm install -D webpack-dev-server
```
更新 package.json
```
"dev": "webpack-dev-server --config webpack.config.js --open"
```
webpack.config.js 新增 devServer 配置：  
```js
devServer: {
  hot: true, // 热替换
  contentBase: path.join(__dirname, 'dist'), // server文件的根目录
  compress: true, // 开启gzip
  port: 8080, // 端口
},
plugins: [
  new webpack.HotModuleReplacementPlugin(), // HMR允许在运行时更新各种模块，而无需进行完全刷新
  new HtmlWebPackPlugin({
    template: './index.html',
    filename: path.resolve(__dirname, 'dist/index.html')
  })
]
```


# redux
