# 区别
1. offsetWidth 返回 padding + border + width 之和， style.width 只返回 width。
2. offsetWidth 只读， style.width 可读写。
3. offsetWidth 返回整数， style.width 返回字符串，并带有单位。
4. offsetWidth 可返回外部样式、嵌入样式和内联样式， style.width 只能返回内联样式。
