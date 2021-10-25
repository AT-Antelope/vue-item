import service from "@/utils/request";
/**
 * 获取验证码
 * getSms
 */
export function GetSms(data) {
  service.request({
    method: "post",
    url: "/getSms/",
    data,
    // data: data，(key:value)，key和value同名的情况下，写成单一个即可
  });
}

/**
 * 登录
 * login
 */

/**
 * 注册
 * reg
 */
