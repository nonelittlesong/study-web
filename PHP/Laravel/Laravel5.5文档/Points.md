# Blade & JavaScript 框架

由于很多 JavaScript 框架也是用花括号来表示要显示在浏览器中的表达式，如 Vue，  
我们可以使用 @ 符号来告诉 Blade 渲染引擎该表达式应该保持原生格式不作改动。比如：  
```htm
<h1>Laravel</h1>
Hello, @{{ name }}.
```
在本例中，@ 符在编译阶段会被 Blade 移除，但是，{{ name }} 表达式将会保持不变，从而可以被 JavaScript 框架正常渲染。  
