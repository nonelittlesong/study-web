# Sass

- [Sass Guidelines](https://sass-guidelin.es/#the-7-1-pattern)
- [Sass 官网](https://sass-lang.com/)

Sass 和 Scss 的区别：

- 层级
  - Sass 使用缩进，Scss 使用花括号
- 分隔符
  - Sass 使用换行，Scss 使用分号

为了兼容 CSS 语法，推荐使用 Scss！！

## [HSL颜色函数](https://www.w3cplus.com/preprocessor/sass-color-function.html)
H色相，S饱和度，L亮度。  

| 函数 | 描述 |
| --- | --- |
| hsl($hue,$saturation,$lightness) | 通过色相，饱和度，亮度创建一个颜色 |
| hsla($hue,$saturation,$lightness,$alpha) | 通过色相，饱和度，亮度，透明度创建一个颜色 |
| hue($color) | 从一个颜色中获得色相值 |
| saturation($color) | 从一个颜色中获得饱和度 |
| lightness($color) | 从颜色中获得亮度 |
| adjust-hue($color,$degrees) | 通过改变一个颜色的色相，创建一个新的颜色 |
| lighten($color, $amount) | 通过让颜色更亮，创建一个新的颜色 |
| darken($color, $amount) | 通过让颜色更暗，创建一个新的颜色 |
| saturate($color, $amount) | 让颜色更饱和 |
| desaturate($color, $amount) | 更不饱和 |
| grayscale($color) | 将一个颜色变成灰色（相当于desaturate($color,100%) |
| complement($color) | 返回一个补充色，相当于adjust-hue($color,180deg) |
| invert($color) | 返回一个反相色，红绿蓝值倒过来，透明度不变 |
