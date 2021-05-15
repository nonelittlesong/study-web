相关资源：  
* [官网Vue.js](https://cn.vuejs.org/)
* [菜鸟教程](http://www.runoob.com/vue2/vue-tutorial.html)
* [Scrimba上的系列教程](https://scrimba.com/playlist/pXKqta)  

<details>
  <summary>点击此处查看目录</summary>
  
  * [Vue实例](#Vue实例)
  * [模板语法](#模板语法)
  * [计算属性和侦听器](#计算属性和侦听器)
  * [Class与Style绑定](#Class与Style绑定)
  * [条件渲染](#条件渲染)
  * [列表渲染](#列表渲染)
  * [事件处理](#事件处理)
  * [组件基础](#组件基础)

</details>

# Vue实例
管理vm中的各个组件的依赖关系。  
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

### \# 修饰符
修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：  
```htm
<form v-on:submit.prevent="onSubmit">...</form>
```

## 3、 缩写
### \# `v-bind`缩写
```htm
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

### \# `v-on`缩写
```htm
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

# 计算属性和侦听器
## 1、 计算属性
### \# 基础例子
```htm
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join(''); // 只有响应式依赖会更新
    }
  }
})
```

### \# 计算属性缓存vs方法
**计算属性是基于它们的响应式依赖进行缓存的。**  
这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：  
```js
computed: {
  now: function () {
    return Date.now();
  }
}
```

### \# 计算属性vs侦听属性
```htm
<div id="demo">{{ fullName }}</div>
```
侦听属性：  
```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
上面代码是命令式且重复的。将它与计算属性的版本进行比较：  
```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

### \# 计算属性的setter
计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：  
```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

## 2、 侦听器
当需要在数据变化时执行**异步**或开销较大的操作时:  
```htm
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```
```js
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```

# Class与Style绑定
## 1、 绑定HTML Class
### \# 对象语法
我们可以传给 v-bind:class 一个对象，以动态地切换 class：  
```htm
<div v-bind:class="{ active: isActive }"></div>
```
上面的语法表示 active 这个 class 存在与否将取决于数据属性 isActive 的 truthiness。  

你可以在对象中传入更多属性来动态切换多个 class。此外，v-bind:class 指令也可以与普通的 class 属性共存。当有如下模板:  
```htm
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```
和如下 data：  
```js
data: {
  isActive: true,
  hasError: false
}
```
结果渲染为：  
```htm
<div class="static active"></div>
```
当 isActive 或者 hasError 变化时，class 列表将相应地更新。例如，如果 hasError 的值为 true，class 列表将变为 "static active text-danger"。  

绑定的数据对象不必内联定义在模板里：  
```htm
<div v-bind:class="classObject"></div>
```
```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```
渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的计算属性。这是一个常用且强大的模式：  
```htm
<div v-bind:class="classObject"></div>
```
```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### \# 数组语法
我们可以把一个数组传给 v-bind:class，以应用一个 class 列表：  
```htm
<div v-bind:class="[activeClass, errorClass]"></div>
```
```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
渲染为：  
```htm
<div class="active text-danger"></div>
```
如果你也想根据条件切换列表中的 class，可以用三元表达式：  
```htm
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```
不过，当有多个条件 class 时这样写有些繁琐。所以在数组语法中也可以使用对象语法：  
```htm
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### \# 用在组件上
当在一个自定义组件上使用 class 属性时，这些类将被添加到**该组件的根元素**上面。这个元素上已经存在的类不会被覆盖。  
例如，如果你声明了这个组件：  
```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```
然后在使用它的时候添加一些 class：  
```htm
<my-component class="baz boo"></my-component>
```
HTML 将被渲染为:  
```htm
<p class="foo bar baz boo">Hi</p>
```
对于带数据绑定 class 也同样适用：  
```htm
<my-component v-bind:class="{ active: isActive }"></my-component>
```
当 isActive 为 truthy[1] 时，HTML 将被渲染成为：  
```htm
<p class="foo bar active">Hi</p>
```

## 2、 绑定内联样式
### \# 对象语法
```htm
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```
直接绑定到一个样式对象通常更好，这会让模板更清晰：  
```htm
<div v-bind:style="styleObject"></div>
```
```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

### \# 数组语法
`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：  
```htm
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

### \# 自动添加前缀
当 `v-bind:style` 使用需要添加浏览器引擎前缀的 CSS 属性时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。  

### \# 多重值
2.3.0+  
从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：  
```htm
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
这样写只会渲染数组中**最后一个**被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。  


# 条件渲染
## 1、 v-if
v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。  
```htm
<h1 v-if="awesome">Vue is awesome!</h1>
```
可以加`v-else`：  
```htm
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### \# 在 `<template>` 元素上使用 `v-if` 条件渲染分组
因为 `v-if` 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。最终的渲染结果将不包含 `<template>` 元素。  
```htm
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### \# `v-else`
你可以使用 `v-else` 指令来表示 `v-if` 的“else 块”：  
```htm
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```
**`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。**  

### \# `v-else-if`
`v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”，**可以连续使用**：  
```htm
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。  

### \# 用 `key` 管理可复用的元素
Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：  
```htm
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```
那么在上面的代码中切换 `loginType` 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，`<input>` 不会被替换掉——仅仅是替换了它的 `placeholder`。  
这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 `key` 属性即可：  
```htm
template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
**注意，`<label>` 元素仍然会被高效地复用，因为它们没有添加 `key` 属性。**  

## 2、 v-show
另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：  
```htm
<h1 v-show="ok">Hello!</h1>
```
不同的是**带有 `v-show` 的元素始终会被渲染并保留在 DOM 中**。`v-show` 只是简单地切换元素的 CSS 属性 `display`。  
**注意，`v-show` 不支持 `<template>` 元素**  

## 3、 v-if vs v-show
如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。  

## 4、 v-if与v-for一起使用
当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。  


# 列表渲染
## 1、 用 `v-for` 把一个数组对应为一组元素
```htm
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```
```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
你也可以用 `of` 替代 `in` 作为分隔符，因为它是最接近 JavaScript 迭代器的语法(~JavaScript迭代器复习~)：  
```htm
<div v-for="item of items"></div>
```

## 2、 一个对象的`v-for`
```htm
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```
>在遍历对象时，是按 Object.keys() 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下是一致的。  

## 3、 维护状态
当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。  

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。  

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性：  
```htm
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
```
建议尽可能在使用 v-for 时提供 key attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。  

因为它是 Vue 识别节点的一个通用机制，key 并不与 v-for 特别关联，key 还具有其他用途，我们将在后面的指南中看到其他用途。  

>不要使用对象或数组之类的非原始类型值作为 v-for 的 [key](https://cn.vuejs.org/v2/api/#key)。用字符串或数类型的值取而代之。  

## 4、 数组更新检测
### \# 变异方法
Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新。这些方法如下：  

* push()
* pop()
* shift() - 把数组的第一个元素从其中删除，并返回第一个元素的值。
* unshift() - 添加任意项，返回新数组长度。
* [splice()](https://github.com/nonelittlesong/study-web/blob/master/JavaScripts/%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B.md#2-array%E7%B1%BB%E5%9E%8B) - splice(起始位, 删除数, 添加项)
* sort()
* reverse()

### \# 替换数组
变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如：`filter()`, `concat()` 和 `slice()` 。这些不会改变原始数组，但**总是返回一个新数组**。当使用非变异方法时，可以用新数组替换旧数组：  
```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```
你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。  

### \# 注意事项
由于 JavaScript 的限制，Vue 不能检测以下变动的数组：  

1. 当你利用索引直接设置一个项时，例如：vm.items\[indexOfItem] = newValue
1. 当你修改数组的长度时，例如：vm.items.length = newLength

举个例子：  
```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
});
vm.items[1] = 'x'; // 不是响应性的
vm.items.length = 2; // 不是响应性的
```
为了解决第一类问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将触发状态更新：  
```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```
你也可以使用 `vm.$set` 实例方法，该方法是全局方法 `Vue.set` 的一个别名：  
```js
vm.$set(vm.items, indexOfItem, newValue)
```

为了解决第二类问题，你可以使用 `splice`：  
```js
vm.items.splice(newLength)
```

## 5、 对象更改检测注意事项
还是由于 JavaScript 的限制，**Vue 不能检测对象属性的添加或删除**：  
```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式属性。例如，对于：  
```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```
你可以添加一个新的 `age` 属性到嵌套的 `userProfile` 对象：  
```js
Vue.set(vm.userProfile, 'age', 27)
```
你还可以使用 `vm.$set` 实例方法，它只是全局 `Vue.set` 的别名：  
```js
vm.$set(vm.userProfile, 'age', 27)
```

有时你可能需要为已有对象赋予多个新属性，比如使用 `Object.assign()` 或 `_.extend()`。在这种情况下，你应该用两个对象的属性创建一个新的对象:  
```js
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

## 6、 显示过滤/排序结果
有时，我们想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。在这种情况下，可以创建返回过滤或排序数组的计算属性。  
例如：  
```htm
<li v-for="n in evenNumbers">{{ n }}</li>
```
```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

在计算属性不适用的情况下 (例如，在嵌套 `v-for` 循环中) 你可以使用一个 method 方法：  
```htm
<li v-for="n in even(numbers)">{{ n }}</li>
```
```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

## 7、 一段取值范围的 `v-for`
`v-for` 也可以取整数。在这种情况下，它将重复多次模板。  
```htm
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

## 8、 `v-for` on a `<template>`
类似于 `v-if`，你也可以利用带有 `v-for` 的 `<template>` 渲染多个元素。比如：  
```htm
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## 9、 `v-for` with `v-if`
[不推荐同时使用](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81)  
当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你想为仅有的一些项渲染节点时，这种优先级的机制会十分有用，如下：  
```htm
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```
而如果你的目的是有条件地跳过循环的执行，那么可以将 `v-if` 置于外层元素 (或 `<template>`)上。如：  
```htm
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```

## 10、 一个组件的 `v-for`
在自定义组件里，你可以像任何普通元素一样用 `v-for` 。  
```htm
<my-component v-for="item in items" :key="item.id"></my-component>
```
>2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。  

然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要用 `props` ：  
```htm
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

不自动将 `item` 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。  

下面是一个简单的 todo list 的完整例子：  
```htm
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
  </form>
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```
注意这里的 `is="todo-item"` 属性。这种做法在使用 DOM 模板时是十分必要的，因为在 `<ul>` 元素内只有 `<li>` 元素会被看作有效内容。这样做实现的效果与 `<todo-item>` 相同，但是可以避开一些潜在的浏览器解析错误。查看 [DOM 模板解析说明](https://cn.vuejs.org/v2/guide/components.html#%E8%A7%A3%E6%9E%90-DOM-%E6%A8%A1%E6%9D%BF%E6%97%B6%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9) 来了解更多信息。  
```js
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
```





# 事件处理
## 1、 监听事件
可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。  
示例：  
```htm
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```
```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```

## 2、 事件处理方法
```htm
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```
```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// 也可以用 JavaScript 直接调用方法
example2.greet() // => 'Hello Vue.js!'
```

## 3、 内联处理器中的方法
```htm
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```
```js
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法：  
```htm
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```
```js
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```

## 4、 事件修饰符
在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。  

为了解决这个问题，Vue.js 为 `v-on` 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。  

* .stop
* .prevent
* .capture
* .self
* .once
* .passive

```htm
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

>使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。  

```htm
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```
不像其它只能对原生的 DOM 事件起作用的修饰符，.once 修饰符还能被用到自定义的组件事件上。  

Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。  
```htm
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```
这个 .passive 修饰符尤其能够提升移动端的性能。  

>不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，`.passive` 会告诉浏览器你不想阻止事件的默认行为。  

## 5、 按键修饰符
在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：  
```htm
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```
你可以直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。  
```htm
<input v-on:keyup.page-down="onPageDown">
```
在上述示例中，处理函数只会在 $event.key 等于 PageDown 时被调用。  

### \# 按键码
>`keyCode` 的事件用法[已经被废弃了](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)并可能不会被最新的浏览器支持。  

使用 keyCode 特性也是允许的：  
```htm
<input v-on:keyup.13="submit">
```

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：  

* .enter
* .tab
* .delete - 捕获删除和退格键
* .esc
* .space
* .up
* .down
* .left
* .right

>有一些按键 (`.esc` 以及所有的方向键) 在 IE9 中有不同的 `key` 值, 如果你想支持 IE9，这些内置的别名应该是首选。  

你还可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名：  
```js
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

## 6、 系统修饰键
可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。  

* .ctrl
* .alt
* .shift
* .meta

>注意：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。  

例如：  
```htm
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

>请注意修饰键与常规按键不同，在和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 `ctrl` 也不会触发事件。如果你想要这样的行为，请为 `ctrl` 换用 `keyCode：keyup.17`。  

### \# .exact 修饰符
`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。  
```htm
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

### \# 鼠标按钮修饰符

* .left
* .right
* .middle

## 7、 为什么在HTML中监听事件
你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：  

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

# 表单输入绑定
## 1、 基础用法
你可以用 `v-model` 指令在表单`<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。  

>`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。  

`v-model` 在内部为不同的输入元素使用不同的属性并抛出不同的事件：  
* `text` 和 `textarea` 元素使用 `value` 属性和 `input` 事件；
* `checkbox` 和 `radio` 使用 `checked` 属性和 `change` 事件；
* `select` 字段将 `value` 作为 `prop` 并将 `change` 作为事件。

>对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 `v-model` 不会在输入法组合文字过程中得到更新。如果你也想处理这个过程，请使用 `input` 事件。   

### \# 文本
```htm
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

### \# 多行文本
```htm
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```
>在文本区域插值 (`<textarea>{{text}}</textarea>`) 并不会生效，应用 `v-model` 来代替。  

### \# 复选框
单个复选框，绑定到布尔值：  
```htm
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```
多个复选框，绑定到同一个数组：  
```htm
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>
```
```js
new Vue({
  el: '#example-3',
  data: {
    checkedNames: []
  }
})
```

### \# 单选框
```htm
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
```
```js
new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```

### \# 选择框
单选时：  
```htm
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```
```js
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

>如果 `v-model` 表达式的初始值未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 `change` 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。  

多选时 (绑定到一个数组)：  
```htm
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```
```js
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```

用 `v-for` 渲染的动态选项：  
```htm
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```
```js
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

## 2、 值绑定
对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：  
```htm
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```
但是有时我们可能想把值绑定到 Vue 实例的一个动态属性上，这时可以用 `v-bind` 实现，并且这个属性的值可以不是字符串。  

### \# 复选框
```htm
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
```
```js
// 当选中时
vm.toggle === 'yes'
// 当没有选中时
vm.toggle === 'no'
```

>这里的 `true-value` 和 `false-value` 特性并不会影响输入控件的 `value` 特性，因为浏览器在提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，(比如“yes”或“no”)，请换用单选按钮。

### \# 单选按钮
```htm
<input type="radio" v-model="pick" v-bind:value="a">
```
```js
// 当选中时
vm.pick === vm.a
```

### \# 选择框的选项
```htm
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```
```js
// 当选中时
typeof vm.selected // => 'object'
vm.selected.number // => 123
```

## 3、 修饰符
### \# .lazy
在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 `lazy` 修饰符，从而转变为使用 `change` 事件进行同步：  
```htm
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

### \# .number
如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：  
```htm
<input v-model.number="age" type="number">
```
这通常很有用，因为即使在 `type="number"` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被`parseFloat()` 解析，则会返回原始的值。  

### \# .trim
如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：  
```htm
<input v-model.trim="msg">
```

# 组件基础
## 1、 基本示例
```js
Vue.component('button-counter', {
  data: function() {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```
组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 `<button-counter>`。我们可以在一个通过 `new Vue` 创建的 Vue 根实例中，把这个组件作为自定义元素来使用：  
```htm
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
```js
new Vue({ el: '#components-demo' })
```
因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。  

## 2、 组件的复用
你可以将组件进行任意次数的复用：  
```htm
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

### \# `data` 必须是一个函数
当我们定义这个 `<button-counter>` 组件时，你可能会发现它的 `data` 并不是像这样直接提供一个对象：  
```js
data: {
  count: 0
}
```
取而代之的是，一个组件的 `data` 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：  
```js
data: function () {
  return {
    count: 0
  }
}
```

## 3、 组件的组织
为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：全局注册和局部注册。至此，我们的组件都只是通过 `Vue.component` 全局注册的：  
```js
Vue.component('my-component-name', {
  // ... options ...
})
```

## 4、 通过 Prop 向子组件传递数据
Prop 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。为了给博文组件传递一个标题，我们可以用一个 `props` 选项将其包含在该组件可接受的 prop 列表中：  
```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 `data` 中的值一样。  
一个 prop 被注册之后，你就可以像这样把数据作为一个自定义特性传递进来：  
```htm
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```
然而在一个典型的应用中，你可能在 `data` 里有一个博文的数组：  
```js
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```
并想要为每篇博文渲染一个组件：  
```htm
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```
如上所示，你会发现我们可以使用 `v-bind` 来动态传递 prop。这在你一开始不清楚要渲染的具体内容，比如从一个 API 获取博文列表的时候，是非常有用的。  

## 5、 单个根元素
当构建一个 `<blog-post>` 组件时，你的模板最终会包含的东西远不止一个标题：  
```htm
<h3>{{ title }}</h3>
```
最最起码，你会包含这篇博文的正文：  
```htm
<h3>{{ title }}</h3>
<div v-html="content"></div>
```
然而如果你在模板中尝试这样写，Vue 会显示一个错误，并解释道 **every component must have a single root element (每个组件必须只有一个根元素)**。你可以将模板的内容包裹在一个父元素内，来修复这个问题，例如：  
```htm
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```
看起来当组件变得越来越复杂的时候，我们的博文不只需要标题和内容，还需要发布日期、评论等等。为每个相关的信息定义一个 prop 会变得很麻烦：  
```htm
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
```

所以是时候重构一下这个 `<blog-post>` 组件了，让它变成接受一个单独的 `post` prop：  
```htm
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```
```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```
>上述的这个和一些接下来的示例使用了 JavaScript 的[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)来让多行的模板更易读。它们在 IE 下并没有被支持，所以如果你需要在不 (经过 Babel 或 TypeScript 之类的工具) 编译的情况下支持 IE，请使用[折行转义字符](https://css-tricks.com/snippets/javascript/multiline-string-variables-in-javascript/)取而代之。  

## 6、 监听子组件事件
在我们开发 `<blog-post>` 组件时，它的一些功能可能要求我们和父级组件进行沟通。例如我们可能会引入一个可访问性的功能来放大博文的字号，同时让页面的其它部分保持默认的字号。  

在其父组件中，我们可以通过添加一个 `postFontSize` 数据属性来支持这个功能：  
```js
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/* ... */],
    postFontSize: 1
  }
})
```
它可以在模板中用来控制所有博文的字号：  
```htm
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></blog-post>
  </div>
</div>
```
现在我们在每篇博文正文之前添加一个按钮来放大字号：  
```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
```
问题是这个按钮不会做任何事：  
```htm
<button>
  Enlarge text
</button>
```
当点击这个按钮时，我们需要告诉父级组件放大所有博文的文本。幸好 Vue 实例提供了一个自定义事件的系统来解决这个问题。父级组件可以像处理 native DOM 事件一样通过 `v-on` 监听子组件实例的任意事件：  
```htm
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```
同时子组件可以通过调用内建的 `$emit` 方法 并传入事件名称来触发一个事件：  
```html
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```
有了这个 `v-on:enlarge-text="postFontSize += 0.1"` 监听器，父级组件就会接收该事件并更新 `postFontSize` 的值。  

### \# 使用事件抛出一个值
有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 `<blog-post>` 组件决定它的文本要放大多少。这时可以使用 `$emit` 的第二个参数来提供这个值：  
```htm
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```
然后当在父级组件监听这个事件的时候，我们可以通过 $event 访问到被抛出的这个值：  
```htm
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

或者，如果这个事件处理函数是一个方法：  
```htm
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
```
那么这个值将会作为第一个参数传入这个方法：  
```js
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### \# 在组件上使用`v-model`
自定义事件也可以用于创建支持 v-model 的自定义输入组件。记住：  
```htm
<input v-model="searchText">
```
等价于：  
```htm
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```
当用在组件上时，v-model 则会这样：  
```htm
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```
为了让它正常工作，这个组件内的 <input> 必须：  

* 将其 `value` 特性绑定到一个名叫 `value` 的 prop 上
* 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

写成代码之后是这样的：  
```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```
现在 v-model 就应该可以在这个组件上完美地工作起来了：  
```htm
<custom-input v-model="searchText"></custom-input>
```

## 7、 通过插槽分发内容
```htm
<alert-box>
  Something bad happened.
</alert-box>
```
```js
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

## 8、 动态组件
https://jsfiddle.net/chrisvfritz/o3nycadu/  

## 9、 解析 DOM 模板时的注意事项
有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。  

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：  
```htm
<table>
  <blog-post-row></blog-post-row>
</table>
```
这个自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的 `is` 特性给了我们一个变通的办法：   
```htm
<table>
  <tr is="blog-post-row"></tr>
</table>
```

需要注意的是如果我们从以下来源使用模板的话，这条限制是**不存在**的：  

* 字符串 (例如：template: '...')
* 单文件组件 (.vue)
* <script type="text/x-template">

