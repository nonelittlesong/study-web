
## [mapStateToProps & mapDispatchToProps](https://blog.csdn.net/suwu150/article/details/79415085)

### mapStateToProps(state, ownProps)
`ownProps` 即组件本身的 `props`。  
如果传入了 `ownProps`，那么当 `props` 发生变化时，也会调用 `mapStateToProps`。  

### mapDispatchToProps

- https://blog.csdn.net/genius_yym/article/details/64130120

## shit


- [UMD](https://github.com/umdjs/umd) >> Universal Module Definition。
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [Redux 视频教程](http://cn.redux.js.org/docs/introduction/LearningResources.html)
- [Redux 学习资料](http://cn.redux.js.org/docs/introduction/LearningResources.html)
- [Redux 示例](http://cn.redux.js.org/docs/introduction/Examples.html)

redux 流程图：  
![redux.png](https://github.com/nonelittlesong/study-resources/blob/master/images/React/redux.png)  

## 一、 安装
```
yarn add redux
yarn add react-redux
yarn add redux-saga

# optional
yarn add redux-devtools --dev
```

## 二、 要点

- `reducer` - 形如 `(state, action) => state` 的纯函数。描述 `action` 如何改变 `state`。  
  **当 `state` 变化时，应该返回全新的对象。**
- `action` - `action` 描述已发生事件的普通对象。

## 三、 容器组件和展示组件

| | 展示组件 | 容器组件 |
| --- | --- | --- |
| 作用 | 描述如何展现（骨架、样式） | 描述如何运行（数据获取、状态更新） |
| 直接使用 Redux | 否 | 是 |
| 数据来源 | props | 监听 Redux state |
| 数据修改 | 从 props 调用回调函数 | 向 Redux 派发 actions |
| 调用方式 | 手动 | 通常由 React Redux 生成 |

