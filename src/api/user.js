import service from "@/utils/request";
/**
 * Table组件，请求表格数据
 * 
 * 获取用户列表
 * url: /user/getList/
 *{
     username:""
     truename:""
     phone: number
     pageNumber: number
     pageSize: number
 }
 */
export function LoadTableData(params) {
  return service.request({
    method: params.method || "post",
    url: params.url,
    data: params.data || {
      pageNumber: 1,
      pageSize: 10,
    },
  });
}

/**
 * 获取省市区街关联
 * 参数：
 *  省：{
          type:"province",
 *     }
 *  市：{
          type:"city",
          province_code: String
 *   }
 *  区县：{
            type:"area",
            city_code: Number
 *  }
 *  街道：{
            type:"street",
            area_code: Number
 *  }
 */
export function CityPicker(data) {
  return service.request({
    method: "post",
    url: "/cityPicker/",
    data,
  });
}

/**
 * 用户添加
 * 参数:{
            username: String,
            truename: String,
            password: String,
            phone: Number,
            region: String,
            status: String,
            role: String,
            btnPerm: String,
 *      }
 */
export function UserAdd(data) {
  return service.request({
    method: "post",
    url: "/user/add/",
    data,
  });
}
