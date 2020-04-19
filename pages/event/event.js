const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    eventData: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.loadEventData(options)
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  loadEventData: function(options) {
    const id = options.id;

    const eventData = {
      id,
      userid: "5e9c384de55337002f86be5c",
      username: '马铮',
      avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1427569726,262975820&fm=26&gp=0.jpg',
      title: "房屋出售开放参观",
      img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322629880,2420466251&fm=26&gp=0.jpg',
      location: "北京",
      date: "2020-04-20",
      start_time: "00:00",
      end_time: "03:00",
      total_attend: 100,
      curr_attend: 20,
      info: "房屋出售，欢迎来参观和咨询。房屋出售，欢迎来参观和咨询。房屋出售，欢迎来参观和咨询。房屋出售，欢迎来参观和咨询。房屋出售，欢迎来参观和咨询。房屋出售，欢迎来参观和咨询。"
    }

    this.setData({
      eventData
    })
  },

  collectEvent: function(e) {
    const id = e.currentTarget.dataset.eventId;
    wx.showToast({
      title: `#${id} 收藏成功`,
      icon: 'success',
      duration: 1000
    })
  },
  signupEvent: function(e) {
    const id = e.currentTarget.dataset.eventId;
    wx.showToast({
      title: `#${id} 报名成功`,
      icon: 'success',
      duration: 1000
    })
  }
})