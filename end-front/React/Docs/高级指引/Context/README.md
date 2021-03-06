
- [聊一聊我对 React Context 的理解以及应用](https://www.jianshu.com/p/eba2b76b290b)  

组件之间共享一些全局的数据，无需通过 props 传递。  

地区偏好，主题 UI，用户认证，首选语言  

- react-redux 的 `<Provider />` 通过 `Context` 提供一个全局的 `store`。  
- 拖拽组件 react-dnd 通过 `Context` 在组件中分发 DOM 的 Drag 和 Drop 事件。  
- 路由组件 react-router 通过 `Context` 管理路由状态。  

## 如何使用 Context

例子：  

传统的通过 props：  

```jsx
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

使用 context：  

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

### React.createContext
```jsx
const MyContext = React.createContext(defaultValue);
```

### Context.Provider
```jsx
<MyContext.Provider value={/* 某个值 */}>
```
当 Provider 的 value 值发生变化时，他内部的所有消费组件都会重新渲染。  
Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。  

### Class.contextType

>**注意：**  
>只能通过该 API 订阅单一 context。  

### Context.Consumer
```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```
让你在函数式组件中订阅 context。  
传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。  

### Context.displayName

context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。  

示例，下述组件在 DevTools 中将显示为 MyDisplayName：  
```jsx
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```

## 几个可以直接获取 Context 的地方

实例属性：  

- this.context

构造函数：  

- constructor(props, context)

生命周期：  

- componentWillReceiveProps(nextProps, nextContext)
- shouldComponentUpdate(nextProps, nextState, nextContext)
- componentWillUpdate(nextProps, nextState, nextContext)

无状态组件：  

```js
const StatelessComponent = (props, context) => {
  // ...
}
```
