相关资源：  
* [官网Vue.js](https://cn.vuejs.org/)
* [菜鸟教程](http://www.runoob.com/vue2/vue-tutorial.html)
* [Scrimba上的系列教程](https://scrimba.com/playlist/pXKqta)  


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
