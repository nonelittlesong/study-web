
- https://webpack.js.org/configuration/dev-server

该配置会被 `webpack-dev-server` 使用。  

底层包：  
- [webpack-dev-middleware](https://www.npmjs.com/package/webpack-dev-middleware)
- [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)

# open
是否自动打开浏览器：  
```
module.exports = {
  //...
  devServer: {
    open: true
  }
};
```

# port
webpack.config.js  
```
module.exports = {
  //...
  devServer: {
    port: 8080
  }
};
```
cli  
```
webpack-dev-server --port 8080
```

# proxy
利用 `http-proxy-middle` 包。  
```
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
```
