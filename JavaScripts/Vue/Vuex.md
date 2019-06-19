* [Vuex官方教程](https://vuex.vuejs.org/zh/guide/state.html)

# [State](https://vuex.vuejs.org/zh/guide/state.html)

# [Getter](https://vuex.vuejs.org/zh/guide/getters.html)

# [Mutation](https://vuex.vuejs.org/zh/guide/mutations.html)

# [Action](https://vuex.vuejs.org/zh/guide/actions.html)
Action类似于Mutation，不同在于：  
* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。

`Action` 函数接受一个与 `store` 实例具有相同方法和属性的 `context` 对象。  
实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码:  
```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

## 1、 分发 Action
```js
store.dispatch('increment');
```


# [Module](https://vuex.vuejs.org/zh/guide/modules.html)
