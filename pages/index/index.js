// pages/home.js

const app = getApp();
const util = require('../../utils/util');
const EventController = require('../../controllers/event');
const event = new EventController;

Page({

  /**
   * Page initial data
   */
  data: {
    eventData: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    const setAllData = data => { 
      if(data.code !== 200){
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

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})