import React, { Component } from "react";
import NowDate from "./nowDate.js";
import moment from "moment";
// console.log(moment().set('minute',moment().get('minute') + 1).format("HHmm"))
class FlipClock extends Component {
    state = {
        nowDate: moment().format("HHmm"),
        flipArr: [false, false, false, false],
        nextDate: moment().format("HHmm")
    }
    comparedDif = () => {
        const { nowDate } = this.state
        let difDate = moment().format("HHmm");
        let difArr = null;
        difArr = [].map.call(nowDate, (ele,idx) => {
            return difDate[idx] === ele? false : true
        });
        return {difArr};
    }
    flip = (dateData) => {
        let { difArr } = dateData;
        if(!difArr || !difArr.includes(true)) {
            return ;
        }
        else {
            clearInterval(this.timer);
            this.setState( {
                nextDate: moment().format("HHmm"),
                flipArr: [...difArr]
            })
            setTimeout(() => {
                this.setState({
                    flipArr: [false,false,false,false],
                    nowDate: this.state.nextDate
                }, () => {
                    this.timerStart();
                })
            }, 700);
        }
    }
    timerStart = () => {
        this.timer = setInterval(() => {
            this.flip(this.comparedDif());
        }, 1000);
    }
    componentDidMount() {
        this.timerStart();
    }
    componentWillUnmount() {
       this.timer && clearInterval(this.timer);
    }
    render() {
        const { nowDate, nextDate, flipArr } = this.state
        return (
            <div className="flip-clock-wrap">
                <div className="flip-top">
                    <NowDate />
                </div>
                <ul className="flip-bottom-list">
                    <li className="flip-clock-item">
                        <div className="flip-top-new">{nextDate[0]}</div>
                        <div className={!flipArr[0]?"flip-middle-wrap":"flip-middle-wrap active"}>
                            <div className="flip-middle-new">{nextDate[0]}</div>
                            <div className="flip-middle-old">{nowDate[0]}</div>
                        </div>
                        <div className="flip-bottom-old">{nowDate[0]}</div>
                    </li>
                    <li className="flip-clock-item">
                        <div className="flip-top-new">{nextDate[1]}</div>
                        <div className={!flipArr[1]?"flip-middle-wrap":"flip-middle-wrap active"}>
                            <div className="flip-middle-new">{nextDate[1]}</div>
                            <div className="flip-middle-old">{nowDate[1]}</div>
                        </div>
                        <div className="flip-bottom-old">{nowDate[1]}</div>
                    </li>
                    :
                    <li className="flip-clock-item">
                        <div className="flip-top-new">{nextDate[2]}</div>
                        <div className={!flipArr[2]?"flip-middle-wrap":"flip-middle-wrap active"}>
                            <div className="flip-middle-new">{nextDate[2]}</div>
                            <div className="flip-middle-old">{nowDate[2]}</div>
                        </div>
                        <div className="flip-bottom-old">{nowDate[2]}</div>
                    </li>
                    <li className="flip-clock-item">
                        <div className="flip-top-new">{nextDate[3]}</div>
                        <div className={!flipArr[3]?"flip-middle-wrap":"flip-middle-wrap active"}>
                            <div className="flip-middle-new">{nextDate[3]}</div>
                            <div className="flip-middle-old">{nowDate[3]}</div>
                        </div>
                        <div className="flip-bottom-old">{nowDate[3]}</div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default FlipClock;