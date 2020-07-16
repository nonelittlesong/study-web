- https://getbootstrap.com/docs/4.5/content/reboot/  

## 路线方针
- 使用 `rem` 作为尺寸单位，代替 `rm` 用于可缩放组件的间隔与缝隙。  
- 避免 `margin-top`。垂直外边距会塌陷，造成意想不到的结果。单方向的外边距是一个好的理念模型。  
- 为了易于跨设备缩放，block 元素使用 `rem` 作为外边距的单位。  
- 尽少地对 font 相关的属性申明，多使用 `inherit` 属性。  

## 默认值
- box-sizing: border-box  

## 列表
移除了 `margin-top`，下边距为 `margin-bottom: 1rem`。嵌套的列表没有 `margin-bottom`。  

描述列表，`<dd>` 的 `margin-left` 为 0，`margin-bottom` 为 `.5rem`。`<dt>` 加粗。  

