# 不要在构造函数中进行异步操作

构造函数应该是一个没有副作用的纯函数，设置数据结构和实例属性，返回类的实例。

<details>
<summary>References</summary>

- [Is it bad practice to have a constructor function return a Promise? | stackoverflow](https://stackoverflow.com/questions/24398699/is-it-bad-practice-to-have-a-constructor-function-return-a-promise)
- [js 类的 constructor 中不支持异步函数吗？ | segmentfault](https://segmentfault.com/q/1010000016058627)
- [~~异步构造函数 - 构造函数与 Promise 的结合 | BlackGlory~~](https://www.blackglory.me/async-constructor/)

</details>

## 如果我需要异步地导入数据到实例中？

:warning: 不应该在获得这些数据之前创建实例。

应该把数据作为参数传入你的构造函数。  
用一个静态方法加载数据，然后，链式地创建包装过数据的新实例。

```js
Engine.load({path: 'path/to/posts'}).then(function(posts) {
  new Engine(posts).displayPosts();
})
```
