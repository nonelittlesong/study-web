
- [UMD](https://github.com/umdjs/umd) >> Universal Module Definition。
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)

redux 流程图：  
![redux.png](https://github.com/nonelittlesong/study-resources/blob/master/images/React/redux.png)  

# 一、 安装
```
yarn add redux
yarn add react-redux
yarn add redux-saga

# optional
yarn add redux-devtools --dev
```

# 二、 要点

- `reducer` - 形如 `(state, action) => state` 的纯函数。描述 `action` 如何改变 `state`。  
  **当 `state` 变化时，应该返回全新的对象。**
- `action` - `action` 描述已发生事件的普通对象。


