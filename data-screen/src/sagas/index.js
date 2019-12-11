import { put, all, call, takeLatest  } from 'redux-saga/effects';
import api from "@/api/api";
import fetch from "@utils/request"
import setActions from "@/actions"
import moment from "moment";
import { Message } from "antd";
const success = (msg) => {
  Message.success(msg);
}
const error = (msg) => {
  Message.error(msg)
}

/**首次打开页面，需要保存日期，楼层ID。。。。
 * 因为第二次选择的时候，我无法获取到
 */
let nowFloorId = null;
let nowDate = [];

function ifSuccessFn(data, done) {
  return data.some(e => e.code !== '1' && e.code !== 1);
}//判断是否成功得到所有数据,如果都等于1，就会返回false，false是成功，true是失败，证明有不等于1的

function* getData(action) {
  yield put(setActions.setLoading(true))
  if(action && action.hasOwnProperty('date')) {
    nowDate = action.date;
  }
  // console.log(state);
  nowDate = {StartDate: nowDate[0].format("YYYY-M"), EndDate: nowDate[1].format("YYYY-M")}
  try {
    /**需要日期 */
    let resLeftMsg = yield all([
      call(fetch, api.getLineDataOne, nowDate),
      call(fetch, api.getPieDataOne, nowDate),
      call(fetch, api.getPieTwoAll, nowDate),
      call(fetch, api.getLineDataTwo, nowDate)
    ]);

    let resRightChartData = yield all([
      call(fetch, api.getLineEchartData, nowDate),
      call(fetch, api.getPieEchartData, nowDate),
      call(fetch, api.getLineTwoEchartData, nowDate)
    ])
    

    yield getFloorData();//获取楼层销售分析。。。楼层数据


    let ifSuccess = ifSuccessFn([
      ...resLeftMsg, 
      ...resRightChartData
    ]);

    if(!ifSuccess) {
      resLeftMsg = resLeftMsg.map(e=> e.data);//四个图左边数据
      resRightChartData = resRightChartData.map(e=> e.data);//四个图右边数据
      console.log("ifSuccess:" + ifSuccess)
      yield all([
        put (setActions.setFourLeftMsg(resLeftMsg)),
        put (setActions.setFourRightMsg(resRightChartData)),
        put (setActions.setLoading(false))
      ])
      success("数据获取成功!");
    }else {
      error('getData一些请求发生了错误!');
    }
  }catch(e) {
    error("getData请求发生错误了!");
    console.log(e);
  }
}


/**需要楼层ID和日期 */
function* getFloorData(action) {
  console.log(action);
  if(action && action.hasOwnProperty('nowFloorId')) {
    nowFloorId = action.nowFloorId;
  }
  console.log(nowFloorId);
  try {
    let dateFloorObj = {...nowDate, FloorId: nowFloorId};
    let resFloorSaleEarn = yield all([
      call(fetch, api.getFloorSaleEarnByFloorID, dateFloorObj),
      call(fetch, api.getFloorTrendByFloorID, dateFloorObj)
    ]);
    let ifSuccess = ifSuccessFn([...resFloorSaleEarn]);
    if(!ifSuccess) {
      resFloorSaleEarn = resFloorSaleEarn.map(e=> e.data);
      yield all([
        put (setActions.setFloorSaleAnalysis(resFloorSaleEarn))
      ])
      success("数据获取成功!");
    }
  }catch(e) {

  }
}

function* getFloorId() {
  try {
    let resCanFloorMsg = yield call(fetch, api.getFloorInfoList);//可以展示的楼层信息
    if(resCanFloorMsg.code === 1 || resCanFloorMsg.code === '1') {
      yield put (setActions.setCanFloorMsg(resCanFloorMsg.data))
      nowFloorId = resCanFloorMsg.data[1].FloorId;//1
      yield put(setActions.setNowFloorId(nowFloorId))
    }
  }catch(e) {
    error("getFloorId出错");
    console.log(e);
  }
}

export default function* rootSaga() {
  yield takeLatest('SET_DATE', getData)
  yield getFloorId()
  yield put({type: "SET_DATE", 
    date: [moment(new Date('2019-5'),'YYYY-M'), moment(new Date('2019-11'),'YYYY-M')]
  })
  yield takeLatest('SET_NOW_FLOOR_ID', getFloorData)
}