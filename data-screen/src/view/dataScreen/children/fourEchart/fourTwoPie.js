import React from "react";
import FourLeftMsg from "@components/fourLeftMsg/fourLeftMsg";
import connectOption from "@/actions/action-example";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts"; 
import "echarts-liquidfill/dist/echarts-liquidfill";
@connectOption(
    {
        reducers: "screen",//reducers名字是screen
        stateObj: {
            getFourLeftMsg: "fourOneLeftInfo"//value是传入当前组件参数，date是对应state
        }
    }
)
class FourTwoPie extends React.Component {
    fixedTwo = (data) => {
        return (data / 100).toFixed(2);
    }
    option = {
        tooltip: {
            show: true,
            backgroundColor: "rgb(167,187,216)",
            textStyle: {
                color: "#000"
            },
            formatter: function(props) {
                return (props.value * 100).toFixed(2) + "%"
            }
        },
        series: [
            {
                type: "liquidFill",
                radius: "70%",
                outline: {
                    show: false
                },
                backgroundStyle: {
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5,  [{
                          offset: 0.65, color: 'transparent' // 0% 处的颜色
                        }, {
                          offset: 1, color: 'rgba(255,255,255,.5)' // 100% 处的颜色
                        }], false),
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0,0,0,1, [{
                        offset: 0.5,
                        color: 'rgb(0,171,247)'
                    }, {
                        offset: 0.8,
                        color: 'rgb(1,229,244)'
                    }], false)
                },
                label: {
                    fontSize: 30,
                    fontWeight: "lighter",
                    color: "#fff",
                    insideColor: "#000",
                    formatter: function(props) {
                        return (props.value * 100).toFixed(0) + "%\n提袋率"
                    }
                },
                data: []
            }
        ]
    }
    changeOpt = (newData) => {
        let newOpt = Object.assign({}, this.option);
        let paidPercent = this.fixedTwo(newData[2].PaidPercent);
        newOpt.series[0].data = [paidPercent, paidPercent, paidPercent];
        if(this.refs['mychart']) {
            this.refs['mychart'].getEchartsInstance().setOption(newOpt);
        }
        return newOpt;
    }
    render() {
        const { getFourLeftMsg } = this.props;
        return (
            <div className="four-item-wrap">
                <FourLeftMsg
                data={getFourLeftMsg[2]}
                labelIdx={2} />
                <div className="four-right-chart">
                    <ReactEcharts
                    ref={'mychart'}
                    option={this.changeOpt(getFourLeftMsg)}
                    notMerge={false}
                    lazyUpdate={true}
                    style={{height: "100%",width: "100%"}} />
                </div>
            </div>
        )
    }
}

export default FourTwoPie;