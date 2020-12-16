# 在线/离线事件侦测

## 1. 渲染进程

在渲染进程中，通过 HTML5 的 `navigator.onLine` 属性实现(不能真实反映)。 

online-status.html：

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  alertOnlineStatus)
  window.addEventListener('offline',  alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```

## 2. 主进程

通过 Electron 的进程间通讯工具，在主进程中访问在线状态。
