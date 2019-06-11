* [Sass Guidelines](https://sass-guidelin.es/#the-7-1-pattern)
* [Sass 参考手册](http://sass.bootcss.com/docs/sass-reference/)


SCSS即SASS的新语法，是Sassy CSS的简写，是CSS3语法的超集。  
SASS是CSS3的一个扩展，增加了规则嵌套，变量，混合，选择器继承等等。  

# [HSL颜色函数](https://www.w3cplus.com/preprocessor/sass-color-function.html)
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
