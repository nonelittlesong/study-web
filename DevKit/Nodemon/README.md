监听服务端代码变化，重启服务。  

- [nodemon](https://nodemon.io/)
- [nodemon github](https://github.com/remy/nodemon/)

# 安装
```
yarn add nodemon --dev
```

# 配置文件
nodemon.json:  
```json
{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules"
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "watch": [
    "test/fixtures/",
    "test/samples/"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json"
}
```
