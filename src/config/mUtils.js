/**
 * 获取当前时间
 */
export const getNowFormatDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
        return currentdate;
}
/**
 * 时间日期转换为毫秒
 * 如果格式是:yyyy/mm/dd hh:mm:ss可以直接转换。var oldTime = (new Date("2018/07/09 14:13:11")).getTime(); 得到毫秒数  
    * 如果日期格式是:yyyy-mm-dd hh:mm:ss需要转化格式
    * var startDate ='2018-07-09 14:13:11';
    * startDate= startDate.replace(new RegExp("-","gm"),"/");
    * var startDateM = (new Date(startDate)).getTime(); //得到毫秒数
 */
export const getMillisecond = (startDate) => {
    startDate.replace(new RegExp("-","gm"),"/");
    return new Date(startDate).getTime(); 
}
