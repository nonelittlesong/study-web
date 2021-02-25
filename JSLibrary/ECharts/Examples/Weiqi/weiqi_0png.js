var qiPanPng = "";
var qiPanPng2 = "";
var qiPanPng3 = "";
var qiPanLightPng = "";
var qiPanLightPng = "";
var qiPanLightPng = "";
var heiPng = "";
var baiPng = "";
var heiPng2 = "";
var baiPng2 = "";
var heiPng3 = "";
var baiPng3 = "";

var player = new Player("社会你发哥", 1);
var player2 = new Player("炎帝", 0);
var game = new Game("chart-panel", 0, player, player2);
game.loading();
game.loadChartClick();
// 用户类
function Player(name, zhiQi){
    this.name = name;
    // 执棋1：黑 0：白
    this.zhiQi = zhiQi;
    // 玩家提子
    this.tiZi = 0;
}
// 游戏类
function Game(selector, model, player1, player2){
    // echart绘图对象
    this.chart;
    // 棋盘数据
    this.qiPanData = [];
    // 棋盘高亮
    this.light = false;
    // 游戏模式0: [9X9] 1:[13X13] 2:[19X19]
    this.model = model;
    // 相关游戏模式的数据
    this.modelInfo = {};
    // 当前回合的玩家
    this.curr = {};
    // 玩家信息
    this.playerInfo = [player1, player2];
    // 历史记录
    this.history = [];
    /***************记载游戏数据***************/
    this.loading = function() {
        var that = this;
        this.chart = echarts.init(document.getElementById(selector));
        // 加载棋盘数据
        if (this.model == 0) {
            this.modelInfo.qiPanPng = this.light?qiPanLightPng3:qiPanPng3;
            this.modelInfo.heiPng = heiPng3;
            this.modelInfo.baiPng = baiPng3;
            this.modelInfo.qiSize = 58;
            this.modelInfo.qiPanSize = 9;
            this.modelInfo.qiPanWidth = 458;
            this.modelInfo.qiPanHeight = 458;
        } else if (this.model == 1) {
            this.modelInfo.qiPanPng = this.light?qiPanLightPng2:qiPanPng2;
            this.modelInfo.heiPng = heiPng2;
            this.modelInfo.baiPng = baiPng2;
            this.modelInfo.qiSize = 40;
            this.modelInfo.qiPanSize = 13;
            this.modelInfo.qiPanWidth = 475;
            this.modelInfo.qiPanHeight = 475;
        } else {
            this.modelInfo.qiPanPng = this.light?qiPanLightPng:qiPanPng;
            this.modelInfo.heiPng = heiPng;
            this.modelInfo.baiPng = baiPng;
            this.modelInfo.qiSize = 25;
            this.modelInfo.qiPanSize = 19;
            this.modelInfo.qiPanWidth = 486;
            this.modelInfo.qiPanHeight = 486;
        }
        for (var i =0;i < this.modelInfo.qiPanSize;i++) {
            var x = [];
            this.qiPanData.push(x);
            for (var j =0;j < this.modelInfo.qiPanSize;j++) {
                x.push(-1);
            }
        }
        // 加载玩家信息
        for (var k = 0;k < this.playerInfo.length;k++) {
            if (this.playerInfo[k].zhiQi == 1) {
                this.curr = this.playerInfo[k];
                break;
            }
        }
        // 绘出棋盘
        this.chart.setOption(this.getQiPanData());
    }
    this.loadChartClick = function(){
        var that = this;
        // 加载落子事件
        this.chart.on('click', function (params) {
            console.log(123234);
            if(params.data.type == -1){
                // 获取点击的坐标
                var position = params.value;
                var record;
                // 验证当前回合的玩家，执黑棋还是白棋？
                var type = that.curr.zhiQi;
                if (type == 1) {
                    that.qiPanData[position[0]][position[1]] = 1;
                    record = {qiZi : 1, position : [position[0], position[1]]};
                } else {
                    that.qiPanData[position[0]][position[1]] = 0;
                    record = {qiZi : 0, position : [position[0], position[1]]};
                }
                // 执行游戏规则，消除棋子
                var structQiZi = {type : type, position : position};
                var sxzy = that.getSxzy(structQiZi);
                // 用于标记已经检验过的坐标
                var flag = [];
                // 统计清除(!type)的棋子
                var clearCount = 0;
                for(var i = 0;i < sxzy.sxzy.length;i++){
                    var clear = [];
                    if(sxzy.sxzy[i].type != -1 && !that.contain(sxzy.sxzy[i], flag)){
                        var dianCount = that.clearByType(sxzy.sxzy[i], type==1?0:1, clear, flag, 0);
                        if(dianCount == 0){
                            clearCount += clear.length;
                            that.clearByArray(clear);
                        }
                    }
                }
                // 如果没有清除到(!type)的棋子
                if(clearCount == 0){
                    // 再扫描当前落子是否被(!type)的棋子包围？
                    var clear = [];
                    var dianCount = that.clearByType(structQiZi, type, clear, [], 0);
                    // 如果被包围则此处不能落子
                    if (dianCount == 0) {
                        that.clearByArray([structQiZi]);
                        // 重新绘制棋盘
                        that.chart.setOption(that.getQiPanData());
                        return;
                    }
                }
                // 添加记录
                record.player = that.curr;
                record.msg = "[" + position[0] + "," + position[1] +"]";
                if(clearCount > 0){
                    record.msg += "\n" + (type===0?"白":"黑") + "吃了" + clearCount + "子";
                    // 更新玩家提子
                    that.curr.tiZi += clearCount;
                }

                // 添加回合记录
                that.history.push(record);
                // 切换玩家
                that.curr = that.curr == that.playerInfo[0]?that.playerInfo[1] : that.playerInfo[0];
                // 重新绘制棋盘
                that.chart.setOption(that.getQiPanData());
            }
        });
    }
    /***************根据棋子获取玩家信息***************/
    this.getPlayer = function(zhiQi){
        if (this.playerInfo[0].zhiQi == zhiQi) {
            return this.playerInfo[0];
        }
        return this.playerInfo[1];
    }
    /***************获取执棋为type的历史记录***************/
    this.getHistoryByType = function(type) {
        var hisArray = [];
        for (var p = 0;p < this.history.length;p++){
            var temp = this.history[p];
            if (temp.player.zhiQi == type){
                hisArray.push({value : [type, hisArray.length + 1], msg : temp.msg});
            }
        }
        return hisArray;
    }
    /***************绘制棋盘***************/
    this.getQiPanData = function(){
        var that = this;
        var bai = [];
        var hei = [];
        var dian = [];
        var pan = this.qiPanData;
        for (var i = 0;i < pan.length;i++) {
            for (var j = 0;j < pan.length;j++) {
                var value = pan[i][j];
                switch(value){
                    case -1:
                        dian.push({value : [i, j], type : -1});
                        break;
                    case 0:
                        bai.push({value : [i, j], type : 0});
                        break;
                    case 1:
                        hei.push({value : [i, j], type : 1});
                        break;
                }
            }
        }
        return {
            animation: true,
            legend: {
                top: 45,
                x:'center',
                itemWidth: 16,
                itemHeight: 16,
                data:['黑棋','白棋']
            },
            title : {
                text: '无聊的围棋少年',
                subtext: '社会你发哥',
                x:'center'
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {}
                }
            },
            grid : [{
                width: this.modelInfo.qiPanWidth,
                height: this.modelInfo.qiPanHeight,
                left : 60,
                top : 160
            },{
                width: 200,
                height: 140,
                left : 650,
                top : 260,
                show: false
            },{
                width: 200,
                height: 260,
                left : 660,
                top : 465
            }],
            toolbox: {
                feature: {
                    myTool1: {
                        show: true,
                        title: '切换棋盘',
                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                        onclick: function () {
                            switch(that.model){
                                case 0:
                                    that.modelInfo.qiPanPng = that.light?qiPanPng3 : qiPanLightPng3;
                                    break;
                                case 1:
                                    that.modelInfo.qiPanPng = that.light?qiPanPng2 : qiPanLightPng2;
                                    break;
                                case 2:
                                    that.modelInfo.qiPanPng = that.light?qiPanPng : qiPanLightPng;
                                    break;
                            }
                            that.light = !that.light;
                            that.chart.setOption(that.getQiPanData());
                        }
                    },
                    myTool2: {
                        show: true,
                        title: '切换模式',
                        icon: 'path://M940.032 623.104c-9.728 0-18.432 3.584-25.088 9.728-5.12 4.096-8.704 9.728-11.264 16.384-58.368 166.4-215.552 278.016-391.68 278.016s-333.312-111.616-391.68-277.504c-7.168-18.432-27.136-27.648-46.08-22.016-19.968 6.144-31.232 27.136-25.088 47.104 69.12 196.608 254.464 328.192 462.848 328.192 156.16 0 299.52-73.728 390.656-193.536v2.56c0 20.992 16.896 37.888 37.888 37.888 20.992 0 37.888-16.896 37.888-37.888V660.48c-0.512-20.48-17.408-37.376-38.4-37.376zM83.968 402.432c16.384 0 30.208-10.752 35.328-25.088v-0.512C161.28 256 256.512 160.768 377.344 119.296c216.576-74.24 452.608 40.96 527.36 257.536 5.12 15.36 19.456 25.6 35.84 25.6 4.096 0 8.192-0.512 12.288-2.048 19.456-6.656 30.208-28.16 23.04-48.128C926.72 209.92 814.592 97.28 671.232 48.128 465.92-22.528 246.272 51.2 121.344 215.04v-1.024c0-20.992-16.896-37.888-37.888-37.888S46.08 193.024 46.08 214.016v151.04c0 20.48 16.896 37.376 37.888 37.376z',
                        onclick: function (){
                            player = new Player("社会你发哥", 1);
                            player2 = new Player("炎帝", 0);
                            that.model = that.model==0?1:that.model==1?2:0;
                            that.playerInfo = [player, player2];
                            that.qiPanData = [];
                            that.history = [];
                            that.loading();
                        }
                    }
                }
            },
            xAxis: [{
                type: 'value',
                min: 0,
                max: this.modelInfo.qiPanSize - 1,
                minInterval: 1,
                maxInterval: 1,
                axisTick: {
                    show : false
                },
                axisLabel: {
                    show:true,
                    margin: 35
                },
                axisLine: {
                    show:false
                },
                splitLine:{
                    show : false
                }
            },{
                gridIndex: 1,
                type: 'category',
                data : [
                    {
                        value : this.getPlayer(1).name
                    },
                    {
                        value : this.getPlayer(0).name
                    }
                ]
            },{
                type: 'category',
                minInterval: 1,
                gridIndex: 2,
                data : ['白棋','黑棋']
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                max: this.modelInfo.qiPanSize - 1,
                minInterval: 1,
                maxInterval: 1,
                /*offset: 10,*/
                axisTick: {
                    show : false
                },
                axisLabel: {
                    show:true,
                    margin: 35
                },
                axisLine: {
                    show:false
                },
                splitLine:{
                    show : false
                }
            },{
                minInterval: 1,
                gridIndex: 1
            },{
                /*show: false,*/
                minInterval: 1,
                gridIndex: 2
            }],
            dataZoom: [{
                type: 'slider',
                show: true,
                yAxisIndex: [2],
                startValue: this.history.length > 10? Math.round(this.history.length/2) - 5 : 0,
                endValue:   Math.round(this.history.length/2),
            }],
            series: [
                {
                    qiZi : 1,
                    name: '黑棋',
                    silent: true,
                    type: 'scatter',
                    symbolPosition: 'end',
                    animation: false,
                    symbol: this.modelInfo.heiPng,
                    symbolSize: [this.modelInfo.qiSize, this.modelInfo.qiSize],
                    symbolOffset: [0, 0],
                    itemStyle: {
                        opacity : 1
                    },
                    data: hei
                },
                {
                    qiZi : 0,
                    name: '白棋',
                    type: 'scatter',
                    silent: true,
                    animation: false,
                    symbolPosition: 'end',
                    symbol: this.modelInfo.baiPng,
                    symbolSize: [this.modelInfo.qiSize, this.modelInfo.qiSize],
                    symbolOffset: [0, 0],
                    itemStyle: {
                        opacity : 1
                    },
                    data: bai
                },
                {
                    qiZi : -1,
                    name: '坐标点',
                    type: 'scatter',
                    itemStyle: {
                        normal: {
                            color : "transparent"
                        }
                    },
                    symbolSize: this.modelInfo.qiSize - 8,
                    data: dian
                },
                {
                    name: "棋盘",
                    type: 'pictorialBar',
                    symbolPosition: 'center',
                    symbol: this.modelInfo.qiPanPng,
                    z: -10,
                    silent: true,
                    animate:false,
                    data: [{
                        value: [(this.modelInfo.qiPanSize - 1)>>1, this.modelInfo.qiPanSize - 1],
                        symbolSize: ['522', '522']
                    }]
                },
                {
                    name:"提子",
                    type: 'pie',
                    radius: 70,
                    center: [790, 140],
                    label: {
                        formatter: '{b}: {c}'
                    },
                    data:[
                        {
                            name: this.getPlayer(1).name,
                            value: this.getPlayer(1).tiZi,
                            itemStyle: {
                                color: "black"
                            }
                        },
                        {
                            name: this.getPlayer(0).name,
                            value: this.getPlayer(0).tiZi,
                            itemStyle: {
                                color: "#C4B49C"
                            }
                        }
                    ]
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    type: 'bar',
                    label: {
                        formatter: '{b}: {c}',
                        show : true
                    },
                    data: [
                        {
                            name: this.getPlayer(1).name,
                            value: this.getPlayer(1).tiZi,
                            itemStyle: {
                                color: "black"
                            }
                        },
                        {
                            name: this.getPlayer(0).name ,
                            value: this.getPlayer(0).tiZi,
                            itemStyle: {
                                color: "#C4B49C"
                            }
                        }
                    ]
                },
                {
                    type: 'scatter',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    symbolPosition: 'center',
                    symbol: this.modelInfo.baiPng,
                    symbolSize: [20, 20],
                    symbolOffset: [0, 0],
                    itemStyle: {
                        opacity : 1
                    },
                    label: {
                        offset: [0, -21],
                        color : "#C4B49C",
                        show: true,
                        formatter: function(param){
                            return param.data.msg;
                        }
                    },
                    data: this.getHistoryByType(0)
                },
                {
                    type: 'scatter',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    symbolPosition: 'center',
                    symbol: this.modelInfo.heiPng,
                    symbolSize: [20, 20],
                    symbolOffset: [0, 0],
                    itemStyle: {
                        opacity : 1
                    },
                    label: {
                        offset: [0, -21],
                        color : "black",
                        show: true,
                        formatter: function(param){
                            return param.data.msg;
                        }
                    },
                    data: this.getHistoryByType(1)
                }
            ]
        };
    }
    /***************获取指定棋子上下左右的坐标***************/
    this.getSxzy = function(target) {
        // 获取指定棋子的x和y轴坐标
        var x = target.position[0];
        var y = target.position[1];
        // 统计坐标对应值为-1的记录数
        var dianCount = 0;
        var allPosition = [];
        if (y > 0) {
            allPosition.push({type : this.qiPanData[x][y - 1], position : [x, y - 1]});
        }
        if (y < (this.qiPanData.length - 1)) {
            allPosition.push({type : this.qiPanData[x][y + 1], position : [x, y + 1]});
        }
        if (x > 0) {
            allPosition.push({type : this.qiPanData[x - 1][y], position : [x - 1, y]});
        }
        if (x < (this.qiPanData.length - 1)) {
            allPosition.push({type : this.qiPanData[x + 1][y], position : [x + 1, y]});
        }
        allPosition.forEach(function(item) {
            if (item.type == -1) {
                dianCount++;
            }
        });
        return {
            sxzy : allPosition,
            dianCount : dianCount
        };
    }
    /***************指定棋子是否在指定集合内***************/
    this.contain = function(target, container) {
        for (var i = 0;i < container.length;i++) {
            var temp = container[i].position;
            if (target.position[0] == temp[0] && target.position[1] == temp[1]) {
                return true;
            }
        }
        return false;
    }
    /***************筛选出需要清除的棋子，返回扫描到qiPanData坐标为-1的次数***************/
    // target扫描的起点坐标
    // clearArray 需要清除的棋子坐标
    // flag 已经扫描过的坐标
    // count 记录坐标为-1的次数
    this.clearByType = function(target, type, clearArray, flag, count){
        if(target.type == type && target.type != -1 && !this.contain(target, flag)){
            var sxzy = this.getSxzy(target);
            // 验证当前棋子的上下左右是否为无子，无子就加载清除集合中
            if (sxzy.dianCount == 0) {
                flag.push(target);
                clearArray.push(target);
                for(var i = 0;i < sxzy.sxzy.length;i++){
                    count = this.clearByType(sxzy.sxzy[i], type, clearArray, flag, count);
                }
            } else {
                count++;
            }
        }
        return count;
    }
    /**************清除指定clearArray内的坐标***************/
    this.clearByArray = function(clearArray){
        for(var j = 0;j < clearArray.length;j++){
            var tempPosition = clearArray[j].position;
            this.qiPanData[tempPosition[0]][tempPosition[1]] = -1;
        }
    }
};
