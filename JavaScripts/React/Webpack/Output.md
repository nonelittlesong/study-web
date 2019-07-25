# 多个入口起点
使用占位符：  
```js
entry: {
  index: [
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?path=http://${config.host}:${config.port}/__webpack_hmr`,
    'babel-polyfill',
    pathLib.resolve(ENTRY_PATH, 'index.js')
  ],
  vendor: ['react', 'react-dom', 'react-router-dom']
},
output: {
  path: OUTPUT_PATH,
  publicPath: '/',
  filename: '[name]-[hash:8].js'
},
```

