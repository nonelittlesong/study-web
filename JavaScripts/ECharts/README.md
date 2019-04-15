文档：  
* https://echarts.baidu.com/echarts2/doc/doc.html
* https://echarts.baidu.com/api.html#action.tooltip

# 一、 [option](https://echarts.baidu.com/echarts2/doc/doc.html#Option)
## [tooltip](https://echarts.baidu.com/echarts2/doc/doc.html#Tooltip)
提示框，鼠标悬浮交互时的信息提示。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| {string} trigger | 'item' | 触发类型。默认数据触发。可选为'item' / 'axis' |

#### {Object} axisPointer
坐标轴指示器  
* type  
  默认为line，可选为： 'line'/'cross'/'shadow'/'none'，指定type后对应style生效。  
  
## [toolbox](https://echarts.baidu.com/echarts2/doc/doc.html#Toolbox)
工具箱。  
#### {object} feature
* dataView，数据视图，打开数据视图，可设置更多属性。
  * {boolean} readOnly 默认数据视图为只读，可指定readOnly为false打开编辑功能。
* magicType，动态类型切换。
  * {Array} type \['line','bar','stack','tiled','force','chord','pie','funnel']
* restore,还原。
* saveAsImage,保存图片。
  * {string} type 默认为'png'。
  
<span class="bgGreen"> 公共选项 </span>
