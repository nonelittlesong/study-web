语法：

```js
// 初始 state
const [state, setState] = useState(initialState);
// 惰性初始 state
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

// 更新 state
setState(newState);
// 函数式更新 state
setState(preState => {
  // ...
  // return
})
```

