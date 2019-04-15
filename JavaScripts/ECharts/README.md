文档：  
* https://echarts.baidu.com/echarts2/doc/doc.html
* https://echarts.baidu.com/api.html#action.tooltip

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
<pre>
{
    mark : {
        show : false,
        title : {
            mark : '辅助线开关',
            markUndo : '删除辅助线',
            markClear : '清空辅助线'
        },
        lineStyle : {
            width : 2,
            color : '#1e90ff',
            type : 'dashed'
        }
    },
    dataZoom : {
        show : false,
        title : {
            dataZoom : '区域缩放',
            dataZoomReset : '区域缩放后退'
        }
    },
    dataView : {
        show : false,
        title : '数据视图',
        readOnly: false,
        lang: ['数据视图', '关闭', '刷新']
    },
    magicType: {
        show : false,
        title : {
            line : '折线图切换',
            bar : '柱形图切换',
            stack : '堆积',
            tiled : '平铺',
            force: '力导向布局图切换',
            chord: '和弦图切换',
            pie: '饼图切换',
            funnel: '漏斗图切换'
        },
        option: {
            // line: {...},
            // bar: {...},
            // stack: {...},
            // tiled: {...},
            // force: {...},
            // chord: {...},
            // pie: {...},
            // funnel: {...}
        },
        type : []
    },
    restore : {
        show : false,
        title : '还原'
    },
    saveAsImage : {
        show : false,
        title : '保存为图片',
        type : 'png',
        lang : ['点击保存']
    }
}
</pre>
