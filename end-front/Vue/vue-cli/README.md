
- [vue-cli](https://cli.vuejs.org/zh/)

## 一、 安装
```
sudo npm install -g @vue/cli
# OR
yarn global add @vue/cli # 安装完找不到 vue！

vue create my-project
# OR
vue ui
```

创建项目报错：  
```
Error: NO_MODULES
    at importProject (/usr/local/lib/node_modules/@vue/cli/node_modules/@vue/cli-ui/apollo-server/connectors/projects.js:363:11)
    at progress.wrap (/usr/local/lib/node_modules/@vue/cli/node_modules/@vue/cli-ui/apollo-server/connectors/projects.js:355:12)
    at process._tickCallback (internal/process/next_tick.js:68:7)
```
[解决方案](https://github.com/vuejs/vue-cli/issues/2633)：  
```
export NODE_ENV=dev
```

### 1、 vue-cli
```
sudo npm install -g @vue/cli-init

vue init webpack my-project
```

## 二、 [webpack](http://vuejs-templates.github.io/webpack/)（vue-cli 版）
参考：  
- [Vue+MySQL+Express小试牛刀](https://segmentfault.com/a/1190000008176208) by segmentfault

## 三、 [bootstrap4](https://segmentfault.com/a/1190000015706096)

安装 `jquery`, `bootstrap`, `popper.js`:  
```
yarn add jquery bootstrap popper.js
```
安装 `node-sass`, `sass-loader`:  
```
yarn add node-sass sass-loader
```
在 `webpack.base.conf.js` 中添加：  
```js
var webpack = require('webpack');
...
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
],
...
```
在 js 中使用：  
```js
import 'bootstrap'
// require('bootstrap')
```
在 scss 中使用：  
```
// app.css
// Bootstrap
@import '~bootstrap/scss/bootstrap.scss';
```
在 vue 中导入 scss：  
```
<style lang="scss">
@import "./assets/sass/app.scss";
</style>
```

### 1、 webpack 配置 scss

- https://github.com/vuejs/vue-loader/issues/363
- https://github.com/vuejs-templates/webpack-simple/blob/master/template/webpack.config.js
- https://segmentfault.com/q/1010000005346260

```js
{
    test: /\.s[a|c]ss$/,
    loader: 'style!css!sass'
}
```

### 2、 TypeError: this.getResolve is not a function
`sass-loader` 版本太高？  
```
yarn add sass-loader@7.3.1
```
