let initStates = {
    date: [],
    loading: true,
    fourOneLeftInfo: [],
    fourOneRightInfo: [],
    canFloorMsg: [],//能显示的楼层w -1 1 2 3 4 5
    nowFloorId: '',//默认-1层
    floorSaleAnalysis: [],//楼层销售分析
    smaill: false
}
const screen = (state = initStates, action) => {
    switch (action.type) {
        case 'SET_DATE':
            console.log(action.date)
            if(action.date) {
                return {...state, date: action.date };
            }else {
                return {...state};
            }
        case 'SET_FOUR_LEFT_MSG':
            return {...state, fourOneLeftInfo: action.data}
        case 'SET_FOUR_RIGHT_MSG':
            return {...state, fourOneRightInfo: action.data}
        case 'SET_LOADING':
            return {...state, loading: action.loading}
        case 'SET_SMAILL':
            return {...state, smaill: action.smaill}
        case 'SET_CAN_FLOOR_MSG':
            return {...state, canFloorMsg: action.floorMsg}
        case 'SET_NOW_FLOOR_ID':
            return {...state, nowFloorId: action.nowFloorId}
        case 'SET_FLOOR_SALE_ANA':
            return {...state, floorSaleAnalysis: action.floorSaleAnalysis} 
        default: 
        return state
    }
}

export default screen;