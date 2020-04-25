const util = require('../../utils/util.js');
Component({
  //初始默认为当前日期
  properties: {
    selectedDate: {
      type: String,
      default: util.formatDate(new Date())
    }
  },

  // 组件的初始数据
  data: {
    today: '',
    displayMonthData: '',
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    // selectedDate: '',
    pages: [0, 1, 2],
    currentPage: 0,
    prevPage: 0
  },

  // observers: {
  //   'selectedDate': function(selectedDate) {
  //     const firstDay = this.data.displayMonthData.calendarObj && this.data.displayMonthData.calendarObj[0][0].data;
  //     const lastDay = this.data.displayMonthData.calendarObj && this.data.displayMonthData.calendarObj[6][5].data;
  //     if(selectedDate < firstDay) {
  //       this.changeMonth('-1')
  //     };
  //     if(selectedDate > lastDay) {
  //       this.changeMonth('1')
  //     }
  //   }
  // },
  
  ready: function () {
    this.setCurrentMonth();
    this.triggerEvent('dateSelected', { selectedDate: this.data.today });
  },

  methods: {
    changeSwipe: function(e) {
      let current = e.detail.current;
      let prev = this.data.currentPage;

      this.setData({
        currentPage: current,
        prevPage: prev
      });

      let diff = current - prev;
      if(diff === 2) {
        diff = -1;
      } else if (diff === -2) {
        diff = 1;
      }

      this.changeMonth(diff);
    },
    selectDate: function(e) {
      // this.setData({
      //   selectedDate: e.currentTarget.dataset.date
      // });
      this.triggerEvent('dateSelected', { selectedDate: e.currentTarget.dataset.date });
    },
    setCurrentMonth: function(){
      let currDate = new Date();

      this.setData({
        today: util.formatDate(currDate),
        // selectedDate: util.formatDate(currDate),
        displayMonthData: this.setMonthData(currDate, 0, 0),
      });
      this.triggerEvent('dateSelected', { selectedDate: util.formatDate(currDate) });
    },

    tapChangeMonth: function(e){
      const diff = parseInt(e.currentTarget.dataset.diff, 10);
      this.changeMonth(diff)
    },

    changeMonth: function(diff) {
      const displayDate = this.data.displayMonthData.firstDay;
      const displayMonth = this.data.displayMonthData.month;
      // let diff = parseInt(e.currentTarget.dataset.diff, 10);
      
      if(displayMonth === 12 && diff === 1) {
        this.setData({
          displayMonthData: this.setMonthData(displayDate, 1, 0 + diff),
        });
      } else if (displayMonth === 1 && diff === -1) {
        this.setData({
          displayMonthData: this.setMonthData(displayDate, -1, 0 + diff),
        });
      } else {
        this.setData({
          displayMonthData: this.setMonthData(displayDate, 0, 0 + diff),
        });
      }
    },

    bindPickerDateChange: function (e) {
      const date = e.detail.value;
      this.directlyChangeMonth(date);
    },

    tapDirectlyChangeMonth: function(e){
      const date = e.currentTarget.dataset.date;
      this.directlyChangeMonth(date);
    },

    directlyChangeMonth: function(date){
      const displayDate = this.data.displayMonthData.firstDay;
      const newDate = new Date(date);

      const yearDiff = newDate.getFullYear() - displayDate.getFullYear();
      const monthDiff = newDate.getMonth() - displayDate.getMonth();

      this.setData({
        displayMonthData: this.setMonthData(displayDate, yearDiff, monthDiff),
        // selectedDate: util.formatDate(newDate)
      });
      this.triggerEvent('dateSelected', { selectedDate: util.formatDate(newDate) });
    },

    setMonthData: function (displayDate, yearDiff, monthDiff) {
      let paramsDate = new Date(displayDate);
      paramsDate.setMonth(displayDate.getMonth() + monthDiff);
      paramsDate.setFullYear(displayDate.getFullYear() + yearDiff);

      let date = new Date(paramsDate);
      let month = date.getMonth() === 12 ? 1 : date.getMonth() + 1;
      let year = date.getFullYear();

      let firstDay = new Date(year, month - 1, 1);
      let firstWeekDay = firstDay.getDay();

      let totalDayCount = this.getTotalDayCount(year, month);
      let lastDay = new Date(year, month - 1, totalDayCount);
      let lastWeekDay = lastDay.getDay();

      let prevTotalDayCount = month === 1 ? this.getTotalDayCount(year - 1, 12) : this.getTotalDayCount(year, month - 1);

      const datesArr = this.getDatesArr(1, totalDayCount);
      const prevMonthDatesArr = this.getDatesArr(prevTotalDayCount - firstWeekDay + 1, prevTotalDayCount);
      const nextMonthDatesArr = datesArr.length + prevMonthDatesArr.length > 35 ? lastWeekDay === 6 ? [] : this.getDatesArr(1, 7 - lastWeekDay - 1) : this.getDatesArr(1, 7 - lastWeekDay - 1 + 7);

      const currCalendarArr = this.generateCalendarArr(datesArr, month, year, true);
      const prevCalendarArr = month === 1 ? 
        this.generateCalendarArr(prevMonthDatesArr, 12, year - 1) 
        : 
        this.generateCalendarArr(prevMonthDatesArr, month - 1, year, false);
      const nextCalendarArr = month === 12 ? 
        this.generateCalendarArr(nextMonthDatesArr, 1, year + 1) 
        : 
        this.generateCalendarArr(nextMonthDatesArr, month + 1, year, false);
      const calendarArr = [ ...prevCalendarArr, ...currCalendarArr,  ...nextCalendarArr];
      let calendarObj = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };
      calendarArr.forEach(date => {
        const day = date.day;
        calendarObj[day].push(date);
      })
      this.animate('#calendar-title-text', [
        { translateY: '-50px' },
        { translateY: '0px' },
        ], 100, function () {
          this.clearAnimation('#calendar-title-text', { translateY: true })
      }.bind(this));

      return {
        month,
        year,
        totalDayCount,
        firstDay,
        firstWeekDay,
        lastDay,
        lastWeekDay,
        calendarObj
      };
    },

    getTotalDayCount: function(year, month){
      return new Date(year, month, 0).getDate();
    },

    getDatesArr: function (start, end) {
      let dateArr = [];
      for(let date = start; date <= end; date ++){
        dateArr.push(util.formatNumber(date));
      };
      return dateArr;
    },

    generateCalendarArr: function (datesArr, month, year, isCurrent){
      const calendarArr = datesArr.length === 0 ? [] : datesArr.map(date => {
        const dateStr = `${util.formatNumber(year)}-${util.formatNumber(month)}-${util.formatNumber(date)}`;
        const formattedDate = new Date(dateStr);
        return {
          text: date,
          data: util.formatDate(formattedDate),
          isCurrent,
          day: formattedDate.getDay()
        }
      });
      return calendarArr;
    }
  }
})