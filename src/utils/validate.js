/**
 * 需时引用
 */

// 过滤特殊字符
export function stripscript(string) {
  let pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~! @#￥……&*（）&;——|{}【】‘；：“”’。，、？]"
  );
  var rs = "";
  for (let i = 0; i < string.length; i++) {
    rs = rs + string.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

// 验证邮箱
export function validateEmail(string) {
  let reg = /^([a-zA-z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(string) ? true : false;

  //   if (!reg.test(string)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
}

// 验证密码
export function validatePwd(string) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,16}$/;
  return reg.test(string) ? true : false;
}

// 验证验证码
export function validateCode(string) {
  let reg = /^[0-9]{6}$/;
  return reg.test(string) ? true : false;
}

/**
 * 没有使用export default时，可以同时声明多个export
 * 在其他文件mport引入时，需要花括号
 */
