
- [箭头函数中的 this](../ES2015/Arrow/README.md)

## 1. this 和 bind

有时候，我们需要保持 this 的上下文。

在 react 中，常看到：

```js
export default class App extends Component {
  constructor(props) {
    super(props);
    this.foo = this.foo.bind(this);
  }
  
  foo() {
    // todo something
  }
  
  render() {
    return (
      <View>
        <Button onPress={this.foo}/>
      </View>
    )
  }
}
```
