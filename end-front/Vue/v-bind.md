# v-bind

## 绑定普通 HTML 属性

将元素的属性与 Vue 数据关联：

```vue
<template>
  <!-- 绑定图片的 src 属性 -->
  <img :src="imageUrl" />

  <!-- 动态禁用按钮 -->
  <button :disabled="isButtonDisabled">提交</button>

  <!-- 动态绑定链接 -->
  <a :href="url">跳转</a>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "path/to/image.jpg",
      isButtonDisabled: true,
      url: "https://example.com"
    };
  }
};
</script>
```

## 动态绑定 Class 和 Style
通过对象或数组语法，动态控制样式：
```vue
<template>
  <!-- 对象语法：根据 isActive 决定是否添加 active 类 -->
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>

  <!-- 数组语法：同时绑定多个类 -->
  <div :class="[activeClass, errorClass]"></div>

  <!-- 动态绑定内联样式 -->
  <div :style="{ color: textColor, fontSize: fontSize + 'px' }"></div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      hasError: false,
      activeClass: "active",
      errorClass: "text-danger",
      textColor: "red",
      fontSize: 16
    };
  }
};
</script>
```

## 向子组件传递 Props

将父组件的数据传递给子组件的 props：

```vue
<!-- 父组件 -->
<template>
  <!-- 传递静态字符串 -->
  <ChildComponent title="静态标题" />

  <!-- 动态绑定 props -->
  <ChildComponent :title="dynamicTitle" :data-list="items" />
</template>

<script>
export default {
  data() {
    return {
      dynamicTitle: "动态标题",
      items: [1, 2, 3]
    };
  }
};
</script>
```

```vue
<!-- 子组件 ChildComponent -->
<script>
export default {
  props: {
    title: String,   // 接收父组件传递的 title
    dataList: Array  // 接收父组件传递的 dataList
  }
};
</script>
```

## 绑定对象的所有属性

使用 v-bind 直接绑定一个对象的所有属性（常用于简化代码）：

```vue
<template>
  <!-- 将 config 对象的所有属性绑定到组件 -->
  <MyComponent v-bind="config" />
</template>

<script>
export default {
  data() {
    return {
      config: {
        propA: "A",
        propB: "B",
        propC: 100
      }
    };
  }
};
</script>
```
