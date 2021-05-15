## 清除 effect

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清楚订阅
    subscription.unsubscribe();
  };
});
```

## effect 的条件执行

```js
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

>注意
>如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（`[]`）作为第二个参数。

## useEffect 完整指南

参考：

- [useEffect 完整指南 | overreacted.io](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

### Question: 如何用 useEffect 模拟 componentDidMount 生命周期？

虽然可以使用 `useEffect(fn, [])`，但他们并不完全相等。

和 `componentDidMount` 不同，`useEffect` 会捕获 props 和 state。所以，即便是在回调函数里，你拿到的还是初始的 props 和 state。如果你想要得到“最新”的值，你可以使用 `ref`。不过，通常会有更简单的实现方式，所以你不一定要用 `ref`。

它的心智模型更接近于实现状态同步，而不是响应生命周期事件。你需要「think in effects」。

### Question: 如何正确地在 useEffect 中请求数据？`[]` 又是什么？

