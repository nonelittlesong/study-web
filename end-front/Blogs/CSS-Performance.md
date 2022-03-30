# 提升 CSS 性能

1. 用 HTML 的 `<link>` 替代 CSS 的 `@import`
   - `@import` 可以帮助代码分离，但是会阻塞资源并行加载，导致网页速度下降。
2. 简化选择器
   - 简单的选择器解析的时间更短。
3. 避免使用 `!important`
   - 浏览器会对 `!important` 进行额外的检查，所以只对其他包的 CSS 进行覆盖时使用 `!important`。
4. 避免使用图片
   - 使用 CSS 的效，比如渐变。
   - 可以用 SVG 替代图片。
5. 最小化 CSS 文件

## Tips

1. 使用 `0`，不用 `0px`
   - 可以减小文件大小
2. `position` 为 `absolute` 或 `fixed` 时，不需定义 `display: block`
   - 绝对和固定位置时，`display` 默认为 `block`
3. 用 16 进制，不用颜色名
   - 不同浏览器对颜色名理解不同
4. 使用 `,` 避免重复代码
5. 使用 `reset.css`
6. 使用 CSS fallbacks
