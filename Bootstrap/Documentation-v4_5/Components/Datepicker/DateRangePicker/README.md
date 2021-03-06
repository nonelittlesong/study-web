可以选择日期、时间，还能预定义范围。  

- [daterangepicker.com](http://www.daterangepicker.com/)  

## 依赖 Required
- [jQuery](https://jquery.com/)  
- [moment.js](https://momentjs.com/)  

## Options
- startDate: (Date or string) - 设置初始的开始日期。如果是字符串，必须匹配你在 `locale` 中设置的日期格式。  
- endDate: (Date or string) - 设置初始选择的结束日期。  
- minDate: (Date or string) - 用户可以选择的最早日期。  
- maxDate: (Date or string) - 用户可以选择的最晚日期。  
- **maxSpan**: (object) - 日期的最长跨度。  
- **showDropdowns**: (true/false) - 显示年月的选择框，让你能跳到指定的年月。  
  - minYear: (number) - 年份选择框的最小年份。  
  - maxYear: (number) - 年份选择框的最大年份。  
- showWeekNumbers: (true/false) - 显示本地化的周号。  
- showISOWeekNumbers: (true/false) - 显示 ISO 周号。  
- **timePicker**: (true/false) - 添加时间选择框。  
  - timePickerIncrement: (number) - 可选时间的间隔。  
  - timePicker24Hour: (true/false) - 使用 24 小时制。  
  - timePickerSeconds: (true/false) - 添加秒的选择框。  
- autoApply: (true/fasle) - 隐藏提交和取消按钮。  
  - buttonClasses: (string) - 添加在取消和应用按钮上的 CSS 类名。  
  - applyButtonClasses: (string) - 添加在应用按钮上的 CSS 类名。  
  - cancelButtonClasses: (string) - 添加在取消按钮上的 CSS 类名。  
- opens: ('left'/'right'/'center') - 选择器和绑定组件对齐方式：左对齐、又对齐、居中。  
- drops: ('down'/'up'/'auto') - 选择器出现位置。  

