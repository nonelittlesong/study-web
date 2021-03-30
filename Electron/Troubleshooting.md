# Electron Troubleshooting

<details>
<summary>Table of Contents</summary>

1. [无法访问热加载的前端资源](#1-无法访问热加载的前端资源)

</details>

## 1. 无法访问热加载的前端资源

```diff
- Failed to load resource: net::ERR_CONNECTION_REFUSED
```

解决方法：

查看 package.json

```json
"scripts": {
  "start": "webpack && NODE_ENV=production yarn run electron",
  "dev": "yarn run hmr & NODE_ENV=development electron . --debug",
  "electron": "electron main.js",
  "hmr": "webpack-dev-server --config webpack.development.config.js"
}
```

改为

```json
"scripts": {
  "start": "webpack && NODE_ENV=production yarn run electron",
  "dev": "yarn run hmr & NODE_ENV=development yarn run electron",
  "electron": "electron main.js",
  "hmr": "webpack-dev-server --config webpack.development.config.js"
}
```

屁嘞，没用。真实原因是 Electron 在 webpack 完成前启动。
