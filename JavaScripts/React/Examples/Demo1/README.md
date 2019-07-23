https://segmentfault.com/a/1190000017945643  

# 初始化
```
npm init
touch app.js
```

# 一、 webpack
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

# 二、 React
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

# 三、 Babel
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

# 四、 Plugins
## HtmlWebPackPlugin
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

## webpack-dev-server
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


# 五、 redux
## 1、 创建目录
1. src/actions
2. src/reducers
3. src/store

## 2、 安装依赖
```
npm install --save redux react-redux
```

## 3、 actions
在 actions 文件夹下创建 index.js 文件：  
```js
export const increment = () => {
  return {
    type: 'INCREMENT',
  };
};
```

## 4、 reducers
在 reducers 文件夹下创建 index.js 文件：  
```js
const initialState = {
  number: 0
};

const incrementReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INCREMENT': {
      state.number += 1
      return { ...state }
      break
    };
    default: return state;
  }
};
export default incrementReducer;
```

## 5、 store.js
```js
import { createStore } from 'redux';
import incrementReducer from './reducers/index';

const store = createStore(incrementReducer);

export default store;
```

## 6、 app.js
```js
import App from './src/views/App';
import ReactDom from 'react-dom';
import React from 'react';
import store from './src/store';
import { Provider } from 'react-redux';

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
```

## 7、 更新组件
```js
import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions/index';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment())
    }

    render() {
        return (
            <div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+1</button></div>

            </div>
        );
    }
}
export default connect(
    state => ({
        number: state.number
    })
)(App);
```

# redux-saga
```
npm install --save redux-saga
```

## 1、 src/sagas/index.js
```js
import { delay } from 'redux-saga/effects'
import { put, takeEvery } from 'redux-saga/effects'

export function* incrementAsync() {
  yield delay(2000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```

## 2、 更新 store.js
```js
import { createStore, applyMiddleware } from 'redux';
import incrementReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga'
import { watchIncrementAsync } from './sagas/index'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync)
export default store;
```

## 3、 修改组件
新增异步提交按钮：  
```js
import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions/index';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment())
    }

    onClick2() {
        this.props.dispatch({ type: 'INCREMENT_ASYNC' })
    }

    render() {
        return (
            <div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+1</button></div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick2()}>点击2秒后+1</button></div>
            </div>
        );
    }
}
export default connect(
    state => ({
        number: state.number
    })
)(App);
```

## 4、 @babel/plugin-transform-runtime
```
npm install --save @babel/plugin-transform-runtime
```
### \# babel-polyfill
>Babel默认只转换新的JavaScript语法，而不转换新的API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。  

### \# babel-runtime
>Babel转译后的代码要实现源代码同样的功能需要借助一些帮助函数，而这些帮助函数可能会重复出现在一些模块里，导致编译后的代码体积变大。  
Babel 为了解决这个问题，提供了单独的包babel-runtime供编译模块复用工具函数。  
在没有使用babel-runtime之前，库和工具包一般不会直接引入 polyfill。否则像Promise这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 polyfill。这些 polyfill一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5的polyfill。  
在使用babel-runtime后，库和工具只要在 package.json中增加依赖babel-runtime，交给babel-runtime去引入 polyfill 就行了。  

### \# babel presets 和 plugins 的区别
>Babel插件一般尽可能拆成小的力度，开发者可以按需引进。比如对ES6转ES5的功能，Babel官方拆成了20+个插件。  
这样的好处显而易见，既提高了性能，也提高了扩展性。比如开发者想要体验ES6的箭头函数特性，那他只需要引入transform-es2015-arrow-functions插件就可以，而不是加载ES6全家桶。  
但很多时候，逐个插件引入的效率比较低下。比如在项目开发中，开发者想要将所有ES6的代码转成ES5，插件逐个引入的方式令人抓狂，不单费力，而且容易出错。  
这个时候，可以采用Babel Preset。  
可以简单的把Babel Preset视为Babel Plugin的集合。比如babel-preset-es2015就包含了所有跟ES6转换有关的插件。  


### \# 更新 .babelrc
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```
