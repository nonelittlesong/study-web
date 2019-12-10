# window

### 1. 全局作用域
1. delete  
   全局变量不能通过delete删除，直接在window上定义的属性可以。  
2. 不能访问未定义的全局变量  
   ```
   var newValue = oldValue; // 错
   var newValue = window.oldValue; // undefined
   ```

### 2. 窗口关系及框架

### 3. 窗口位置

