
- [rc](http://react-component.github.io/badgeboard/)

## 一、 this.props.form
经过 `Form.create` 包装过的组件自带 `this.props.form` 属性。  

### getFieldDecorator(name:String, option: Object) => (React.Node) => React.Node
Similar to getFieldProps, but add some helper warnings and you can write onXX directly inside React.Node props:  
```js
<form>
  {getFieldDecorator('name', otherOptions)(<input />)}
</form>
```

