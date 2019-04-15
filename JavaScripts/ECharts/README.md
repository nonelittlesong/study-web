文档：  
* https://echarts.baidu.com/echarts2/doc/doc.html
* https://echarts.baidu.com/api.html#action.tooltip

# 一、 [option](https://echarts.baidu.com/echarts2/doc/doc.html#Option)
## [tooltip提示框](https://echarts.baidu.com/echarts2/doc/doc.html#Tooltip)

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| {string} trigger | 'item' | 触发类型。默认数据触发。可选为'item' / 'axis' |

#### {Object} axisPointer
坐标轴指示器  
* type  
  默认为line，可选为： 'line'/'cross'/'shadow'/'none'，指定type后对应style生效。  
  
## [toolbox工具箱](https://echarts.baidu.com/echarts2/doc/doc.html#Toolbox)  
#### {object} feature
* dataView，数据视图，打开数据视图，可设置更多属性。
  * {boolean} readOnly 默认数据视图为只读，可指定readOnly为false打开编辑功能。
* magicType，动态类型切换。
  * {Array} type \['line','bar','stack','tiled','force','chord','pie','funnel']
* restore,还原。
* saveAsImage,保存图片。
  * {string} type 默认为'png'。
  
## [legend图例](https://echarts.baidu.com/echarts2/doc/doc.html#Legend)

<table>
  <tr>
    <th> 名称 </th>
    <th> 默认值 </th>
    <th> 描述 </th>
  </tr>
  <tr>
    <td> {Array} data </td>
    <td> [] </td>
    <td><pre>
如需个性化图例文字样式，可把数组项改为{Object}，指定文本样式和个性化图例icon，格式为
{
name:{string},
textStyle:{Object},
icon:{string}
}</pre></td>
  </tr>
</table>

## [axis坐标](https://echarts.baidu.com/echarts2/doc/doc.html#Yaxis)
坐标轴有三种类型，类目型、数值型和时间型：  
* 类目型： 需要指定类目列表，坐标轴内有且仅有这些指定类目坐标
* 数值型： 需要指定数值区间，不指定时则自定计算数值范围，坐标轴内包含数值区间内容全部坐标
* 时间型： 时间型坐标轴用法同数值型，只是目标处理和格式化显示时会自动转为时间，并且随着时间跨度的不同自动切换需要显示的时间粒度


