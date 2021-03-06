## apply(context, fn, \[args])
`call([context, fn], ...args)` 的另一种写法。  


## call()
### 1、 call(fn, ...args)
执行一个 `Generator` 函数或执行一个返回 `Promise` 或其他值的普通函数。  

- fn: Function - 一个 Generator 函数, 也可以是一个返回 Promise 或任意其它值的普通函数。
- args: Array\<any> - 传递给 fn 的参数数组。

### 2、 call(\[context, fn], ...args) && call({context, fn}, ...args)
传递 `this` 上下文给 `fn`。  

### 3、 call(\[context, fnName], ...args)
支持用字符串传递 `fn`。  


## cps()
### 1、 cps(fn, ...args)
执行 Node 风格的函数。  

- `fn: Function` - 一个 Node 风格的函数。
- `args: Array<any>` - 传递给 `fn` 的参数数组。

>**注意：**  
>middleware 将执行 fn(...arg, cb)。其中 cb 是由 middleware 传递给 fn 的回调函数。如果 fn 正常结束，则必定会调用 cb(null, result)，从而告知 middleware 成功的结果。如果 fn 遇到了错误，则必定会调用 cb(error)，从而告知 middleware 出错了。
>
>在 fn 终止之前，middleware 会保持暂停状态。

### 2、 cps(\[context, fn], ...args)
传递 `this` 上下文 给 `fn`。  


## fork
非阻塞（后台）执行。  
### 1、 fork(fn, ...args)
- `fn: Function` - 一个 Generator 或返回 Promise的函数。
- `args: Array<any>` - `fn` 的参数。

返回 [Task](https://redux-saga-in-chinese.js.org/docs/api/) 对象。  

### 2、 fork(\[context, fn], ...args)
支持使用 `this` 上下文调用分叉函数。  


## put
### 1、 put(action)
非阻塞。  
向 store 发起一个 action。  

### 2、 put.resolve(action)
阻塞（如果从 `dispatch` 返回了 promise，它将会等待其结果）。  

### 3、 put(channel, action)
向指定的 channel 中放入一条 action。  
当 put **没有** 被缓存而是被 taker 立即消费掉的时候，这个 effect 是阻塞型的。假如有错误被抛到了这些 taker 当中，那这个错误将会冒泡回到 saga 里面。  


## select(selector, ...args)
- `selector: Function` - 一个 `(state, ...args) => args` 的函数。
- `args: Array<any>` - 传递给 `selector` 的参数，将追加在 `getState` 后。

如果调用 select 的参数为空（即 yield select()），那么 effect 会取得完整的 state（与调用 getState() 的结果相同）。

>重要提醒：在向 store 发起 action 时，middleware 首先会把 action 转发给 reducers，然后通知 Sagas。这意味着，当你查询 Store 的 state 时，你获得的是 action 被应用 **后** 的 state。 但是，只有当所有后续中间件都以同步的形式调用 next(action) 时，才能保证此行为。如果有任何后续 middleware 异步地调用 next(action)（虽然不常见，但存在这种可能），那么 saga 会在 action 被应用 **前** 获得 state。因此，建议检查每一个后续的 middleware 的来源，以确保是通过同步的形式调用 next(action)；或者确保 redux-saga 是调用链中的最后一个中间件。  

## take
等待指定的 `action`。  
### 1、 take(pattern)
在发起与 `pattern` 匹配的 `action` 之前，Generator 将暂停。  

pattern:  
- 空或 `'*'` - 匹配所有 action。  
- 函数 - 匹配 `pattern(action)` 为 true 的 action。
  >注意: 如果 pattern 函数上定义了 toString，action.type 将改用 pattern.toString 来测试。这个设定在你使用 action 创建函数库（如 redux-act 或 redux-actions）时非常有用。
- `String` - 匹配 `action.type === pattern` 的 action。
- `Array` - 数组中的每一项运用上述规则。

>middleware 提供了一个特殊的 action —— END。如果你发起 END action，则无论哪种 pattern，只要是被 take Effect 阻塞的 Sage 都会被终止。假如被终止的 Saga 下仍有分叉（forked）任务还在运行，那么它在终止任务前，会先等待其所有子任务均被终止。  

### 2、 take.maybe(pattern)
与 `take(pattern)` 相同，但在 `END action` 时不自动终止 Saga。  

### 3、 take(channel)
从指定的 `Channel` 中等待一条特定消息。  

### 4、 take.maybe(channel)
与 `take(channel)` 相同，但在 `END action` 时不自动地终止 Saga。  

