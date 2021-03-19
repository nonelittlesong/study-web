# 钩子

参考：

- [轻松学会 React 钩子：以 useEffect() 为例 | 阮一峰](https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)

实践：

- [父组件调用子组件的方法](https://replit.com/@nonelittlesong/Father2Son#src/App.jsx)
- [子组件调用父组件的方法](https://replit.com/@nonelittlesong/Son2Father#src/App.jsx)
- [父组件向子组件传值](https://replit.com/@nonelittlesong/ValueF2S#src/App.jsx)
- 子组件向父组件传值 — 等同于「子组件调用父组件的方法」

## [Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)

- 不要在循环、条件或嵌套函数中调用 Hook
- 不要在普通的 JS 函数中调用 Hook，你可以：
  - 在 React 的函数组件中调用 Hook
  - 在 自定义 Hook 中调用其他 Hook

### [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

Hook 的 Eslint 插件

```
# npm
npm install eslint-plugin-react-hooks --save-dev
 
# yarn 
yarn add eslint-plugin-react-hooks --dev
```

```js
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```