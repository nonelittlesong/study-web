
## useRef

```js
const refContainer = useRef(initialValue);
```

useRef 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

用例：命令式地访问子组件

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## useReducer

`useState` 的替代方案。

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

`useReducer()` 接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。

## useCallback

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

返回一个 `memoized` 回调函数。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

## useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作。

## useImperativeHandle

用于子组件，自定义暴露给父组件的实例值。

语法：

```js
useImperativeHandle(ref, createHandle, [deps])
```

参数：

- `ref` — 定义 current 对象的 ref
- `createHandle` — 一个函数，返回值是一个对象，即这个 ref 的 current
- `[deps]` — 依赖列表，当监听的依赖发生变化，`useImperativeHandle` 才会重新将子组件的实例属性输出到父组件

`useImperativeHandle` 应当与 `forwardRef` 一起使用：

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

## useLayoutEffect

- `useEffect` 是在浏览器渲染后，执行回调函数。
- `useLayoutEffect` 是在 DOM 更新后，浏览器渲染前，执行回调函数。

当你的 `useEffect` 里面的操作需要处理 DOM，并且会改变页面的样式，就需要用 `useLayoutEffect`。

参考：

- [useEffect 和 useLayoutEffect 的区别 | 简书](https://www.jianshu.com/p/412c874c5add)

## useDebugValue

