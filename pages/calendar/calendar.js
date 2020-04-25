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
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    selectedDate: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    // const setAllData = data => {
    //   if (data.code !== 200) {
    //     alert('啊哟，网络开小差了，请稍等一下再试！');
    //     console.log(data);
    //   } else {
    //     this.setData({
    //       eventData: data.data
    //     })
    //   }
    // };
    // event.getAllEvent(setAllData);
    this.setEventData();
  },

  onDateSelected: function(e) {
    this.setData({
      selectedDate: e.detail.selectedDate
    });
    this.setEventData();
  },

  onDateIncreased: function() {
    const today = new Date(this.data.selectedDate);
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    this.setData({
      selectedDate: util.formatDate(tomorrow)
    });
    this.setEventData();
  },

  onDateReduced: function() {
    const today = new Date(this.data.selectedDate);
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    this.setData({
      selectedDate: util.formatDate(yesterday)
    });
    this.setEventData();
  },

  setEventData: function() {
    const testEventData = [
      {
        id: '0001',
        title: '自媒体运营交流会',
        time: '11:00-12:00',
        location: '上海'
      },
      {
        id: '0002',
        title: 'IoT创业座谈',
        time: '13:00-15:00',
        location: '青岛'
      },
      {
        id: '0003',
        title: '房屋出售开放参观',
        time: '18:00-20:00',
        location: '北京'
      },
      {
        id: '0001',
        title: '自媒体运营交流会',
        time: '11:00-12:00',
        location: '上海'
      },
      {
        id: '0002',
        title: 'IoT创业座谈',
        time: '13:00-15:00',
        location: '青岛'
      },
      {
        id: '0003',
        title: '房屋出售开放参观',
        time: '18:00-20:00',
        location: '北京'
      },
    ];
    const eventData = testEventData.slice(0, Math.floor(Math.random() * 7));
    this.setData({
      eventData
    })
  },

  select(e) {
    // console.log(e)
    this.setData({
      selectVal: e.detail
    })
  },

  toggleType() {
    this.selectComponent('#Calendar').toggleType();
  },

  selectEvent: function(e) {
    const id = e.currentTarget.dataset.eventId;
    console.log(id)
    app.goToEventPage(id);
  }

})