
$(function() {

    var echarts_left = echarts.init(document.querySelector(".echarts_left"));

    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数','销量']
        },
        xAxis: {
            data: ['1月','2月','3月','4月','5月','6月']
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [232,455,123,657,233,678]
        },{
            name: '销量',
            type: 'bar',
            data: [235,565,788,122,345,348]
        }]
    };

    echarts_left.setOption(option1);


    var echarts_right = echarts.init(document.querySelector(".echarts_right"));

    var option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2018年11月',
            x: 'center',
            textStyle: {
                fontSize: 20,
                color: '#000'
            }
        },
        tooltip: {
            trigger:'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','安踏','阿迪王','老北京','三叶草']
        },
        series: [
            {
                name: '热门品牌',
                type: 'pie',
                radius: '55%',
                center: ['50%','60%'],
                data: [
                    {value: 335,name: '耐克'},
                    {value: 453,name: '安踏'},
                    {value: 232,name: '阿迪王'},
                    {value: 565,name: '老北京'},
                    {value: 1323,name: '三叶草'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 30,
                        shadowOffsetX: 0,
                    }
                }
            }
        ]
    };

    echarts_right.setOption(option2);

})