import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

/**
 * 
 * @param mapState: 与vue mapGetters写法相似
 * @param mapActions: 与 vue mapActions写法相似
 */
export default (mapState , mapActions) => {
    return connect(
        state => {
            let stateObj = {};
            if(mapState['reducers']) {
                for(let key in mapState.stateObj) {
                    stateObj[key] = state[mapState['reducers']][mapState.stateObj[key]];   
                }
            }else {
                for(let key in mapState.stateObj) {
                    stateObj[key] = state[mapState.stateObj[key]];   
                }
            }
            // console.log(stateObj);
            return stateObj;
        },
        dispatch => {
            if(!mapActions) return {};
            let allAction = bindActionCreators(mapActions.action, dispatch);
            let actionObj = {};
            for(let key in mapActions.actionObj) {
                actionObj[key] = allAction[mapActions.actionObj[key]];
            }
            // console.log(actionObj)
            return actionObj;
        }
    )
}