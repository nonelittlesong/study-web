app.title = '折柱混合';

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['侧板产出','侧板不良','侧板不良率','不良管控线']
    },
    xAxis: [
        {
            type: 'category',
            data: ['08','09','10','11','12','13','14','15','16','17','18','19'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '生产量',
            min: 0,
            max: 1200,
            interval: 200,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '不良率',
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name:'侧板产出',
            type:'bar',
            stack:'生产量',
            data:[800, 900, 950, 950, 948, 952, 963, 960, 968, 960, 966, 965]
        },
        {
            name:'侧板不良',
            type:'bar',
            stack:'生产量',
            data:[20, 18, 19, 25, 30, 35, 40, 30, 20, 20, 20, 20]
        },
        {
            name:'侧板不良率',
            type:'line',
            yAxisIndex: 1,
            data:[2.4, 2.1, 2.1, 2.6, 3.3, 3.8, 4.2, 3.1, 2.1, 2.1, 2.0, 2.1]
        },
        {
            name:'不良管控线',
            type:'line',
            yAxisIndex: 1,
            data:[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        }
    ]
};
