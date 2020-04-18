// components/banner/banner.js
Component({
  /**
   * Component properties
   */
  properties: {
    bannerData: {
      type: Object,
    }
  },

  /**
   * Component initial data
   */
  data: {
    bannerList: [],
    showDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    isCircular: true
  },

  ready: function() {
    this.setBanner();
  },

  /**
   * Component methods
   */
  methods: {
    setBanner: function() {
      const bannerList = this.data.bannerData.list;
      console.log(bannerList)
      this.setData({
        bannerList
      })
    }
  }
})
