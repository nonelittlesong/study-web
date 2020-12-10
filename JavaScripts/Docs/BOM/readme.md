# BOM

浏览器对象模型。根对象是 `window` 对象。

<details>
<summary>References</summary>

- [BOM 与 DOM 的区别 | cnblogs](https://www.cnblogs.com/liwenzhou/p/8011504.html)

</details>

## 1. window

### 1.1全局作用域

1. delete  
   全局变量不能通过 delete 删除，直接在 window 上定义的属性可以。  
2. 不能访问未定义的全局变量  
   ```
   var newValue = oldValue; // 错
   var newValue = window.oldValue; // undefined
   ```

### 1.2. 窗口关系及框架

### 1.3. 窗口位置

