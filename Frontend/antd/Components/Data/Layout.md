
- 你的内容应该放置于 `Col` 中，且只有 `Col` 可以作为 `Row` 的直接元素。
- 如果一个 `Row` 的 `Col` 的 `span` 总和超过 24，那么多余的 `col` 会作为一个整体另起一行排列。

## Row
- `gutter` - 每个 Col 之间的间隔。
- `type` - 可选 flex。
- `justify` - flex 下，水平排列方式。
- `align` - flex 下，垂直排列方式。

## Col
- `order` - flex 下，列的顺序。
- `xs` `sm` `md` `lg` `xl` `xxl` - 响应式尺寸。
