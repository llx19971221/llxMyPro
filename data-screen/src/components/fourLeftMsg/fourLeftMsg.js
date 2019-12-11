/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import "./fourLeftMsg.less";
let ic = require("@assets/img/zz.png").default;
let dc = require("@assets/img/xj.png").default;
class FourLeftMsg extends React.Component {
    state = {
        label: [
            {
                title: "销售",
                subTitle: [ "环比", "客单价", "订单量"],
                units: ['%', '元', '单'],
                args: ['TotalSaleAmt', 'SequentialValue', 'PerCustomerPrice', 'OrderCount']
            },
            {
                title: "收益",
                subTitle: [ "环比", "收缴率", "欠费金额"],
                units: ['%', '%', '元'],
                args: ['TotalNetAmt', 'SequentialValue', 'PaidPercent', 'UnChargeAmt']
            },
            {
                title: "客流",
                subTitle: [ "环比", "提袋率", "车流"],
                units: ['%', '%', '次'],
                args: ['TotalPassengerFlowCount', 'SequentialValue', 'PaidPercent', 'CarInCount']
            },
            {
                title: "会员",
                subTitle: [ "环比", "客单价", "会员消费"],
                units: ['%', '元', '万元'],
                args: ['TotalCustomerCount', 'SequentialValue', 'CustPercentAmt', 'CustConsumeAmt']
            }
        ]
    }
    totalFormat = (data) => {
        let ifW = data / 10000;
        if(ifW< 1 && ifW > 0) {
            return data + '元'
        }else if(ifW> 1) {
            return ifW.toFixed(2) + '万'
        }else {
            return "0.00元"
        }
    }
    icOrDc = (data) => {
        if(data > 0) {
            return "item-detail ic";
        }else if(data < 0) {
            return "item-detail dc";
        }else {
            return "item-detail";
        }
    }
    zeroUnderline = (data, unit) => {
        // eslint-disable-next-line no-new-wrappers
        data = new Number(data);
        if(data.valueOf() === 0) {
            return "——";
        }else if(data < 0) {
            return data * -1 + unit;
        }else {
            return data + unit;
        }
    }
    render() {
        let { data, labelIdx } = this.props;
        console.log('left',data);
        let { label } = this.state;
        return (
            <div 
            className={labelIdx === 1 || labelIdx === 2?"four-left-wrap pie" : "four-left-wrap"}>

                <h3 className="title">
                    {label[labelIdx].title}
                </h3>
                <p className="num">
                    {this.totalFormat(data[label[labelIdx].args[0]])}
                </p>
                <ul className="left-msg-list">
                    <li className="left-msg-item">
                        <h4 className="title">
                            {label[labelIdx].subTitle[0]}
                        </h4>
                        <p className={this.icOrDc(data[label[labelIdx].args[1]])}>
                            {this.zeroUnderline(data[label[labelIdx].args[1]], label[labelIdx].units[0])}
                            <img className="ic-icon" src={ic} alt="ic" />
                            <img className="dc-icon" src={dc} alt="dc" />
                        </p>
                    </li>
                    <li className="left-msg-item">
                        <h4 className="title">
                            {label[labelIdx].subTitle[1]}    
                        </h4>
                        <p 
                        className={labelIdx === 2?  this.icOrDc(data[label[labelIdx].args[2]]) : "item-detail"}>
                            {this.zeroUnderline(data[label[labelIdx].args[2]], label[labelIdx].units[1])}
                            <img className="ic-icon" src={ic} alt="ic" />
                            <img className="dc-icon" src={dc} alt="dc" />
                        </p>
                    </li>
                    <li className="left-msg-item">
                        <h4 className="title">
                            {label[labelIdx].subTitle[2]}
                        </h4>
                        <p style={labelIdx === 1?{color:"rgb(16,169,186)"}: {}} className="item-detail">
                            {this.totalFormat(data[label[labelIdx].args[3]])}
                        </p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default FourLeftMsg;