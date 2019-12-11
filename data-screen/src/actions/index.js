export default {
    setDate : date => ({
        type: "SET_DATE",
        date
    }),
    setFourLeftMsg: (data) => ({
        type: "SET_FOUR_LEFT_MSG",
        data
    }),
    setFourRightMsg: (data) => ({
        type: "SET_FOUR_RIGHT_MSG",
        data
    }),
    setLoading: (loading) => ({
        type: "SET_LOADING",
        loading
    }),
    setSmaill: (smaill) => ({
        type: 'SET_SMAILL',
        smaill
    }),
    setCanFloorMsg: (floorMsg) => ({
        type: "SET_CAN_FLOOR_MSG",
        floorMsg
    }),
    setNowFloorId: (nowFloorId) => ({
        type: "SET_NOW_FLOOR_ID",
        nowFloorId
    }),
    setFloorSaleAnalysis: (floorSaleAnalysis) => ({
        type: "SET_FLOOR_SALE_ANA",
        floorSaleAnalysis
    })
}