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
