import React from "react";
import FourLeftMsg from "@components/fourLeftMsg/fourLeftMsg";
import connectOption from "@/actions/action-example";
import ReactEcharts from "echarts-for-react";
@connectOption(
    {
        reducers: "screen",//reducers名字是screen
        stateObj: {
            getFourLeftMsg: "fourOneLeftInfo",//value是传入当前组件参数，date是对应state
            getFourRightMsg: "fourOneRightInfo"
        }
    }
)
class FourOnePie extends React.Component {
    option = {
        color: [
            'rgb(43,223,160)', 'rgb(255,129,96)',
            'rgb(181,192,191)', 'rgb(15,236,242)',
            'rgb(0,165,247)'
        ],
        legend: {
            type: "scroll",
            data: [],
            icon: "circle",
            orient: "vertical",
            width: "50%",
            height: "35%",
            bottom: 0,
            itemWidth: 8,
            itemHeight: 8,
            right: 'center',
            textStyle: {
                color: "#fff"
            },
            pageTextStyle: {
                color: "#fff"
            },
            pageIconSize: 10,
            pageIconInactiveColor: "#fff",
            pageIconColor: "#fff"
        },
        grid: {
            top: "10%",
            left: "10%",
            right: "10%",
            bottom: "10%"
        },
        dataset: {
            dimensions: ["ChargeType","TotalSaleAmt"],
            source: []
        },
        tooltip: {
            backgroundColor: "rgb(167,187,216)",
            textStyle: {
                color: "#000"
            },
            
            formatter: "{b}:{d}万元"
        },
        series: [
            {
                type: "pie",
                center: ["50%", "30%"],
                radius: ["0", "55%"],
                minAngle: 15,
                label: {
                    show: false
                },
                itemStyle: {
                    borderColor: "rgb(19,21,62)",
                    borderWidth: 3
                },
                labelLine: {
                    show: false
                },
            }
        ]
    }
    changeOpt = (newData) => {
        let newOpt = Object.assign({}, this.option);
        newOpt.legend.data = newData.length === 0 ? [] : newData[1].map(e => e.ChargeType);
        newOpt.dataset.source = newData.length === 0 ? [] : newData[1];
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
                data={getFourLeftMsg[1]}
                labelIdx={1} />
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

export default FourOnePie;