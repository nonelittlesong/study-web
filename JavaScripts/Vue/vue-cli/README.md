
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

