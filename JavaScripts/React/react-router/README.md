
- react-router - 实现了路由的核心功能。
- react-router-dom
- react-router-native
- react-router-config

>**注:**  
`react-router-dom` 依赖 `react-router`。基于浏览器环境的开发，只需要安装 `react-router-dom` ；基于 `react-native `环境的开发，只需要安装 `react-router-native`。  

**资源:**  

- [React-Router 中文文档](http://react-guide.github.io/react-router-cn/)  
- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)  


## 一、 安装配置
```
yarn add react-router-dom
```

## 二、 react-router-dom

- [BrowserRouter](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/BrowserRouter.js)
- [HashRouter](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/HashRouter.js)
- Link - [必须在 `Router` 内](https://blog.csdn.net/Zhooson/article/details/84101213)。

导入：  
```js
import {Link} from 'react-router-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
```
