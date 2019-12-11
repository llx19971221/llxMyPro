import React, { Component } from "react";
import moment from "moment";
class NowDate extends Component {
    nowDate = moment(new Date()).format("YYYY - MM - DD");
    timer = null;
    state = {
        nowDate: moment().format("YYYY - MM - DD")
    }
    nowDate = () => { 
        this.timer && clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.setState({nowDate: moment().format("YYYY - MM - DD")});
        }, 1000)
    }
    componentDidMount() {
        this.nowDate();
    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }
    render() {
        const { nowDate } = this.state;
        return (
            <>
                {nowDate}
            </>
        )
    }
}

export default NowDate;