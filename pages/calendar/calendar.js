// pages/home.js

const app = getApp();
const util = require('../../utils/util.js');
const EventController = require('../../controllers/event');
const event = new EventController;

Page({

  /**
   * Page initial data
   */
  data: {
    eventData: '',
    value: '2018-11-11',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    lastMonth: 'lastMonth',
    nextMonth: 'nextMonth',
    selectVal: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    const setAllData = data => {
      if (data.code !== 200) {
        alert('啊哟，网络开小差了，请稍等一下再试！');
        console.log(data);
      } else {
        this.setData({
          eventData: data.data
        })
      }
    };
    event.getAllEvent(setAllData);
  },

  select(e) {
    // console.log(e)
    this.setData({
      selectVal: e.detail
    })
  },

  toggleType() {
    this.selectComponent('#Calendar').toggleType();
  }

})