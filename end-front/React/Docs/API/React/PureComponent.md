[`PureComponent`](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent) 实现了 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)。  

`React.PureComponent` 中的 `shouldComponentUpdate()` 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。  
