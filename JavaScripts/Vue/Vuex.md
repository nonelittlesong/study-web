* [Vuex官方教程](https://vuex.vuejs.org/zh/guide/state.html)

# Demo
app.js:  
注入 store（名字必须是 store）。  
```js
import Vue from 'vue';
import store from './store';

Vue.component('demo-component', require('./components/DemoComponent').default);

new Vue({
    store // 把 store 对象提供给 “store” 选项，这可以把 store 实例从根组件注入所有子组件
}).$mount('#app');
```

store.js：  
定义实例 store， 打包各个数据模块。  
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {demos} from "./modules/demos";

export default new Vuex.Store({
    modules: {
        demos
    }
});
```

数据模块 demos.js：  
```js
import DemoAPI from '../api/demoApi';

export const demos = {
    state: {
        totalOK: 0,
        totalNG: 0,
        pass: "WAITING..."
    },

    getters: {
        getTotalOK: (state) => {
            return state.totalOK;
        },
        getTotalNG: (state) => {
            return state.totalNG;
        },
        getPass: (state) => {
            return state.pass;
        }
    },

    mutations: {
        increaseTotalOK(state) {
            state.totalOK++;
        },
        increaseTotalNG(state) {
            state.totalNG++;
        },
        setPass(state, pass) {
            state.pass = pass;
        }
    },

    actions: {
        loadResult({commit}) {
            DefectionAPI.getResult()
                .then(function (response) {
                    console.log(response.data);
                    commit('setPass', response.data.resultStr);
                    if (response.data.resultStr === 'PASS') {
                        commit('increaseTotalOK');
                    } else {
                        commit('increaseTotalNG');
                    }
                })
        }
    }
};
```

demosApi.js:  
定义异步的 api 请求。  
```js
import {CONFIG} from "../config";

export default {
    /**
     * 获取检测结果
     * @returns {*}
     */
    getResult: function () {
        return axios.get(CONFIG.API_URL + '/detect');
        // return axios.get('/api/v1/detect');
    }
}
```

config.js:  
```js
let api_url = '';
let app_url = '';
let gaode_maps_js_api_key = '33c20882595f1fecc2d31c8c73a38da7';

switch (process.env.NODE_ENV) {
    case 'development':
        api_url = 'http://127.0.0.1/api/v1';
        app_url = 'http://127.0.0.1';
        break;
    case 'production':
        api_url = 'http://127.0.0.1/api/v1';
        app_url = 'http://127.0.0.1';
        break;
}

export const HUANG_CONFIG = {
    API_URL: api_url,
    APP_URL: app_url,
    GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
};
```

# [State](https://vuex.vuejs.org/zh/guide/state.html)
## 1、 单一状态树
用一个对象包含所有的应用层级状态，作为单一数据源。  
## 2、 store注入
通过在根实例中注册 `store` 选项，该 `store` 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。  
```js
computed: {
    count () { // count 计算属性
        return this.$store.state.count
    }
}
```
## 3、 `mapState()` 辅助函数
```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
当映射的 computed 属性和 state 的字节点名称相同时，我们也可以给 `mapState()` 传递一个字符串数组：  
```js
computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
])
```

## 4、 对象展开运算符
`mapState()` 返回的是对象。要和局部计算属性混合使用，需要


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

Actions 支持同样的载荷方式和对象方式进行分发：  
```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

## 2、 在组件中分发 Action
你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：  
```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

# [Module](https://vuex.vuejs.org/zh/guide/modules.html)
