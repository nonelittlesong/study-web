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

# 模板语法
在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。  
如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染 (render) 函数，使用可选的 JSX 语法。  

## 1、 插值
### \# 文本
数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：  
```htm
<span>Message: {{ msg }}</span>
```
Mustache 标签将会被替代为对应数据对象上 msg 属性的值。无论何时，绑定的数据对象上 msg 属性发生了改变，插值处的内容都会更新。  
通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的**其它**数据绑定：  
```htm
<span v-once>这个将不会改变: {{ msg }}</span>
```

### \# 原始HTML
双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 v-html 指令：  
```htm
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```
注意，你不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位。  

>你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。  

### \# 特性
Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令：  
```htm
<div v-bind:id="dynamicId"></div>
```
对于布尔特性 (它们只要存在就意味着值为 true)，v-bind 工作起来略有不同，在这个例子中：  
```htm
<button v-bind:disabled="isButtonDisabled">Button</button>
```
如果 isButtonDisabled 的值是 null、undefined 或 false，则 disabled 特性甚至不会被包含在渲染出来的 <button> 元素中。  

### \# 使用JavaScript表达式
```htm
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```
每个绑定都只能包含**单个表达式**：  
```htm
<!-- 这是语句，不是表达式 -->
{{var a = 1}}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message }}}
```

>模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 `Math` 和 `Date` 。你不应该在模板表达式中试图访问用户定义的全局变量。  

## 2、 指令
指令 (Directives) 是带有 `v-` 前缀的特殊特性。指令特性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。回顾我们在介绍中看到的例子：  
```htm
<p v-if="seen">现在你看到我了</p>
```
这里，`v-if` 指令将根据表达式 `seen` 的值的真假来插入/移除 \<p> 元素。  

### \# 参数
一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，v-bind 指令可以用于响应式地更新 HTML 特性：  
```htm
<a v-bind:href="url">...</a>
```
在这里 href 是参数，告知 v-bind 指令将该元素的 href 特性与表达式 url 的值绑定。  

另一个例子是 v-on 指令，它用于监听 DOM 事件：  
```htm
<a v-on:click="doSomething">...</a>
```

### \# 动态参数
2.6新增。  
从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：  
```htm
<a v-bind:[attributeName]="url"> ... </a>
```
这里的 attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 Vue 实例有一个 data 属性 attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。  

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：  
```htm
<a v-on:[eventName]="doSomething"> ... </a>
```
同样地，当 eventName 的值为 "focus" 时，v-on:\[eventName] 将等价于 v-on:focus。  

**对动态参数的值的约束**  
动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。  

**对动态参数表达式的约束**  

>动态参数表达式有一些语法约束，因为某些字符，例如空格和引号，放在 HTML 特性名里是无效的。同样，在 DOM 中使用模板时你需要回避大写键名。  

例如，下面的代码是无效的：  
```htm
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```
变通的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。  

另外，如果你在 DOM 中使用模板 (直接在一个 HTML 文件里撰写模板)，需要留意浏览器会把特性名全部强制转为小写：  
```htm
<!-- 在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]` -->
<a v-bind:[someAttr]="value"> ... </a>
```
