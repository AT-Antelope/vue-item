/**
 * 时间戳转换
 */
export function timestampToTime(timestamp) {
  var date = new Date(); //默认情况下，date 对象会自动把当前的时间和日期当作初始值。
  var Y = date.getFullYear(); //获取年份
  var M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1; //获取月份
  var D = date.getDate(); //获取日期
  var h = date.getHours(); //获取小时数
  var m = date.getMinutes(); //获取分钟数
  var s = date.getSeconds(); //获取秒数
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}
