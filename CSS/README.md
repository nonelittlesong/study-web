# font-family
font-family是用于某个元素的字体族名称或/及类族名称的一个优先表。  
有两种类型的字体系列名称：  
* 指定的系列名称： "times","courier","arial";
* 通常字体系列名称： "serif","sans-serif","cursive","fantasy","monospace"。

使用逗号分割每个值，并始终提供一个类族名称作为最后的选择。  
**js语法：** `object.style.fontFamily="arial,sans-serif"`  

# [css3新单位vw、vh、vmin、vmax的使用详解](https://blog.csdn.net/ZNYSYS520/article/details/76053961)
* vw: 视窗宽度的百分比
* vh: 视窗高度的百分比
* vmin: 当前vw和vh中较小的一个值
* vmax: 当前vw和vh中较大的一个值

**与%的区别：**  
%相对于父元素，vw、vh相对于视窗。  

# [：hover](http://www.w3school.com.cn/cssref/selector_hover.asp)  
* :hover 选择器用于选择鼠标指针浮动在上面的元素。  
* ：hover 可用于所有元素。  
* ：link 未被访问链接的样式。 :visited 已被访问链接链接样式。 :active 活动链接。  

# [transition](http://www.w3school.com.cn/cssref/pr_transition.asp)
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

# [各种符号](https://blog.csdn.net/XA5851477/article/details/65629214)
**子元素选择器>**  
只选儿子不选孙子。  
**相邻兄弟选择器+**  
选紧跟在后面的弟弟。  
**弟弟选择器～**  
选择所有后面的弟弟。  

