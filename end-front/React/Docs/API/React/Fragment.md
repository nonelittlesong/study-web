`React.Fragment` 组件能够在不额外创建 DOM 元素的情况下，让 `render()` 方法返回多个元素。  

```jsx
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```

简写语法： `<></>`。  
