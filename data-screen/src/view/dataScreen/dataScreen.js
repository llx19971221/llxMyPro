import React, { PureComponent } from "react";
import "./dataScreen.less";
import DateHeader from "./children/dataScreenHeader";
import * as fourTotal from "./children/fourEchart";//横排四个图
import * as floorTotal from "./children/floorData";//楼层相关
import { Carousel } from "antd"
class DataScreen extends PureComponent {
    componentDidMount() {
        // console.log(this.refs)
    }
    render() {
        const { 
            fourRightMsg, 
            smaill 
        } = this.props;
        return (
            <div className="data-screen-wrap">
                {
                    fourRightMsg.length === 0 ? (
                        <>
                        </>
                    ) : !smaill ? (
                        <>
                            <DateHeader  />
                            <div key="fourWrap" className="data-four-wrap">
                                {/**大屏幕用这个 */}
                                <fourTotal.fourOneLine ref="lineOne" />
                                <fourTotal.fourOnePie />
                                <fourTotal.fourTwoPie />
                                <fourTotal.fourTwoLine />
                            </div>
                            <div className="floor-data-wrap">
                                <div className="floor-svg-wrap">
                                    <floorTotal.floorSvgInteractive />
                                </div>
                                <div className="floor-analysis-wrap">
                                    <floorTotal.floorSaleAnalysis />
                                    <floorTotal.floorPercentAnalysis />
                                </div>
                            </div>
                        </>
                    ) : 
                    <Carousel dots={false}>
                        {/**小屏幕用这个屏幕用这个 */}
                        <DateHeader />
                        <fourTotal.fourOneLine />
                        <fourTotal.fourOnePie />
                        <fourTotal.fourTwoPie />
                        <fourTotal.fourTwoLine />
                    </Carousel>
                } 
            </div>
        )
    }
}

export default DataScreen;