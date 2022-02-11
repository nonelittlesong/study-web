参考：  
- [Bootstrap Datepicker Demo - Codepen](https://codepen.io/hexagoncircle/pen/XdZrKa)  
- [Datepicker in modal - codepen](https://codepen.io/Sinetheta/pen/Ftjwi)  
- [Bootstrap Datepicker](https://bootstrap-datepicker.readthedocs.io/en/stable/#)  

## [标记](https://bootstrap-datepicker.readthedocs.io/en/stable/markup.html)

### [date-range](https://bootstrap-datepicker.readthedocs.io/en/stable/markup.html#date-range)
使用 `input-datarange` 构建日期段选择器。  
```html
<div class="input-group input-daterange">
    <input type="text" class="form-control" value="2012-04-05">
    <div class="input-group-addon">to</div>
    <input type="text" class="form-control" value="2012-04-19">
</div>
```

## [选项](https://bootstrap-datepicker.readthedocs.io/en/stable/options.html)

### [language](https://bootstrap-datepicker.readthedocs.io/en/stable/options.html#language)
设置中文：  
```js
$.fn.datepicker.dates['zh-CN'] = {
  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  daysMin:  ["日", "一", "二", "三", "四", "五", "六"],
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  today: "今天",
  suffix: [],
  meridiem: ["上午", "下午"],
  titleFormat: "yyyy年MM"
};
```
