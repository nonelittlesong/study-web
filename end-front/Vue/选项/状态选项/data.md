# data

## 特性

### 响应式系统

Vue 会递归地将 data 返回的对象中的属性转换为 getter/setter，使数据变化能被自动检测。

```js
data() {
  return {
    message: "Hello Vue!" // 修改 message 时，视图自动更新
  };
}
```

### 组件隔离性

data 必须是一个函数（而非对象），确保每个组件实例有独立的数据副本。

```js
// 正确写法 ✅
data() {
  return { count: 0 };
}

// 错误写法 ❌（所有实例共享同一份数据）
data: { count: 0 }
```

### 数据初始化

应在 data 中预先声明所有需要响应式的字段，否则后续动态添加的属性可能需要手动处理响应性（使用 Vue.set 或 this.$set）。

```js
data() {
  return {
    user: { name: "Alice" } // 预先定义结构
  };
},
methods: {
  addAge() {
    this.$set(this.user, "age", 25); // 动态添加响应式属性
  }
}
```


## 与其他选项的关系
- props：接收父组件传递的数据（只读）。
- computed：基于 data 或其他数据派生的计算属性。
- methods：通过方法修改 data 中的数据。
- watch：监听 data 中数据的变化并执行回调。
