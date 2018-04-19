//发送消息 日期控件
export default {
    init_day(year, month) { //初始化日期
        var days = 31;
        if ([4, 6, 9, 11].findIndex(m => m == month) > -1) { //判断月份是小月则初始化为30天
            days = 30
        }
        else if (month == 2) { //根据年份来判断是否闰年来初始化二月的日期选项
            days = 28;
            year = parseInt(year);
            //判断是否是闰年
            if (this.isLeapYear(year)) {
                days = 29;
            }
        }
        return new Array(days).fill().map((n, i) => i + 1);
    },
    isLeapYear(year) { //是否是闰年
        return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
    }
}