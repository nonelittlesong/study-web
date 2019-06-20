# 工作原理
* 行必须放置在 `.container` class 内，以便获得适当的对齐（alignment）和内边距（padding）。
* 使用行来创建列的水平组。
* 内容应该放置在列内，且唯有列可以是行的直接子元素。
* 列通过内边距（padding）来创建列内容之间的间隙。该内边距是通过 `.rows` 上的外边距（margin）取负，表示第一列和最后一列的行偏移。

# 网格选项

| | 超小设备（<768px） | 小型设备（≥768px） | 中型设备（≥992px） | 大型设备（≥1200px） |
| --- | --- | --- | --- | --- |
| class前缀 | .col-xs- | .col-sm- | .col-md- | .col-lg- |


# [使列具有相同高度](https://stackoverflow.com/questions/23287206/same-height-column-bootstrap-3-row-responsive)
```htm
<div class="container">
   <div class="row equalizer">
      <div class="watch">
         Column 1
      </div>

      <div class="watch">
         Column 2
      </div>
   </div>
</div>
```
```js
function bootstrap_equalizer() {
  $(".equalizer").each(function() {
    var heights = $(this).find(".watch").map(function() {
      return $(this).height();
    }).get(),

    maxHeight = Math.max.apply(null, heights);

    $(".watch").height(maxHeight);
  });
}
```
