var head =
  process.env.NODE_ENV === "development"
    ? "/screenJson"
    : "http://192.168.100.101:8076/api/DataScreen";
export default {
  getLineDataOne: `${head}/GetSaleSummaryByMonthCondition post`, //销售折现图左边数据接口
  getLineEchartData: `${head}/GetSaleThrendByMonthCondition post`, //销售折现图数据接口

  getPieDataOne: `${head}/GetEarningSummaryByMonthCondition post`, //收益块饼图左边数据
  getPieEchartData: `${head}/GetEarningThrendByMonthCondition post`, //收益块饼图数据

  getPieTwoAll: `${head}/GetPassengerFlowByMonthCondition post`, //客流所有数据

  getLineDataTwo: `${head}/GetCustEarningSummaryByMonthCondition post`, //会员信息数据
  getLineTwoEchartData: `${head}/GetCustThrendByMonthCondition post`, //会员曲线数据

  getFloorInfoList: `${head}/GetFloorInfoList post`, //查询可展示楼层信息,楼层id获取
  getFloorSaleEarnByFloorID: `${head}/GetFloorSaleEarnByFloorID post`, //按日期 查询楼层销售收益分析汇总块
  getFloorTrendByFloorID: `${head}/GetFloorTrendByFloorID post`, //楼层查询客流会员销售曲线数据

  getOperationSalePercentByFloorID: `${head}/GetOperationSalePercentByFloorID post`, //楼层查询业态销售占比分析
  getOperationEarningPercentByFloorID: `${head}/GetOperationEarningPercentByFloorID post`, //楼层查询业态收益占比分析

  getStoreEarningByFloorID: `${head}/GetStoreEarningByFloorID post`, //按楼层查询商铺收益数据业绩
  getStoreSaleByFloorID: `${head}/GetStoreSaleByFloorID post`, //按楼层查询商铺销售数据业绩
  getDegreeList: `${head}/GetDegreeList get`, //查询等级类型(1销售/2收益)

  getStoreInfoByMonthCondition: `${head}/GetStoreInfoByMonthCondition post`, //商铺ID查询商铺信息
  getStoreCircleSequentialInfoByMonthCondition: `${head}/GetStoreCircleSequentialInfoByMonthCondition post`, //按日期条件 商铺ID查询商铺环比信息
  getStoreSaleSequentialInfoByMonthCondition: `${head}/GetStoreSaleSequentialInfoByMonthCondition post`, //按日期条件 商铺ID查询店铺销售分析趋势
  getStoreSequentialInfoByMonthCondition: `${head}/GetStoreSequentialInfoByMonthCondition post`, //按日期条件 商铺ID查询店铺收益分析趋势

  getStoreSaleRankInMall: `${head}/GetStoreSaleRankInMall post`, //按日期条件 查询项目销售排行红黑榜趋势
  getStoreSalePerAreaRankInMall: `${head}/GetStoreSalePerAreaRankInMall post`, //按日期条件 查询项目下商铺销售坪效排行榜
  getStoreEarningRankInMall: `${head}/GetStoreEarningRankInMall post`, //按日期条件 查询项目下商铺收益排行榜趋势
  getStoreSaleRankInFloor: `${head}/GetStoreSaleRankInFloor post`, //按日期条件  楼层ID 查询楼层销售排行红黑榜趋势
  getStoreSalePerAreaRankInFloor: `${head}/GetStoreSalePerAreaRankInFloor post`, //按日期条件 楼层ID 查询项目下商铺销售坪效排行榜
  getStoreEarningRankInFloor: `${head}/GetStoreEarningRankInFloor post`, //按日期条件 楼层ID 查询楼层下商铺收益排行榜趋势
  getOperationTypeList: `${head}/GetOperationTypeList post`, //获取一级业态列表
  getStoreSaleRankInOperationType: `${head}/GetStoreSaleRankInOperationType post` //按日期条件  业态ID 查询业态销售排行红黑榜趋势
};
