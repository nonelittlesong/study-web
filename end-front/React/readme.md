# [开始](https://zh-hans.reactjs.org/docs/getting-started.html)

项目实战：

- [react-admin](https://github.com/yezihaohao/react-admin)
- [antd-spa](https://github.com/zhaoyu69/antd-spa)
- [react-admin-master](https://github.com/z-9527/react-admin-master)

资源：

* [React官网](https://react.docschina.org/)
* [Tania Rascia 的 React 概览](https://www.taniarascia.com/getting-started-with-react/)
* [React DOM](https://reactjs.org/docs/react-dom.html) - adds DOM-specific methods
* [Babel](https://babeljs.io/) - JS 编译器
* [React Hot Loader](https://gaearon.github.io/react-hot-loader/getstarted/)
* [Webpack Boilerplate](https://github.com/taniarascia/webpack-boilerplate)
* [容器组件和展示组件相分离](https://segmentfault.com/a/1190000006845396)

## 创建 React 应用

- 方法 1 — [通过 HTML 的 script 标签引入 React](https://zh-hans.reactjs.org/docs/add-react-to-a-website.html)
- 方法 2 — [使用集成的工具链](https://zh-hans.reactjs.org/docs/create-a-new-react-app.html)
  - 学习 React 或创建一个新的单页面应用 — [Create React App](https://github.com/facebook/create-react-app)
  - 用 Node.js 构建服务端渲染的网站 — [Next.js](https://nextjs.org/learn/basics/create-nextjs-app)
  - 面向内容的静态网站 — [Gatsby](https://www.gatsbyjs.com/docs/)
  - 打造组件库或将 React 集成到现有代码仓库
    - [Neutrino](https://neutrinojs.org/) 把 [webpack](https://webpack.js.org/) 的强大功能和简单预设结合在一起。并且包括了 React 应用和 React 组件的预设。
    - [Nx](https://nx.dev/react) 是针对全栈 monorepo 的开发工具包，其内置了 React，Next.js，Express 等。
    - [Parcel](https://parceljs.org/) 是一个快速的、零配置的网页应用打包器，并且可以搭配 React 一起工作。
    - [Razzle](https://github.com/jaredpalmer/razzle) 是一个无需配置的服务端渲染框架，但它提供了比 Next.js 更多的灵活性。

## Components

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

# Props & State
- 通过 `this.props` 访问外部数据。通过 `this.state` 访问内部数据。
- `props` 不可修改，`state` 可以修改。

## 1、 props.children
- 如果当前组件没有子节点，它就是 `undefined`。
- 如果有一个子节点，数据类型是 `Object`。
- 如果有多个子节点，数据类型是 `Array`。

可以使用 `React.Children.map` 便历子节点。  


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

