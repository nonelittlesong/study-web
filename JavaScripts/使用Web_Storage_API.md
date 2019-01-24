浏览器可以安全的存储键值对。  
https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  

# 一、 基本概念
Web Storage包含如下两种机制：  
* `sessionStorage`为每一个给定的源维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。  
* `localStorage`同样的功能，但是浏览器重启后仍然存在。  

这两种机制通过`Window.sessionStorage`和`Window.localStorage`属性使用。

# 二、 示例
检查浏览器localStorage功能：  
```js
function check_local_storage() {
  try {
    var x = '__storage_test__';
    localStorage.setItem(x, x);
    localStorage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
```

