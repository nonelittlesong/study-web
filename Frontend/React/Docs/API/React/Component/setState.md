语法：  

```
setState(updater[, callback])
```

`setState()` 不是立即执行的命令。  

## updater

### 带有形式参数的 updater 函数
```
(state, props) => stateChange
```
updater 的返回值会与 state 进行浅合并。  

### 对象
```
setState(stateChange[, callback])
```
`stateChange` 会将传入的对象浅层合并到新的 state 中。  

## callback
`setState()` 的第二个参数为可选的回调函数，它将在 setState 完成合并并重新渲染组件后执行。  
通常，我们建议使用 `componentDidUpdate()` 来代替此方式。  
