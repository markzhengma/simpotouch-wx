// components/eventList/eventList.js
Component({
  /**
   * Component properties
   */
  properties: {
    eventListData: {
      type: Object
    }
  },

  /**
   * Component initial data
   */
  data: {
    eventList: [],
    updateTime: ''
  },

  ready: function() {
    this.setEventList();
  },

  /**
   * Component methods
   */
  methods: {
    setEventList: function() {
      const eventList = this.data.eventListData.list;
      const updateTime = this.data.eventListData.update_time.toString();
      this.setData({
        eventList,
        updateTime
      })
    }
  }
})
