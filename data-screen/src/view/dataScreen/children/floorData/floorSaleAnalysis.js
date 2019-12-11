import React, { Component } from "react";
import SpecialTitle from "@components/specialTitle/specialTitle";
import connectOption from "@/actions/action-example";
import ReactEcharts from "echarts-for-react";
@connectOption(
    {
        reducers: "screen",//reducers名字是screen
        stateObj: {
            floorSaleAnalysis: "floorSaleAnalysis"//value是传入当前组件参数，date是对应state
        }
    }
)
class FloorSaleAnalysis extends Component {
    option = {
        color: ['rgb(255,129,96)', 'rgb(255,218,109)', 'rgb(15,236,242)'],
        tooltip: {
            trigger: "axis",
            backgroundColor: "rgb(167,187,216)",
            textStyle: {
                color: "#000"
            }
        },
        textStyle: {
            color: "#fff"
        },
        grid: {
            top: "20%",
            left: "15%",
            right: "15%",
            bottom: "15%"
        },
        legend: {
            icon: "rect",
            data: ['客流', '会员销售', '非会员销售'],
            itemWidth: 8,
            itemHeight: 8,
            top: 10,
            right: 0,
            textStyle: {
                color: "#fff"
            }
        },
        xAxis: {
            splitLine: {
                show: false
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
                formatter: function(value) {
                    // console.log(value.match(/\d{2}/g));
                    return value.match(/\d{2}/g)[3] + "日"
                }
            },
            data: []
        },
        yAxis: [{
            name: "金额（万元）",
            nameGap: 8,
            axisTick: {
                show: false
            },
            nameTextStyle: {
                fontSize: 10
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            }
        },{
            name: "客流（人）",
            nameGap: 8,
            axisTick: {
                show: false
            },
            nameTextStyle: {
                fontSize: 10
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            }
        }],
        dataset: {
            // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
            // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
            // dimensions: ['PassengerFlowNum', 'CustSaleAmt', 'NonCustSaleAmt'],
            source: []
        },
        series: [
            {type: "line",name: "客流",symbol: "none", yAxisIndex: 1},
            {type: "bar",name: "会员销售", stack: 1},
            {type: "bar",name: "非会员销售",  stack: 1}
        ]

    }
    changeOpt = (newData) => {
        let newOpt = Object.assign({}, this.option);
        // newOpt.legend.data = newData[1].map(e => e.ChargeType);
        newOpt.xAxis.data = newData[1].map(e => e.YearMonthValue)
        newOpt.dataset.source = newData[1]
        if(this.refs['mychart']) {
            this.refs['mychart'].getEchartsInstance().setOption(newOpt);
        }
        return newOpt;
    }
    render() {
        const { floorSaleAnalysis } = this.props;
        console.log(floorSaleAnalysis);
        return (
            floorSaleAnalysis.length === 0 || 
            floorSaleAnalysis.includes(null)? (
                <>
                </>
            ):
            (<div className="sale-analysis-wrap">
                <SpecialTitle title={"楼层销售分析"}/>
                <div className="sale-analysis-chart">
                    <div className="sale-analysis-left">
                        <ul className="sale-anaysis-list">
                            <li className="sale-anaList-item rank">
                                <h4 className="title">综合排名：</h4>
                                <strong className="sale-item-info">
                                    NO.{floorSaleAnalysis[0].SortIndex}
                                </strong>
                            </li>
                            <li className="sale-anaList-item every-area" >
                                <h4 className="title">销售坪效：</h4>
                                <strong className="sale-item-info">{floorSaleAnalysis[0].SalePercentEveryArea}</strong>
                            </li>
                            <li className="sale-anaList-item every-area">
                                <h4 className="title">收益坪效：</h4>
                                <strong className="sale-item-info">{floorSaleAnalysis[0].EarnPercentEveryArea}</strong>
                            </li>
                            <li className="sale-anaList-item">
                                <h4 className="title">主力店：</h4>
                                <strong className="sale-item-info show-two">{floorSaleAnalysis[0].MainOperationTypeStoreName}</strong>
                            </li>
                            <li className="sale-anaList-item">
                                <h4 className="title">业态：</h4>
                                <strong className="sale-item-info show-two">{floorSaleAnalysis[0].OperationTypeName}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="sale-analysis-right">
                        <ReactEcharts
                        ref={'mychart'}
                        option={this.changeOpt(floorSaleAnalysis)}
                        notMerge={false}
                        lazyUpdate={true}
                        style={{height: "100%",width: "100%"}} />
                    </div>
                </div>
            </div>
            )
        )
    }
}

export default FloorSaleAnalysis;