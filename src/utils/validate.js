// 过滤特殊字符
export function stripscript(string) {
  var pattern = new RegExp(
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
  if (!reg.test(string)) {
    return false;
  } else {
    return true;
  }
}
