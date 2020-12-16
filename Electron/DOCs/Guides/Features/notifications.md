# [HTML5 Notification API](https://notifications.spec.whatwg.org/)

- [notification | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/notification)

支持 windows、linux、macOS 操作系统。

Electron 使用 [HTML5 Notification API](https://w3c-html-ig-zh.github.io/notifications/whatwg/) 发送通知。

HTML5 Notification API 只能在渲染进程使用。  
如果想在主进程中使用，查看 [Notification](https://www.electronjs.org/docs/api/notification) 模块。  

## 栗子

```html
<button onclick="notifyMe()">Notify me!</button>
```

```js
function notifyMe() {
  // 先检查浏览器是否支持
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
    notification.onclick = () => {
      console.log('通知被点击');
    }
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // 如果用户接受权限，我们就可以发起一条消息
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
        notification.onclick = () => {
          console.log('通知被点击');
        }
      }
    });
  }


  // 最后，如果执行到这里，说明用户已经拒绝对相关通知进行授权
  // 出于尊重，我们不应该再打扰他们了
}
```