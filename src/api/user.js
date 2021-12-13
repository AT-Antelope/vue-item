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
            region: Object, (JSON格式) tips:接口文档里说是String，实际改成了传json就行
            status: String, (0：启用，1：禁用)
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

/**
 * 用户删除
 * 参数:{
    id: String, (Array)
 * }
 */
export function UserDelete(data) {
  return service.request({
    method: "post",
    url: "/user/delete/",
    data,
  });
}

/**
 * 用户禁用更改
 * 参数:{
            id:      *number        用户ID
            status:  *boolean       禁启用状态（1：禁用，2：启用）？接口文档没写好导致接口间参数对不上
 * }
 */
export function UserActives(data) {
  return service.request({
    method: "post",
    url: "/user/actives/",
    data,
  });
}

/**
 * 用户编辑
 * 参数:{
            *id:      number
            *username:string
            truename: string
            password: string
            phone:    number                    手机号
            region:   string(json)              地区
            *status:  boolean(0：启用，1：禁用)  禁用状态
            role:     string                    角色类型
            btnPerm:  string                    按钮权限
 *      }
 */
export function UserEdit(data) {
  return service.request({
    method: "post",
    url: "/user/edit/",
    data,
  });
}
