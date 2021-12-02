# [TypeScript 入门教程](http://ts.xcatliu.com/introduction/what-is-typescript.html)

>Notes:  
>有一些第三方库原生不支持 TypeScript，但是可以通过安装社区维护的类型声明库，比如：  
>通过运行 `npm install --save-dev @types/react` 来安装 React 的类型声明库，来获得代码补全能力。

- 静态类型和动态类型 — 根据【类型检查的时机】来分类
- 强类型和弱类型 — 是否允许隐式类型转换

## 与标准同步发展

一个新的语法提案到变成正式标准，经历以下阶段：

- Stage 0：展示阶段，仅仅是提出了讨论、想法，尚未正式提案。
- Stage 1：征求意见阶段，提供抽象的 API 描述，讨论可行性，关键算法等。
- Stage 2：草案阶段，使用正式的规范语言精确描述其语法和语义。
- Stage 3：候选人阶段，语法的设计工作已完成，需要浏览器、Node.js 等环境支持，搜集用户反馈。
- Stage 4：定案阶段，已准备好将其添加到正式的 ECMAScirpt 标准中。

一个语法进入到 Stage 3 阶段后，TypeScript 就会实现它。

