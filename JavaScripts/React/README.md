资源：  
* [React官网](https://react.docschina.org/)  
* [Tania Rascia 的 React 概览](https://www.taniarascia.com/getting-started-with-react/)
* [React](https://reactjs.org/docs/react-api.html) - the React top level API
* [React DOM](https://reactjs.org/docs/react-dom.html) - adds DOM-specific methods
* [Babel](https://babeljs.io/) - a JavaScript compiler that let us use ES6+ in old browsers


# Create React App
```
npx create-react-app react-tutorial
```
* use Webpack to automatically compile React, JSX, and ES6, auto-prefix CSS files
* use ESLint to test and warn about mistakes in the code

# JSX
* `className` is used instead of `class` for adding CSS classes, as `class` is a reserved keyword in JavaScript.
* Properties and methods in JSX are camelCase - `onclick` will become `onClick`.
* Self-closing tags must end in a slash - e.g. \<img />

JSX使用花括号内嵌JS代码（变量，方法，属性）：  
```js
const name = 'Tania';
const heading = <h1>Hello, {name}</h1>
```

# Components
* class component
* simple component
```js
const SimpleComponent = () => {
    return (
        ...
    )
}

class ClassComponent extends Component {
    render() {
        return (
            ...
        )
    }
}
```

# Props
子组件的属性值对应父组件的属性名。  

# State

# Submitting From Data
动态键：  
```js
handleChange = event => {
  const { name, value } = event.target

  this.setState({
    [name]: value, // 给“键”传递参数 动态键
  })
}
```
扩散运算符：  
```
handleSubmit = character => {
  this.setState({ characters: [...this.state.characters, character] })
}
```

# Pulling in API Data
Lifecycle is the order in which methods are called in React. Mounting refers to an item being inserted into the DOM.  

# Building and Deploying a React App
```
npm install --save-dev gh-pages
```
package.json:  
```
"scripts": {
  // ...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
},
"homepage": "https://taniarascia.github.io/react-tutorial",
```


# Troubleshootings
## 1、 name can no longer contain capital letters
用 [create-react-app](https://github.com/facebook/create-react-app) 创建项目，名称不能有大写。

## 2、 `render()` 方法
类组件中唯一必需实现的方法。`return` 返回的元素只能有一个根节点。  
>A class component must include `render()`, and the `return` can only return one parent element.

## 3、 this
class 中：  
* const 常量引用时不能加 this。
* 使用成员变量时要 this。

