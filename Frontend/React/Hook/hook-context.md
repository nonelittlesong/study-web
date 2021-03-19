
```js
const value = useContext(MyContext);
```

接受一个 context 对象（React.createContext 的返回值），返回该 context 当前的值。
当前的 context 值由最近的 `<MyContext.Provider>` 的 value prop 决定。

当最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。

>提示
>`useContext(MyContext)` 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 `<MyContext.Provider>` 来为下层组件提供 context。

