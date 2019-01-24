浏览器可以安全的存储键值对。  
https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API  

# 一、 基本概念
Web Storage包含如下两种机制：  
* `sessionStorage`为每一个给定的源维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。  
* `localStorage`同样的功能，但是浏览器重启后仍然存在。  

这两种机制通过`Window.sessionStorage`和`Window.localStorage`属性使用。

# 二、 示例
检查localStorage功能：  
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
获取Item:  
```js
function is_via_data_in_localStorage() {
  if (localStorage.getItem('_via_timestamp')) {
    return true;
  } else {
    return false;
  }
}

function download_localStorage_data(type) {
  var saved_date = new Date(localStorage.getItem('_via_timestamp');
  var localStorage_data_blob = new Blob([localStorage.getItem('_via_img_metadata')], {type: 'text/json;charset=utf-8'});
  save_data_to_local_file(localStorage_data_blob, 'VIA_browser_cache_' + saved_date + '.json');
}
```
清除localStorage：  
```js
function clear_localStorage() {
  localStorage.clear();
  show_home_panel();
}
```
