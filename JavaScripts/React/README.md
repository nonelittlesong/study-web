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


# Troubleshootings
## 1、 name can no longer contain capital letters
用 [create-react-app](https://github.com/facebook/create-react-app) 创建项目，名称不能有大写。

## 2、 `render()` 方法
类组件中唯一必需实现的方法。  
