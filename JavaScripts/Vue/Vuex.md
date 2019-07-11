* [Vuex官方教程](https://vuex.vuejs.org/zh/guide/state.html)

# 项目结构
app.js:  
```js
import Vue from 'vue';
import store from './store';

Vue.component('detect-component', require('./components/DetectComponent').default);

new Vue({
    store // 把 store 对象提供给 “store” 选项，这可以把 store 实例注入所有子组件
}).$mount('#app');
```

store.js
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {detections} from "./modules/detections";

export default new Vuex.Store({
    modules: {
        detections
    }
});
```

detections.js
```js
import DefectionAPI from '../api/detection';

export const detections = {
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

detection.js:  
定义异步的 api 请求。  
```js
import {HUANG_CONFIG} from "../config";

export default {
    /**
     * 获取检测结果
     * @returns {*}
     */
    getResult: function () {
        return axios.get(HUANG_CONFIG.API_URL + '/detect');
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
