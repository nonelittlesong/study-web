# ref

## 操作 DOM 元素

```vue
<template>
  <input ref="inputRef" type="text" />
  <button @click="focusInput">聚焦输入框</button>
</template>

<script>
export default {
  methods: {
    focusInput() {
      this.$refs.inputRef.focus();
    }
  }
};
</script>
```

## 调用子组件方法

父组件
```vue
<template>
  <ChildComponent ref="childRef" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>

<script>
export default {
  methods: {
    callChildMethod() {
      this.$refs.childRef.childMethod();
    }
  }
};
</script>
```

子组件
```vue
<script>
export default {
  methods: {
    childMethod() {
      console.log("子组件方法被调用");
    }
  }
};
</script>
```

## 结合 v-for 动态绑定

```vue
<template>
  <div v-for="item in 3" :key="item">
    <div :ref="'dynamicRef' + item">元素 {{ item }}</div>
  </div>
  <button @click="logRefs">打印 Refs</button>
</template>

<script>
export default {
  methods: {
    logRefs() {
      console.log(this.$refs.dynamicRef1); // 访问第一个元素
      console.log(this.$refs.dynamicRef2); // 访问第二个元素
    }
  }
};
</script>
```

注意事项

|关键点 | 说明 |
| --- | --- |
| 访问时机 | 必须在 mounted 生命周期之后访问 $refs（此时 DOM 已渲染完成）。|
| 动态 Ref | 若 ref 是动态生成的（如 :ref="dynamicRef"），$refs 可能是一个数组。|
| 避免滥用 | 优先使用 Vue 的数据驱动方式（如 v-model），仅在必要时使用 ref。|
| 响应式无关 | $refs 不是响应式的，修改它不会触发视图更新。|

对比 ref 与 $el

| 属性/方法 | 说明 | 示例 |
| --- | --- | --- |
| ref + $refs | 精确访问特定元素或组件实例 | this.$refs.myInput.focus() |
| $el | 访问组件根 DOM（仅适用于组件） | this.$el.querySelector(...) |
