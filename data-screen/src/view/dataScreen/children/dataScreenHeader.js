import React, { Component } from "react";
import moment from "moment";
import CustomDatePicker from "./header/customDatePicker";
import FlipClock from "./header/flipClock.js";

class CustomHeader extends Component {
    render() {
        return (
        <header className='data-screen-header'>
            <div className='data-screen-date'>
                <CustomDatePicker 
                split={'至'}
                ranges={[moment(new Date("2018-1"), "YYYY-M") , moment(new Date("2019-12"), 'YYYY-M')]} />
            </div>
            <h1 className="title">数据屏</h1>
            <div className="now-date">
                <FlipClock />
            </div>
        </header> 
        )
    }
}

export default CustomHeader