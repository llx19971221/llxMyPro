import React from "react";
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
class FourTwoLine extends React.Component {
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
            data: ['会员数'],
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
            max: function(value) {
                console.log(value);
                return value.max + 10000
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
                name: "会员数",
                symbol: "none",
                areaStyle: {
                    color: color
                }, 
                data: [],
                lineStyle: {
                    color: "transparent"
                }
            }
        ]
    }
    changeOpt = (newData) => {
        let newOpt = Object.assign({}, this.option);
        newOpt.xAxis.data = newData[2].map(e=>e.DateValue);
        newOpt.series[0].data = newData[2].map(e=>e.TotalCustCount);
        if(this.refs['mychart']) {
            this.refs['mychart'].getEchartsInstance().setOption(newOpt);
        }
        return newOpt;
    }
    render() {
        const { getFourLeftMsg, getFourRightMsg } = this.props;
        return (
            <div className="four-item-wrap">
                <FourLeftMsg
                data={getFourLeftMsg[3]}
                labelIdx={3} />
                <div className="four-right-chart">
                    <ReactEcharts
                    ref={'mychart'}
                    option={this.changeOpt(getFourRightMsg)}
                    notMerge={false}
                    lazyUpdate={true}
                    style={{height: "100%",width: "100%"}} />
                </div>
            </div>
        )
    }
}

export default FourTwoLine;