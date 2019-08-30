参考：  
- [yarn doc](https://yarn.bootcss.com/docs/migrating-from-npm/)
- https://blog.csdn.net/mocoe/article/details/86751925
- [淘宝镜像](https://npm.taobao.org/)
- https://docs.npmjs.com/files/package.json#dependencies

# 查看配置
```
yarn config list

npm config get registry
yarn config get registry
```

# 设置镜像
```
# 设置临时镜像
$ npm --registry https://registry.npm.taobao.org install express
$ yarn save express --registry https://registry.npm.taobao.org
# 设置永久镜像
$ npm config set registry https://registry.npm.taobao.org
$ yarn config set registry https://registry.npm.taobao.org
```

# 单独设置镜像
```
$ npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
$ yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

# --verbose
```
$ npm install --verbose electron
$ yarn add --verbose electron
```
