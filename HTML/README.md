# \<!DOCTYPE html>
如果没有规定!DOCTYPE，可能产生意想不到的结果。  

# 事件
### change
* 对于`<input type="radio">`和`<input type="checkbox">`，元素激活时触发。  
* 用户明确提交更改（如`<input type="date">`选取日期，`<input type="file">`选取文件）。  
* 元素失去焦点时内容已改变。（`<textarea>`或`<input type="text">`）

# \<a>
### download属性
在HTML5中download是\<a>标签的新属性。  

# [\<body>](https://blog.csdn.net/javaloveiphone/article/details/51098972)
宽默认为100%，高默认为0。  

# [\<dt>](https://www.runoob.com/tags/tag-dt.html)
The \<dt> tag defines a term/name in a description list. The \<dt> tag is used in conjunction with \<dl> (defines a description list) and \<dd> (describes each term/name).  

Code example
```htm
<dl>
  <dt>Coffee<dt>
  <dd>Black hot drink<dd>
  <dt>Milk<dt>
  <dd>White cold drink<dd>
<dl>
```

# \<input>
### required
必填字段。  

### multiple
multiple属性允许用户输入到\<input>元素的多个值。  

### accept属性
规定文件上传的类型。  
accept属性只能与\<input type="file">配合使用。  
提示：**请避免使用该属性。应该在服务器端验证文件上传。**  

语法：  
```
<input accept="value">
```
属性值：  

| 值 | 描述 |
| --- | --- |
| MIME_type | 用逗号隔开的MIME类型列表 |

# [\<meta>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)
全局属性： 所有标签都能使用的属性，即使在某些标签中不起作用。  

>注： 全局属性 `name` 在 `<meta>` 元素中具有特殊的语义;另外，在同一个 `<meta>` 标签中，`name`，`http-equiv` 或者 `charset` 三者中任何一个属性存在时，`itemprop` 属性不能被使用。  

## 1、 http-equiv
这个属性定义了能改变服务器和用户引擎行为的编译。  
* refresh
  * 如果 content 只包含一个正整数，则是重新载入页面的时间间隔（秒）;
  * 如果 content 包含一个正整数并且跟着一个字符串，则是重定向到指定链接的时间间隔（秒）。
  
## 2、 name
* viewport - 它提供有关视口初始大小的提示，仅供移动设备使用。

  | Value | 可能值 | 描述 |
  | --- | --- | --- |
  | width | 一个正整数或者字符串 `device-width` | 以 pixels（像素）为单位，定义 viewport 宽度 |
  | height | 同上 | 高度 |
  | initial-scale | 0.0 与 10.0 之间 | 定义设备宽度与视口大小之间的缩放比率 |
  | maximum-scale | 同上 | 定义缩放的最大值 |
  | minimum-scale | 同上 | 定义缩放的最小值 |
  | user-scalable | yes 或 no | 用户是否能放大或缩小网页 |
  
  
# \<nav>
HTML5中的新元素标签\<nav>用来将具有导航性质的链接划分在一起，使代码结构在语义化方面更加准确。  
nav元素是一个可以用来作为页面导航的链接组;其中的导航元素链接到其他页面或当前页面的其他部分。并不是所有的链接组都要被放进\<nav>元素。例如：在页脚中通常会有一组链接，包括服务条款、首页、版权声明等;这是使用\<footer>元素是最恰当的。  
一个页面可以拥有多个\<nav>元素。  

