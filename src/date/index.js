/**
 * 获取两个日期之间相差的天数
 * @param {Date} dateInitial 
 * @param {Date} dateFinal
 * 
 * @example getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
 * @return {number} 天数
 */
export const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);

/**
 * 加一天
 * @returns {string} 因为日期选择组件 第二个日期 为00:00:00 需要转为 23:59:59
 */
export function addOneDay(date) {
    return date += 86399
}

/**
 * 转换时间
 * @param {Date} date
 * @return 2018-08-06 20:21:35
 */
export const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 转换时间 分割
 * @param {Date} date
 * @return 2018-08-06
 */
export const formatTimeSplit = date = date.toISOString().split('T')[0];

/**
 * 秒转时间戳
 * @param {number} second 秒
 * @return 1小时10分10秒
 */
export const secondToDate = (second) => {
    let h = Math.floor(second / 3600);
    let m = Math.floor((second / 60 % 60));
    let s = Math.floor((second % 60));
    return h ? (h + "小时" + m + "分钟" + s + "秒") : (m ? (m + "分钟" + s + "秒") : (s + "秒"));
}

//对Date的扩展，将 Date 转化为指定格式的String 
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
