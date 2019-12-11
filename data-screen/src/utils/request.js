import axios from "axios";
export default (option, params)=>{
    let url = option;
    let method = "get";
    let opArr = url.split(" ");
    if (opArr.length >= 2) {
      url = opArr[0];
      method = opArr[1];
      if (
        method.toLocaleLowerCase() !== "get" &&
        method.toLocaleLowerCase() !== "post"
      ) {
        url = method;
        method = opArr[0].toLocaleLowerCase();
      }
    }
    let op = {
      'get': {
        url: url,
        method: 'get',
        params,
        timeout: 30000
      },
      'post': {
        url: url,
        method: 'post',
        data: params,
        timeout: 30000
      }
    };
    return axios(op[method])
      .then(res => {
        // console.log(res);
        let data = res.data.Data;
        return Promise.resolve({
          data,
          code: 1,
          status: true,
          msg: "成功！"
        });
      })
      .catch(() => {
        return Promise.resolve({
          code: -1,
          status: false,
          msg: "请求出错了!"
        });
      });
  };
