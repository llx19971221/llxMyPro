import React, { Component } from "react";
import FourLeftMsg from "@components/fourLeftMsg/fourLeftMsg";
import connectOption from "@/actions/action-example";
import ReactEcharts from "echarts-for-react";
import echarts from 'echarts';
let color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    offset: 0.3,
    color: 'rgb(9,209,244)'
}, {
    offset: 0.7,
    color: 'rgb(15, 236, 242)'
}], false);
@connectOption(
    {
        reducers: "screen",//reducers名字是screen
        stateObj: {
            getFourLeftMsg: "fourOneLeftInfo",//value是传入当前组件参数，date是对应state
            getFourRightMsg: "fourOneRightInfo"
        }
    }
)
class FourOneLine extends Component {
    option = {
        color: [color],
        grid: {
            top: "20%",
            left: "20%",
            right: "5%",
            bottom: "10%"
        },
        dataZoom: [
            {
                type: "inside",
                // zoomOnMouseWheel: false,
                start: 0,
                end: 10
            }
        ],
        tooltip: {
            show: true,
            trigger: "axis",
            axisPointer : {
                lineStyle: {
                    color: "#fff"
                }
            },
            textStyle: {
                color: "#000"
            },
            formatter: "{b}<br/>{c}元",
            backgroundColor: "rgb(167,187,216)" 
            
        },
        legend: {
            icon: "rect",
            data: ['销售额'],
            textStyle: {
                color: "#fff"
            },
            top: 10,
            right: 10,
            itemWidth: 8,
            itemHeight: 8
        },
        xAxis: {
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            },
            boundaryGap:  false,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 10,
                margin: 3,
                formatter: function(value) {
                    // console.log(value.match(/\d{2}/g));
                    return value.match(/\d{2}/g)[3] + "日"
                }
            },
            data: []
        },
        yAxis: {
            name: "万元",
            nameGap: "-15",
            splitLine: {
                show: false
            },
            nameTextStyle:
            {
                padding: [0,0,0,35]
            },
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 10
            }
        },
        series: [
            {
                type: "line",
                smooth: true,
                name: "销售额",
                symbol: "none",
                areaStyle: {
                    color: color
                },  
                lineStyle: {
                    color: "transparent"
                },
                data: []
            }
        ]
    }

    start = 0;
    end = 10;
    timer = null;
    changeOpt = (newData) => {
        let newOpt = Object.assign({}, this.option);
        newOpt.xAxis.data =  newData.length === 0 ? [] :newData[0].map(e=>e.DateValue);
        newOpt.series[0].data =  newData.length === 0 ? [] :newData[0].map(e=>e.TotalSaleAmt);
        if(this.refs['mychart']) {
            this.refs['mychart'].getEchartsInstance().setOption(newOpt);
        }
        return newOpt;
    }
    componentDidMount() {
        this.chartLeave();
    }
    charEnter = () => {
        clearInterval(this.timer);
    }
    chartLeave = () => {
        this.timer = setInterval(() => {
            let newOpt = Object.assign({}, this.option);
            this.start += 1;
            this.end += 1;
            if(this.end > 100) {
                this.start = 0;
                this.end = 10
            }
            newOpt.dataZoom[0].start = this.start;
            newOpt.dataZoom[0].end = this.end;
            this.refs['mychart'].getEchartsInstance().setOption(newOpt);
        }, 2000)
    }

    componentWillUnmount() {
        this.timer && this.charEnter();
    }
    render() {
        const { getFourLeftMsg, getFourRightMsg } = this.props;
        return (
            <div className="four-item-wrap">
                <FourLeftMsg
                data={getFourLeftMsg[0]}
                labelIdx={0} />
                <div onMouseEnter={this.charEnter} onMouseLeave={this.chartLeave} className="four-right-chart">
                    <ReactEcharts
                    ref={"mychart"}
                    option={this.changeOpt(getFourRightMsg)}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{height: "100%",width: "100%"}} />
                </div>
            </div>
        )
    }
}

export default FourOneLine;