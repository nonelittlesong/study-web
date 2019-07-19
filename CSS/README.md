<details>
<summary>点击此处查看目录</summary>

* [border](#border)
* [!important](#important)
* [混合模式](#混合模式)
* [CSS3用户界面](#CSS3-用户界面)
* [变量](#变量)
* [@media查询](#media查询)
* [CSS动画](#CSS动画)
* [font-family](#font-family)
* [单位](#单位)
* [transition](#transition)
* [transform](#transform)
* [CSS选择器](#CSS选择器)
* [阴影](#阴影)
* [position](#position)
* [line-height](#line-height)
* [flex](#flex)
* [其他属性](#其它属性)

</details>

# [border](http://www.w3school.com.cn/cssref/pr_border.asp) 

* border-width
* border-style
* border-color

继承性： no  
在table中定义border，影响整个table最外层的边框。  
如果不设置其中的某个值，也不会有问题。如：`border: solid #ff0000;`  

### border-style

| 值 | 描述 |
| --- | --- |
| none | 无边框 |
| hidden | 对于表，hidden用于解决边框冲突 |
| dotted | 点 |
| dashed | 虚线 |
| solid | 实线 |
| double | 双线 |
| groove | 3D凹槽 |
| ridge | 垄装边框 |
| inset | 3D inset 边框 |
| outset | 3D outset 边框 |
| inherit | 继承父元素边框样式 |

# !important
提高指定样式规则的应用优先权  

# [混合模式](https://blog.csdn.net/Geoooo/article/details/80063852)
| 分类名称 | 混合模式名称 | 描述 |
| --- | --- | --- |
| 基础混合模式 | normal | 利用图层透明度控制上下层的图层混合 |
| 降暗混合模式 | darken,multiply,color-burn | 减色模式，滤掉图像中的高亮色 |
| 加亮混合模式 | screen,lighten,color-dodge | 加色模式，滤掉图像中的暗色 |
| 融合混合模式 | overlay,soft-light,hard-light | 用于不同程度的对上、下图层的融合 |
| 变色混合模式 | difference,exclusion,hard-light | 用于制作各种变异的图层混合 |
| 色彩叠加混合模式 | hue，saturation，color，luminosity | 根据色相，饱和度等基本属性融合 |

# [CSS3 用户界面](http://www.w3school.com.cn/css3/css3_user_interface.asp)
| 属性 | 描述 |
| --- | --- |
| appearance | 允许你将元素设置为标准用户界面元素的外观 |
| box-sizing | 允许用确切的方式定义适应某个区域的具体内容 |
| icon | 为创作者提供使用图标化等价物来设置元素样式的能力 |
| nav-down | 规定在使用arrow-down导航键时向何处导航 |
| nav-index | 设置元素的tab键控制次序 |
| nav-left | 规定在使用arrow-left导航键时向何处导航 |
| nav-right | |
| nav-up | |
| outline-offset | 对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓 |
| resize | 用户能否对元素的尺寸进行调整 |

### 1. [box-sizing](http://www.w3school.com.cn/cssref/pr_box-sizing.asp)
* content-box: 高度和宽度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。  
* border-box: 为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的高度和宽度分别减去边框和内边距才能得到内容的宽度和高度。

### 2. [outline](http://www.w3school.com.cn/cssref/pr_outline.asp)
继承性： no  
js语法： object.style.outline="#0000FF dotted thin"  
绘制元素边框外的轮廓，可按顺序设置：  
1. outline-color  
2. outline-style
3. outline-width


# [变量](https://blog.csdn.net/u011043843/article/details/46480677)
**自定义属性**:  
为了自定义一个属性名，我们需要用--作为前缀。  
**var()函数**:  
为了应用自定义属性，需要利用var()函数。  
**:root伪类**:  
:root伪类代表了HTML文档的根元素，这是一个放置自定义属性的好位置。  

# [@media查询](http://www.runoob.com/cssref/css3-pr-mediaquery.html)  
**@media可以针对不同的屏幕尺寸设置不同的样式。**  
语法：  
```css
@media mediatype and | not | only (media feature) {
    CSS-Code;
}
```
你也可以针对不同的媒体使用不同的stylesheets：  
`<link rel="stylesheet" media="mediatype and | not | only (media feature)" href="mystylesheet.css">`  

# [CSS动画](http://www.w3school.com.cn/css3/css3_animation.asp)  
### 1. @keyframes
当你在@keyframes中创建动画时，请把它捆绑到某个选择器，否则不会产生动画效果。  
语法：  
```css
@keyframes animationname {
    keyframes-selector {
        css-styles;
    }
}
```
| 值 | 描述 |
| --- | --- |
| animationname | 必需。定义动画的名称。 |
| keyframes-selector | 0-100% <br> from(0%) <br> to(100%) |
| css-styles | 必需。一个或多个合法的 CSS 样式属性。 |

### 2. animation、
继承性: no  
语法：  
`animation: name duration timing-function delay iteration-count direction`  

### 3. [will-change](https://www.w3cplus.com/css3/introduction-css-will-change-property.html)
`will-change`允许对浏览器默认的样式优化和提前处理元素，在动画实际执行前，为准备动画执行潜在的昂贵工作。  


# font-family
继承性： yes  
font-family是用于某个元素的字体族名称或/及类族名称的一个优先表。  
有两种类型的字体系列名称：  
* 指定的系列名称： "times","courier","arial";
* 通常字体系列名称： "serif","sans-serif","cursive","fantasy","monospace"。

使用逗号分割每个值，并始终提供一个类族名称作为最后的选择。  
**js语法：** `object.style.fontFamily="arial,sans-serif"`  

# 单位
### 1. [css3新单位vw、vh、vmin、vmax的使用详解](https://blog.csdn.net/ZNYSYS520/article/details/76053961)
* vw: 视窗宽度的百分比
* vh: 视窗高度的百分比
* vmin: 当前vw和vh中较小的一个值
* vmax: 当前vw和vh中较大的一个值

**与%的区别：**  
%相对于父元素，vw、vh相对于视窗。  

### 2. em
相对于父元素font-size的大小。  

### 3. 尺寸
| 单位 | 描述 |
| --- | --- |
| % | 百分比 |
| in | 英寸 |
| cm | 厘米 |
| mm | 毫米 |
| em | 1em等于当前字体尺寸。 |
| rem | root em |
| ex | 一个ex是一个字体的x-height。（x-height通常是字体尺寸的一半) |
| pt | 磅（1pt等于1/72英寸） |
| pc | 12点活字（1pc等于12点） |
| px | 像素 |

### 4. 颜色
| 单位 | 描述 |
| --- | --- |
| 颜色名 | 比如ivory |
| rgb(x,x,x) | 比如rgb(255,0,0) |
| rgb(x%,x%,x%) | rgb(100%,0%,0%) |
| #rrggbb | #FF0000 |


# [transition](http://www.w3school.com.cn/cssref/pr_transition.asp)
参考：  
https://www.cnblogs.com/huanying2000/p/6215472.html  
https://www.cnblogs.com/qianduanjingying/p/4937574.html  

**定义和用法:**  
transition是一个简写属性。  
默认值： all 0 ease 0  
继承性： no  
版本： css3  
js语法： `object.style.transition="width 2s"`  

**语法:**  
transition: property duration timing-function delay  

**timing-function:**  

| 值 | 描述 |
| --- | --- |
| linear | 线性。等于cubic-bezier(0,0,1,1) |
| ease | 先加速后减速。cubic-bezier(0.25,0.1,0.25,1) |
| ease-in | 加速。cubic-bezier(0.42,0,1,1) |
| ease-out | 减速。cubic-bezier(0,0,0.58,1) |
| ease-in-out | 慢速开始和结束.cubic-bezier(0.42,0,0.58,1) |
| cubic-bezier(n,n,n,n) | 自定义 |

# transform
继承性： no  
transform属性向元素应用2D或3D转换。旋转，平移，缩放，倾斜。  
语法： `transform: none | transform-functions`  

| 值 | 描述 |
| --- | --- |
| none | 不进行转换 |
| matrix(n,n,n,n,n,n) | 进行2D转换 |
| matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) | 进行3d转换 |
| translate(x,y) | 2d平移 |
| translate(x,y,z) | 3d平移 |
| translateX(x) | x轴平移 |
| translateY(y) | y轴平移 |
| translateZ(z) | z轴平移 |
| scale(x,y) | 2d缩放 |
| scale3d(x,y,z) | 3d缩放 |
| scaleX(x) | x轴缩放 |
| scaleY(y) | y轴缩放 |
| scaleZ(z) | z轴缩放 |
| rotate(angle) | 2d旋转 |
| rotate3d(x,y,z,angle) | 3d旋转 |
| rotateX(angle) | |
| rotateY(angle) | |
| rotateZ(angle) | |
| skew(x-angle, y-angle) | 定义沿着x轴和y轴的倾斜 |
| skewX(angle) | |
| skewY(angle) | |
| perspective(n) | 为3D转换元素定义透视视图 |

**使用transform属性是要有确定的宽高!**  

transform兼容性：  
```css
transform: translateY(-50%);
-ms-transform: translateY(-50%);
-moz-transform: translateY(-50%);
-webkit-transform: translateY(-50%);
-o-transform: translateY(-50%);
```

# [CSS选择器](http://www.w3school.com.cn/cssref/css_selectors.asp)
**子元素选择器>**  
只选儿子不选孙子。  
**相邻兄弟选择器+**  
选紧跟在后面的弟弟。  
**弟弟选择器～**  
选择所有后面的弟弟。  

| 选择器 | 例子 | 例子描述 | CSS |
| --- | --- | --- | --- |
| .class | .intro | 选择class="intro"的所有元素 | 1 |
| #id | #firstname | 选择id="firstname"的所有元素 | 1 |
| * | * | 选择所有元素 | 2 |
| element | p | 选择所有\<p>元素 | 1 |
| element,element | div,p | 选择所有\<div>和\<p>元素 | 1 |
| element element | div p | 选择\<div>内的所有\<p>元素 | 1 |
| element>element | div>p | 选择父元素是\<div>的所有\<p>元素 | 2 |
| element+element | div+p | 选择所有紧跟在\<div>后面的\<p>元素 | 2 |
| element~element | div~p | 选择前面有\<div>的所有\<p>元素 | 3 |
| \[attribute] | \[target] | 选择有target属性的所有元素 | 2 |
| \[attribute=value] | \[target=\_blank] | 选择target="\_blank"的所有元素 | 2 |
| \[attribute~=value] | \[title~=flower] | 选择title属性包含单词“flower“的所有元素 | 2 |
| \[attribuye\|=value] | \[lang\|=en] | 选择属性lang以"en"开头的所有元素 | 2 |
| \[attribute^=value] | a\[src^="https"] | 选择其src属性以"https"开头的所有\<a>元素 | 3 |
| \[attirbute$=value] | a\[src$=".pdf"] | 选择其src属性以".pdf"结尾的所有\<a>元素 | 3 |
| \[attribute*=value] | a\[src*="abc"] | 选择其src属性包含"abc"字串的每个\<a>元素 | 3 |
| :link | a:link | 选择所有未被访问的链接 | 1 |
| :visited | a:visited | 选择所有已被访问的链接 | 1 |
| :active | a:active | 选择活动链接 | 1 |
| :hover | a:hover | 选择鼠标指针位于其上的链接 | 1 |
| :focus | input:focus | 选择获得焦点的input元素 | 2 |
| :first-letter | p:first-letter | 选择每个\<p>元素的首字母 | 1 |
| :first-line | p:first-line | 选择每个\<p>元素的首行 | 1 |
| :first-child | p:first-child | 选择属于父元素的第一个子元素的每个\<p>元素 | 2 |
| :before | p:before | 在每个\<p>元素的内容之前插入内容 | 2 |
| ：after | p:after | 在每个\<p>元素的内容之后插入元素 | 2 |
| :lang(language) | p:lang(it) | 选择带有以"it"开头的lang属性值的每个\<p>元素 | 2 |
| :first-of-type | p:first-of-type | 选择属于其父元素的首个\<p>元素的\<p>元素 | 3 |
| :last-of-type | p:last-of-type | 选择属于其父元素的最后一个\<p>元素的\<p>元素 | 3 |
| :only-of-type | p:only-of-type | 选择属于其父元素唯一的\<p>元素的\<p>元素 | 3 |
| :nth-of-type(n) | p:nth-of-type(2) | 选择属于其父元素的第二个\<p>元素的每个\<p>元素 | 3 |
| :nth-last-of-type(n) | p:nth-last-of-type(2) | 同上，但重最后一个子元素开始计数 | 3 |
| :only-child | p:only-child | 选择属于其父元素唯一的子元素的\<p>元素 | 3 |
| :nth-child(n) | p:nth-child(2) | 选择属于其父元素的第二个子元素的每个\<p>元素 | 3 |
| :nth-last-child(n) | p:nth-last-child(2) | 同上，重最后一个子元素开始计数 | 3 |
| :last-child | p:last-child | 选择属于其父元素的最后一个子元素的每个\<p>元素 | 3 |
| :root | :root | 选择文档的根元素 | 3 |
| :empty | p:empty | 选择没有子元素的每个\<p>元素（包括文本节点） | 3 |
| :target | #news\:target | 选择当前活动的#news元素 | 3 |
| :enabled | input:enabled | 选择每个启用的\<input>元素 | 3 |
| :disabled | input:disabled | 选择每个禁用的\<input>元素 | 3 |
| :checked | input:checked | 选择每个被选中的\<input>元素 | 3 |
| :not(selector) | :not(p) | 选择非\<p>每个元素 | 3 |
| ::selection | ::selection | 选择被用户选取的元素部分 | 3 |

# 阴影
### [box-shadow](http://www.w3school.com.cn/cssref/pr_box-shadow.asp)  
添加一个或多个阴影。  
**语法：**  
box-shadow: h-shadow v-shadow blur spread color inset;

| 值 | 描述 |
| --- | --- |
| h-shadow | 必需。水平阴影的位置，允许负值。 |
| v-shadow | 必须。垂直阴影的位置，允许负值。 |
| blur | 可选。模糊距离 |
| spread | 可选。阴影尺寸。 |
| color | 可选。阴影颜色 |
| inset | 可选。将外部阴影改为内部阴影。 |

### [text-shadow](http://www.w3school.com.cn/cssref/pr_text-shadow.asp)
继承性： yes。  
语法： `text-shadow: h-shadow v-shadow blur color;`


# [position](http://www.w3school.com.cn/cssref/pr_class_position.asp)  
元素的定位类型。  

| 值 | 描述 |
| --- | --- |
| absolute | 相对于static以外的第一个父元素进行定位。元素的位置通过left，top，right，bottom属性进行规定。 |
| fixed | 相对于浏览器窗口进行定位。通过left，top，right和bottom进行规定。 |
| relative | 相对于正常位置进行相对移动 |
| static | 默认 |
| inherit | |

# [line-height](http://www.w3school.com.cn/cssref/pr_dim_line-height.asp)  
文本行高。**不允许负值。**  
继承性: yes。  
该属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最小距离而不是最大距离。  
line-height与font-size的计算值之差（在css中成为行间距）分为两半，分别加到一个文本行的顶部和底部。可以包含这些内容的最小宽就是行宽。  
**button如果不设置line-height，line-height会根据字体大小自动调整，但相同字体不同文字有时会得到不同的line-height。**  

设置 span 的 `line-height` 与 父元素 div 的高度相等，使 span 垂直居中。  

# [flex](https://blog.csdn.net/u013451157/article/details/79011679)  
简写属性：  
* flex-grow: 定义项目的放大比例，默认为0。
* flex-shrink: 定义项目的缩小比例，默认为1。
* flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间。默认值auto。

flex: none; 计算值为0 0 auto  
flex: auto; 计算值为1 1 auto  
flex: 非负数字; 则该数字为flex-grow值，flex-shrink取1，flex-basis取0%  
flex: 长度或百分比; 视为flex-basis的值，flex-grow取1，flex-shrink取1  

[display: flex](https://www.cnblogs.com/qingchunshiguang/p/8011103.html)  

# 其它属性
### 1. [display](http://www.w3school.com.cn/cssref/pr_class_display.asp)  
display属性规定元素应该生成的框的属性。  

| 值 | 描述 |
| --- | --- |
| table | 此元素会作为块级表格来显示，表格前后带有换行符 |
| table-cell | 此元素会作为表格单元格显示 |

[table-layout](http://www.w3school.com.cn/cssref/pr_tab_table-layout.asp)  
继承性： yes  

| 值 | 描述 |
| --- | --- |
| automatic | 默认。列宽度由单元格内容设定 |
| fixed | 列宽由表格宽度和列宽度设定 |



### 2. [text-decoration](http://www.w3school.com.cn/cssref/pr_text_text-decoration.asp)  
修饰文本。  
默认值： none;  
继承性： no;  
版本： css1;  
js语法： object.style.textDecoration="overline";  

| 值 | 描述 |
| --- | --- |
| none | 默认 |
| underline | 下划线 |
| overline | 上划线 |
| line-through | 中划线 |
| blink | 闪烁 |
| inherit | 继承父元素 |

### 3. [font-size](http://www.w3school.com.cn/cssref/pr_font_font-size.asp)和font-weight和color
字体大小和粗细和颜色。  

### 4. [text-transform](http://www.w3school.com.cn/cssref/pr_text_text-transform.asp)
控制文本的大小写。  

### 5. [border-radius](http://www.w3school.com.cn/cssref/pr_border-radius.asp)、[border-collapse](http://www.w3school.com.cn/cssref/pr_tab_border-collapse.asp)
[border-radius](http://www.w3school.com.cn/cssref/pr_border-radius.asp):  
圆角。  
[border-collapse](http://www.w3school.com.cn/cssref/pr_tab_border-collapse.asp):  
继承性： yes  
border-collapse 属性设置表格的边框是否被合并为一个单一的边框。  
值： separate或collapse。  

| 值 | 描述 |
| --- | --- |
| separate | 默认值。边框会被分开。不会忽略border-spacing和empty-cells属性。 |
| collapse | 忽略border-spacing和empty-cells属性 |
| inherit | 继承父元素的值 |

[empty-cells](http://www.w3school.com.cn/cssref/pr_tab_empty-cells.asp)： 设置是否显示表格中的空格单元（仅用于separate模式）。默认show。  


### 6. z-index
默认是0。  

### 7. [text-align](http://www.w3school.com.cn/cssref/pr_text_text-align.asp)
文本水平对齐方式：left，right，center，justify。  
继承性： yes。  
值 justify 可以使文本的两端都对齐。在两端对齐文本中，文本行的左右两端都放在父元素的内边界上。然后，调整单词和字母间的间隔，使各行的长度恰好相等。  

### 8. [overflow](http://www.w3school.com.cn/cssref/pr_pos_overflow.asp)
继承性：no  
默认情况下元素会被内容撑大，所以定义height时要考率overflow。  

| 值 | 描述 |
| --- | --- |
| visible | 默认值。 |
| hidden | 内容被修剪 |
| scroll | 显示滚动条 |
| auto | 被修剪时显示滚动条 |

### 9. [list-style-type](http://www.w3school.com.cn/css/pr_list-style-type.asp)
可继承性: yes  
列表的风格。  

### 10. [float](http://www.w3school.com.cn/cssref/pr_class_float.asp)
可继承性： no
假如在一行之上只有极少的空间可供浮动元素，那么这个元素会跳至下一行，这个过程会持续到某一行拥有足够的空间为止。  

### 11. [text-overflow](http://www.w3school.com.cn/cssref/pr_text-overflow.asp)
可继承性： no

| 值 | 描述 |
| --- | --- |
| clip | 默认值。修剪文本 |
| ellipsis | 显示省略号代表修剪的文本 |
| string | 使用给定的字符串代表修剪的文本 |

### 12. [white-space](http://www.w3school.com.cn/cssref/pr_text_white-space.asp)
可继承性： yes  
如何处理文本的空白：  

| 值 | 描述 |
| --- | --- |
| normal | 默认，空白会被浏览器忽略 |
| pre | 空白会被浏览器保留，其行为类似与\<pre>标签 |
| nowrap | 文本不会换行 |
| pre-wrap | 保留空白，但是会换行 |
| pre-line | 合并空白符，但是保留换行符 |

### 13. [clear](http://www.w3school.com.cn/cssref/pr_class_clear.asp)
继承性： no  

| 值 | 描述 |
| --- | --- |
| left | 在左侧不允许浮动元素 |
| right | 在右侧不允许浮动元素 |
| both | 两边不允许浮动元素 |
| none | 默认值。允许两侧有浮动元素 |
