# v-hasPermi

## 典型实现原理

### 权限数据来源
用户登录后，后端返回用户的权限标识列表（如 `['user:add', 'user:edit']`），前端将其存储在 Vuex 或本地存储中。

### 自定义指令逻辑
v-hasPermi 在绑定到元素时，会检查当前用户的权限列表是否包含指令传入的权限标识：

如果 有权限，元素正常显示。

如果 无权限，直接移除元素或禁用交互。

## 示例
注册全局指令
```js
// main.js 或权限模块中
import Vue from 'vue';

// 权限检查函数
const hasPermission = (permission) => {
  const permissions = store.getters.permissions; // 从 Vuex 获取权限列表
  return permissions.includes(permission);
};

// 注册全局指令
Vue.directive('hasPermi', {
  inserted(el, binding) {
    const { value } = binding; // 获取指令传入的权限标识（如 'user:delete'）
    if (value && !hasPermission(value)) {
      el.parentNode?.removeChild(el); // 无权限时直接移除元素
      // 或禁用按钮：el.disabled = true;
    }
  }
});
```
在模板中使用
```vue
<template>
  <!-- 有 'user:delete' 权限时按钮才会显示 -->
  <button v-hasPermi="'user:delete'">删除用户</button>
  
  <!-- 多个权限需同时满足（需自行扩展逻辑） -->
  <button v-hasPermi="['user:edit', 'user:audit']">审核编辑</button>
</template>
```

## 扩展功能

多权限校验  
支持传入数组，要求用户拥有所有权限：
```js
Vue.directive('hasPermi', {
  inserted(el, binding) {
    const permissions = store.getters.permissions;
    const requiredPermis = Array.isArray(binding.value) ? binding.value : [binding.value];
    const hasAll = requiredPermis.every(p => permissions.includes(p));
    if (!hasAll) el.parentNode?.removeChild(el);
  }
});
```

权限模式控制  
支持 any（任一权限）或 all（全部权限）模式：
```vue
<button v-hasPermi:any="['user:edit', 'user:audit']">满足任一权限即可</button>
<button v-hasPermi:all="['user:edit', 'user:audit']">需同时满足所有权限</button>
```

权限更新响应  
监听权限变化，动态更新界面（需结合 Vuex 或响应式状态）：
```vue
Vue.directive('hasPermi', {
  update(el, binding) {
    // 当权限或绑定值变化时重新检查
    const hasPerm = hasPermission(binding.value);
    if (!hasPerm && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
});
```
