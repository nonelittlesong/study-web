# yarn

参考：

- [yarn doc](https://yarn.bootcss.com/docs/usage/)  
- [electron 下载失败](https://blog.csdn.net/mocoe/article/details/86751925)  
- [淘宝镜像](https://npm.taobao.org/)  
- https://docs.npmjs.com/files/package.json#dependencies  
- [CLI 指南](https://yarnpkg.com/zh-Hans/docs/cli/)  

## 1. [从 npm 迁往 yarn](https://yarn.bootcss.com/docs/migrating-from-npm/)

```
$ yarn
```

## 2. 配置

### 2.1. 环境变量

Ubuntu16 编辑 `vim ~/.profile`：

```
PATH="$PATH:`yarn global bin`"
```

将环境变量应用到当前的 shell：

```
$ source ~/.profile
```

### 2.2. 查看配置

```
$ yarn config list
$ yarn config get registry # 查看单个配置项

$ npm config get registry  # npm 方法类似
```

### 2.3. 设置镜像

```
# 设置临时镜像
$ yarn save express --registry https://registry.npm.taobao.org
$ npm --registry https://registry.npm.taobao.org install express

# 设置永久镜像
$ yarn config set registry https://registry.npm.taobao.org
$ npm config set registry https://registry.npm.taobao.org

# 对单个包设置镜像
$ yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/
$ npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

### 2.4. --verbose

```
$ npm install --verbose electron
$ yarn add --verbose electron
```
