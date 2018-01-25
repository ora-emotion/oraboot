function Util () {
  // 将当前日期格式化为指定格式
  // yyyy-mm-dd
  this.formatDate = function (split) {
    var
      date         = new Date(),
      yy           = date.getFullYear(),   // 年
      mm           = date.getMonth() + 1,  // 月
      dd           = date.getDay(),        // 日
      now_date
    ;

    if (mm < 10) {
      mm = '0' + mm;
    }

    if (dd < 10) {
      dd = '0' + dd;
    }

    now_date = yy + split + mm + split + dd;

    return { now_date : now_date }
  };
}