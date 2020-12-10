如果你想写的组件只包含一个 render 方法，并且不包含 state，那么使用函数组件就会更简单。  
```jsx
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```
