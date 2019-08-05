# [HTML5 Notification API](https://notifications.spec.whatwg.org/)
```js
let myNotification = new Notification('标题', {
  body: '通知正文内容'
});

myNotification.onclick = () => {
  console.log('通知被点击');
}
```
>注： 这是一个 HTML5 API，它只能在渲染进程中使用。如果你想在主进程中显示通知，查看[Notification](https://electronjs.org/docs/api/notification)模块。  

