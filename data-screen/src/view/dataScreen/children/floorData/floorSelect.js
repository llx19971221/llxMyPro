import React, { Component } from "react";
import connectOption from "@/actions/action-example";
import actions  from '@/actions';

@connectOption(
    {
        reducers: "screen",//reducers名字是screen
        stateObj: {
            canFloorMsg: "canFloorMsg",//value是传入当前组件参数，date是对应state
            nowFloorId: "nowFloorId"
        }
    },
    {
        action: actions,//用到的活动
        actionObj: {
            setNowFloorId: "setNowFloorId"//第一个是传入当前组件参数，第二个对应action
        }
    }
)
class FloorSelect extends Component {
    selectClass = {
        true: 'floor-select-item selected',
        false: 'floor-select-item'
    }//设置是否被点击
    setNowFloorId = (FloorId) => {
        const { setNowFloorId } = this.props;
        if(FloorId === '1685be7f-8651-45a0-ac6c-19a09181e6b8')return;
        setNowFloorId(FloorId);
    }
    render() {
        const { 
            canFloorMsg,
            nowFloorId
        } = this.props;
        console.log('渲染');
        return (
            <div className="floor-select-wrap">
                <ul className="floor-select-list">
                    {canFloorMsg.map(el => {
                       return (
                    <li 
                        onClick={() => this.setNowFloorId(el.FloorId)} 
                        key={el.FloorId} 
                        className={this.selectClass[el.FloorId === nowFloorId]}>
                           {el.FloorName}
                    </li>)
                    })}
                </ul>
            </div>
        );
    }
}

export default FloorSelect;