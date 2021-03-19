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
