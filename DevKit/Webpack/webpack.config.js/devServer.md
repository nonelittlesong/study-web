
- https://webpack.js.org/configuration/dev-server

该配置会被 `webpack-dev-server` 使用。  

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
