相关资源：  
* [官网Vue.js](https://cn.vuejs.org/)
* [菜鸟教程](http://www.runoob.com/vue2/vue-tutorial.html)
* [Scrimba上的系列教程](https://scrimba.com/playlist/pXKqta)  


# Vue实例
## 1、 创建一个实例
每个Vue应用都是通过用`Vue`函数创建一个新的Vue实例开始的：  
```js
var vm = new Vue({
  // 选项
});
```
## 2、 数据与方法
```js
// 我们的数据对象
var data = {a: 1};

// 该对象被加入到一个Vue实例中
var vm = new Vue({
  data: data
});

// 获得这个实例上的属性
// 返回源数据中对应的字段
vm.a == data.a;     // true

// 设置属性也会影响到原始数据
vm.a = 2;
data.a;             // => 2

// ...反之亦然
data.a = 3;
vm.a                // => 3
```
当这些数据改变时，视图会重新渲染。  
值得注意的是**只有当实例被创建时 data 中存在的属性才是响应式的**。也就是说如果你添加一个新的属性，比如：  
```js
vm.b = 'hi';
```
那么对 b 的改动将不会触发任何视图的更新。
如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：  
```js
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```
这里唯一的例外是使用 `Object.freeze()`，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化。  
```js
var obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```
```html
<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```
除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 `$`，以便与用户定义的属性区分开来。例如：  
```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

## 3、 实例生命周期钩子
比如 `created` 钩子可以用来在一个实例被创建之后执行代码：  
```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```
也有一些其它的钩子，在实例生命周期的不同阶段被调用，如 `mounted`、`updated` 和 `destroyed`。生命周期钩子的 `this` 上下文指向调用它的 `Vue` 实例。  

>不要在选项属性或回调上使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。

## 4、 生命周期图示
![生命周期](https://github.com/nonelittlesong/study-resources/blob/master/images/vue/lifecycle.png)  
