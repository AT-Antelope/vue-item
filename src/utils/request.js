/**
 * views/login.vue --> api/login.js --> utils/request.js
 */
import axios from "axios";
import { Message } from "element-ui";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";

const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // alert(...response);
    let data = response.data;
    let msg = data.message;

    //和后端说好，成功时返回0，有问题时返回非0
    if (data.resCode !== 0) {
      // console.log(response);
      Message.error(msg);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Message.error(msg);
    return Promise.reject(error);
  }
);

//  测试接口时可以这样直接调用
// service.request({
//   method: "get",
//   url: "/user/123",
//   data: {
//     firstName: "Fred",
//     lastName: "Flintstone",
//   },
// });

export default service;
/**
 * 使用export default时，不能同时存在多个default
 * 在其他文件mport引入时，不需要花括号
 */
