import React from 'react';
// import Router from "./router/router.js";
import "./antd.less";
import actions from "@/actions";
import connectOption from "@/actions/action-example";
import DataScreen from '@view/dataScreen/dataScreen.js';
import { Spin  } from "antd";
@connectOption (
  {
    reducers: "screen",//reducers名字是screen
    stateObj: {
        ifLoading: "loading",
        getFourRightMsg: "fourOneRightInfo",
        smaill: "smaill"
    }
  },
  {
    action: actions,
    actionObj: {
        setSmaill: "setSmaill"
    }
  }
)
class App extends React.Component {
  constructor(props) {
    super(props);
    if(window.innerWidth < 1080) {
      this.props.setSmaill(true)
    }
    window.onresize = (e) => {
      if(e.target.innerWidth < 1080) {
        this.props.setSmaill(true)
      }else {
        this.props.setSmaill(false)
      }
    }
  }
  
  render(){
    return (
      <Spin wrapperClassName="spin-wrap-app" spinning={this.props.ifLoading} tip="正在加载图层..." >
        <DataScreen smaill={this.props.smaill} fourRightMsg={this.props.getFourRightMsg} />
      </Spin>
    );
  }
}
export default App;
