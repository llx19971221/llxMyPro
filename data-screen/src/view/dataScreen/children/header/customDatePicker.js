import React, { Component } from "react";
import PropTypes from "prop-types";
import  actions  from '@/actions';
import connectOption from "@/actions/action-example";
import "./customDatePicker.less";
import moment from "moment";

@connectOption(
    {
        reducers: "screen",//reducers名字是screen
        stateObj: {
            value: "date"//value是传入当前组件参数，date是对应state
        }
    },
    {
        action: actions,//用到的活动
        actionObj: {
            setDate: "setDate"//第一个setDate是传入当前组件参数，第二个setDate对应action
        }
    }
)
class CustomDatePicker extends Component {
    PropTypes = {
        value: PropTypes.array.isRequired,
        split: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        ranges: PropTypes.arrayOf({
            length: 2
        })
    }
    
    constructor(props){
        // console.log(this.props);
        super(props);
        let year = moment().get("year");
        let month = moment().get("month");
        let nowMonth = [moment(new Date(year + "-" + (month + 1))), moment(new Date(year + "-" + (month + 1)))];//本月
        let preMonth = [moment(new Date(year + "-" + month), "YYYY-M"), moment(new Date(year + "-" + (month + 1)), "YYYY-M")];//上月
        let nowYear = [moment(new Date(year + '-' + 1), "YYYY-M"), moment(new Date(year + '-' + 12), "YYYY-M")] ;//今年
        let preYear = [moment(new Date((year - 1) + '-' + 1), "YYYY-M"), moment(new Date((year - 1) + '-' + 12), "YYYY-M")];//去年
        this.state = {
            monthArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            open: false,
            year: 2019,//当前月份
            preValue: null,
            startYear: this.props.ranges[0].format("YYYY"),
            endYear: this.props.ranges[1].format("YYYY"),
            value: this.props.value,
            setUpStartOrEnd: true,//设置开始日期还是结束日期，true是开始, false是结束
            options: [nowMonth, preMonth, nowYear, preYear]
        }
    }
    ifRange = (date) => {//是否在开始日期和结束日期范围内
        if(this.props.ranges[0].valueOf() > date.valueOf() || this.props.ranges[1].valueOf() < date.valueOf()) {
            return "date-table-cell not-allowed";
        }
        if(this.state.value[0] < date && date < this.state.value[1]) {
            return "date-table-cell range";
        }else if(this.state.value[0].valueOf() === date.valueOf() && this.state.value[1].valueOf() === date.valueOf()  ){
            return "date-table-cell start end";
        }else if(this.state.value[0].valueOf() === date.valueOf() ){
            return "date-table-cell start";
        }else if(this.state.value[1].valueOf() === date.valueOf()  ){
            return "date-table-cell end";
        }else {
            return "date-table-cell";
        }
    }
    componentDidUpdate() {
        document.onclick = null;
        document.onclick = (e) => {
            if(this.state.open === true) {
                    if(this.state.value[0].valueOf() !== this.state.preValue[0].valueOf()
                    || this.state.value[1].valueOf() !== this.state.preValue[1].valueOf()) {
                        // console.log('ts')
                        if(!this.state.value[0] && !this.state.value[1]) {
                            // console.log('tss')
                            this.setState({ value: [...this.state.preValue]})
                        }else {
                            //做事
                            // console.log('tsss')
                            this.setState({ setUpStartOrEnd: true })

                            this.props.setDate(this.state.value)//设置日期
                        }
                    }
                    // console.log('tsss')
                this.setState({ open: false})
            }
        };
    }
    dateSelect = (el, setUpDate) => {
        el.nativeEvent.stopImmediatePropagation();
        if(this.props.ranges[0].valueOf() > setUpDate.valueOf() || this.props.ranges[1].valueOf() < setUpDate.valueOf()) {
            return ;
        }
        let { setUpStartOrEnd, value } = this.state;
        if(setUpDate.valueOf() === value[0].valueOf()) {
            value = ["", ""];
            this.setState({value, setUpStartOrEnd: true});
        }else if(setUpDate.valueOf() === value[1].valueOf()) {
            value[1] = value[0];
            this.setState({value, setUpStartOrEnd: false});
        }else {
            if(setUpStartOrEnd) {
                value = [setUpDate, setUpDate];
                this.setState({value, setUpStartOrEnd: false})
            }else {
                // console.log('选择2')
                value = [...value];
                value[1] = setUpDate;
                value.sort((a,b)=> a.valueOf() - b.valueOf());
                this.setState({open: false})
                this.setState({ value, setUpStartOrEnd: true, open: false }, () => {
                    this.props.setDate(this.state.value)
                });
                //做事
                
            }
        }
        
    }
    yearBtn = (el, leftOrRight) => {
        let nowYear = this.state.year;
        if(leftOrRight === true) {//true就是左点
            if(nowYear > this.state.startYear) {
                this.setState({ year: --nowYear});
            }else {
                return ;
            }
        }else {//false是右点
            if(nowYear < this.state.endYear) {
                this.setState({ year: ++nowYear});
            }else {
                return ;
            }
        }
    }
    directBtn = (idx) => {
        let nowValue = [];
        if(this.props.ranges[0].valueOf() > this.state.options[idx][0].valueOf()
        && this.props.ranges[1].valueOf() < this.state.options[idx][1].valueOf()) {//如果没在范围内，就默认最小和最大
            nowValue = [...this.props.ranges];
            this.setState({ value: nowValue })

        }else if(this.props.ranges[0].valueOf() > this.state.options[idx][0].valueOf()
        && this.props.ranges[0].valueOf() > this.state.options[idx][1].valueOf()) {//如果开始和结束都比最小范围还小，那都是最小范围
            nowValue = [this.props.ranges[0], this.props.ranges[0]];
            this.setState({ value: nowValue });

        }else if(this.props.ranges[0].valueOf() > this.state.options[idx][0].valueOf()) {//如果开始比最小范围还小，设置为最小范围
            nowValue[0] = this.props.ranges[0];
            nowValue[1] = [...this.state.options[idx]][1];
            this.setState({ value: nowValue })

        }else if(this.props.ranges[1].valueOf() < this.state.options[idx][0].valueOf()
        && this.props.ranges[1].valueOf() < this.state.options[idx][1].valueOf()){////如果开始和结束都比最大范围还大，那都是最大范围
            nowValue = [this.props.ranges[1], this.props.ranges[1]]
            this.setState({ value: nowValue });

        }else if(this.props.ranges[1].valueOf() < this.state.options[idx][1].valueOf()){//如果结束比最大范围还大，设置为最大范围
            nowValue[0] = [...this.state.options[idx]][0];
            nowValue[1] = this.props.ranges[1];
            this.setState({ value: nowValue })

        }else {//正常设置
            nowValue = [...this.state.options[idx]];
            // console.log("正常设置",nowValue);
            this.setState({ value: nowValue});
        }
        this.setState({open: false});
        //做事
        // console.log(this.state.value);
        this.props.setDate(nowValue);
    }
    open = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        if(this.state.open) return;
        this.setState({preValue: [...this.state.value], open: true});
    }
    render() {
        const { open, monthArr, year, value } = this.state;
        console.log(open);
        return (
            <div htmlFor="input" className="custom-picker-wrap">
                <h3 className="picker-title">{this.props.title?this.props.title:'时间'}</h3>
                <div onClick={this.open} className="custom-input-wrap">
                    <input  id="input" readOnly value={value[0]?value[0].format("YYYY-M"):""} placeholder="开始时间" className="custom-date-input" type='text'/>
                    <i className="split-icon">{this.props.split?this.props.split:"到"}</i>
                    <input  readOnly value={value[1]?value[1].format("YYYY-M"): ""} className="custom-date-input" placeholder="结束时间" type='text'/>
                    {open && (
                        <div onClick={(e) => {e.nativeEvent.stopImmediatePropagation();}} className="alert-date-wrap">
                        <div className="alert-date-left">
                            <p onClick={() => {this.directBtn(0)}} className="date-left-options">本月</p>
                            <p onClick={() => {this.directBtn(1)}} className="date-left-options">上月</p>
                            <p onClick={() => {this.directBtn(2)}} className="date-left-options">今年</p>
                            <p onClick={() => {this.directBtn(3)}} className="date-left-options">去年</p>
                        </div>
                        <div className="alert-date-right">
                            <div className="year-show-box">
                                <i className="arrow-icon" onClick={(e) => this.yearBtn(e, true)}>&lt;&lt;</i>
                                <p className="date-yaer">{year}</p>
                                <i className="arrow-icon" onClick={(e) => this.yearBtn(e, false)}>&gt;&gt;</i>
                            </div>
                            <div className="date-table">
                                {monthArr.map((el,idx)=>{
                                    return <div 
                                    className={this.ifRange(moment(new Date(year +"-"+(idx+1)),'YYYY-M'))}
                                    onClick={e =>  this.dateSelect(e, (moment(new Date(year +"-"+(idx+1)),'YYYY-M')))}
                                    key={idx}>
                                        <p className="month-wrap">
                                            {el}
                                        </p>
                                </div>
                                })}
                            </div>
                        </div>
                    </div>
                    )}
                </div>
                
            </div>
        )
    }
}
export default CustomDatePicker;