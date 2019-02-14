import BScroll from 'better-scroll'

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
*毫秒转化倒计时
*/
export const formatDuring = (mss) => {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
}

/**
*滚动事件
*/
export const listenScroll = (element) => {
    this.scroll = new BScroll(element, {
        swipeTime: 2000,
        scrollY: true,
        click: true,
        probeType: 2,
        pullUpLoad: {
            threshold: 10
        },
        mouseWheel: {    // pc端同样能滑动
            speed: 20,
            invert: false
        },
        useTransition: false  // 防止iphone微信滑动卡顿
    });
}
