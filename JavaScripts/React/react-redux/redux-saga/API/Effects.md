## apply(context, fn, [args])
`call([context, fn], ...args)` 的另一种写法。  

## call()
### 1、 call(fn, ...args)
创建一个 Effect 描述信息，用来命令 middleware 以参数 args 调用函数 fn。  
- fn: Function - 一个 Generator 函数, 也可以是一个返回 Promise 或任意其它值的普通函数。
- args: Array\<any> - 传递给 fn 的参数数组。

### 2、 call([context, fn], ...args) && call({context, fn}, ...args)
传递 `this` 上下文给 `fn`。  

### 3、 call([context, fnName], ...args)
支持用字符串传递 `fn`。  

### 

## cps()
### 1、 cps(fn, ...args)
创建一个 Effect 描述信息，用来命令 middleware 以 Node 风格的函数（Node style function）的方式调用 fn。  
- `fn: Function` - 一个 Node 风格的函数。
- `args: Array\<any>` - 传递给 `fn` 的参数数组。

>**注意：**  
>middleware 将执行 fn(...arg, cb)。其中 cb 是由 middleware 传递给 fn 的回调函数。如果 fn 正常结束，则必定会调用 cb(null, result)，从而告知 middleware 成功的结果。如果 fn 遇到了错误，则必定会调用 cb(error)，从而告知 middleware 出错了。
>
>在 fn 终止之前，middleware 会保持暂停状态。

### 2、 cps([context, fn], ...args)
传递 `this` 上下文 给 `fn`。  
