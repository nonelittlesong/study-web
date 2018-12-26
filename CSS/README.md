# [变量](https://blog.csdn.net/u011043843/article/details/46480677)
**自定义属性**:  
为了自定义一个属性名，我们需要用--作为前缀。  
**var()函数**:  
为了应用自定义属性，需要利用var()函数。  
**:root伪类**:  
:root伪类代表了HTML文档的根元素，这是一个放置自定义属性的好位置。  

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


# [box-shadow](http://www.w3school.com.cn/cssref/pr_box-shadow.asp)  
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

# [position](http://www.w3school.com.cn/cssref/pr_class_position.asp)  
元素的定位类型。  

| 值 | 描述 |
| --- | --- |
| absolute | 相对于static以外的第一个父元素进行定位。元素的位置通过left，top，right，bottom属性进行规定。 |
| fixed | 相对于浏览器窗口进行定位。通过left，top，right和bottom进行规定。 |
| relative | |
| static | 默认 |
| inherit | |

# [line-height](http://www.w3school.com.cn/cssref/pr_dim_line-height.asp)  
文本行高。**不允许负值。**  
继承性: yes。  
该属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最小距离而不是最大距离。  
line-height与font-size的计算值之差（在css中成为行间距）分为两半，分别加到一个文本行的顶部和底部。可以包含这些内容的最小宽就是行宽。  

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

### 3. font-size和font-weight和color
字体大小和粗细和颜色。  

### 4. [text-transform](http://www.w3school.com.cn/cssref/pr_text_text-transform.asp)
控制文本的大小写。  

### 5. [border-radius](http://www.w3school.com.cn/cssref/pr_border-radius.asp)  
圆角。  

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

