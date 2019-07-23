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
