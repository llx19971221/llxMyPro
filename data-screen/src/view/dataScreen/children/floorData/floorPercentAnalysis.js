import React, { Component } from "react";
import SpecialTitle from "@components/specialTitle/specialTitle"
class FloorPercentAnalysis extends Component {
    render() {
        return (
            <div className="percent-analysis-wrap">
                <SpecialTitle title={"业态数据分析"} />
                <div className="percent-chart-wrap"></div>
            </div>
        )
    }
}

export default FloorPercentAnalysis;