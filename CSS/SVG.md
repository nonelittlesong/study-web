
* SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
* SVG 用来定义用于网络的基于矢量的图形
* SVG 使用 XML 格式定义图形
* 也可以嵌入在HTML文件中
* SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
* SVG 是万维网联盟的标准
* SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体

# [SVG \<path>](http://www.w3school.com.cn/svg/svg_path.asp)
\<path>标签用来自定义路径。  
* M = moveto
* L = lineto
* H = horizontal lineto
* V = vertical lineto
* S = smooth curveto
* Q = quadratic Belzier curve
* T = smooth quadratic Belzier curveto
* A = elliptical Arc
* Z = closepath

**以上命令均允许小写。大写表示绝对位置，小写表示相对位置。**  

# [viewBox](https://www.w3cplus.com/html5/svg-coordinate-systems.html)
### 1. 视窗viewport
可以在最外层\<svg>元素上使用width和height属性声明视窗尺寸。  
### 2. viewBox
`viewBox = "x y width height"`  
你可以使用viewBox属性声明自己的用户坐标系。  
如果你选择的用户坐标系统和视窗宽高比相同，他会延伸来适应整个视窗。  
如果你的用户坐标系宽高比不同。你可以使用perserveAspectRatio。  
